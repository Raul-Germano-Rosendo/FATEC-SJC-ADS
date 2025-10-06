##def maldição(s):
##    s = str(s)
##    vogais = 'aeiou'
##    maior_contagem = None
##    for x in s:
##        count(x)
##        print(count(x))

def maldição(s):
    vogais = 'aeiou'
    letra = ''
    maior = 0
    for x in vogais:
        cont = s.count(x)
        if cont > maior:
            maior = cont
            letra = x
    return s.replace(letra, '#') if letra else s

print (maldição("abracadabra bobo sem nocao"))
