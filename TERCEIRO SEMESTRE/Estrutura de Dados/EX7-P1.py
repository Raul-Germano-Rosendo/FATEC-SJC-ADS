##Crie uma função zigue_zague(s) que, dada uma string s, transforme em
##maiúsculas as letras que estiverem em posições pares (começando a contar em 0).
##Ex: zigue_zague("Python") → "PyThOn" e zigue_zague("bAnana") → "BANaNa"

palavra = str(input("Coloque a palavra: "))
def zigue_zague(s):
    resultado = ""
    for i in range(len(palavra)):
        if i % 2 == 0:  # posição par
            resultado += s[i].upper()
        else:
            resultado += s[i].lower()
    return resultado
print(zigue_zague(palavra))

#metodo 1
##resp = ''
##cont = 0
##for x in s:
##    if cont% 2 == 0:
##        resp = resp + x.upper()
##    else:
##        resp = resp + x
##    cont = cont + 1
##return resp


#metodo 2
##resp = ''
##for k in range(len(s)):
##    if k % 2 == 0:
##        resp = resp + s[k].upper()
##    else:
##        resp = resp + s[k]
##    return resp

