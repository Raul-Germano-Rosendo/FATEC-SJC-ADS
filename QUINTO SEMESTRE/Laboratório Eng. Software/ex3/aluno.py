class Aluno:
    def __init__(self, nome, notas):
        self.__nome = nome
        self.__notas = notas

    @property
    def nome(self):
        return self.__nome

    @property
    def notas(self):
        return self.__notas.copy()

    def calcular_media(self):
        if not self.__notas:
            return 0.0

        return sum(self.__notas) / len(self.__notas)