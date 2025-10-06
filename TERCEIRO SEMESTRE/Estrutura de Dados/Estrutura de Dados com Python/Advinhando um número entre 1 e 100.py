from random import randint
sorteado = randint (1, 10000)
while True:
    chute = int(input ('Chute um número: '))
    if chute == sorteado:
        print ('Você venceu!')
        break
    else:
        print ('Alto' if chute > sorteado else 'Baixo')

