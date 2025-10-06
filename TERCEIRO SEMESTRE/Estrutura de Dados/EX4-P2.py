def pares_finais(n):
    n = str(n)
    n = n[::-1]
    cont = 0
    for x in n:
        if int(n) % 2 == 0:
            cont = cont + 1
        else: break
    if cont == 0:
        return None, " 0"
    return cont
print(pares_finais(245680))
print(pares_finais(123456))
print(pares_finais(13))
