# Dada a lista nomes = 'eufrasia zara carla'.split(), escreva um codigo que mostre os nomes em ordem de tamanho.

nomes = 'eufrasia zara carla'.split()

def tamanho(nome):
    return len(nome)


#ordenando com funcao
nomes_ordenados = sorted(nomes, key=tamanho)
print(nomes_ordenados)

#se quiser inverter a ordem (nomes, key=tamanho, reverse=True)

