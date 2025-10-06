# Definindo o grafo com os tempos de deslocamento
grafo_tempos = {
    'São José dos Campos': {'Taubaté': 35, 'Caraguatatuba': 90},
    'Taubaté': {'Ubatuba': 70},
    'Caraguatatuba': {'Ubatuba': 60},
    'Ubatuba': {}
}

# Definindo o grafo com as distâncias como pesos
grafo_distancias = {
    'São José dos Campos': {'Taubaté': 45, 'Caraguatatuba': 85},
    'Taubaté': {'Ubatuba': 92},
    'Caraguatatuba': {'Ubatuba': 50},
    'Ubatuba': {}
}

G = {
    'A': {'B':4, 'C':2},
    'B': {'A':4, 'C':3, 'D':4},
    'C': {'A':2, 'B':3, 'D':5, 'E':3},
    'D': {'B':4, 'C':5, 'E':3},
    'E': {'C':3, 'D':3}
}

def dijkstra(grafo, inicio, destino):
    # Distâncias iniciais (infinito para todos os nós, exceto o inicial)
    gastos = {no: float('infinity') for no in grafo}
    gastos[inicio] = 0
    
    # Dicionário para armazenar o caminho
    caminho = {}
    
    # Fila de nós a serem visitados (como lista simples)
    fila = [(inicio, 0)]  # Cada item é uma tupla (nó, distância)

    while fila:
        # Ordena a fila para garantir que o nó com a menor distância esteja na frente
        fila.sort(key=lambda x: x[1])
        
        # Pega o nó com a menor distância e remove da fila
        no_atual, gasto_atual = fila.pop(0)
        
        # Se chegarmos ao destino, podemos parar
        if no_atual == destino:
            break

        # Explora vizinhos do nó atual
        for vizinho, metrica in grafo[no_atual].items():
            novo_gasto = gasto_atual + metrica
            if novo_gasto < gastos[vizinho]:
                gastos[vizinho] = novo_gasto
                caminho[vizinho] = no_atual
                # Adiciona o vizinho na fila com a nova distância
                fila.append((vizinho, novo_gasto))
    
    # Reconstruindo o caminho a partir do destino
    print ('Caminho:')
    print (caminho)
    rota = []
    atual = destino
    while atual != inicio:
        rota.append(atual)
        atual = caminho.get(atual)
        if atual is None:
            return 'Não há caminho até o destino.', float('infinity')
    rota.append(inicio)
    rota.reverse()
    
    return rota, gastos[destino]

# Calculando o caminho mais rápido de São José dos Campos até Ubatuba
rota_mais_rapida, tempo_total = dijkstra(grafo_tempos, 'São José dos Campos', 'Ubatuba')
print('Rota mais rápida:', rota_mais_rapida)
print('Tempo total:', tempo_total, 'minutos')

# Calculando a rota mais curta de São José dos Campos até Ubatuba
rota_mais_curta, distancia_total = dijkstra(grafo_distancias, 'São José dos Campos', 'Ubatuba')
print('Rota mais curta:', rota_mais_curta)
print('Distância total:', distancia_total, 'km')

# Calculando o caminho mais curto de 'A' até 'E' no último grafo
rota_curta, distancia = dijkstra(G, 'A', 'E')
print('Rota:', rota_curta)
print('Distância:', distancia)
