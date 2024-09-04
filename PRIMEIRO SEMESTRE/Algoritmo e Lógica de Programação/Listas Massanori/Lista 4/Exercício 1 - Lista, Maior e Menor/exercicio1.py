import random

numeros = [random.randint(1, 100) for _ in range(10)]

print("Lista gerada:", numeros)

menor = numeros [0]
maior = numeros [0]

for numero in numeros:
    if numero < menor:
        menor = numero
    elif numero > maior:
        maior = numero



print(f"O menor número é {menor}, e o Maior número é {maior}")

