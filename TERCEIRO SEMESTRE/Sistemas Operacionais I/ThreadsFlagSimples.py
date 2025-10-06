import threading
import time
import random

#Variável de trava (flag simples)
lock = False
lock_owner = None 
lock_mutex = threading.Lock()  

# Região simulada
def regiao_critica(thread_id):
    global lock, lock_owner

    # fica rodando até a trava ficar livre
    while True:
        with lock_mutex:
            if not lock:
                lock = True
                lock_owner = thread_id
                break  # Sai do loop e entra na região crítica

    #Região crítica
    print(f"➡️ Thread {thread_id} entrou na região crítica")
    time.sleep(random.uniform(0.5, 1.5))  # Simula trabalho
    print(f"⬅️ Thread {thread_id} saiu da região crítica")

    #Libera o lock
    with lock_mutex:
        lock = False
        lock_owner = None

#Função que cada thread executa
def tarefa(thread_id):
    print(f"Thread {thread_id} iniciada")
    time.sleep(random.uniform(0.1, 1))  # Pequeno atraso para simular concorrência
    regiao_critica(thread_id)


if __name__ == "__main__":
    print("------- Início do Programa -------\n")

    threads = []
    n_threads = 10

    #Cria as threads
    for i in range(n_threads):
        t = threading.Thread(target=tarefa, args=(i,))
        threads.append(t)
        t.start()

    #Espera todas terminarem
    for t in threads:
        t.join()

    print("\n------- Fim do Programa -------")
