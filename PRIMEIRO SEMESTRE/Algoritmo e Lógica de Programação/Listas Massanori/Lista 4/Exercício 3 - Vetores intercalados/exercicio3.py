import random


vet1 = [random.randint(1,100) for _ in range(10)]
vet2 = [random.randint(1,100) for _ in range(10)]



vet3 = []

for i in range(10):
    vet3.append(vet1[i])
    vet3.append(vet2[i])



print("Primeiro vetor", vet1)
print("Segundo vetor", vet2)
print("Vertores intercalados", vet3)


#Eu sou Feliz, Eu vou aprender mais!
