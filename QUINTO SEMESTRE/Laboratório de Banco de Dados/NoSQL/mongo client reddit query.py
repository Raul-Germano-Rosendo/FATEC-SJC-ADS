import pymongo
import sys

connection = pymongo.MongoClient("mongodb://localhost")
db = connection.reddit
stories = db.stories

def find():
  query = {'title':{'$regex': 'Python'}}
  selector = {'title': 1, 'num_comments': 1, '_id': 0}
    
  try:
    cursor = stories.find(query, selector)
  except:
    print ('Unexpected error:', sys.exc_info()[0])
    
  sanity = 0
  for doc in cursor:
    print (doc)
    sanity += 1
    if sanity > 10:
      break

find()
 
