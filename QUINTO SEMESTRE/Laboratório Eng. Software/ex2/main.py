from ex2.produto import Produto
from ex2.item_pedido import ItemPedido


# Criando produtos
produto1 = Produto("Notebook", 3500.00)
produto2 = Produto("Mouse", 150.00)

# Criando itens do pedido
item1 = ItemPedido(produto1, 2)
item2 = ItemPedido(produto2, 3)

# Exibindo informações
print("=== PEDIDO ===")

print(f"Produto: {item1.produto.nome}")
print(f"Preço: R$ {item1.produto.preco:.2f}")
print(f"Quantidade: {item1.quantidade}")
print(f"Subtotal: R$ {item1.calcular_subtotal():.2f}")

print()

print(f"Produto: {item2.produto.nome}")
print(f"Preço: R$ {item2.produto.preco:.2f}")
print(f"Quantidade: {item2.quantidade}")
print(f"Subtotal: R$ {item2.calcular_subtotal():.2f}")