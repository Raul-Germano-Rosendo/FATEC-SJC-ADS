#Escreva uma função recursiva que calcule a soma dos números de 1 até n.

def soma(n):
    # Caso base: quando n for 1, não há mais nada para somar
    if n == 1:
        return 1
    # Caso recursivo: soma o número atual com o resultado da função anterior
    return n + soma(n - 1)

# Exemplo de uso:
print(soma(5))  # Saída esperada: 15



#🧠 Explicação:
#A função se chama novamente com um valor menor (n - 1).
#Cada chamada "espera" o resultado da próxima.
#Quando chega no caso base, a pilha de chamadas é resolvida de trás pra frente.

#📉 Fluxo da recursão:
#soma(5)
#= 5 + soma(4)
#= 5 + (4 + soma(3))
#= 5 + (4 + (3 + soma(2)))
#= 5 + (4 + (3 + (2 + soma(1))))
#= 5 + 4 + 3 + 2 + 1 = 15




# 💡 Conceitos importantes:
# - Caso base: condição que para a recursão.
# - Caso recursivo: chamada da função dentro dela mesma.
# - Cada chamada fica "em espera" até que o caso base seja atingido.
# - Recursão é ideal para problemas que se repetem em versões menores.
