-- Pergunta 1: Exibir o valor total dos apartamentos cadastrados na imobiliária
SELECT SUM(valor) AS valor_total_apartamentos
FROM apartamento;

-- Pergunta 2: Calcule o valor médio dos apartamentos localizados no condomínio código 1
SELECT AVG(valor) AS valor_medio_cond_1
FROM apartamento
WHERE codigo_cond = 1;

-- Pergunta 3: Apresente o número de apartamentos por tipo
SELECT tipo, COUNT(*) AS quantidade
FROM apartamento
GROUP BY tipo;

-- Pergunta 4: Mostrar o número de apartamentos existentes por condomínio
SELECT codigo_cond, COUNT(*) AS total_apartamentos
FROM apartamento
GROUP BY codigo_cond;

-- Pergunta 5: Liste apartamentos que tenham mais de uma garagem
SELECT numero_ap, COUNT(*) AS qtd_garagens
FROM garagem
GROUP BY numero_ap
HAVING COUNT(*) > 1;

-- Pergunta 6: Liste os apartamentos cujo valor esteja entre R$ 120.000 e R$ 230.000
SELECT * 
FROM apartamento
WHERE valor BETWEEN 120000 AND 230000;

-- Pergunta 7: Procure proprietários cujo nome contenha a palavra "smith"
SELECT * 
FROM proprietario
WHERE nome LIKE '%smith%';

-- Pergunta 8: Liste os apartamentos que são do tipo padrão ou cobertura
SELECT * 
FROM apartamento
WHERE tipo IN ('padrão', 'cobertura');

-- Pergunta 9: Liste todos os apartamentos que não são do tipo "padrão"
SELECT * 
FROM apartamento
WHERE tipo <> 'padrão';

-- Pergunta 10: Mostrar o número do apartamento, tipo, valor e o nome do condomínio
SELECT a.numero, a.tipo, a.valor, c.nome AS nome_condominio
FROM apartamento a
JOIN condominio c ON a.codigo_cond = c.codigo;

-- Pergunta 11: Liste o nome do proprietário, o número do apartamento e o valor deste apartamento
SELECT p.nome, a.numero, a.valor
FROM proprietario p
JOIN proprietario_apartamento pa ON p.rg = pa.rg_prop
JOIN apartamento a ON pa.numero_ap = a.numero;

-- Pergunta 12: Mostrar o nome de cada gerente (síndico) e o número total de apartamentos que estão sob sua responsabilidade
SELECT s.nome AS sindico, COUNT(a.numero) AS total_apartamentos
FROM sindico s
JOIN condominio c ON s.matricula = c.matricula_sind
JOIN apartamento a ON c.codigo = a.codigo_cond
GROUP BY s.nome;

-- Pergunta 13: Liste os apartamentos que não possuem garagem associada
SELECT a.numero
FROM apartamento a
LEFT JOIN garagem g ON a.numero = g.numero_ap
WHERE g.numero_ap IS NULL;

-- Pergunta 14: Apresente o nome dos proprietários que possuem mais de um apartamento
SELECT p.nome, COUNT(*) AS qtd_apartamentos
FROM proprietario p
JOIN proprietario_apartamento pa ON p.rg = pa.rg_prop
GROUP BY p.nome
HAVING COUNT(*) > 1;

-- Pergunta 15: Calcule o valor médio dos apartamentos, agrupando por tipologia
SELECT tipo, AVG(valor) AS valor_medio
FROM apartamento
GROUP BY tipo;
