def BemFormada(s):
  p = []
  for c in s:
    if c == ')':  #menina fofa
      if p[-1] == '(': p.pop()  #se fofo match
      else: return False  #deu ruim sai
    elif c == '}':#menina pontuda
      if p[-1] == '{': p.pop()  #se pontudo match
      else: return False  #deu ruim sai
    else:
      p.append(c) #menino vai para a pilha de espera
  return len(p) == 0  #se sobrou menino também deu ruim
print (BemFormada('((){()})'))
print (BemFormada('({)}'))


