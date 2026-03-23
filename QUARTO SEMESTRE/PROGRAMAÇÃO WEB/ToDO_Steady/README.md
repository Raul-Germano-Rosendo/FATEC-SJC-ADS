# Steady - To-Do List Kanban

Uma aplicação web moderna de gerenciamento de tarefas no estilo Kanban, desenvolvida com HTML5, CSS3 e JavaScript puro.

## 🚀 Funcionalidades

- **Quadro Kanban** com 3 colunas: A Fazer, Em Progresso, Concluído
- **Criar, editar e excluir tarefas**
- **Drag and drop** fluido entre colunas
- **Prioridades** (baixa, média, alta) com cores distintas
- **Sistema de tags** para categorização
- **Campos Personalizados**: Adicione campos customizados como links, emails de colaboradores, datas, etc.
- **Links Clicáveis**: Campos detectados como links ou emails são automaticamente clicáveis
- **Sistema de Comentários**: Adicione comentários às tarefas com autor e data
- **Atribuição de Responsáveis**: Atribua tarefas a pessoas específicas
- **Busca por texto** (título, descrição, tags)
- **Filtro por prioridade**
- **Contadores de tarefas** por coluna
- **Persistência local** com localStorage
- **Tema claro e escuro**
- **Exportar/Importar** tarefas em JSON
- **Design responsivo** (desktop e mobile)
- **Animações sutis** e feedback visual

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização moderna com variáveis CSS e gradientes
- **JavaScript ES6+** - Lógica da aplicação
- **SortableJS** - Biblioteca para drag and drop fluido
- **Google Fonts (Inter)** - Tipografia moderna

## 📁 Estrutura do Projeto

```
ToDO_Steady/
├── index.html          # Arquivo principal HTML
├── css/
│   └── style.css       # Estilos CSS
└── js/
    ├── app.js          # Inicialização da aplicação
    ├── task.js         # Classe Task
    ├── kanban.js       # Lógica do quadro Kanban
    ├── storage.js      # Persistência no localStorage
    └── ui.js           # Manipulação da interface
```

## 🏃‍♂️ Como Executar

1. **Clone ou baixe** os arquivos do projeto
2. **Abra o arquivo `index.html`** em qualquer navegador moderno
3. **Pronto!** A aplicação funcionará localmente

Não é necessário servidor web, pois usa apenas recursos do navegador.

## 💬 Sistema de Comentários

O Steady agora inclui um sistema completo de comentários para colaboração:

- **Adicionar comentários** diretamente nas tarefas ou no modal de edição
- **Informações do autor** e data/hora automática
- **Exclusão de comentários** individual com confirmação
- **Toggle de visibilidade** para comentários nas tarefas (ícone de olho)
- **Persistência automática** de todos os comentários no localStorage
- **Compatibilidade** com exportação/importação de dados

## 👥 Atribuição de Tarefas

Atribua responsabilidades claras às suas tarefas:

- **Campo "Atribuído para"** no formulário de criação/edição
- **Exibição visual** do responsável na tarefa com destaque
- **Integração completa** com sistema de exportação/importação
- **Campo opcional** - deixe em branco se não houver responsável definido

## 🔄 Compatibilidade e Migração

- **Backward compatibility** mantida com dados existentes
- **Migração automática** de tarefas antigas para nova estrutura
- **Export/Import** inclui comentários e atribuições
- **Dados preservados** durante atualizações

## 🎨 Arquitetura

A aplicação segue uma arquitetura modular e separada por responsabilidades:

- **Task**: Classe que representa uma tarefa individual
- **KanbanBoard**: Gerencia a lógica do quadro e operações CRUD
- **Storage**: Cuida da persistência de dados no localStorage
- **UI**: Manipula interações com o usuário e DOM
- **App**: Inicializa a aplicação

## 🔧 Principais Componentes

### Drag and Drop
Implementado usando a API nativa do HTML5 Drag and Drop para performance e compatibilidade.

### Tema Dinâmico
Toggle entre tema claro e escuro com persistência no localStorage.

### Filtros e Busca
Busca em tempo real por texto e filtro por prioridade.

### Responsividade
Layout adaptável para dispositivos móveis usando CSS Grid e media queries.

## 📝 Notas de Desenvolvimento

- Código comentado e organizado
- Funções reutilizáveis
- Sem dependências externas
- Performance otimizada
- Acessibilidade básica

## 🎯 Melhorias Futuras

- Compartilhamento de quadros entre usuários
- Notificações em tempo real
- Integração com APIs externas (GitHub, Trello, etc.)
- Modo offline avançado com sincronização
- Relatórios e analytics de produtividade
- Categorias e sub-tarefas
- Lembretes e notificações push
- Integração com calendários externos

---

**Desenvolvido com ❤️ para demonstrar boas práticas de desenvolvimento web moderno.**