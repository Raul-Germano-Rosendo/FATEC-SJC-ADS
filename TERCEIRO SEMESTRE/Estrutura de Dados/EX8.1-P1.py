def fibo(n):
    a, b = 1, 1
    k = 2
    while k <= n:
        a, b = b, a + b
        k = k + 1
    return b
