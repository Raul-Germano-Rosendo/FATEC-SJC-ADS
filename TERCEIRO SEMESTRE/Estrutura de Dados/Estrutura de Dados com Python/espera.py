import time
import math

def espera_linear(n):
    print(f"Iniciando espera linear para n = {n}")
    tempo = n * 0.0001
    time.sleep(tempo)
    print(f"Fim Linear")

def espera_logaritmica(n):
    print(f"Iniciando espera logarítmica para n = {n}")
    tempo = math.log(n, 2) * 0.0001 
    time.sleep(tempo)
    print(f"Fim Log(n, 2)")
