import pymongo
import sys

connection = pymongo.MongoClient("mongodb://localhost")
db = connection.school
scores = db.scores

def find():
  query = {'type': 'exam'}
  selector = {'student_id': 1, '_id': 0}
    
  try:
    cursor = scores.find(query, selector)
  except:
    print ('Unexpected error:', sys.exc_info()[0])
    
  sanity = 0
  for doc in cursor:
    print (doc)
    sanity += 1
    if sanity > 10:
      break

find()
 
