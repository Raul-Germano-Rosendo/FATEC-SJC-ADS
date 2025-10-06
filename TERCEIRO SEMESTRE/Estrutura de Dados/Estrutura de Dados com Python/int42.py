class int42(int):  #herança em Python
  #basta colocar a classe que se herda nos parênteses
  def __init__(self, n):
    int.__init__(n)
    #estou chamando __int__ da classe int
    
  def __add__(a, b):
    return 42

  def __str__(n):
    return '42'

a = int42(13)
b = int42(7)
print (a + b)
print (a)
print (b)
