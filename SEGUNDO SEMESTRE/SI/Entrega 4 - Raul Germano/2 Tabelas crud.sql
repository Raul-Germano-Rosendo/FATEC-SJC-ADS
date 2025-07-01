-- 1. Criação das tabelas

CREATE TABLE cliente (
    id_cliente INT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    cidade VARCHAR(50)
);

CREATE TABLE pedido (
    id_pedido INT PRIMARY KEY,
    id_cliente INT,
    data_pedido DATE,
    valor_total DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

-- 2. Inserção de dados

-- Tabela cliente
INSERT INTO cliente (id_cliente, nome, email, cidade) VALUES
(1, 'Ana Paula', 'ana@gmail.com', 'São Paulo'),
(2, 'Carlos Lima', 'carlos@gmail.com', 'Rio de Janeiro'),
(3, 'Mariana Silva', 'mariana@gmail.com', 'Belo Horizonte');

-- Tabela pedido
INSERT INTO pedido (id_pedido, id_cliente, data_pedido, valor_total) VALUES
(101, 1, '2025-05-01', 250.00),
(102, 1, '2025-05-03', 450.50),
(103, 2, '2025-05-02', 130.00);

-- 3a. Consulta: Liste todos os clientes e seus pedidos

SELECT c.nome, p.id_pedido, p.data_pedido, p.valor_total
FROM cliente c
JOIN pedido p ON c.id_cliente = p.id_cliente;

-- 3b. Consulta: Mostre os clientes que não fizeram pedidos

SELECT nome
FROM cliente
WHERE id_cliente NOT IN (SELECT id_cliente FROM pedido);

-- 3c. Consulta: Calcule o total de compras por cliente

SELECT c.nome, SUM(p.valor_total) AS total_compras
FROM cliente c
JOIN pedido p ON c.id_cliente = p.id_cliente
GROUP BY c.nome;

-- 4. Atualização de dados

-- Atualize o email do cliente “Carlos Lima”
UPDATE cliente
SET email = 'carlos.lima@empresa.com'
WHERE nome = 'Carlos Lima';

-- 5. Exclusão de dados

-- Delete os pedidos do cliente com ID 1 (Ana Paula)
DELETE FROM pedido
WHERE id_cliente = 1;
