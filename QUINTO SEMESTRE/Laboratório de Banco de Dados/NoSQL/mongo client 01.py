import pymongo
import sys

connection = pymongo.MongoClient("mongodb://localhost")
db = connection.school
scores = db.scores

def find():
  query = {'type': 'exam'}
    
  try:
    cursor = scores.find(query)
  except:
    print ('Unexpected error:', sys.exc_info()[0])
    
  sanity = 0
  for doc in cursor:
    print (doc)
    sanity += 1
    if sanity > 10:
      break

def find_one():
  query = {'student_id': 10}

  try:
    it = scores.find_one(query)
  except:
    print ('Unexpected error:', sys.exc_info()[0])

  print (it)

print ('cursor')
find()
print  ()
print ('one')
find_one()
