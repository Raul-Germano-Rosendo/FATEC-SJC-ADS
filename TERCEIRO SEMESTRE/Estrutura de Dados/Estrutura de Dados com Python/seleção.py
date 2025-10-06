def seleção(v):
  r = []
  while v: #len(v) > 0
    m = min(v) 
    r.append(m)
    v.remove(m)
  return r

from time import time
from random import shuffle
v = list(range(20000))
shuffle(v)
t1 = time()
seleção(v)
t2 = time()
print (t2-t1)

16203457
1620 3457
16 20 34 57
1 6 2 0 3 4 5 7
16 02 34 57
0126 3457
01234567