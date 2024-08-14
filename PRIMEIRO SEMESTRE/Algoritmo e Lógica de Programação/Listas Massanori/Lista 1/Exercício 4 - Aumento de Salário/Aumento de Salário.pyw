#Faça um programa que calcule o aumento de um salário.
#Ele deve solicitar o valor do salário e a porcentagem do aumento.
#Exiba o valor do aumento e do novo salário
#
#   valor do salário + Porcentagem
#   exibir a Porcentagem
#   exibir o novo salário
#

salarioatual=float(input(" Insira o salário atual "))
aumento=float(input(" Insira a porcentagem de Aumento "))
salarioaumento=(salarioatual*aumento)/100
print ((" Este é seu Aumento "),"R$",salarioaumento)
print (("Este é seu salário pós aumento "),salarioaumento+salarioatual)
