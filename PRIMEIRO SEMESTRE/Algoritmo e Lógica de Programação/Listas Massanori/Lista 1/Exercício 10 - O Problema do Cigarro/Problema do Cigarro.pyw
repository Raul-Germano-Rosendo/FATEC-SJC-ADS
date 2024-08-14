#Escreva um programa para calcular a redução do tempo de vida de um fumante.
#Pergunte a quantidade de cigarros fumados por dia e quantos anos ele já fumou.
#Considere que um fumante perde 10 minutos de vida a cada cigarro,
#calcule quantos dias de vida um fumante perderá. Exiba o total de dias
#
#       -Variáveis
#       -1 dia = 1440 min
#       -vidaperdida = 10min*cgrpd
#       -cgrpd (cigarro por dia)
#       -anosfumando
#       -diasperdidos
#
cgrpd = float(input(" Quantos cigarros por dia você fuma? "))
anosfumando = float(input(" À Quantos anos você fuma? "))
anoperdido = (anosfumando*365)
minperdidos = (cgrpd*10)*anoperdido
diasperdidos = (minperdidos/60)/24
print (f'{diasperdidos:.1f} Dias de Vida Perdidos ')

print (" Fodeu ")


#Codigo Prof. Massanori

#q_cig = int(input('Por favor, insira a quantidade de cigarros fumados por dia: '))
#q_ano = int(input('Agora insira a quantidade em anos que vocÃª Ã© fumante: '))
#t_dias = q_ano * 365
#t_cig = q_cig * t_dias
#perda_vida = t_cig / 144
#print(f'VocÃª perdeu {perda_vida:.1f} dia/s da sua vida. ')
