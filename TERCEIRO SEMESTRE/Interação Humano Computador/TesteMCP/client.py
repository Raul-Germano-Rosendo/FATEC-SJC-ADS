import asyncio
from fastmcp import Client

async def main():
    # Usa o próprio script server.py como transporte
    async with Client(["python", "server.py"]) as client:
        # Criar a tabela
        await client.call("add_data", query="""
            CREATE TABLE IF NOT EXISTS people (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                age INTEGER
            )
        """)

        # Inserir alguns registros
        await client.call("add_data", query="INSERT INTO people (name, age) VALUES ('Alice', 25)")
        await client.call("add_data", query="INSERT INTO people (name, age) VALUES ('Bob', 30)")

        # Ler os registros
        result = await client.call("read_data")
        print("📋 Registros no banco:", result)

if __name__ == "__main__":
    asyncio.run(main())
