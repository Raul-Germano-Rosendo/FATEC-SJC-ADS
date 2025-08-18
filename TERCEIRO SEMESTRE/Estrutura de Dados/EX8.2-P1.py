def pell(n):
    if n == 0: return 0
    a, b = 0, 1
    k = 2
    while k <= n:
        a, b = b, 2*b+a
        k = k + 1
    return b
