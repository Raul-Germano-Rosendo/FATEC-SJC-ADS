t = 1

while t <= 10:  
    t2 = 1  # Reinicia t2 para 1 em cada nova iteração do loop externo
    while t2 <= 10:
        print(f"{t} * {t2} = {t * t2}")-
        t2 = t2 + 1
    t = t + 1
