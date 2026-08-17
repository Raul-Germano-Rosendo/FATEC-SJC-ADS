from datetime import datetime
from pymongo import MongoClient

connection = MongoClient("mongodb://localhost")

db = connection.test

post = {"title": "My Blog Post",
        "content": "Here's my blog post.",
        "date": datetime.utcnow()}

db.blog.insert_one(post)

print ("find retorna um cursor")
cursor = db.blog.find()
for d in cursor:
  print (d)

print ("find_one retorna um documento")
d = db.blog.find_one()
print (d)

db.blog.delete_one({"title": "My Blog Post"})

print ("depois de remover o post")
d = db.blog.find_one()
print (d)
