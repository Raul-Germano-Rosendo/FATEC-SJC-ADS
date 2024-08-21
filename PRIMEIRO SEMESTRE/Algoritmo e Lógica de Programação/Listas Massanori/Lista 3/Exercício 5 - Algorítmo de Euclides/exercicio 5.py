#Dados dois números inteiros positivos, determinar o máximo divisor comum entre eles usando 
#o algoritmo de Euclides.



def mdc(a, b):
    while b != 0:
        a, b = b, a % b
    return a

num1 = int(input("Digite o primeiro número inteiro positivo: "))
num2 = int(input("Digite o segundo número inteiro positivo: "))

print(f"O máximo divisor comum entre {num1} e {num2} é {mdc(num1, num2)}.")
