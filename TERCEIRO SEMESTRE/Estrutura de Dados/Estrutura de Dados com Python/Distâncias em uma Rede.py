A = [[0, 1, 0, 0, 0, 0], 
     [0, 0, 1, 0, 0, 0],
     [0, 0, 0, 0, 1, 0],
     [0, 0, 1, 0, 1, 0],
     [1, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0]]

def Distancias(n, origem):
  d = [-1] * n       #marca para dizer local novo
  d[origem] = 0
  f = []
  f.append(origem)
  while len(f) > 0:  #fila não vazia = possibilidades
    x = f.pop(0)     #retiro o primeiro da fila
    for y in range(n):  #percorro cidades
      if A[x][y] == 1 and d[y] == -1:
        #A[x][y] = 1 significa tem caminho de x a y
        #d[y] = -1 nunca estive na cidade destino y
        #chego lá e nunca visitei antes (-1)
        d[y] = d[x] + 1
        f.append(y)  #enfilero onde cheguei
                     #para ir mais para frente depois
  return d

print (Distancias(len(A), 3))
