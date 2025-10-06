def mergesort(v):
    if len(v) <= 1: return v
    else:
        m = len(v) // 2
        e = mergesort(v[:m])
        d = mergesort(v[m:])
        return merge(e, d)

def merge(e, d):
    r = []
    i, j = 0, 0
    while i < len(e) and j < len(d):
        if e[i] <= d[j]:
            r.append(e[i])
            i += 1
        else:
            r.append(d[j])
            j += 1
    r += e[i:]
    r += d[j:]
    return r

def quicksort(v):
  if len(v) <= 1: return v    
  pivô = v[0]
  iguais  = [x for x in v if x == pivô]
  menores = [x for x in v if x <  pivô]
  maiores = [x for x in v if x >  pivô]
  return quicksort(menores) + iguais + quicksort(maiores)


def seleção(v):
  r = []
  while v:
    m = min(v) 
    r.append(m)
    v.remove(m)
  return r

from time import time
from random import sample
total = 0
tam = 10000
print (f'Tamanho |Merge |Quick |Seleç |Nativo')
while total < 30:
    v = sample(range(tam), tam)
    cópia = list(v)
    t1 = time()
    mergesort(v)
    t2 = time()
    tm = t2-t1
    total = total + tm

    v = list(cópia)
    t1 = time()
    quicksort(v)
    t2 = time()
    tq = t2-t1
    total = total + tq
    
    v = list(cópia)
    t1 = time()
    seleção(v)
    t2 = time()
    ts = t2-t1
    total = total + ts

    v = list(cópia)
    t1 = time()
    v.sort()
    t2 = time()
    tn = t2-t1
    total = total + tn
    print (f'{tam}   | {tm:.2f} | {tq:.2f} | {ts:.2f} | {tn:.2f}')
    tam = tam + 5000
    
