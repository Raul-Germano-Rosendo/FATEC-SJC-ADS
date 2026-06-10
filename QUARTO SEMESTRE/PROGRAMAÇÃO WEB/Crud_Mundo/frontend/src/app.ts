// app.ts (TypeScript)
// Migração da lógica existente (IndexedDB/UI/APIs) para o frontend.

export {};

declare global {
  interface Window {
    closeModal: () => void;
    openModal: () => void;

    // Expor funções para manter compatibilidade com onclick="..."
    setPage: (p: string) => void;
    salvarContinente: () => Promise<void>;
    editarContinente: (item: any) => void;
    salvarEditContinente: (id: number) => Promise<void>;
    deletarContinente: (id: number) => Promise<void>;

    salvarPais: () => Promise<void>;
    editarPais: (item: any) => void;
    salvarEditPais: (id: number) => Promise<void>;
    deletarPais: (id: number) => Promise<void>;

    salvarCidade: () => Promise<void>;
    editarCidade: (item: any) => void;
    salvarEditCidade: (id: number) => Promise<void>;
    deletarCidade: (id: number) => Promise<void>;

    buscarPaisAPI: () => Promise<void>;
    buscarCidadeAPI: () => Promise<void>;

    consultarClima: () => Promise<void>;
    consultarClimaSelect: () => void;
    climaCidade: (lat: string | number, lng: string | number, nome?: string) => Promise<void>;

    seedContinentes: () => Promise<void>;
    preencherSelectClima: () => Promise<void>;
    renderPaises: () => Promise<void>;
    renderCidades: () => Promise<void>;
    renderContinentes: () => Promise<void>;
  }
}

// ============================================================
// BANCO DE DADOS — IndexedDB
// ============================================================
let db: IDBDatabase;
const DB_NAME = 'CrudMundo', DB_VERSION = 1;

function initDB(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e: any) => {
      const d: IDBDatabase = e.target.result;
      if (!d.objectStoreNames.contains('continentes')) {
        d.createObjectStore('continentes', { keyPath: 'id', autoIncrement: true });
      }
      if (!d.objectStoreNames.contains('paises')) {
        d.createObjectStore('paises', { keyPath: 'id', autoIncrement: true });
      }
      if (!d.objectStoreNames.contains('cidades')) {
        d.createObjectStore('cidades', { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = (e: any) => {
      db = e.target.result;
      res(db);
    };
    req.onerror = () => rej(req.error);
  });
}

function dbAll(store: string): Promise<any[]> {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => res(req.result as any[]);
    req.onerror = () => rej(req.error);
  });
}

function dbGet(store: string, id: number): Promise<any> {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(id);
    req.onsuccess = () => res(req.result as any);
    req.onerror = () => rej(req.error);
  });
}

function dbPut(store: string, item: any): Promise<any> {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(item);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

function dbAdd(store: string, item: any): Promise<any> {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).add(item);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

function dbDel(store: string, id: number): Promise<void> {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(id);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}

// ============================================================
// UTILS
// ============================================================
function fmt(n: any) {
  if (!n && n !== 0) return '—';
  const num = Number(n);
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return num.toLocaleString('pt-BR');
  return String(num);
}

function fmtFull(n: any) {
  if (!n && n !== 0) return '—';
  return Number(n).toLocaleString('pt-BR');
}

function val(id: string) {
  const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
  return (el as any)?.value?.toString?.().trim?.() || '';
}

function setVal(id: string, v: any) {
  const el = document.getElementById(id) as any;
  if (el) el.value = v ?? '';
}

function toast(msg: string, type: 'success' | 'error' | 'info' = 'success') {
  const area = document.getElementById('toast-area')!;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  const icons: Record<string, string> = { success: '✅', error: '❌', info: 'ℹ️' };
  t.innerHTML = `<span>${icons[type] || 'ℹ️'}</span>${msg}`;
  area.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ============================================================
// NAVEGAÇÃO
// ============================================================
function setPage(p: string) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
  document.getElementById('form-' + p)?.classList.add('active');
  document.getElementById('page-' + p)?.classList.add('active');
  document.getElementById('tab-' + p)?.classList.add('active');
  if (p === 'paises') renderPaises();
  if (p === 'cidades') renderCidades();
  if (p === 'continentes') renderContinentes();
  if (p === 'clima') preencherSelectClima();
}

// ============================================================
// CONTINENTES — CRUD
// ============================================================
async function salvarContinente() {
  const nome = val('ct-nome');
  if (!nome) {
    toast('Informe o nome do continente', 'error');
    return;
  }
  const item = {
    nome,
    area: val('ct-area') || 0,
    populacao: val('ct-pop') || 0,
    paises: val('ct-paises') || 0,
    notas: val('ct-notas')
  };
  await dbAdd('continentes', item);
  ['ct-nome', 'ct-area', 'ct-pop', 'ct-paises', 'ct-notas'].forEach(id => setVal(id, ''));
  toast('Continente salvo!');
  await renderContinentes();
  await preencherSelectContinente();
}

async function deletarContinente(id: number) {
  if (!confirm('Excluir este continente?')) return;
  const paises = await dbAll('paises');
  const cont = await dbGet('continentes', id);
  if (paises.some(p => p.continente === cont?.nome)) {
    toast('Existem países vinculados a este continente!', 'error');
    return;
  }
  await dbDel('continentes', id);
  toast('Continente excluído!', 'info');
  await renderContinentes();
  await preencherSelectContinente();
}

function editarContinente(item: any) {
  (document.getElementById('modal-content') as HTMLElement).innerHTML = `
    <div class="modal-title">✏️ Editar Continente</div>
    <div class="form-group"><label>Nome</label><input type="text" id="e-ct-nome" value="${item.nome}"></div>
    <div class="form-group"><label>Área km²</label><input type="number" id="e-ct-area" value="${item.area}"></div>
    <div class="form-group"><label>População</label><input type="number" id="e-ct-pop" value="${item.populacao}"></div>
    <div class="form-group"><label>Qtd. Países</label><input type="number" id="e-ct-paises" value="${item.paises}"></div>
    <div class="form-group"><label>Notas</label><textarea id="e-ct-notas">${item.notas || ''}</textarea></div>
    <div class="btn-row">
      <button class="btn btn-primary" onclick="salvarEditContinente(${item.id})">💾 Salvar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `;
  openModal();
}

async function salvarEditContinente(id: number) {
  const item = {
    id,
    nome: val('e-ct-nome'),
    area: val('e-ct-area'),
    populacao: val('e-ct-pop'),
    paises: val('e-ct-paises'),
    notas: val('e-ct-notas')
  };
  await dbPut('continentes', item);
  closeModal();
  toast('Continente atualizado!');
  await renderContinentes();
  await preencherSelectContinente();
}

async function renderContinentes() {
  const data = await dbAll('continentes');
  const body = document.getElementById('tbody-cont')!;
  (document.getElementById('st-total-cont') as HTMLElement).textContent = String(data.length);
  (document.getElementById('st-total-cont-pop') as HTMLElement).textContent = fmt(
    data.reduce((a, c) => a + Number(c.populacao || 0), 0)
  );
  (document.getElementById('st-total-cont-area') as HTMLElement).textContent = fmt(
    data.reduce((a, c) => a + Number(c.area || 0), 0)
  );

  if (!data.length) {
    body.innerHTML = `<tr><td colspan="6"><div class="empty"><div class="empty-icon">🗺️</div><p>Clique em "Preencher padrão" para os 7 continentes.</p></div></td></tr>`;
    return;
  }

  body.innerHTML = data
    .map(
      (c: any) => `
    <tr>
      <td><strong>${c.nome}</strong></td>
      <td>${fmtFull(c.area)} km²</td>
      <td>${fmt(c.populacao)}</td>
      <td><span class="badge badge-green">${c.paises || '—'} países</span></td>
      <td style="max-width:180px;font-size:13px;color:var(--cinza-600)">${c.notas || '—'}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-warning btn-sm" onclick="editarContinente(${JSON.stringify(c).replace(/"/g, '"')})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deletarContinente(${c.id})">🗑️</button>
        </div>
      </td>
    </tr>`
    )
    .join('');
}

async function seedContinentes() {
  const existing = await dbAll('continentes');
  if (existing.length > 0) {
    toast('Já existem continentes cadastrados!', 'info');
    return;
  }
  const defaults = [
    { nome: 'América do Sul', area: 17840000, populacao: 434260000, paises: 12, notas: 'Maior floresta tropical do mundo, o Amazonas.' },
    { nome: 'América do Norte', area: 24709000, populacao: 597634000, paises: 23, notas: 'Terceiro maior continente por área.' },
    { nome: 'Europa', area: 10530000, populacao: 748000000, paises: 44, notas: 'Berço da civilização ocidental.' },
    { nome: 'África', area: 30370000, populacao: 1460481772, paises: 54, notas: 'Continente com maior número de países.' },
    { nome: 'Ásia', area: 44579000, populacao: 4753079727, paises: 49, notas: 'Maior e mais populoso continente.' },
    { nome: 'Oceania', area: 8600000, populacao: 44491724, paises: 14, notas: 'Menor continente em população.' },
    { nome: 'Antártica', area: 14200000, populacao: 0, paises: 0, notas: 'Continente gelado, sem população permanente.' },
  ];
  for (const d of defaults) await dbAdd('continentes', d);
  toast('7 continentes adicionados!');
  await renderContinentes();
  await preencherSelectContinente();
}

async function preencherSelectContinente() {
  const data = await dbAll('continentes');
  const sel = document.getElementById('p-continente') as HTMLSelectElement;
  sel.innerHTML = '<option value="">-- Selecione --</option>' + data.map((c: any) => `<option value="${c.nome}">${c.nome}</option>`).join('');
}

// ============================================================
// PAÍSES — CRUD
// ============================================================
async function preencherSelectPais() {
  const data = await dbAll('paises');
  const sel = document.getElementById('c-pais') as HTMLSelectElement | null;
  if (!sel) return;
  sel.innerHTML = '<option value="">-- Selecione --</option>' + data.map((p: any) => `<option value="${p.nome}">${p.nome}</option>`).join('');
}

async function salvarPais() {
  const nome = val('p-nome');
  if (!nome) {
    toast('Informe o nome do país', 'error');
    return;
  }
  const item = {
    nome,
    codigo: val('p-codigo').toUpperCase(),
    continente: val('p-continente'),
    capital: val('p-capital'),
    populacao: val('p-populacao') || 0,
    area: val('p-area') || 0,
    moeda: val('p-moeda')
  };
  await dbAdd('paises', item);
  ['p-nome', 'p-codigo', 'p-capital', 'p-populacao', 'p-area', 'p-moeda'].forEach(id => setVal(id, ''));
  toast('País salvo!');
  await renderPaises();
  await preencherSelectPais();
}

async function deletarPais(id: number) {
  if (!confirm('Excluir este país? As cidades vinculadas ficarão sem país.')) return;
  await dbDel('paises', id);
  toast('País excluído!', 'info');
  await renderPaises();
  await preencherSelectPais();
}

function editarPais(item: any) {
  (document.getElementById('modal-content') as HTMLElement).innerHTML = `
    <div class="modal-title">✏️ Editar País</div>
    <div class="form-group"><label>Nome</label><input type="text" id="e-p-nome" value="${item.nome}"></div>
    <div class="form-group"><label>Código ISO</label><input type="text" id="e-p-codigo" value="${item.codigo}" maxlength="2" style="text-transform:uppercase"></div>
    <div class="form-group"><label>Capital</label><input type="text" id="e-p-capital" value="${item.capital || ''}"></div>
    <div class="form-group"><label>População</label><input type="number" id="e-p-pop" value="${item.populacao}"></div>
    <div class="form-group"><label>Área km²</label><input type="number" id="e-p-area" value="${item.area}"></div>
    <div class="form-group"><label>Moeda</label><input type="text" id="e-p-moeda" value="${item.moeda || ''}"></div>
    <div class="btn-row">
      <button class="btn btn-primary" onclick="salvarEditPais(${item.id})">💾 Salvar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `;
  openModal();
}

async function salvarEditPais(id: number) {
  const orig = await dbGet('paises', id);
  const item = {
    ...orig,
    id,
    nome: val('e-p-nome'),
    codigo: val('e-p-codigo').toUpperCase(),
    capital: val('e-p-capital'),
    populacao: val('e-p-pop'),
    area: val('e-p-area'),
    moeda: val('e-p-moeda')
  };
  await dbPut('paises', item);
  closeModal();
  toast('País atualizado!');
  await renderPaises();
}

async function renderPaises() {
  const data = await dbAll('paises');
  const busca = val('busca-pais').toLowerCase();
  const filtrado = busca
    ? data.filter((p: any) => p.nome.toLowerCase().includes(busca) || (p.capital || '').toLowerCase().includes(busca))
    : data;

  const body = document.getElementById('tbody-paises')!;
  const totalPop = data.reduce((a: number, p: any) => a + Number(p.populacao || 0), 0);
  const totalArea = data.reduce((a: number, p: any) => a + Number(p.area || 0), 0);

  (document.getElementById('st-total-paises') as HTMLElement).textContent = String(data.length);
  (document.getElementById('st-total-pop') as HTMLElement).textContent = fmt(totalPop);
  (document.getElementById('st-total-area') as HTMLElement).textContent = fmt(totalArea);

  if (!filtrado.length) {
    body.innerHTML = `<tr><td colspan="8"><div class="empty"><div class="empty-icon">${busca ? '🔎' : '🌍'}</div><p>${busca ? 'Nenhum resultado para "' + busca + '"' : 'Nenhum país cadastrado ainda.'}</p></div></td></tr>`;
    return;
  }

  body.innerHTML = filtrado
    .map(
      (p: any) => `
    <tr>
      <td><strong>${p.nome}</strong></td>
      <td><span class="badge badge-gray">${p.codigo || '—'}</span></td>
      <td>${p.continente ? `<span class="badge badge-blue">${p.continente}</span>` : '—'}</td>
      <td>${p.capital || '—'}</td>
      <td>${fmt(p.populacao)}</td>
      <td>${fmt(p.area)}</td>
      <td style="font-size:13px">${p.moeda || '—'}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-warning btn-sm" onclick="editarPais(${JSON.stringify(p).replace(/"/g, '"')})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deletarPais(${p.id})">🗑️</button>
        </div>
      </td>
    </tr>`
    )
    .join('');
}

// ============================================================
// CIDADES — CRUD
// ============================================================
async function salvarCidade() {
  const nome = val('c-nome');
  if (!nome) {
    toast('Informe o nome da cidade', 'error');
    return;
  }
  const item = {
    nome,
    pais: val('c-pais'),
    populacao: val('c-populacao') || 0,
    lat: val('c-lat') || null,
    lng: val('c-lng') || null,
    tipo: val('c-tipo') || 'cidade'
  };
  await dbAdd('cidades', item);
  ['c-nome', 'c-populacao', 'c-lat', 'c-lng'].forEach(id => setVal(id, ''));
  toast('Cidade salva!');
  await renderCidades();
  await preencherSelectClima();
}

async function deletarCidade(id: number) {
  if (!confirm('Excluir esta cidade?')) return;
  await dbDel('cidades', id);
  toast('Cidade excluída!', 'info');
  await renderCidades();
  await preencherSelectClima();
}

function editarCidade(item: any) {
  (document.getElementById('modal-content') as HTMLElement).innerHTML = `
    <div class="modal-title">✏️ Editar Cidade</div>
    <div class="form-group"><label>Nome</label><input type="text" id="e-c-nome" value="${item.nome}"></div>
    <div class="form-group"><label>País</label><input type="text" id="e-c-pais" value="${item.pais || ''}"></div>
    <div class="form-group"><label>Tipo</label>
      <select id="e-c-tipo">
        <option ${item.tipo === 'capital' ? 'selected' : ''}>capital</option>
        <option ${item.tipo === 'metrópole' ? 'selected' : ''}>metrópole</option>
        <option ${item.tipo === 'cidade' ? 'selected' : ''}>cidade</option>
        <option ${item.tipo === 'município' ? 'selected' : ''}>município</option>
      </select>
    </div>
    <div class="form-group"><label>População</label><input type="number" id="e-c-pop" value="${item.populacao}"></div>
    <div class="form-group"><label>Latitude</label><input type="number" id="e-c-lat" value="${item.lat || ''}" step="any"></div>
    <div class="form-group"><label>Longitude</label><input type="number" id="e-c-lng" value="${item.lng || ''}" step="any"></div>
    <div class="btn-row">
      <button class="btn btn-primary" onclick="salvarEditCidade(${item.id})">💾 Salvar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `;
  openModal();
}

async function salvarEditCidade(id: number) {
  const orig = await dbGet('cidades', id);
  const item = {
    ...orig,
    id,
    nome: val('e-c-nome'),
    pais: val('e-c-pais'),
    tipo: val('e-c-tipo'),
    populacao: val('e-c-pop'),
    lat: val('e-c-lat') || null,
    lng: val('e-c-lng') || null
  };
  await dbPut('cidades', item);
  closeModal();
  toast('Cidade atualizada!');
  await renderCidades();
  await preencherSelectClima();
}

async function renderCidades() {
  const data = await dbAll('cidades');
  const busca = val('busca-cidade').toLowerCase();
  const filtrado = busca
    ? data.filter((c: any) => c.nome.toLowerCase().includes(busca) || (c.pais || '').toLowerCase().includes(busca))
    : data;

  const body = document.getElementById('tbody-cidades')!;
  (document.getElementById('st-total-cidades') as HTMLElement).textContent = String(data.length);
  (document.getElementById('st-total-capitais') as HTMLElement).textContent = String(data.filter((c: any) => c.tipo === 'capital').length);
  (document.getElementById('st-total-metropoles') as HTMLElement).textContent = String(data.filter((c: any) => c.tipo === 'metrópole').length);

  if (!filtrado.length) {
    body.innerHTML = `<tr><td colspan="6"><div class="empty"><div class="empty-icon">${busca ? '🔎' : '🏙️'}</div><p>${busca ? 'Nenhum resultado.' : 'Nenhuma cidade cadastrada.'}</p></div></td></tr>`;
    return;
  }

  const tipoBadge: Record<string, string> = {
    capital: 'badge-green',
    metrópole: 'badge-blue',
    cidade: 'badge-amber',
    município: 'badge-gray'
  };

  body.innerHTML = filtrado
    .map(
      (c: any) => `
    <tr>
      <td><strong>${c.nome}</strong></td>
      <td>${c.pais || '—'}</td>
      <td><span class="badge ${tipoBadge[c.tipo] || 'badge-gray'}">${c.tipo || 'cidade'}</span></td>
      <td>${fmt(c.populacao)}</td>
      <td style="font-size:12px;color:var(--cinza-600)">${c.lat && c.lng ? `${Number(c.lat).toFixed(4)}, ${Number(c.lng).toFixed(4)}` : '—'}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-warning btn-sm" onclick="editarCidade(${JSON.stringify(c).replace(/"/g, '"')})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deletarCidade(${c.id})">🗑️</button>
          ${c.lat && c.lng ? `<button class="btn btn-secondary btn-sm" onclick="climaCidade(${c.lat},${c.lng},'${c.nome}')">🌡️</button>` : ''}
        </div>
      </td>
    </tr>`
    )
    .join('');
}

// ============================================================
// CLIMA + GEOCODING (via backend)
// ============================================================
const historicoClima: any[] = [];

const WMO: Record<number, string> = {
  0: '☀️ Céu limpo',
  1: '🌤️ Principalmente limpo',
  2: '⛅ Parcialmente nublado',
  3: '☁️ Nublado',
  45: '🌫️ Névoa',
  48: '🌫️ Névoa com geada',
  51: '🌦️ Garoa leve',
  53: '🌦️ Garoa moderada',
  55: '🌧️ Garoa densa',
  61: '🌧️ Chuva leve',
  63: '🌧️ Chuva moderada',
  65: '🌧️ Chuva forte',
  71: '❄️ Neve leve',
  73: '❄️ Neve moderada',
  75: '❄️ Neve forte',
  80: '🌦️ Chuva leve',
  81: '🌧️ Chuva moderada',
  82: '⛈️ Chuva violenta',
  95: '⛈️ Trovoada',
  96: '⛈️ Trovoada com granizo',
  99: '⛈️ Trovoada violenta'
};

function wmoDesc(code: number) {
  return WMO[code] || '🌡️ Condição ' + code;
}

function getWindDir(deg: number) {
  const dirs = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
  return dirs[Math.round((deg % 360) / 45) % 8];
}

async function preencherSelectClima() {
  const data = await dbAll('cidades');
  const sel = document.getElementById('cl-cidade') as HTMLSelectElement | null;
  if (!sel) return;

  sel.innerHTML = '<option value="">-- Selecionar cidade --</option>' +
    data
      .filter((c: any) => c.lat && c.lng)
      .map((c: any) => `<option value="${c.lat},${c.lng},${c.nome}">${c.nome} (${c.pais || '?'})</option>`)
      .join('');
}

function consultarClimaSelect() {
  const sel = document.getElementById('cl-cidade') as HTMLSelectElement | null;
  if (!sel || !sel.value) return;
  const [lat, lng, nome] = sel.value.split(',');
  climaCidade(lat, lng, nome);
}

async function consultarClima() {
  const lat = val('cl-lat');
  const lng = val('cl-lng');
  if (!lat || !lng) {
    toast('Informe latitude e longitude', 'error');
    return;
  }
  await climaCidade(lat, lng, `${lat}, ${lng}`);
}

async function climaCidade(lat: string | number, lng: string | number, nome = 'Local') {
  setPage('clima');
  const area = document.getElementById('clima-result')!;
  area.innerHTML = `<div class="card"><div style="text-align:center;padding:2rem;color:var(--cinza-600)"><div style="font-size:36px">⏳</div><p>Consultando clima...</p></div></div>`;

  try {
    const resp = await fetch(`/api/clima?lat=${encodeURIComponent(String(lat))}&lng=${encodeURIComponent(String(lng))}`);
    if (!resp.ok) throw new Error('Erro na API');
    const json = await resp.json();

    const c = json.current;
    const d = json.daily;
    const desc = wmoDesc(c.weather_code);
    const descIcon = desc.split(' ')[0];

    const previsao = d.time
      .map((dt: string, i: number) => {
        const dm = new Date(dt + 'T12:00:00');
        const dia = dm.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
        return `<div style="text-align:center;background:var(--sage-50);border:1px solid var(--sage-200);border-radius:var(--radius);padding:.75rem .5rem;min-width:80px">
        <div style="font-size:11px;color:var(--cinza-600);margin-bottom:.25rem">${dia}</div>
        <div style="font-size:18px">${wmoDesc(d.weather_code[i]).split(' ')[0]}</div>
        <div style="font-size:13px;font-weight:600;color:var(--verde-800)">${Math.round(d.temperature_2m_max[i])}°</div>
        <div style="font-size:12px;color:var(--cinza-600)">${Math.round(d.temperature_2m_min[i])}°</div>
        <div style="font-size:11px;color:#2d6ea8">${d.precipitation_sum[i]?.toFixed(1) || 0}mm</div>
      </div>`;
      })
      .join('');

    area.innerHTML = `
      <div class="card">
        <div class="clima-card">
          <div class="clima-icon">${descIcon}</div>
          <div class="clima-info">
            <div class="clima-temp">${Math.round(c.temperature_2m)}°C</div>
            <div class="clima-city">📍 ${nome} · Sensação ${Math.round(c.apparent_temperature)}°C</div>
            <div style="font-size:14px;color:var(--verde-600);margin-top:.25rem">${desc.split(' ').slice(1).join(' ')}</div>
          </div>
          <div style="text-align:right">
            <div class="chip" style="margin-bottom:.35rem">💧 ${c.relative_humidity_2m}% umidade</div><br>
            <div class="chip" style="margin-bottom:.35rem">💨 ${Math.round(c.wind_speed_10m)} km/h ${getWindDir(c.wind_direction_10m)}</div><br>
            <div class="chip">☁️ ${c.cloud_cover}% nuvens</div>
          </div>
        </div>
        <div style="margin-top:1rem">
          <div style="font-size:13px;font-weight:600;color:var(--cinza-600);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.5px">Previsão 7 dias</div>
          <div style="display:flex;gap:.5rem;overflow-x:auto;padding-bottom:.25rem">${previsao}</div>
        </div>
      </div>`;

    historicoClima.unshift({
      nome,
      lat: String(lat),
      lng: String(lng),
      temp: Math.round(c.temperature_2m),
      desc: desc.split(' ').slice(1).join(' '),
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });

    renderHistorico();
    toast(`Clima de ${nome}: ${Math.round(c.temperature_2m)}°C`);
  } catch (e: any) {
    area.innerHTML = `<div class="card"><div class="empty"><div class="empty-icon">❌</div><p>Erro ao consultar a API de clima.<br><small style="color:var(--cinza-600)">Verifique a conexão com a internet.</small></p></div></div>`;
    toast('Erro ao consultar API de clima', 'error');
  }
}

function renderHistorico() {
  const area = document.getElementById('historico-clima')!;
  if (!historicoClima.length) {
    area.innerHTML = '<p style="color:var(--cinza-600);font-size:14px">Nenhuma consulta realizada.</p>';
    return;
  }
  area.innerHTML = historicoClima
    .slice(0, 10)
    .map(h => `
    <div class="info-row">
      <span class="info-label">${h.hora}</span>
      <span class="info-val">📍 ${h.nome}</span>
      <span class="chip" style="margin-left:auto">${h.temp}°C · ${h.desc}</span>
    </div>`)
    .join('');
}

// ============================================================
// API — País e Cidade via backend
// ============================================================
async function buscarPaisAPI() {
  const nome = val('p-nome');
  if (!nome) {
    toast('Informe o nome do país para buscar', 'error');
    return;
  }

  try {
    toast('Buscando dados...', 'info');
    const resp = await fetch(`/api/restcountries?name=${encodeURIComponent(nome)}`);
    if (!resp.ok) throw new Error();
    const data = await resp.json();
    const p = data[0];

    setVal('p-nome', p.name.common);
    setVal('p-codigo', p.cca2);
    setVal('p-capital', p.capital?.[0] || '');
    setVal('p-populacao', p.population || '');
    setVal('p-area', p.area || '');

    const cur = Object.values(p.currencies || {})[0] as any;
    setVal('p-moeda', cur ? `${cur.name} (${Object.keys(p.currencies)[0]})` : '');

    toast(`Dados de "${p.name.common}" carregados!`);
  } catch {
    toast('País não encontrado na API', 'error');
  }
}

async function buscarCidadeAPI() {
  const nome = val('c-nome');
  if (!nome) {
    toast('Informe o nome da cidade para buscar', 'error');
    return;
  }

  try {
    toast('Buscando cidade (geo API)...', 'info');

    const resp = await fetch(`/api/geocoding?name=${encodeURIComponent(nome)}`);
    if (!resp.ok) throw new Error('Erro na API de geocoding');

    const data = await resp.json();
    const first = data?.results?.[0];
    if (!first) {
      toast('Cidade não encontrada na API', 'error');
      return;
    }

    const lat = first.latitude;
    const lng = first.longitude;
    const displayName = first.name || nome;

    setVal('c-nome', displayName);
    setVal('c-lat', String(lat));
    setVal('c-lng', String(lng));

    const country = first.country;
    if (country) {
      const selPais = document.getElementById('c-pais') as HTMLSelectElement | null;
      if (selPais) {
        const opt = Array.from(selPais.options).find(o => o.value === country);
        if (opt) setVal('c-pais', country);
      }
    }

    toast(`Coordenadas de "${displayName}" carregadas!`);
  } catch {
    toast('Erro ao buscar cidade na API', 'error');
  }
}

// ============================================================
// MODAL
// ============================================================
function openModal() {
  document.getElementById('modal')?.classList.add('open');
}

function closeModal() {
  document.getElementById('modal')?.classList.remove('open');
}

document.getElementById('modal')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

// ============================================================
// INIT
// ============================================================
async function init() {
  await initDB();
  await preencherSelectContinente();
  await preencherSelectPais();
  await preencherSelectClima();
  await renderPaises();
  await renderContinentes();
  await renderCidades();
}

init();

// ============================================================
// Exposição no window (para onclick="..." funcionar)
// ============================================================
window.setPage = setPage;
window.salvarContinente = salvarContinente;
window.deletarContinente = deletarContinente;
window.editarContinente = editarContinente;
window.salvarEditContinente = salvarEditContinente;
window.seedContinentes = seedContinentes;
window.renderContinentes = renderContinentes;
window.renderPaises = renderPaises;
window.renderCidades = renderCidades;

window.salvarPais = salvarPais;
window.deletarPais = deletarPais;
window.editarPais = editarPais;
window.salvarEditPais = salvarEditPais;

window.salvarCidade = salvarCidade;
window.deletarCidade = deletarCidade;
window.editarCidade = editarCidade;
window.salvarEditCidade = salvarEditCidade;

window.buscarPaisAPI = buscarPaisAPI;
window.buscarCidadeAPI = buscarCidadeAPI;

window.consultarClima = consultarClima;
window.consultarClimaSelect = consultarClimaSelect;
window.climaCidade = climaCidade;
window.preencherSelectClima = preencherSelectClima;

window.closeModal = closeModal;
window.openModal = openModal;


