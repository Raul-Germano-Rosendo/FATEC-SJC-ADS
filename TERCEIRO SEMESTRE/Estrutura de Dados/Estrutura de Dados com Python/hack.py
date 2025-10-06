import itertools
import string
import time
import random
import requests

# Alfabeto: letras minúsculas
letras = string.ascii_lowercase

# Senha verdadeira (escondida)
palavras = requests.get('https://www.ime.usp.br/~pf/dicios/br-sem-acentos.txt').text.split()
senha_correta = random.choice(palavras)
senha_correta = senha_correta.lower()

# Gerar todas combinações possíveis 
tentativas = itertools.product(letras, repeat=len(senha_correta))

# Para dar efeito de 'filme', vamos acelerar e pausar aleatoriamente
for tentativa in tentativas:
    tentativa_str = ''.join(tentativa)
    
    # Exibir como se fosse num terminal 'cool'
    print(f"Hackeando: {tentativa_str}", end='\n', flush=True)
    
    # Pausa aleatória para dar um efeito mais humano (de 0.001 a 0.01 segundos)
    time.sleep(random.uniform(0.001, 0.01))
    
    if tentativa_str == senha_correta:
        print(f"\n🔥 Senha encontrada: {tentativa_str} 🔥")
        break
