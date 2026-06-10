# CRUD Mundo — FATEC SJC

Projeto web (HTML/CSS/JS) com **CRUD de Países, Cidades e Continentes** e **consulta de clima**.

- Dados persistemvia **IndexedDB**.
- Clima é consultado gratuitamente via **Open-Meteo** (sem chave).
- Cidades podem ter **lat/lng buscados automaticamente** via **Open-Meteo Geocoding API**.

---

## Funcionalidades

### 1) Países
- Cadastro e edição de:
  - Nome
  - Código ISO (2 letras)
  - Continente
  - Capital
  - População
  - Área (km²)
  - Moeda
- Listagem com busca local (campo `busca-pais`).
- Excluir país (observação: cidades vinculadas ficam sem país).

### 2) Continentes
- Cadastro e edição de:
  - Nome
  - Área (km²)
  - População
  - Quantidade de países
  - Notas
- Seed de dados padrão com 7 continentes.

### 3) Cidades
- Cadastro e edição de:
  - Nome
  - País (select)
  - População
  - Latitude
  - Longitude
  - Tipo (capital / metrópole / cidade / município)
- Listagem com busca local (campo `busca-cidade`).

#### Busca por cidade via API (lat/lng + população)
No formulário de **Cadastrar Cidade** há o botão:

- **🔍 Buscar cidade via API**

Ao clicar:
1. Lê o texto digitado em **`c-nome`**.
2. Chama a API de geocoding (Open-Meteo):
   - `https://geocoding-api.open-meteo.com/v1/search`
3. Preenche automaticamente:
   - `c-nome` (nome normalizado da API)
   - `c-lat`
   - `c-lng`
   - `c-populacao` (quando disponível no retorno da API)
4. Se o retorno trouxer o país e ele existir no seu select `c-pais`, tenta selecionar automaticamente.

> Dica: após a busca, revise os campos e clique em **💾 Salvar Cidade**.

### 4) Clima
- Consulta por:
  - select de cidades cadastradas com lat/lng, **ou**
  - coordenadas informadas manualmente (`cl-lat` e `cl-lng`).
- A API utilizada:
  - `https://api.open-meteo.com/v1/forecast`
- Exibe:
  - condição atual e temperatura
  - umidade, vento e cobertura de nuvens
  - previsão para 7 dias
- Mantém histórico das consultas na tela.

---

## Como executar

1. Abra o arquivo **`CrudMundo.html`** no navegador.
   - (Por ser uma página estática com JS no próprio HTML, normalmente funciona apenas abrindo.)

2. Se for necessário, use um “Live Server” (VSCode) para evitar bloqueios de recursos/ambiente.

---

## Estrutura do projeto

- `CrudMundo.html`
  - Todo o front-end e lógica (IndexedDB + chamadas de API + UI).
- `style.css`
  - Estilos do layout e componentes.

---

## Observações técnicas

- **IndexedDB**: criação automática das stores na primeira execução.
- **APIs sem chave**:
  - Geocoding: Open-Meteo Geocoding API
  - Clima: Open-Meteo Forecast API
- **Cidades e Clima**: o clima só funciona se houver lat/lng válidos.

---

## API endpoints usados

### Geocoding (cidade)
- `https://geocoding-api.open-meteo.com/v1/search?name={nome}&count=5&language=pt&format=json`

### Clima (forecast)
- `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current=temperature_2m,...&daily=temperature_2m_max,...&timezone=auto&forecast_days=7`

---

## Próximos aprimoramentos (opcional)
- Paginação/virtualização para grandes listas.
- Autocompletar e escolha de múltiplos resultados quando a geocoding retornar várias opções.
- Melhor mapeamento de país (ex: fuzzy match do select `c-pais`).

