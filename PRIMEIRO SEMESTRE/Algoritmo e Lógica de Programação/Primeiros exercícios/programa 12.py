#abaixo de 200 = 20 p/ min
#acima de 200 e abaixo de 400 = 18 p/ min
#acima de 400 = 15 p/ min

minu = float(input("QUANTOS MINUTOS DUROU A LIGAÇÃO: "))
preco_pago = 0
if minu < 200:
    preco_pago = 0.20
    print (f"{minu * preco_pago:.2f}")

elif minu >= 200 and minu <= 400:
    preco_pago = 0.18
    print (f"{minu * preco_pago:.2f}")

else:
    preco_pago = 0.15
    print (f"{minu * preco_pago:.2f}")
