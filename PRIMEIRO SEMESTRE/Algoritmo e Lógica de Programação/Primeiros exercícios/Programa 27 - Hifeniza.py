frase = "o Raul acha que sabe python mas a verdade é que ele é feliz"
def hifeniza(frase):
    frase = frase.split()
    frase = '-'.join(frase)
    return frase
print(hifeniza(frase))

