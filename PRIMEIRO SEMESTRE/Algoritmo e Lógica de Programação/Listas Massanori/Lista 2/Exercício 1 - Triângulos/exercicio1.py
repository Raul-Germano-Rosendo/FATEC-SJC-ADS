#Faça um Programa que peça os três lados de um triângulo. O programa deverá informar se os valores podem ser
#um triângulo. Indique, caso os lados formem um triângulo, se o mesmo é: equilátero, isósceles ou escaleno.




lado1 = float(input("Digite o valor do primeiro lado: "))
lado2 = float(input("Digite o valor do segundo lado: "))
lado3 = float(input("Digite o valor do terceiro lado: "))

if lado1 + lado2 > lado3 and lado1 + lado3 > lado2 and lado2 + lado3 > lado1:
    print("Os valores inseridos podem formar um triângulo.")
    
    resp = input("Deseja continuar? s/n: ").lower()
    
    if resp == "s":
        pass  # Como você quer continuar, 'pass' mantém o fluxo do programa
    else:
        quit()  # Use quit() ou exit() para sair do programa

    if lado1 == lado2 == lado3:
        print("Este é um triângulo equilátero.")
    elif lado1 == lado2 or lado1 == lado3 or lado2 == lado3:
        print("Este é um triângulo isósceles.")
    else:
        print("Este é um triângulo escaleno.")
else:
    print("Os valores inseridos não podem formar um triângulo.")

    
