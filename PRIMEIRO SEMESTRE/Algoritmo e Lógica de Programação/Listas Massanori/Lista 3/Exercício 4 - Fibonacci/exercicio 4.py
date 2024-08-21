#A seqüência de Fibonacci é a seguinte: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ... Sua regra de 
#formação é simples: os dois primeiros elementos são 1; a partir de então, cada elemento é a 
#soma dos dois anteriores. Faça um algoritmo que leia um número inteiro calcule o seu número 
#de Fibonacci. F1 = 1, F2 = 1, F3 = 2, etc






def fibonacci(n):
    a, b = 1, 1
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

posicao = int(input("Digite a posição do número de Fibonacci que você deseja calcular: "))
resultado = fibonacci(posicao)
print(f"O número de Fibonacci na posição {posicao} é {resultado}.")
