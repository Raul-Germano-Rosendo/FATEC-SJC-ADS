# Loja de Tintas

# Cobertura da tinta: 1 litro para 3 metros quadrados
# Cada lata de tinta contém 18 litros
# Cada lata de tinta custa 80 reais


cobertura_por_lata = 18 * 3  


tamanho_m2 = int(input("Quantos metros quadrados deseja pintar? "))

lata = 0
custo_total = 0

#Calcula o número de latas necessárias e o custo total
while tamanho_m2 > 0:
    lata += 1
    tamanho_m2 -= cobertura_por_lata


custo_total = lata * 80  


print(f"Você precisará de {lata} latas de tinta.")
print(f"O custo total será de R${custo_total:.2f}")
