def contagemRegressiva(n):
    if n <= 0:
        print(n)
        print("FOGO!!!")
        return
    print(n)
    contagemRegressiva(n - 1)

contagemRegressiva(10)
