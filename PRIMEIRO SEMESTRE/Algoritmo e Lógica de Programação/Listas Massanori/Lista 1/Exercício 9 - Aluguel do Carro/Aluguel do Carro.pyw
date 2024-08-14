#Escreva um programa que pergunte a quantidade de km percorridos por um carro alugado pelo 
#usuário, assim como a quantidade de dias pelos quais o carro foi alugado.
#Calcule o preço a pagar, sabendo que o carro custa R$ 60,00 por dia e R$ 0,15 por km rodado.
#
#
#
#
#
#


kmpercorrido = float(input(" Kilometros Percorridos "))
quantidadedias = float(input(" Dias Alugados "))
valordistancia = (kmpercorrido*0.15)
valordia = (quantidadedias*60)
valorfinal = (valordistancia+valordia)
print (" Total a Pagar Pelo Aluguel é ", " R$",(valorfinal))
