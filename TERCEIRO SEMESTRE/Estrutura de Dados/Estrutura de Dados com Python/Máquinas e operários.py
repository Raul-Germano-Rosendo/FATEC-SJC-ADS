G = {1:['B'],    #note que escolhi máquina como chave
     2:['A', 'B', 'E', 'F'], #no enunciado o operário
     3:['A', 'B', 'C'],  #é chave, mas meu problema
     4:['B', 'E'],   #é otimizar as máquinas
     5:['B', 'E', 'F']}  #mais máquinas funcionando

while G: #enquanto tem máquina len(G) > 0
  m = min(G, key=lambda x: len(G[x]))
  #critério é o menor número de operários
  op = G[m][0]  #pego o primeiro operário
  print (m, op) #casamento máquina operário
  del G[m]      #tiro a máquina do grafo
  for máq in G: #tiro o operário de todas as listas
    if op in G[máq]: G[máq].remove(op)
