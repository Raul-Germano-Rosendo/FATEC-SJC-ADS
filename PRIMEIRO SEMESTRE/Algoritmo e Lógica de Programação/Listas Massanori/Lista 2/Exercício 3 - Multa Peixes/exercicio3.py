carga_kilo = float(input("Quantos quilos João pescou hoje? "))
multa_diaria_kilos = (carga_kilo - 50.0)
multa_diaria_reais = (multa_diaria_kilos * 4)

if (carga_kilo > 50.0):
    print(f"João terá que pagar para o Leão da Receita Federal o total de R${multa_diaria_reais}")
else:
    print("João escapou das garras do Leão da Receita Federal")
    
