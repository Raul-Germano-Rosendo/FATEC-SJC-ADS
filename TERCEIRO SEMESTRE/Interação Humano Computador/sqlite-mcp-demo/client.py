import sqlite3
from server import add_data, read_data, init_db

def inserir_usuario(nome: str, email: str):
    """Adiciona um usuário usando a ferramenta add_data."""
    # Verifica se já existe o e-mail
    usuarios = read_data(f"SELECT id FROM usuarios WHERE email = '{email}'")
    if usuarios:
        print(f"⚠️ O e-mail '{email}' já está cadastrado!")
        return

    query = f"INSERT INTO usuarios(nome, email) VALUES('{nome}', '{email}')"
    resultado = add_data(query)
    if resultado:
        print(f"✅ Usuário '{nome}' adicionado com sucesso!")
    else:
        print(f"⚠️ Erro ao adicionar o usuário '{nome}'.")


def listar_usuarios():
    """Lista todos os usuários usando a ferramenta read_data."""
    usuarios = read_data("SELECT id, nome, email FROM usuarios")
    if not usuarios:
        print("⚠️ Nenhum usuário encontrado.")
        return
    print("\n📄 Lista de usuários:")
    for usuario in usuarios:
        print(f"ID: {usuario[0]} | Nome: {usuario[1]} | Email: {usuario[2]}")

if __name__ == "__main__":
    # Inicializa o banco caso não exista
    init_db()

    print("=== Sistema de Gerenciamento de Usuários ===")
    print("1 - Inserir usuários fixos e listar")
    print("2 - Inserir usuários dinamicamente")
    escolha = input("Escolha uma opção: ")

    if escolha == "1":
        # Insere usuários fixos
        inserir_usuario("Alice", "alice@email.com")
        inserir_usuario("Bruno", "bruno@email.com")
        inserir_usuario("Carla", "carla@email.com")
        listar_usuarios()

    elif escolha == "2":
        # Modo interativo
        while True:
            nome = input("Digite o nome do usuário (ou 'sair' para encerrar): ")
            if nome.lower() == "sair":
                break
            email = input("Digite o e-mail do usuário: ")
            inserir_usuario(nome, email)
            listar_usuarios()

    else:
        print("⚠️ Opção inválida! Encerrando o programa.")
