import random

numeros = [random.randint(1, 100) for _ in range(20)]

#Listas par e impar

par = []
impar = []

for numero in numeros:
    if numero % 2 == 0:
        par.append(numero)
    else:
        impar.append(numero)


print("Lista original:", numeros)
print("Pares", par)
print("Impares", impar)
