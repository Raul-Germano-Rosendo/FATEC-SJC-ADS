# server.py
# Servidor MCP simples expondo duas ferramentas SQLite: add_data e read_data.

# Fallback: se sqlite3 padrão não estiver disponível, usa pysqlite3-binary
try:
    import sqlite3  # padrão do Python
except Exception:
    import pysqlite3 as sqlite3  # fallback com a mesma API

from mcp.server.fastmcp import FastMCP

DB_PATH = "demo.db"

mcp = FastMCP("sqlite-demo")


def init_db() -> None:
    """Cria a tabela 'usuarios' caso não exista."""
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()



@mcp.tool()
def add_data(query: str) -> bool:
    """
    Executa uma query de escrita (ex.: INSERT/UPDATE/DELETE).
    Exemplo:
      add_data("INSERT INTO people(name, age) VALUES('Raul', 23)")
    """
    conn = sqlite3.connect(DB_PATH)
    try:
        conn.execute(query)
        conn.commit()
        return True
    finally:
        conn.close()


@mcp.tool()
def read_data(query: str = "SELECT id, name, age FROM people") -> list:
    """
    Executa uma query SELECT e retorna todos os registros como lista de tuplas.
    Exemplo:
      read_data("SELECT * FROM people WHERE age >= 18")
    """
    conn = sqlite3.connect(DB_PATH)
    try:
        rows = conn.execute(query).fetchall()
        return rows
    finally:
        conn.close()


if __name__ == "__main__":
    # Inicializa o banco e inicia o servidor MCP
    init_db()
    print("🚀 Servidor MCP iniciado (sqlite-demo). Aguardando cliente MCP...")
    mcp.run()
