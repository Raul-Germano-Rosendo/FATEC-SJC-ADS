print("Verifique o Maior de Três números")

num1 = float(input("Insira seu Primeiro Número: "))
num2 = float(input("Insira seu Segundo Número: "))
num3 = float(input("Insira seu Terceiro Número: "))


if (num1 > num2) and (num1 > num3):
    print(f"O número {num1} é maior que {num2} e {num3}")
elif (num2 > num1) and (num2 > num3):
    print(f"O número {num2} é maior que {num1} e {num3}")
elif (num3 > num1) and (num3 > num2):
    print (f"O número {num3} é maior que {num1} e {num2}")

else:
    print("Todos os números são iguais")

