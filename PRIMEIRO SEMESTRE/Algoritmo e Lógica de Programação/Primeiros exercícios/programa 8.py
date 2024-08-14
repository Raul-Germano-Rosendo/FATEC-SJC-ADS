salario = float(input ('Salário: '))
aumento = float(input ('Aumento: '))
novo = salario + salario * aumento / 100
print (f'Novo Salário: {novo:.2f}')
#novo salário com duas casas decimais usando (f'{:.2f}')
