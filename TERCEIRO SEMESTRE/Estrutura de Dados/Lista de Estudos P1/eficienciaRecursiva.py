# A funcao recursiva abaixo é eficiente ou nao? Justifique a resposta
# Em seguida, melhore a eficiencia da funcao.


def binomial(n, k):
    if k == 0 or k == n: return 1
    return binomial(n - 1, k - 1) + binomial(n - 1, k)

#Não é eficiente pois nao armazena resultados
#Ele recalcula e encontra resultados ja calculados antes

#para melhorar podemos usar @cache ou listas para armazenarmos os resultados intermediarios


