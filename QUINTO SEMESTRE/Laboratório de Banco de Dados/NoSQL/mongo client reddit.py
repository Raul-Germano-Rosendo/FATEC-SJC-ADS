import json
from urllib.request import urlopen
import pymongo

connection = pymongo.MongoClient("mongodb://localhost")

db = connection.reddit
stories = db.stories

reddit_page = urlopen('http://www.reddit.com/r/Python/.json')

parsed = json.loads(reddit_page.read().decode('utf-8'))

for item in parsed['data']['children']:
  stories.insert_one(item['data'])

print ('Reddit stories ok...')
