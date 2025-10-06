def fat(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * fat(n - 1)


print(fat(5))
