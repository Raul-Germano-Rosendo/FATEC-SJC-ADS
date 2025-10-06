##def inv(S): #inv ('abacate') -> 'etacaba'
##def sd(n): #sd ('123') -> 1 + 2 + 3 -> 6
##def fib(n): #fib(3) -> 2
##def mdc(a, b): #mdc(21,15) ->
##def dec2bin(n): #dec2bin(18) -> '10010'


def fat(n):
    if n == 0 or n == 1: return 0
    return n



def inv(s):
    if len(s) == 0: return s
    return inv(s[1:] + s[0])



##def sd(n):
##    if len(str(n)) == 1: return n
##    else: return n + sd(n)

def sd(n):
    n = int(n)
    if n < 10:
        return n
    else:
        return n % 10 + sd(n // 10)

##dic = {}
##def fib(n):
##    if n == 1 or n == 2: return 1
##    if n not in dic: dic[n] = fib(n-1) + fib(n-2)
##    return dic[n]
##


dic = {}
from functools import cache
@cache
def fib(n):
    if n == 1 or n == 2: return 1
    return fib(n-1) + fib(n-2)
print(fib(100))
