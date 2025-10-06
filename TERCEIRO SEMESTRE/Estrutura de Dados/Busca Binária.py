from random import randint
secreta = randint(1, 1000)
while True:
    chute = int(input('Chute: '))
    if chute == secreta:
        print(f'Acertou o Número {secreta}')
        break
    else:
        print('Alto' if chute > secreta else 'Baixo')
print('final do jogo')