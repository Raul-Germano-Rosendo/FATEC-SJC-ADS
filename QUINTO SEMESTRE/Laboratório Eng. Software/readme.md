# Prof. Juan Hassam - Laboratório de Engenharia de Software

    - Engenharia de Requisitos
    
    "A parte mais dificil de construir um sistema de software é decidir precisamente o que construir.
    Nenhuma outra parte do trabalho conceitual é dificil(...) e nenhuma outra parte é tão propensa a danificar o sistema final se for feita incorretamente"
        The Mythical Man-Month

### Requisitos de Usuário
pedido do cliente, declarações em linguagem natural acompanhadas de diagramas.

<br>
<br>

### Requisitos de Sistema
Um documento detalhado que define as descrições precisa e detalhadas das funções, serviços e restrições operacionais do sistema de software.

<br>
<br>

## Técnicas de Elicitação
- Entrevistas e Questinários
- Workshops & Brainstorms
- Observação de Campo (Shadowing)
- Arqueologia de Sistemas
- 
<br>
<br>

## Análise & Modelagem
- Modelagem UML
- Histórias do Usuário
- Negociação
- 
<br>
<br>

# Requisitos Funcionais (RF)
Definição: Descrevem o comportamento do software e o que o sistema deve fornecer como serviço direto ao usuário. ("se não tiver, o sistema não funciona")
Exemplo(Gerenciador de tarefas): "O sistema deve permitir a movimentação de tarefas entre colunas do quadro kanban via Drag-and-Drop
Exemplo(Sistema de Delivery): "A aplicação deve calcular a taxa de entrega em tempo real usando a API de geolocalização"

<br>
<br>

# Requisito Não-Funcional (RNF)
Definição: Atributo de qualidade ou Restrição
Desempenho: A API REST deve processar requisições em menos de 200 milisegundos.
Segurança: Toda persistência em banco de dados relacional deve encriptar dados sensíveis de Usuários em trânsito.
Restrição: O sistema deve ser implementado em Java. A arquitetura deve ser baseada em Microserviços

## Validação & Gerenciamento
    Como validar? 
    Evite contruir a coisa errada por meio da prototipagem rápida e testes de aceitação orientados por requisitos.
    Revisões sistémicas de requisitos com desenvolvedores e clientesprevine problemças de ambiguidade que custam caro se detectados tardiamente em fase de homologação.

    Gestão de Mudanças
    Os requisitos mudam à medida que o entendimento do cliente sobre o problema evolui.
    A equipe de desenvolvimento deve aplicar o controle de versão de requisitos.

<br>
<br>

# Arquitetura de Software
É a estrutura organizacional fundamental do sistema. composta por seus elementos, os relacionamentos entre si e com o ambiente.

<br>

## Devemos pensar em 3 principais pilares para a arquitetura.

* Escalabilidade
* Resiliência & Segurança
* Manutenibilidade



### PJe 
    alta carga de dados
    baixa carga de acessos
<img src="src\PJe.jpg">


<br>
<br>
<br>

### SPOF
Single point of failure

### VPC
Virtual private connect

<br>
<br>


# Evolução de Padrôes

Monolito: Aplicação única e unificada
Microservissos: Componentes independentes e distribuídos
Event-Driven & Serverless: Orientada a eventos e sobre demanda

<br>

# Monolito

| Vantagens                                         | Desvantagens                                   |
|---------------------------------------------------|------------------------------------------------|
|Simples de início, desenvolvimento e testes        |Dificuldade de escala                           |
|Facilidade de Deploy (único pacote executável)     |Acoplamento alto com crescimento de código      |
|Baixa latência em chamadas internas de funções     |Risco de falha única (um bug pode derrubar tudo)|
|Mais Simples de depurar e rastrear erros no início |Lento para compilar e fazer novos deploys       |

<br>
<br>

# Microserviços

| Vantagens                                         | Desvantagens                                    |
|---------------------------------------------------|-------------------------------------------------|
|Escalabilidade Independente por serviço.           |Alta Complexidade operacional e de rede          |
|Autonomia de times e tecnologias distintas.        |Desafio na consistência de dados (transações)    |
|Isolamento de falhas (alta tolerância a erros)     |Necessidade de monitoramento distribuido avançado|
|Deploys independentes e frequentes                 |Custo elevado de infraestrutura e governaça      |

<br>
<br>

# Event-Driven & Serverless

| Vantagens                                            | Desvantagens                                      |
|------------------------------------------------------|---------------------------------------------------|
|Extremo desacoplamento baseado em eventos asynchronous|Fluxo de execução difícil de rastrear (Debbuging)  |
|Cobrança estritamente pelo uso (Serverless)           |Possibilidade de "Cold Start" em funções Serverless|
|Alta Capacidade de resposta em tempo real             |Vendor Lock-In com provedores de nuvem             |
|Escalabilidade automática e transparente              |Curva de aprendizado no modelo reativo             |