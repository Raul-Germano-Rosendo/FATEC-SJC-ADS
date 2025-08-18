import sqlite3
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("sqlite-demo")

@mcp.tool()
def add_data(query: str) -> bool:
    """Execute an INSERT query to add a record."""
    conn = sqlite3.connect("demo.db")
    conn.execute(query)
    conn.commit()
    conn.close()
    return True

@mcp.tool()
def read_data(query: str = "SELECT * FROM people") -> list:
    """Execute a SELECT query and return all records."""
    conn = sqlite3.connect("demo.db")
    results = conn.execute(query).fetchall()
    conn.close()
    return results

if __name__ == "__main__":
    print("🚀 Starting server...")
    mcp.run()   # inicia o servidor MCP
