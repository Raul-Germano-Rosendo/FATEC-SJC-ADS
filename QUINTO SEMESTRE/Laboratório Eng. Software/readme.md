# Prof. Juan Hassam - Laboratório de Engenharia de Software

    - Engenharia de Requisitos
    
    "A parte mais dificil de construir um sistema de software é decidir precisamente o que construir.
    Nenhuma outra parte do trabalho conceitual é dificil(...) e nenhuma outra parte é tão propensa a danificar o sistema final se for feita incorretamente"
        The Mythical Man-Month

### Requisitos de Usuário
pedido do cliente, declarações em linguagem natural acompanhadas de diagramas.


### Requisitos de Sistema
Um documento detalhado que define as descrições precisa e detalhadas das funções, serviços e restrições operacionais do sistema de software.

## Técnicas de Elicitação
- Entrevistas e Questinários
- Workshops & Brainstorms
- Observação de Campo (Shadowing)
- Arqueologia de Sistemas

## Análise & Modelagem
- Modelagem UML
- Histórias do Usuário
- Negociação


# Requisitos Funcionais (RF)
Definição: Descrevem o comportamento do software e o que o sistema deve fornecer como serviço direto ao usuário. ("se não tiver, o sistema não funciona")
Exemplo(Gerenciador de tarefas): "O sistema deve permitir a movimentação de tarefas entre colunas do quadro kanban via Drag-and-Drop
Exemplo(Sistema de Delivery): "A aplicação deve calcular a taxa de entrega em tempo real usando a API de geolocalização"

# Requisito Não-Funcional (RNF)
Definição: Atributo de qualidade ou Restrição

Desempenho: A API REST deve processar requisições em menos de 200 milisegundos.
Segurança: Toda persistência em banco de dados relacional deve encriptar dados sensíveis de Usuários em trânsito.
Restrição: O sistema deve ser implementado em Java. A arquitetura deve ser baseada em Microserviços

## Validação & Gerenciamento
    Como validar? 
    Evite contruir a coisa errada por meio da prototipagem rápida e testes de aceitação orientados por requisitos.
    Revisões sistémicas de requisitos com desenvolvedores e clientesprevine problemas de ambiguidade que custam caro se detectados tardiamente em fase de homologação.

    Gestão de Mudanças
    Os requisitos mudam à medida que o entendimento do cliente sobre o problema evolui.
    A equipe de desenvolvimento deve aplicar o controle de versão de requisitos.