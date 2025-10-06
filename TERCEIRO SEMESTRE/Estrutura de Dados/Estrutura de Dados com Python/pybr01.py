def dec2bin(n):
  if n == 0: return ''
  return dec2bin(n//2) + str(n%2) 














##
##def f(n):
##  if n == 0: return 1
##  return 2 * f(n-1)

from functools import lru_cache
@lru_cache(maxsize=None)
def f(n):
  if n == 0: return 1
  return f(n-1) + f(n-1)










