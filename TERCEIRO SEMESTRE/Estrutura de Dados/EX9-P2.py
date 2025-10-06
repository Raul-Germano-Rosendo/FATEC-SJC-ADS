def soma_duplas(nums):
    soma = 0
    for n in nums:
        if nums.count(n) == 2:
            soma += n
    return sum(n for n in set(nums) if nums.count(n) == 2)


print(soma_duplas([1, 2, 2, 5, 3, 3, 3, 4, 4]))  # 6
print(soma_duplas([1, 2, 1, 2, 3]))              # 3
print(soma_duplas([]))                           # 0


def soma_duplas(nums):
    duplas = []
    for k in range(10): #pego todos os números
        if nums.cont(2) == 2:
            if k not in duplas: #para não incluir varias vezes
                duplas.append(k)
    return sum(duplas)
