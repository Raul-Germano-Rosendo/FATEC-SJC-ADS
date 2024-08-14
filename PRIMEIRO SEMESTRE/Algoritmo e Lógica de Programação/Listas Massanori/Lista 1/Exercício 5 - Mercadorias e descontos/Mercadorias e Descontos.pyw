#Solicite o preço de uma mercadoria e o percentual de desconto.
#Exiba o valor do desconto e o preço a pagar.
#
#       'Porcentagem'=(valor*porcentagem)/100
#
#
#

mercadoria=float(input(" Preço da mercadoria "))
valordesconto=float(input(" Desconto "))
desconto=(mercadoria*valordesconto)/100
print ("R$",desconto)
mercadoriadesconto = mercadoria - desconto
print (" Preço a pagar é ",mercadoriadesconto)
