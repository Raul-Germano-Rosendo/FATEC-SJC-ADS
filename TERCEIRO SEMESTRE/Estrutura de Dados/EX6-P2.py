##def mesmas_letras(s1, s2):
##    s1 = str(s1)
##    s2 = str(s2)
##    for x in s1:
##        for y in s2:
##            if y ==


def mesmas_letras(s1, s2):
    for x in s1:
        if x not in s2:
            return False
    for x in s2:
        if x not in s1:
            return False
    return True




print(mesmas_letras('casa','casal'))
print(mesmas_letras('roma','amor'))
