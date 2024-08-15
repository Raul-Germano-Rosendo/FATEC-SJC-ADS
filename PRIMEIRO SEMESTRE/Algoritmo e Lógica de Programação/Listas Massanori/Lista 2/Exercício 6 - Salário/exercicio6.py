ganho_hora = float(input("Quantos Reais você ganha por hora trabalhada: "))
hora_mes = int(input("Quantas horas você trabalha por mês: "))

bruto = ganho_hora * hora_mes
print(f"Seu salário bruto é de R${bruto:.2f}")

IR = 0.11 
INSS = 0.08 
sindicaraio = 0.05  

desconto_IR = bruto * IR
desconto_INSS = bruto * INSS
desconto_sindicaraio = bruto * sindicaraio


liquido = bruto - (desconto_IR + desconto_INSS + desconto_sindicaraio)
print(f"Seu salário líquido é de R${liquido:.2f}")

