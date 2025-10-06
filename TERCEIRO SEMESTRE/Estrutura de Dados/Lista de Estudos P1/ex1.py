# Dada a lista nomes = 'eufrasia zara carla'.split(), escreva um codigo que mostre os nomes em ordem de tamanho.

nomes = 'eufrasia zara carla'.split()

def tamanho(nome):
    return len(nome)


#ordenando com funcao
nomes_ordenados = sorted(nomes, key=tamanho)
print(nomes_ordenados)

#se quiser inverter a ordem (nomes, key=tamanho, reverse=True)





# Dado o dicionario alunos = {'ana': 8, 'Kátia': 7, 'júlia: 9'}, escreva um codigo que mostre os alunos em ordem crescente de nota.

alunos = {'ana': 8, 'Kátia': 7, 'Júlia': 9}


#funcao que pega a segunda posicao da tupla, que é a nota
def pegar_nota(nota):
    return nota[1]

# Ordenando
alunos_ordenados = sorted(alunos.items(), key=pegar_nota)
for nome, nota in alunos_ordenados:
    print(nome, nota)
    