# Algoritmo para Folha de Pagamento - Hotel

## Passos do Algoritmo

1. **Ler os dados do funcionário**
   - Leia `código` (inteiro)
   - Leia `horas_trabalhadas` (inteiro)
   - Leia `turno` (caractere: 'M', 'V' ou 'N')
   - Leia `categoria` (caractere: 'F' ou 'G')
   - Leia `salario_minimo` (real)

2. **Calcular o valor da hora trabalhada conforme a tabela**
   - Se `categoria` = 'G' (Gerente):
     - Se `turno` = 'M' ou 'V':  
       `valor_hora` = 0.04 × `salario_minimo`
     - Se `turno` = 'N':  
       `valor_hora` = 0.05 × `salario_minimo`
   - Senão (`categoria` = 'F', Funcionário):
     - Se `turno` = 'M' ou 'V':  
       `valor_hora` = 0.02 × `salario_minimo`
     - Se `turno` = 'N':  
       `valor_hora` = 0.03 × `salario_minimo`

3. **Calcular salário inicial**
   - `salario_inicial` = `valor_hora` × `horas_trabalhadas`

4. **Calcular auxílio-alimentação conforme o salário inicial**
   - Se `salario_inicial` ≤ 800:  
     `aux_alimentacao` = `salario_inicial` × 0.25
   - Senão se `salario_inicial` ≤ 1200:  
     `aux_alimentacao` = `salario_inicial` × 0.20
   - Senão:  
     `aux_alimentacao` = `salario_inicial` × 0.15

5. **Calcular salário final**
   - `salario_final` = `salario_inicial` + `aux_alimentacao`

6. **Imprimir os resultados**
   - Escreva "Código do funcionário: ", `código`
   - Escreva "Horas trabalhadas: ", `horas_trabalhadas`
   - Escreva "Valor da hora trabalhada: R$ ", `valor_hora`
   - Escreva "Salário inicial: R$ ", `salario_inicial`
   - Escreva "Auxílio alimentação: R$ ", `aux_alimentacao`
   - Escreva "Salário final: