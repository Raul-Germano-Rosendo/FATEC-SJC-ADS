class Pedido:
    def __init__(self, cliente):
        self.__cliente = cliente
        self.__status = "Pendente"

    @property
    def cliente(self):
        return self.__cliente

    @property
    def status(self):
        return self.__status

    def alterar_status(self, novo_status):
        status_validos = [
            "Pendente",
            "Processando",
            "Enviado",
            "Entregue",
            "Cancelado"
        ]

        if novo_status not in status_validos:
            raise ValueError("Status inválido.")

        self.__status = novo_status