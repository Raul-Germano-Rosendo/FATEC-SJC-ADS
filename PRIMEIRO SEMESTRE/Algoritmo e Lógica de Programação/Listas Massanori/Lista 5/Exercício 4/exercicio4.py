def e_sortudo(num):
    num_str = str(num)
    return '2' in num_str and '7' not in num_str


inicio = 18644
fim = 33087


numeros_sortudos = [num for num in range(inicio, fim + 1) if e_sortudo(num)]

print(len(numeros_sortudos))
