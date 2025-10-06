# Definindo o grafo com cidades e conexões
grafo = {
    'São Paulo': ['Rio de Janeiro', 'Curitiba'],
    'Rio de Janeiro': ['Belo Horizonte', 'Vitória'],
    'Curitiba': ['Florianópolis', 'Porto Alegre'],
    'Belo Horizonte': ['Brasília'],
    'Vitória': [],
    'Florianópolis': [],
    'Porto Alegre': [],
    'Brasília': []
}

# Função de Busca em Profundidade (DFS)
def busca_profundidade(grafo, inicio):
    visitados = []  # Lista para registrar as cidades visitadas
    pilha = [inicio]  # Usamos uma lista como pilha

    while pilha:
        cidade_atual = pilha.pop()  # Remove a cidade do topo da pilha
        
        if cidade_atual not in visitados:  # Visita se ainda não foi visitada
            visitados.append(cidade_atual)
            # Adiciona os vizinhos na pilha para serem visitados, na ordem original
            for vizinho in reversed(grafo[cidade_atual]):
                pilha.append(vizinho)

    return visitados

# Função de Busca em Largura (BFS)
def busca_largura(grafo, inicio):
    visitados = []  # Lista para registrar as cidades visitadas
    fila = [inicio]  # Usamos uma lista como fila

    while fila:
        cidade_atual = fila.pop(0)  # Remove a cidade do início da fila
        
        if cidade_atual not in visitados:  # Visita se ainda não foi visitada
            visitados.append(cidade_atual)
            # Adiciona os vizinhos na fila para serem visitados
            for vizinho in grafo[cidade_atual]:
                fila.append(vizinho)

    return visitados

# Executando o DFS e o BFS a partir de São Paulo
print('Ordem de visita (DFS):', busca_profundidade(grafo, 'São Paulo'))
print('Ordem de visita (BFS):', busca_largura(grafo, 'São Paulo'))
