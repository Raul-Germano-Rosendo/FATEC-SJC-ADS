#Calcule o tempo de uma viagem de carro.
#Pergunte a distância a percorrer e a velocidade média esperada para a viagem.
#
#   -   Variável Distância
#       -   Variável Velocidade Média
#       -   1 hora = 60 minutos
#
#
#
#
#
#


distancia=int(input(" Distância a percorrer "))
velmedia=int(input(" Insira a Velocidade Média "))
tempoviagem=(distancia/velmedia)
print ("O tempo de sua Viagem será",(tempoviagem),("Horas"), "À", (velmedia), ("Km/h"))
