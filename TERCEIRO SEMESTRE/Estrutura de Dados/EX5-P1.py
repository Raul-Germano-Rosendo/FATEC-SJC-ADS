def soma_preços(lista):
    total = 0
    for preço in lista:
        total = total + float(preço)
    return total

preço = "19.90 35.00 12.50 9.90".split()
print("Total: R$" + str(soma_preços(preço)))


