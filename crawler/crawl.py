import os
import argparse
from wsgiref import validate
import util
import validators as V
from pymongo import MongoClient
from dotenv import load_dotenv
from propagate import Propagate
from seed import Seed


class Crawler():
   """
   Entry point for crawler.
   """
   def __init__(self, config: object) -> None:
      load_dotenv()

      db = MongoClient(os.environ['DB_CONNECTION_STRING'])['aramstats']
      collection_list = db.list_collection_names()
      region = config.region
      patch = util.get_latest_patch()
      items = util.get_items()
      puuid_collection_name = f"{region.upper()}_puuids"
      match_collection_name = f"{patch}_matches"

      # Check if existing collection of puuids for REGION
      if puuid_collection_name in collection_list:
         self.puuid_collection = db[puuid_collection_name]
      else:
         self.puuid_collection = db.create_collection(puuid_collection_name, validator=V.puuid_schema)
         self.puuid_collection.create_index('puuid', unique=True)

      # Check if existing collection of matches on PATCH
      if match_collection_name in collection_list:
         self.match_collection = db[match_collection_name]
      else:
         self.match_collection = db.create_collection(match_collection_name, validator=V.match_schema)
         self.match_collection.create_index('metadata.matchId', unique=True)

   # Check if existing championStats collection
      if "championStats" in collection_list:
         self.champion_stats = db["championStats"]
      else:
         self.champion_stats = db.create_collection("championStats", validator=V.champion_schema)
         # self.champion_stats.create_index('name', unique=True) # don't think i need
      
      if config.seed:
         Seed(patch, items, region, self.puuid_collection, self.match_collection, self.champion_stats)
      else:
         Propagate(patch, items, region, self.puuid_collection, self.match_collection, self.champion_stats)

if __name__ == '__main__':
   args = argparse.ArgumentParser()
   args.add_argument('-s', '--seed', type=int, choices=[0, 1], default=0,
                     help='Set to 1 to seed crawl. Set to propagation by default.')
   args.add_argument('region', choices=['americas', 'europe', 'asia', 'sea'],
                     help='Select region to crawl through.')
   config = args.parse_args()

   crawler = Crawler(config)