#Lista
#listas são coleções mutáveis (podem ser alteradas)
#sao criadas com [] ou list()

#criando listas 
numeros = [5, 2, 8, 1]
nomes = ["ANA", "JOAO", "PEDRO"]
misturando = [1, "Python", 3.14]

#acessando os elementos (indice comeca no 0)
print(numeros[0]) # vai sair 5
print(numeros[-1]) # sairá o ultimo, 1

#alterando valor
numeros[-1] = 10 #agora a variavel numeros fica -> 5, 10, 8, 1


#Principais métodos
#Método                 #Exemplo                    #Resultado
#.append(x)             lista.append(5)             Adiciona ao final
#.insert(i, x)          lista.insert(1, 9)          Insere na posição (i)
#.pop()                 lista.pop()                 Remove o último
#.remove(x)             lista.remove(8)             Remove o VALOR 8
#.sort()                lista.sort()                Ordena Crescente
#.sort(reverse=True)    lista.sort(reverse=True)    Ordena Decrescente
#.reverse()             lista.reverse()             Inverte a Ordem
#len(lista)             len(numeros)                Retorna o Tamanho da Lista


#List Comprehension
#forma rapida e bonitinha de criar listas(em uma linha)

#exemplo: lista normal
numeros = [1, 2, 3, 4, 5]
quadrados = [x ** 2 for x in numeros]
print(quadrados) # 1, 4, 9, 16, 25

#filtrando numeros pares
pares = [x for x in numeros if x % 2 == 0]
impares = [x for x in numeros if x % 2 == 1]
print(pares) # 2, 4
print(impares) # 1, 3, 5



#Dicionarios dict
#dicionarios armazenam (tuplas) pares, no caso -> chave:valor
#criadas com {} ou dict().

#criando um dicionario
aluno = {"nome": "ANA", "idade": 20, "curso": "ADS"}

#acessando valores
print(aluno["nome"]) # ANA
print(aluno.get("idade")) # 20

#alterando valores
aluno["idade"] = 21

#adicionando novas chaves
aluno["nota"] = 9.5


#Principais métodos
#Método                 #Exemplo                    #Resultado
#.keys()                aluno.keys()                Retorna todas as Chaves
#.values()              aluno.values()              Retorna todos os Valores
#.items()               aluno.items()               Retorna os pares (chave, valor)
#.pop(chave)            aluno.pop("curso")          Remove a chave
#.get(chave)            aluno.get("nome")           Retorna o valor da Chave

#percorrendo um dict
for chave, valor in aluno.items():
    print(chave, ":", valor)
# nome : ANA
# idade : 21
# curso : ADS
# nota : 9.5


#sort() com key=
#o parametro key= define com base em que a lista será ordenada

#Exemplos com Números
numeros = [5, 2, 8, 1]
numeros.sort(key=lambda x: x)   #Ordena de forma Crescente
print(numeros) # [1, 2, 5, 8]

#Exemplo com strings
nomes = ["Ana", "joão", "Pedro"]
nomes.sort(key=str.lower)       #ignora maiusculas/minusculas

#Ordenando dicionarios ; lista de dicionarios
alunos = [
    {"nome": "Ana", "nota": 9},
    {"nome": "Pedro", "nota": 7},
    {"nome": "Joao", "nota": 8},
]

#ordenar pela nota
alunos.sort(key=lambda x: x["nota"], reverse=True)
print(alunos)

for a in alunos:
    print(a["nome"], "-", a["nota"])
# ANA - 9
# JOAO - 8
# PEDRO - 7


#pequenos exercicios para fixacao
# 1)Pegar apenas os pares

numeros = [1,2,3,4,5,6,7,8,9,10]
pares = [x for x in numeros if x % 2 == 0]
print(pares)


#2)Ordenar os pares ao contrário

pares.sort(reverse=True)
print(pares)


#3)Criar dicionário de quadrados
quadrados = {x: x**2 for x in pares}
print(quadrados)    #   {10: 100, 8: 64, 6: 36, 4: 16, 2: 4}


# Resumo rápido para lembrar:
# Listas → coleção mutável → []
# List Comprehension → [x for x in lista if condição]
# Dicionários → pares chave:valor → {}
# sort(key=) → ordena personalizado
# lambda → função anônima → lambda x: x["nota"]








#resumo explicado dos 16 exercícios de treino do Prof. Masanori

    #1 Mostrar apenas os números pares usando list comprehension

#lista de inteiros
numeros = [1,2,3,4,5,6,7,8,9,10]

#Pegando apenas os pares com list comprehension
pares = [x for x in numeros if x % 2 == 0]
print(pares)

# Aprendizado:
# Nesse exercício, aprendemos a filtrar elementos de uma lista usando list comprehension.
# A expressão [n for n in lista if condição] é uma forma compacta de criar listas.



    #2 Lista com quadrados dos números pares de 1 a 20

quadrados_pares = [n**2 for n in range(1, 21) if n % 2 == 0]
print(quadrados_pares)

# Aprendizado:
# Reforçamos que podemos usar list comprehension com range() e aplicar operações 
# matemáticas diretamente no corpo da expressão.


    #3 Ordenar lista de palavras pelo tamanho (sorted + key=)

palavras = ["python", "java", "c", "javascript", "go"]

#ordenando pelo tamanho da palavra
ordenado = sorted(palavras, key=len)
print(ordenado) #['c', 'go', 'java', 'python', 'javascript']

# Aprendizado:
# O parâmetro key= do sorted() define como a lista será ordenada.
# Aqui usamos key=len para ordenar pelo tamanho das palavras.

    #4 Ordenar palavras pelo número de vogais

palavras = ["cachorro", "gato", "passaro", "elefante"]

# Contar vogais e ordenar pela quantidade
ordenado = sorted(palavras, key=lambda x: sum(1 for c in x if c in "aeiou"))
print(ordenado) #['gato', 'cachorro', 'passaro', 'elefante']

# Aprendizado:
# Aprendemos a usar lambda para criar uma função dentro do sorted().
# Aqui, contamos as vogais e usamos essa contagem como critério de ordenação.


    #5 Ordenar palavras pelo último caractere
palavras = ["casa", "bola", "carro", "tijolo"]

# ordenando pelo ultimo caractere de cada palavra
ordenado = sorted(palavras, key = lambda x: x[-1])
print(ordenado) #['casa', 'bola', 'carro', 'tijolo']

# Aprendizado:
# Vimos que x[-1] pega o último caractere da string e podemos usar isso para ordenar.


    #6 Alternar maiúsculas e minúsculas em uma string
texto = "python"

#Alterar maiusculas e minusculas
alternado = "".join([c.upper() if i % 2 == 0 else c.lower() for i, c in enumerate(texto)])
print(alternado) #PyThOn


# Aprendizado:
# Usamos enumerate() para pegar o índice e o caractere ao mesmo tempo.
# Se o índice for par, deixamos maiúsculo; se for ímpar, minúsculo.


    #7 Ordenar lista de strings com números pelo número dentro delas
lista = ["a3b", "z12y", "c1x"]

# Ordenando pelo numero presente na string
ordenado = sorted(lista, key=lambda x: int("".join([y for y in x if y.isdigit()])))
print(ordenado) #['c1x', 'a3b', 'z12y']


# Aprendizado:
# Aprendemos a extrair números de strings usando list comprehension e isdigit().
# Depois convertemos para int e usamos no key=.


    #8 Criar dicionário com números de 1 a 10 mapeando para seus quadrados

quadrados = {x: x ** 2 for x in range(1, 11)}
print(quadrados) #{1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81, 10: 100}


# Aprendizado:
# Aqui usamos dict comprehension: {chave: valor for x in iterável}.



    #9 Contagem de caracteres em uma string
texto = "banana"

#criando um dict com contagem de caracteres
contagem = {c: texto.count(c) for c in set(texto)}
print(contagem) #{'n': 2, 'b': 1, 'a': 3}

# Aprendizado:
# Aprendemos que set() elimina repetições e str.count() conta ocorrências.


    #10 Inverter chaves e valores de um dicionário
d = {"a": 1, "b": 2, "c": 3}
invertido = {v: k for k, v in d.items()}
print(invertido) #{1: 'a', 2: 'b', 3: 'c'}


# dict.items() retorna pares (chave, valor).
# Podemos inverter facilmente com dict comprehension.


    #11 Filtrar dicionário por valores maiores que um número
d ={"a": 5, "b": 2, "c": 8}
filtro4= {k: v for k, v in d.items() if v > 4}
print(filtro4) #{'a': 5, 'c': 8}

# Aprendizado:
# Aqui usamos um if dentro do dict comprehension para filtrar dados.


    #12 Ordenar dicionário pelos valores
d = {"a": 3, "b": 1, "c": 2}
ordenado = dict(sorted(d.items(), key=lambda x: x[1]))
print(ordenado)

# Aprendizado:
# Usamos sorted() em d.items() e key=lambda x: x[1] para ordenar pelos valores.


    #13 Ordenar dicionário pelo tamanho das chaves
d = {"python": 1, "java": 2, "c": 3}
ordenado = dict(sorted(d.items(), key=lambda x: len(x[0])))
print(ordenado) #{'c': 3, 'java': 2, 'python': 1}


# Aprendizado:
# Podemos usar len(x[0]) para ordenar pelo tamanho da chave.


    #14 Contagem de palavras em um frase
frase = "o rato rato roeu a roupa do rei de roma"
palavras = frase.split()

contagem = {p: palavras.count(p) for p in set(palavras)}
print(contagem) #{'roma': 1, 'rei': 1, 'o': 1, 'roeu': 1, 'de': 1, 'a': 1, 'rato': 2, 'roupa': 1, 'do': 1}


# Aprendizado:
# Reforçamos o uso de split() para separar palavras e set() para evitar repetições.



    #15 Criar dicionário com raízes quadradas dos valores
d = {"a": 4, "b": 9, "c": 16}

import math
raizes = {k: math.sqrt(v) for k, v in d.items()}
print(raizes) #{'a': 2.0, 'b': 3.0, 'c': 4.0}

# Aprendizado:
# Usamos o módulo math para calcular a raiz quadrada e aplicamos dict comprehension.


    #16 Criar dicionário com a primeira letra como chave
lista = 'cax abe b13 c23 arr d12'.split()

dicionario = {}
for palavra in lista:
    letra = palavra[0]
    dicionario.setdefault(letra, []).append(palavra)

print(dicionario) #{'c': ['cax', 'c23'], 'a': ['abe', 'arr'], 'b': ['b13'], 'd': ['d12']}


#Se você chegou até aqui, PARABÉNS!!! 🥳... você escolheu se aprimorar, e levar o estalinho!!