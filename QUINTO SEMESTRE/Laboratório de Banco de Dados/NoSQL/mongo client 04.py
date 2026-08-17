import pymongo
import sys

connection = pymongo.MongoClient("mongodb://localhost")
db = connection.school
scores = db.scores

def find():
  query =  {}
  
  try:
    cursor = scores.find(query).sort('student_id', pymongo.ASCENDING).skip(4).limit(1)
    #não adianta separar, o conjunto é executado quando o cursor é consumido!!!!
    #para várias chaves use uma tupla, como exemplo abaixo
    #.sort([('student_id', pymongo.ASCENDING), ('score', pymongo.DESCENDING)])
  except:
    print ('Unexpected error:', sys.exc_info()[0])
    
  sanity = 0
  for doc in cursor:
    print (doc)
    sanity += 1
    if sanity > 10:
      break

find()
 
