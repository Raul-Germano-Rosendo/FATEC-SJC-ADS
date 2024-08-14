#Escreva um programa que leia a quantidade de dias, horas, minutos e segundos do usuário. Calcule o total em segundos
#
#
#   Dia -> 24 Horas
#   Hora -> 60 Minutos
#   Minuto -> 60 segundos
#
#   Segundos somados
#
#       1 Dia = 86400 segundos
#       1 Hora = 3600 segundos
#       1 Minuto = 60 segundos
#

dia = int(input(" Insira os Dias "))
diasegundo = (((dia*24)*60)*60)
print (diasegundo)
hora = int(input(" Insira as Horas "))
horasegundo =((hora*60)*60)
print (horasegundo)
minuto = int(input(" Insira os Minutos "))
minutosegundo = (minuto*60)
print (minutosegundo)
segundo = int(input(" Insira os Segundos "))
print (segundo)
final = (diasegundo+horasegundo+minutosegundo+segundo)
print (final)

