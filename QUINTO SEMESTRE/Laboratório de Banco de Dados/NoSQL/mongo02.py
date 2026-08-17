import pymongo
import sys
def main():
  connection = pymongo.MongoClient("mongodb://localhost")
  db = connection.m101
  people = db.people
  
  person = {'name': 'Barack Obama', 'role':'President',
            'address':{'address1':'The White House',
                       'street': '1600 Pensylvania Avenue',
                       'state': 'DC',
                       'city': 'Washington'},
            'interests':['government', 'basketball', 'the middle east']}

  people.insert_one(person)

  person = people.find_one({'name': 'Barack Obama'})
  print (person)
  
  try:
    people.insert_one(person)
  except:
    print ('insertion failed', sys.exc_info()[0])
  
main()
