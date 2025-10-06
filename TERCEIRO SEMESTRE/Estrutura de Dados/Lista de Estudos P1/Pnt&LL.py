#Enunciado:
#Implemente uma função que insere um novo nó no início de uma lista ligada.
#Explique por que a inserção no início é mais eficiente do que no final.



# Cada nó da lista contém um valor e uma "referência" (ponteiro) para o próximo nó
class No:
    def __init__(self, valor):
        self.valor = valor
        self.prox = None


class ListaLigada:
    def __init__(self):
        self.cabeca = None  # início da lista (equivale a um ponteiro para o primeiro nó)

    def inserir_inicio(self, valor):
        novo_no = No(valor)        # cria um novo nó
        novo_no.prox = self.cabeca # o novo nó aponta para o antigo primeiro nó
        self.cabeca = novo_no      # atualiza a cabeça para o novo nó (mudamos o "ponteiro" inicial)

    def exibir(self):
        atual = self.cabeca
        while atual:
            print(atual.valor, end=" -> ")
            atual = atual.prox
        print("None")


# Exemplo de uso:
lista = ListaLigada()
lista.inserir_inicio(30)
lista.inserir_inicio(20)
lista.inserir_inicio(10)
lista.exibir()
# Saída esperada: 10 -> 20 -> 30 -> None




#💡 Explicação:
#Inserir no início é O(1) (constante), pois basta:
#Criar um novo nó
#Apontar ele para o antigo primeiro
#Mudar a cabeça
#Inserir no final seria O(n), pois exigiria percorrer toda a lista para achar o último nó.



#Implemente uma função que remove o primeiro nó que contém um valor específico.

class ListaLigada:
    def __init__(self):
        self.cabeca = None

    def inserir_inicio(self, valor):
        novo_no = No(valor)
        novo_no.prox = self.cabeca
        self.cabeca = novo_no

    def remover(self, valor):
        atual = self.cabeca
        anterior = None

        # percorre até achar o valor desejado
        while atual and atual.valor != valor:
            anterior = atual
            atual = atual.prox

        # se não encontrou o valor
        if not atual:
            print("Valor não encontrado!")
            return

        # se for o primeiro nó
        if anterior is None:
            self.cabeca = atual.prox  # muda o ponteiro da cabeça
        else:
            anterior.prox = atual.prox  # "salta" o nó removido

        print(f"Nó com valor {valor} removido.")

    def exibir(self):
        atual = self.cabeca
        while atual:
            print(atual.valor, end=" -> ")
            atual = atual.prox
        print("None")


# Exemplo de uso:
lista = ListaLigada()
lista.inserir_inicio(30)
lista.inserir_inicio(20)
lista.inserir_inicio(10)
lista.exibir()
lista.remover(20)
lista.exibir()
# Saída esperada:
# 10 -> 20 -> 30 -> None
# Nó com valor 20 removido.
# 10 -> 30 -> None


#💡 Explicação:
#Usamos duas “referências” (como se fossem ponteiros em C):
#atual → aponta para o nó que estamos verificando.
#anterior → aponta para o nó anterior ao atual.
#Quando o nó é encontrado, reajustamos o ponteiro prox do nó anterior, “saltando” o nó a ser removido.
#Isso é análogo ao uso de ponteiros em C, onde ajustaríamos anterior->prox = atual->prox.


# Resumo Conceitual
# 💡 PONTEIROS (em C) ≈ REFERÊNCIAS (em Python)
# - Um ponteiro "aponta" para um endereço de memória.
# - Em listas ligadas, cada nó contém um ponteiro para o próximo.
#
# 💡 LISTAS LIGADAS
# - Permitem inserção e remoção rápidas no início.
# - São dinâmicas: o tamanho pode crescer sem realocação.
# - Cada nó é alocado separadamente e ligado via ponteiros.
