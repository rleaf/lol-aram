const express = require('express')
const mongodb = require('mongodb')
const dotenv = require('dotenv')
const twisted = require('../../twisted_calls')
const cat = require('../../cat')

dotenv.config()

const router = express.Router()

router
   .route('/:region/:summonerURI')
   .get(async (req, res) => {

      // Check summoner existence.
      const summoner = await twisted.getSummoner(req.params.summonerURI, req.params.region)
         .catch((e) => {
            if (e.status == 429) {
               console.log(`Hit rate limit on getSummoner for ${req.params.summonerURI} (${req.params.region})`)
            }
            if (e.status == 404) {
               res.status(e.status).send(e.statusText)
               return
            }
         })

      const client = await loadSummonerCollection()

      
      // Check if summoner is in database
      if (summoner) {
         
         const summonerCollection = client.collection(summoner.name)
         
         // Check if already pulling
         check = await summonerCollection.findOne(
            {'activePull': {$exists: true}}
         )
   
         if(check && check.activePull == true) {
            console.log(`already pulling ${summoner.name}`)
            res.send('pulling')
            return 
         }

         parsedIdxExist = await summonerCollection.findOne(
               {'parsedIndex': {$exists: true}}
            )

         if(parsedIdxExist) {
            console.log(`Summoner ${summoner.name} (${req.params.region}) already initially parsed`)

            result = (await client.collection(summoner.name).find({}).toArray())
            res.send(result)

            return
         } 

         // Create summoner collection and pull all matchIds
         await summonerCheckInitialMatchPullv2(summonerCollection, summoner, req.params.region)
                  
         // Parse & scribe individual matches
         await matchParserV2(summonerCollection, summoner, req.params.region)

         // Average all matches
         await totalMatches(summonerCollection)

         console.log(`Finished parsing ${summoner.name} (${req.params.region})`)
         // Yeet data
         result = (await client.collection(summoner.name).find({}).toArray())
         res.send(result)
      }
   })

async function totalMatches(collection) {
   // const summonerCollection = client.collection(summoner.name)
   const allChamps = await collection.find(
      {'championName': {$exists: true}}
   ).toArray()

   // Parse average stats of all games
   allChamps.forEach(async x => {

      let avg = cat.averages(x.matches).flat()

      // Pushing data
      await collection.updateOne(
         {'championName': x.championName},
         {$set: {
            'totalGames': avg[0],
            'wins': avg[1],
            'averageTotalDamageDealt': avg[2],
            'averageDamagePerMinute': avg[3],
            'averageHealingOnTeammates': avg[4],
            'averageTotalDamageTaken': avg[5],
            'averageKDA': `${avg[6]}/${avg[7]}/${avg[8]}`,
            'averageGoldEarned': avg[9],
            'totalTripleKills': avg[10],
            'totalQuadraKills': avg[11],
            'totalPentaKills': avg[12],
            }
         }
      )
   })
}

router.get('/update/:region/:summonerURI', async (req, res) => {
   
   const summoner = await twisted.getSummoner(req.params.summonerURI, req.params.region)
      .catch((e) => {
         console.log(`Update error for ${req.params.summonerURI}`, e)
         return
      })
   const client = await loadSummonerCollection()
   const summonerCollection = client.collection(summoner.name)

   check = await summonerCollection.findOne(
      {'activePull': {$exists: true}}
   )

   if(check && check.activePull == true) {
      console.log(`Already updating ${summoner.name} (${req.params.region})`)
      res.send('Already updating')
      return 
   }

   await summonerCollection.updateOne(
      {'name': summoner.name},
      {$set: {'activePull' : true}}
   )

   /* Update summoner profile
         - Refresh matchId pull
         - Get current parsed Index
         - Iterate over matchId pull with parsed Index
   */
   const summonerDoc = await summonerCollection.findOne(
      {'name': summoner.name}
   )

   let matches = (await matchIdPull(summonerCollection, summoner, req.params.region, length=true)).slice().reverse()
   let parsedIndex = (await summonerDoc).parsedIndex

   if (matches[parsedIndex] == undefined) {
      console.log(`${summoner.name} (${req.params.region}) already updated.`)

      await summonerCollection.updateOne(
         {'name': summoner.name},
         {$set: {'activePull' : false}}
      )

      result = (await summonerCollection.find({}).toArray())
      res.send(result)
      return
   }

   for ( ; parsedIndex < matches.length; parsedIndex++) {

      console.log(`Updating ${summoner.name} (${req.params.region}), match ${matches[parsedIndex]}`)

      const game = await twisted.getMatchInfo(matches[parsedIndex], req.params.region)
         .catch(async (e) => {
            console.log(`Got rate limit check (${e.status}), recycling same game`)
            parsedIndex--
         })
      
      if (game) {
         const champions = cat.scribe(summoner.puuid, game)

         if (champions) {
            await createChampionDocument(summonerCollection, champions.championName)
            await summonerCollection.updateOne(
               {'championName': champions.championName},
               {$push: {'matches': {$each: [champions], $position: 0}}}
            )
         }
      }
   }
   
   // Get new averages
   await totalMatches(summonerCollection)
   
   await summonerCollection.updateOne(
      {'name': summoner.name},
      {$set: {'parsedIndex': matches.length}}
   )

   await summonerCollection.updateOne(
      {'name': summoner.name},
      {$set: {'activePull' : false}}
   )

   console.log(`Finished updating ${summoner.name} (${req.params.region})`)
   result = (await summonerCollection.find({}).toArray())
   res.send(result)
})

async function loadSummonerCollection() {
   const client = await mongodb.MongoClient.connect(process.env.DB_CONNECTION_STRING)
   return client.db('summoners')
}

// async function totalGames(client, summoner, x) {
//    x.forEach(y => {
//       client.collection(summoner.name).insertOne({ totalGames: x.matches.length })
//    });
// }

async function summonerCheckInitialMatchPullv2(collection, summoner, region) {

   // parsedIdxExist = await client.collection(summoner.name).findOne(
   //    {'parsedIndex': {$exists: true}}
   // )

   // if (parsedIdxExist) {
   //    return
   // }
   // Add new summoner to database
   await collection.insertOne(summoner)

   // Live update flag
   await collection.updateOne(
      {'name': summoner.name},
      {$set: {'activePull': true}}
   )

   // Pull all games
   await matchIdPull(collection, summoner, region)

   // Finalize summoner creation, add parsedIndex
   await collection.updateOne(
      {'name': summoner.name},
      {$set : {'parsedIndex': 0}}
   )
   
   let length = (await collection.findOne({'name': summoner.name})).matchId.length
   console.log(`Added ${summoner.name} (${region}) to database, [${length} matches].`)
}

async function matchIdPull(collection, summoner, region, length=false) {
   let matchList
   
   await twisted.getAllSummonerMatches(summoner.name, region)
      .then((res) => {
         matchList = res
         collection.updateOne(
            {'name': summoner.name},
            {$set : {'matchId': matchList}}
         )
      })
      .catch(async (e) => {
         console.log(`(${e.status}) @ matchIdPull. Repulling summoner matches.`) 
         await matchIdPull(collection, summoner, region)
      })

   if (length) {
      return matchList
   }
}

async function matchParserV2(collection, summoner, region) {
   /*
   Initial parse through summoner matches
   */

   const result = (await collection.find({}).toArray()).shift()
   let matches = result.matchId.reverse()

   await collection.updateOne(
      {'name': summoner.name},
      {$set: {'parsedIndex': matches.length}}
   )

   for (let i = 0 ; i < matches.length; i++) {
      
      if (i % 10 == 0) {
         console.log(`Parsing ${summoner.name} (${region}), match ${i}`)
      }

      const game = await twisted.getMatchInfo(matches[i], region)
         .catch(async (e) => {
            if (e.status == 429) {
               console.log(`(${e.status}) @ getMatchInfo. Recycling same game.`,)
               i--
            }
         })
      
      if (game) {
         const champions = cat.scribe(summoner.puuid, game)

         if (champions) {
            await createChampionDocument(collection, champions.championName)
            await collection.updateOne(
               {'championName': champions.championName},
               {$push: {'matches': {$each: [champions], $position: 0}}}
            )
         }
      }
   }

   console.log(`Finished initial match parse`)

   await collection.updateOne(
      {'name': summoner.name},
      {$set: {'activePull' : false}}
   )
}

async function removeParse(client, summoner, matchEndIndex) {
   const toad2 = (await client.collection(summoner.name).find({'matchEnd': matchEndIndex})).toArray()
   console.log('toad', await toad2)

   await client.collection(summoner.name).updateOne({'matchEnd': matchEndIndex}, {$pop: {matches: 1}})

   const toad = (await client.collection(summoner.name).find({'matchEnd': matchEndIndex})).toArray()
   console.log('toad', await toad)
   console.log(`Got rate limit check, reducing parsedIndex by 1`)
}

async function createChampionDocument(collection, champion) {
   const food = await collection.findOne({ championName: champion})

   if (food == undefined) {

      const championNameBook = {
         'AurelionSol' : 'Aurelion Sol',
         'Belveth' : "Bel'Veth",
         'Chogath' : "Cho'Gath",
         'DrMundo' : 'Dr. Mundo',
         'FiddleSticks' : 'Fiddlesticks',
         'JarvanIV' : 'Jarvan IV',
         "KSante" : "K'Sante",
         "Kaisa" : "Kai'Sa",
         'Khazix' : "Kha'Zix",
         'KogMaw' : "Kog'Maw",
         'Leblanc' : 'LeBlanc',
         'LeeSin' : 'Lee Sin',
         'MasterYi' : 'Master Yi',
         'MissFortune' : 'Miss Fortune',
         'MonkeyKing' : 'Wukong',
         'Nunu' : 'Nunu & Willump',
         'RekSai' : "Rek'Sai",
         'Renata' : 'Renata Glasc',
         'TahmKench' : 'Tahm Kench',
         'TwistedFate' : 'Twisted Fate',
         'Velkoz' : "Vel'Koz",
         'XinZhao' : 'Xin Zhao'
      }
      
      await collection.insertOne(
         { 
            championName: champion,
            trueChampionName: championNameBook[champion],
            totalGames: 0,
            wins: 0,
            averageTotalDamageDealt: 0,
            averageDamagePerMinute: 0,
            averageHealingOnTeammates: 0,
            averageTotalDamageTaken: 0,
            averageKDA: '',
            averageGoldEarned: 0,
            totalTripleKills: 0,
            totalQuadraKills: 0,
            totalPentaKills: 0,
            matches: []
         }
      )
   } 
}

async function parseCheck(client, summoner) {

   const toad = (await client.collection(summoner.name).findOne({ matchEnd: {$exists: true}}))
   let matchContainer

   if (toad == undefined) {
      // Summoner has no recorded parsed matches.
      console.log(`No existing parsed matches`)
      return matchContainer = addMatchContainer(client, summoner, 0, 25)
   } else {
      // Summoner has existing parsed matches.
      console.log(`Has existing parsed matches`)
      return matchContainer = (await client.collection(summoner.name).find().sort({ matchEnd: -1 }).limit(1).toArray()).shift().matchEnd
   }
}

async function addMatchContainer(client, summoner, start, end) {
   await client.collection(summoner.name).insertOne({matchStart: start, matchEnd: end, matches: []})
   return (await client.collection(summoner.name).find().sort({ matchEnd: -1 }).limit(1).toArray()).shift().matchEnd
}

async function matchParser(client, summoner, region) {
   const result = await client.findOne({ puuid: summoner.puuid })
   let parsedIndex

   // Check if there are already parsed matches
   // Check if 'matchInfo' field exists.
   if (result['matchInfo']) {
      console.log('matchinfo Exists')
      parsedIndex = result['matchInfo'].length
   } else {
      // If doesn't exist, create one
      console.log(`'matchInfo' DNE. Creating...`)
      await client.updateOne({ puuid: summoner.puuid }, {$set: {'matchInfo': []}})
      parsedIndex = 0
   }


   // Set to 5 for dev
   console.log(`Starting parse at ${parsedIndex}`)
   for (let i = parsedIndex; i < result.matchId.length; i++) {
      console.log(`carrot cake ${i}`)
      const match = await twisted.getMatchInfo(result.matchId[i], region)
      await client.updateOne({'name': summoner.name}, {$push : {'matchInfo': match}})
      // matchStats.push(match)
   }
}

// async function summonerCheckInitialMatchPull(client, summoner, region) {
//       const result = await client.findOne({ puuid: summoner.puuid })

//       if (result) {
//          return
//       } else {
//          // Add new summoner to database.
//          client.insertOne(summoner)
         
//          // Pull all games
//          const matchList = await twisted.getAllSummonerMatches(summoner.name, region)
//          await client.updateOne({'name': summoner.name}, {$set : {'matchId': matchList}})
//          console.log(`Added ${summoner.name} to database.`)

//       }
// }



// Utility
async function deleteSummoner(client, summoner) {
   await client.deleteMany({ name: summoner })
   console.log(`Deleted ${summoner.name}`);
}

module.exports = router