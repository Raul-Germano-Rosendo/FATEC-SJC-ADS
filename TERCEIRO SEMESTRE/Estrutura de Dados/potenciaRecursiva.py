def pot(base, expoente):
    if expoente == 0:
        return 1
    return base * pot(base, expoente - 1)


print(pot(2, 5))
