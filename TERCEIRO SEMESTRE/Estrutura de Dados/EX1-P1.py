##Escreva uma função chamada maior_menor_que(lista, limite) que receba uma 
##lista de números inteiros e um número limite. A função deve retornar o maior 
##número da lista que seja menor que o limite. Se todos os elementos forem 
##maiores ou iguais ao limite, retorne None. Não use sort ou max. Exemplo: 
##maior_menor_que([10, 20, 30, 40], 35) → 30 e maior_menor_que([50, 60, 70], 40) 
##→ None.


def maiorMenor(lista, limite):
    maior = None  
    for x in lista:
        if x < limite:
            if maior is None or x > maior:
                maior = x
    return maior


##lista = [12,14,16,18,20]
##limite = 13
