import util
import pymongo

class Propagate():
   def __init__(self, patch: str, items: dict, region: str, puuid_collection, match_collection, champion_collection) -> None:
      index = 0
      start = 0
      batch_size = 50
      self.patch = patch
      self.region = region
      self.puuid_collection = puuid_collection
      self.match_collection = match_collection
      self.champion_collection = champion_collection
      self.items = items["data"]

      for doc in self.puuid_collection.find(skip=start):
         if index % 20 == 0: print(f"{'@' * 5} INDEX: {index + start} {'@' * 5}")
         print(f"on puuid: {doc['puuid']}")
         self.propagate(doc, 0, batch_size)
         index += 1
      print('fin')

   def propagate(self, doc: object, start: int, batch_size: int) -> None:
      matchlist = util.get_matchlist(doc['puuid'], doc['region'], start, batch_size)
      if len(matchlist) == 0: return

      match_batch = []
      puuid_batch = []
      persist = False

      for match_id in matchlist:
         print(match_id)
         match = util.get_match(match_id, doc['region'])
         # Continue/Break on...
         # ...404 match
         if match == 404: continue
         # ...dead match OR remake
         if match['info']['gameDuration'] < 210: continue
         # ...old patch
         if self.patch != util.get_match_patch(match): break

         match_timeline = util.get_match_timeline(match_id, doc['region'])
         table = {y["championName"]:x["participantId"] for x in match_timeline["info"]["participants"] \
            for y in match["info"]["participants"] if x["puuid"] == y["puuid"]}

         # range(6) instead of 7 to omit poro-snax
         champions_data = [[x["championName"], x["win"], x["teamId"], [str(x[f"item{y}"]) for y in range(6)]] for x in match["info"]["participants"]]

         for champion_data in champions_data:
            # Timeline-res level data
            level_path, starting_build = util.get_champion_upsert_data(table[champion_data[0]], match_timeline, self.items, champion_data[1])

            # Match-res level data
            filtered_items = list(filter(lambda x: util.item_filter(x, self.items), champion_data[3]))
            path = 'builds.' + '.'.join([str(x) for x in filtered_items]) + '.meta'
            name = champion_data[0] # champion name 
            won = 1 if champion_data[1] else 0 # if champion won the game, either (0 or 1)

            if len(filtered_items) > 0:
               try:
                  self.champion_collection.update_one(
                     {
                        "name": name,
                     },
                     {
                        "$inc": {
                           "games": 1,
                           "wins": won,
                           f'{path}.games': 1,
                           f'{path}.wins': won,
                           f"{path}.{level_path}": 1,
                           f"{path}.{starting_build}.games": 1,
                           f"{path}.{starting_build}.wins": won,
                        },
                     },
                     upsert = True
                  )
               except Exception as e:
                  print(e, 'pancakes')
         
         match_batch.append(match)
         [puuid_batch.append({ 'puuid': participant, 'region': doc['region']}) \
            for participant in match['metadata']['participants']]

         if (match_id == matchlist[-1]): persist = True

      if (len(match_batch) == 0): return

      try:
         self.match_collection.insert_many(match_batch, ordered=False)
      except pymongo.errors.BulkWriteError as e:
         errors = list(filter(lambda x: x['code'] != 11000, e.details['writeErrors']))
         if len(errors) > 0:
            raise Exception(f'Non-11000 errors in insertmany operation for TEST{self.patch}_matches')
         else:
            print(f"Inserted {e.details['nInserted']}/{len(match_batch)} matches")
            pass

      try:
         self.puuid_collection.insert_many(puuid_batch, ordered=False)
      except pymongo.errors.BulkWriteError as e:
         errors = list(filter(lambda x: x['code'] != 11000, e.details['writeErrors']))
         if len(errors) > 0:
            raise Exception(f"Non-11000 errors in insertmany operation for TEST{self.region}_puuids")
         else:
            print(f"Inserted {e.details['nInserted']}/{len(puuid_batch)} puuids")
            pass
      
      if persist: 
         print('persisting')
         self.propagate(doc, start + batch_size, batch_size)