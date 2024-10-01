vel = int(input("Velocidade do Carro: "))


if vel > 110:
    exce = 5*(vel - 110)
    print(f"Sua multa é de R${exce:.2f}")

#vel exce * 5

