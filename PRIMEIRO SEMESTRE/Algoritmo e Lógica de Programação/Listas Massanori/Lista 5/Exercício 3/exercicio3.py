contagem = 0

for num in range(1067, 3627):
    if num % 2 == 0 and num  % 7 == 0:
        contagem += 1

print(contagem)
