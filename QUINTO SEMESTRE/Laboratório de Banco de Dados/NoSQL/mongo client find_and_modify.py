import pymongo

def get_next_sequence_number(name):
  connection = pymongo.MongoClient("mongodb://localhost")
  db = connection.test
  counters = db.counters

  counter = counters.find_and_modify(query={'type':name},
                                     update={'$inc':{'value':1}},
                                     upsert=True, new=True)
  return counter['value']
  
print (get_next_sequence_number('uid'))
print (get_next_sequence_number('uid'))
print (get_next_sequence_number('uid'))
