# CRUD Mundo — Manual do Usuário (FATEC SJC)

Aplicação web para gerenciar **Países**, **Cidades** e **Continentes**, além de **consultar clima** de uma cidade (usando latitude/longitude).

- Os dados são salvos no navegador via **IndexedDB**.
- O clima é consultado gratuitamente via **Open-Meteo**.
- É possível buscar automaticamente **latitude/longitude** de uma cidade via **Open-Meteo Geocoding API**.

---

## 1) Tela inicial e navegação

No topo da página há abas:

- **Países**: cadastrar, listar, editar e excluir países.
- **Cidades**: cadastrar, listar, editar e excluir cidades.
- **Continentes**: cadastrar e listar continentes (com seed de dados).
- **Clima**: consultar o clima usando cidades com lat/lng cadastradas ou coordenadas manuais.

---

## 2) Como usar a aba “Países”

### 2.1) Cadastrar país
1. Preencha:
   - Nome do país
   - Código ISO (2 letras)
   - Continente
   - Capital
   - População
   - Área (km²)
   - Moeda
2. Clique em **“💾 Salvar País”**.

### 2.2) Buscar via API (opcional)
1. Preencha apenas o campo **Nome do País**.
2. Clique em **“🔍 Buscar via API”**.
3. A aplicação preenche automaticamente campos como capital, população, área e moeda (quando disponível).

### 2.3) Editar e excluir
- **✏️ Editar**: abre modal para alteração.
- **🗑️ Excluir**: remove o país.
  - Observação: cidades vinculadas ao país ficam com o campo de país vazio (dependendo do seu uso). 

---

## 3) Como usar a aba “Continentes”

### 3.1) Cadastrar continente
1. Preencha:
   - Nome
   - Área (km²)
   - População
   - Países (quantidade)
   - Notas
2. Clique em **“💾 Salvar Continente”**.

### 3.2) Preencher padrão (seed)
- Clique em **“🌍 Preencher padrão”** para inserir os 7 continentes automaticamente (se ainda não existirem no navegador).

---

## 4) Como usar a aba “Cidades”

### 4.1) Cadastrar cidade
1. Preencha:
   - Nome da cidade
   - País
   - População
   - Latitude (c-lat)
   - Longitude (c-lng)
   - Tipo (capital / metrópole / cidade / município)
2. Clique em **“💾 Salvar Cidade”**.

### 4.2) Buscar cidade via API (automático)
No formulário de **Cadastrar Cidade**, use o botão:

- **“🔍 Buscar cidade via API”**

Ao clicar:
1. A aplicação lê o texto do campo **`c-nome`**.
2. Consulta a **Open-Meteo Geocoding API**.
3. Preenche automaticamente:
   - **`c-nome`** (nome normalizado)
   - **`c-lat`** (latitude)
   - **`c-lng`** (longitude)
   - **`c-pais`** (apenas se o país retornado existir exatamente no seu select de países)
4. Revise os campos e clique em **“💾 Salvar Cidade”**.

> Dica: se a cidade não for encontrada, tente outro nome ou inclua cidade + país (ex: “Paris França”).

### 4.3) Editar e excluir
- **✏️ Editar**: abre modal para alteração.
- **🗑️ Excluir**: remove a cidade.

---

## 5) Como usar a aba “Clima”

### 5.1) Consultar via seleção
1. No campo **“Selecionar Cidade”**, escolha uma cidade cadastrada que tenha **lat/lng**.
2. A consulta acontece automaticamente ao selecionar.

### 5.2) Consultar manualmente
1. Preencha:
   - Latitude (**cl-lat**)
   - Longitude (**cl-lng**)
2. Clique em **“🌡️ Ver Clima”**.

### 5.3) O que é exibido
- Clima atual (condição e temperatura)
- Umidade, vento e cobertura de nuvens
- Previsão para 7 dias
- Histórico das consultas realizadas

---

## 6) Como executar

1. Abra o arquivo **`CrudMundo.html`** no navegador.
2. Se algum recurso não carregar corretamente, use um **Live Server** (por exemplo, a extensão do VSCode) para evitar bloqueios.

---

## 7) Endpoints usados (referência)

- **Geocoding (cidade)**
  - `https://geocoding-api.open-meteo.com/v1/search?name={nome}&count=5&language=pt&format=json`

- **Clima (forecast)**
  - `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current=...&daily=...&timezone=auto&forecast_days=7`

