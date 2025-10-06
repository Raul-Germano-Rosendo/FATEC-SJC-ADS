# test_local.py
from server import init_db, add_data, read_data

def main():
    init_db()
    # Limpe e insira alguns dados de exemplo
    add_data("DELETE FROM people")
    add_data("INSERT INTO people(name, age) VALUES('Alice', 25)")
    add_data("INSERT INTO people(name, age) VALUES('Bruno', 31)")
    add_data("INSERT INTO people(name, age) VALUES('Carla', 19)")

    # Leia e mostre
    rows = read_data("SELECT id, name, age FROM people ORDER BY id")
    print("📄 Conteúdo da tabela 'people':")
    for r in rows:
        print(r)

if __name__ == '__main__':
    main()
