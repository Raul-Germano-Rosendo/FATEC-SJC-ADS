n = 18
p = []
while n != 0:
  p.append(n % 2)  #empilho resto da divisão
  n = n // 2       #divisão inteira por 2
while len(p) > 0:  #enquanto pilha não vazia
  print (p.pop(), end = '')
