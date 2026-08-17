import pymongo
import gridfs
import sys

con = pymongo.MongoClient("mongodb://localhost")
db = con.test
videos_meta = db.videos_meta

grid = gridfs.GridFS(db, 'videos')

f = open('extreme_video.mp4', 'r')
_id = grid.put(f)
f.close()

print ('id of file is ', _id)

videos_meta.insert({'grid_id':_id, 'filename':
                    'extreme_video.mp4'})

