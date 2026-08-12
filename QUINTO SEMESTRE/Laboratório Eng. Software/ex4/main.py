from pedido import Pedido


pedido = Pedido("João")

print("Cliente:", pedido.cliente)
print("Status:", pedido.status)

pedido.alterar_status("Processando")

print("Novo status:", pedido.status)

pedido.alterar_status("Enviado")

print("Novo status:", pedido.status)

pedido.alterar_status("Entregue")

print("Novo status:", pedido.status)