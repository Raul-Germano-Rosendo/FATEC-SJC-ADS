-- 1. nome da pessoa do empréstimo de número 1
SELECT p.pes_nome
FROM pessoa p
JOIN emprestimo e ON p.pes_cod = e.pes_cod
WHERE e.emp_cod = 1;

-- 2. todas as editoras em ordem alfabética
SELECT *
FROM editora
ORDER BY edi_descricao;

-- 3. títulos dos livros que começam com A
SELECT liv_titulo
FROM livro
WHERE liv_titulo LIKE 'A%';

-- 4. títulos que começam com A e ano > 2013
SELECT liv_titulo
FROM livro
WHERE liv_titulo LIKE 'A%'
AND liv_ano > 2013;

-- 5. Quantidade de telefones com DDD 12
SELECT COUNT(*) AS quantidade
FROM telefone
WHERE tel_ddd = 12;

-- 6. Quantidade de empréstimos por aluno
SELECT a.pes_nro_matricula, COUNT(e.emp_cod) AS quantidade
FROM aluno a
JOIN emprestimo e ON a.pes_cod = e.pes_cod
GROUP BY a.pes_nro_matricula;

-- 7. editoras e seus livros
SELECT ed.edi_cod, ed.edi_descricao, l.liv_cod
FROM editora ed
JOIN livro l ON ed.edi_cod = l.edi_cod;

-- 8. exemplares e descrição do empréstimo em uma data específica
SELECT ex.exe_cod, l.liv_titulo, e.emp_data
FROM exemplar ex
JOIN item_emprestimo ie ON ex.exe_cod = ie.exe_cod
JOIN emprestimo e ON ie.emp_cod = e.emp_cod
JOIN livro l ON ex.liv_cod = l.liv_cod
WHERE e.emp_data = '2015-11-03';

-- 9. livro com mais de 3 exemplares
SELECT l.liv_titulo
FROM livro l
JOIN exemplar e ON l.liv_cod = e.liv_cod
GROUP BY l.liv_cod
HAVING COUNT(e.exe_cod) > 3;

-- 10. Professores com seus telefones (incluindo sem telefone)
SELECT p.pes_nome, pr.titulacao, t.tel_numero
FROM professor pr
JOIN pessoa p ON pr.pes_cod = p.pes_cod
LEFT JOIN telefone t ON p.pes_cod = t.pes_cod;

-- 11. livro mais antigo
SELECT liv_titulo
FROM livro
WHERE liv_ano = (SELECT MIN(liv_ano) FROM livro);

-- 12. pessoa que mais emprestou livros
SELECT p.pes_nome
FROM pessoa p
JOIN emprestimo e ON p.pes_cod = e.pes_cod
GROUP BY p.pes_nome
ORDER BY COUNT(e.emp_cod) DESC
LIMIT 1;

-- 13. quantidade de exemplares por livro
SELECT l.liv_titulo, COUNT(e.exe_cod) AS quantidade
FROM livro l
JOIN exemplar e HAVING ON l.liv_cod = e.liv_cod
GROUP BY l.liv_titulo;

-- 14. livros com A e ano > 2011
SELECT liv_titulo
FROM livro
WHERE liv_titulo LIKE 'A%'
AND liv_ano > 2011;

-- 15. livros emprestados pela pessoa de código 1
SELECT DISTINCT l.liv_titulo
FROM livro l
JOIN exemplar ex ON l.liv_cod = ex.liv_cod
JOIN item_emprestimo ie ON ex.exe_cod = ie.exe_cod
JOIN emprestimo e ON ie.emp_cod = e.emp_cod
WHERE e.pes_cod = 1;

-- 16. +7 consultas extras (usando UNION simulando FULL OUTER JOIN)

-- 16.1 Pessoas e telefones (incluindo quem não tem)
SELECT p.pes_nome, t.tel_numero
FROM pessoa p
LEFT JOIN telefone t ON p.pes_cod = t.pes_cod

UNION

SELECT p.pes_nome, t.tel_numero
FROM telefone t
LEFT JOIN pessoa p ON p.pes_cod = t.pes_cod;

-- 16.2 Livros e editoras (incluindo sem relação)
SELECT l.liv_titulo, e.edi_descricao
FROM livro l
LEFT JOIN editora e ON l.edi_cod = e.edi_cod

UNION

SELECT l.liv_titulo, e.edi_descricao
FROM editora e
LEFT JOIN livro l ON l.edi_cod = e.edi_cod;

-- 16.3 Alunos e empréstimos
SELECT a.pes_nro_matricula, e.emp_cod
FROM aluno a
LEFT JOIN emprestimo e ON a.pes_cod = e.pes_cod

UNION

SELECT a.pes_nro_matricula, e.emp_cod
FROM emprestimo e
LEFT JOIN aluno a ON a.pes_cod = e.pes_cod;

-- 16.4 Livros e exemplares
SELECT l.liv_titulo, e.exe_cod
FROM livro l
LEFT JOIN exemplar e ON l.liv_cod = e.liv_cod

UNION

SELECT l.liv_titulo, e.exe_cod
FROM exemplar e
LEFT JOIN livro l ON l.liv_cod = e.liv_cod;

-- 16.5 Professores e telefones
SELECT p.pes_nome, t.tel_numero
FROM professor pr
JOIN pessoa p ON pr.pes_cod = p.pes_cod
LEFT JOIN telefone t ON p.pes_cod = t.pes_cod

UNION

SELECT p.pes_nome, t.tel_numero
FROM telefone t
LEFT JOIN pessoa p ON p.pes_cod = t.pes_cod;

-- 16.6 Empréstimos e devoluções
SELECT e.emp_cod, d.dev_cod
FROM emprestimo e
LEFT JOIN devolucao d ON e.emp_cod = d.emp_cod

UNION

SELECT e.emp_cod, d.dev_cod
FROM devolucao d
LEFT JOIN emprestimo e ON e.emp_cod = d.emp_cod;

-- 16.7 Pessoas e empréstimos
SELECT p.pes_nome, e.emp_cod
FROM pessoa p
LEFT JOIN emprestimo e ON p.pes_cod = e.pes_cod

UNION

SELECT p.pes_nome, e.emp_cod
FROM emprestimo e
LEFT JOIN pessoa p ON p.pes_cod = e.pes_cod;