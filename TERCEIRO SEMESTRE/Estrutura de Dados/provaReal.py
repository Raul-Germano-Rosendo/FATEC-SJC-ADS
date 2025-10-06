

def filtro_palavras(palavras, n):
    resp = [x for x in palavras if x.count('') > n and enumerate(x, x[0] == x[-1])]

print(filtro_palavras(['penis', 'penis', 'penis','pau'], 3))