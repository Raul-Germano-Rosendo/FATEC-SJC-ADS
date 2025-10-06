G = {
  1: [6, 7],
  2: [3, 7],
  3: [4, 7, 2],
  4: [3, 7],
  5: [7],
  6: [1, 3],
  7: [1, 2, 3, 4, 5]
}
def remove(vizinhos):
  for v in vizinhos: del G[v]
  for x in G:
    for y in vizinhos:
      if y in G[x]: G[x].remove(y)

s = []    #caixa das substâncias químicas
while G:  #enquanto len(G) > 0 tem substância sobrando
  v = min(G, key=lambda x: len(G[x]))
  #escolhi a substância que reage menos == min
  s.append(v)  #coloco na caixa a substância escolhida
  vizinhos = G[v]  #vejo os vizinhos que explodem
  del G[v]  #tiro a substância que foi para a caixa
  remove(vizinhos) #removo os vizinhos e as ligações
print (s)
