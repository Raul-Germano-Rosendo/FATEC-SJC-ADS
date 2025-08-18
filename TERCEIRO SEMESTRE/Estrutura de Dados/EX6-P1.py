##6) Preocupado com os gastos mensais de energia em sua casa, você irá criar um
##programa em Python. A cada mês, o consumo base é de 120 kWh. Um novo aparelho
##comprado aumenta o consumo mensal em 10 kWh (de forma cumulativa e permanente).
##Sua família pretende comprar um novo aparelho a cada 3 meses. Faça um programa
##que calcule após quantos meses o consumo de um único mês ultrapassará 240 kWh,
##e imprima esse mês e o consumo atingido. (Observação: 10 kWh/mês é uma média
##realista para pequenos eletrodomésticos ou eletrônicos.)


base = 120
trimestre = 0
while base <= 240:
    trimestre = trimestre + 1
    base = base + 10
print(trimestre*3, base)
