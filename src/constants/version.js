/* 
   {
      version: "",
      date: "",
      notes: "",
      add: [],
      remove: [],
      fix: [],
      adjust: []
   }, 
*/

const version = [
   {
      version: "2.2.0",
      date: "10/11/23",
      notes: "Taking break from backend to do something front.",
      add: [
         'Landing experience'
      ],
      remove: [],
      fix: [],
      adjust: []
   }, 
   {
      version: "2.1.2",
      remove: [],
      date: "10/3/23",
      notes: "ARAM crawler built at this point, but seeing if I need a new key. Rate limit conflict between API requests sent by users from Aramstats and API requests sent by crawler for matchdata.",
      add: [
         "500 error handling when database is down",
         "Transition to Pinia for global properties",
         "Use localStorage for region on home page search",
         "Minor UI improvements (eg: button hover css)"
      ],
      fix: [
         "Twisted 429 bug",
         "Image assets not lazy loading on sort in List Panel"
      ],
   },
   {
      version: "2.1.1",
      date: "9/23/23",
      fix: [
         "Update packages on prod for new OCE regions (forgot, woops)"
      ],
      adjust: [
         "HTTP -> HTTPS",
         "Lazy loading image assets & pull more from ddragon CDN"
      ],
   },
   {
      version: "2.1.0",
      date: "9/19/23",
      notes: "Retroactively versioning to 5/2/23 to keep tidy.",
      add: [
         'Versioning',
         'Briar assets',
         'Regions (VN, TW, TH, SG, PH) and update Twisted fork',
         'Automatically get most recent patch',
         'Polling. See pogress of parsing summoners'
      ],
      remove: [
         'Twisted error logging'
      ],
      fix: [
         'NaN issue with kill participation & damages share',
         'Dead match issue where responses from Riot contained no match data',
         'Ddragon item-0 403 response',
      ],
   },
   {
      version: "2.0.0",
      date: "9/14/23",
      add: [
         'Summoner encounter panel & pancakes placeholder'
      ],
      adjust: [
         'Restructured database & redesigned backend',
         'Update frontend to accomodate for new schema'
      ]
   },
   {
      version: "1.1.0",
      date: "5/16/23",
      add: [
         "Match-level data."
      ],
   },
   {
      version: "1.0.0",
      date: "5/2/23",
      notes: "Not technically 1.0.0 but good enough.",
      adjust: [
         'Updated user interface.',
      ]
   },
]

export default version