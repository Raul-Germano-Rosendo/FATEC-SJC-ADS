# CLI Catálogo de Filmes

Uma CLI simples para gerenciar um catálogo de filmes, escrita em TypeScript.

## Instalação

1. Clone ou baixe o projeto.
2. Navegue para o diretório do projeto.
3. Instale as dependências: `npm install`
4. Compile o projeto: `npm run build`

## Uso

### Adicionar um filme
```
npx movie-cli add --title "Título do Filme" --director "Diretor" --year 2023 --genre "Gênero"
```

### Listar todos os filmes
```
npx movie-cli list
```

### Buscar filmes
```
npx movie-cli search "termo de busca"
```

### Buscar toodos os Filmes
```
npx movie-cli search ""
```

### Remover um filme
```
npx movie-cli remove <id>
```

## Comandos

- `add`: Adiciona um novo filme ao catálogo.
- `list`: Lista todos os filmes.
- `search`: Busca filmes por título, diretor ou gênero.
- `remove`: Remove um filme pelo ID.

Os filmes são armazenados em um arquivo `movies.json` no diretório raiz do projeto.