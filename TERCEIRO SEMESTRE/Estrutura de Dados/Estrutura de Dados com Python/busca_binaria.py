frrcont = 0
def busca_binaria(x, v):
  global cont
  e = -1
  d = len(v)
  while e < d-1:  #para quando estão um do ladinho
                  #do outro e = d - 1
    m = (e + d) // 2   #metade do caminho entre eles
    cont = cont + 1
    if v[m] < x:  #ponto de encontro depois
      e = m       #eduardo dá um pulão
    else:
      d = m       #damares volta um pulão
  return d
v = list(range(1000000))
from random import randint
print (busca_binaria(randint(1, 1000000), v))
print (cont)
