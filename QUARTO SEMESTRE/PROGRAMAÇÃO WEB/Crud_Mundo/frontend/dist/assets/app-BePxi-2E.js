(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();let N;const H="CrudMundo",D=1;function q(){window.setPage=_,window.salvarContinente=U,window.deletarContinente=G,window.editarContinente=J,window.salvarEditContinente=V,window.seedContinentes=W,window.salvarPais=K,window.deletarPais=Q,window.editarPais=X,window.salvarEditPais=Y,window.buscarPaisAPI=Z,window.salvarCidade=te,window.deletarCidade=ae,window.editarCidade=ne,window.salvarEditCidade=oe,window.buscarCidadeAPI=ie,window.climaCidade=j,window.consultarClima=de,window.consultarClimaSelect=ce,window.openModal=I,window.closeModal=C}async function R(){return new Promise((e,t)=>{const a=indexedDB.open(H,D);a.onupgradeneeded=i=>{const n=i.target.result;n.objectStoreNames.contains("continentes")||n.createObjectStore("continentes",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("paises")||n.createObjectStore("paises",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("cidades")||n.createObjectStore("cidades",{keyPath:"id",autoIncrement:!0})},a.onsuccess=i=>{const n=i.target.result;e(n)},a.onerror=()=>t(a.error)})}function g(){if(!N)throw new Error("DB not initialized");return N}function p(e){return new Promise((t,a)=>{const n=g().transaction(e,"readonly").objectStore(e).getAll();n.onsuccess=()=>t(n.result),n.onerror=()=>a(n.error)})}function B(e,t){return new Promise((a,i)=>{const o=g().transaction(e,"readonly").objectStore(e).get(t);o.onsuccess=()=>a(o.result),o.onerror=()=>i(o.error)})}function L(e,t){return new Promise((a,i)=>{const o=g().transaction(e,"readwrite").objectStore(e).put(t);o.onsuccess=()=>a(o.result),o.onerror=()=>i(o.error)})}function x(e,t){return new Promise((a,i)=>{const o=g().transaction(e,"readwrite").objectStore(e).add(t);o.onsuccess=()=>a(o.result),o.onerror=()=>i(o.error)})}function M(e,t){return new Promise((a,i)=>{const o=g().transaction(e,"readwrite").objectStore(e).delete(t);o.onsuccess=()=>a(),o.onerror=()=>i(o.error)})}function u(e){if(!e&&e!==0)return"—";const t=Number(e);return t>=1e9?(t/1e9).toFixed(1)+"B":t>=1e6?(t/1e6).toFixed(1)+"M":t>=1e3?t.toLocaleString("pt-BR"):String(t)}function F(e){return!e&&e!==0?"—":Number(e).toLocaleString("pt-BR")}function r(e){var t,a;return((a=(t=document.getElementById(e))==null?void 0:t.value)==null?void 0:a.trim())||""}function d(e,t){const a=document.getElementById(e);a&&(a.value=t??"")}function c(e,t="success"){const a=document.getElementById("toast-area");if(!a)return;const i=document.createElement("div");i.className=`toast toast-${t}`;const n={success:"✅",error:"❌",info:"ℹ️"};i.innerHTML=`<span>${n[t]||"ℹ️"}</span>${e}`,a.appendChild(i),setTimeout(()=>i.remove(),3500)}function _(e){var t,a,i;document.querySelectorAll(".page").forEach(n=>n.classList.remove("active")),document.querySelectorAll(".nav-tab").forEach(n=>n.classList.remove("active")),(t=document.getElementById("form-"+e))==null||t.classList.add("active"),(a=document.getElementById("page-"+e))==null||a.classList.add("active"),(i=document.getElementById("tab-"+e))==null||i.classList.add("active"),e==="paises"&&y(),e==="cidades"&&w(),e==="continentes"&&v(),e==="clima"&&$()}async function U(){const e=r("ct-nome");if(!e){c("Informe o nome do continente","error");return}const t={nome:e,area:Number(r("ct-area")||0),populacao:Number(r("ct-pop")||0),paises:Number(r("ct-paises")||0),notas:r("ct-notas")};await x("continentes",t),["ct-nome","ct-area","ct-pop","ct-paises","ct-notas"].forEach(a=>d(a,"")),c("Continente salvo!"),await v(),await b()}async function G(e){if(!confirm("Excluir este continente?"))return;const t=await p("paises"),a=await B("continentes",e);if(t.some(i=>i.continente===(a==null?void 0:a.nome))){c("Existem países vinculados a este continente!","error");return}await M("continentes",e),c("Continente excluído!","info"),await v(),await b()}function J(e){const t=document.getElementById("modal-content");t&&(t.innerHTML=`
    <div class="modal-title">✏️ Editar Continente</div>
    <div class="form-group"><label>Nome</label><input type="text" id="e-ct-nome" value="${e.nome}"></div>
    <div class="form-group"><label>Área km²</label><input type="number" id="e-ct-area" value="${e.area}"></div>
    <div class="form-group"><label>População</label><input type="number" id="e-ct-pop" value="${e.populacao}"></div>
    <div class="form-group"><label>Qtd. Países</label><input type="number" id="e-ct-paises" value="${e.paises}"></div>
    <div class="form-group"><label>Notas</label><textarea id="e-ct-notas">${e.notas||""}</textarea></div>
    <div class="btn-row">
      <button class="btn btn-primary" onclick="salvarEditContinente(${e.id})">💾 Salvar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `,I())}async function V(e){const t={id:e,nome:r("e-ct-nome"),area:Number(r("e-ct-area")),populacao:Number(r("e-ct-pop")),paises:Number(r("e-ct-paises")),notas:r("e-ct-notas")};await L("continentes",t),C(),c("Continente atualizado!"),await v(),await b()}async function v(){const e=await p("continentes"),t=document.getElementById("tbody-cont");if(t){if(document.getElementById("st-total-cont").textContent=String(e.length),document.getElementById("st-total-cont-pop").textContent=u(e.reduce((a,i)=>a+Number(i.populacao||0),0)),document.getElementById("st-total-cont-area").textContent=u(e.reduce((a,i)=>a+Number(i.area||0),0)),!e.length){t.innerHTML='<tr><td colspan="6"><div class="empty"><div class="empty-icon">🗺️</div><p>Clique em "Preencher padrão" para os 7 continentes.</p></div></td></tr>';return}t.innerHTML=e.map(a=>`
    <tr>
      <td><strong>${a.nome}</strong></td>
      <td>${F(a.area)} km²</td>
      <td>${u(a.populacao)}</td>
      <td><span class="badge badge-green">${a.paises||"—"} países</span></td>
      <td style="max-width:180px;font-size:13px;color:var(--cinza-600)">${a.notas||"—"}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-warning btn-sm" onclick="editarContinente(${JSON.stringify(a).replace(/"/g,'"')})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deletarContinente(${a.id})">🗑️</button>
        </div>
      </td>
    </tr>`).join("")}}async function W(){if((await p("continentes")).length>0){c("Já existem continentes cadastrados!","info");return}const t=[{nome:"América do Sul",area:1784e4,populacao:43426e4,paises:12,notas:"Maior floresta tropical do mundo, o Amazonas."},{nome:"América do Norte",area:24709e3,populacao:597634e3,paises:23,notas:"Terceiro maior continente por área."},{nome:"Europa",area:1053e4,populacao:748e6,paises:44,notas:"Berço da civilização ocidental."},{nome:"África",area:3037e4,populacao:1460481772,paises:54,notas:"Continente com maior número de países."},{nome:"Ásia",area:44579e3,populacao:4753079727,paises:49,notas:"Maior e mais populoso continente."},{nome:"Oceania",area:86e5,populacao:44491724,paises:14,notas:"Menor continente em população."},{nome:"Antártica",area:142e5,populacao:0,paises:0,notas:"Continente gelado, sem população permanente."}];for(const a of t)await x("continentes",a);c("7 continentes adicionados!"),await v(),await b()}async function b(){const e=await p("continentes"),t=document.getElementById("p-continente");t&&(t.innerHTML='<option value="">-- Selecione --</option>'+e.map(a=>`<option value="${a.nome}">${a.nome}</option>`).join(""))}async function K(){const e=r("p-nome");if(!e){c("Informe o nome do país","error");return}const t={nome:e,codigo:r("p-codigo").toUpperCase(),continente:r("p-continente"),capital:r("p-capital"),populacao:Number(r("p-populacao")||0),area:Number(r("p-area")||0),moeda:r("p-moeda")};await x("paises",t),["p-nome","p-codigo","p-capital","p-populacao","p-area","p-moeda"].forEach(a=>d(a,"")),c("País salvo!"),await y(),await z()}async function Q(e){confirm("Excluir este país? As cidades vinculadas ficarão sem país.")&&(await M("paises",e),c("País excluído!","info"),await y(),await z())}function X(e){const t=document.getElementById("modal-content");t&&(t.innerHTML=`
    <div class="modal-title">✏️ Editar País</div>
    <div class="form-group"><label>Nome</label><input type="text" id="e-p-nome" value="${e.nome}"></div>
    <div class="form-group"><label>Código ISO</label><input type="text" id="e-p-codigo" value="${e.codigo}" maxlength="2" style="text-transform:uppercase"></div>
    <div class="form-group"><label>Capital</label><input type="text" id="e-p-capital" value="${e.capital||""}"></div>
    <div class="form-group"><label>População</label><input type="number" id="e-p-pop" value="${e.populacao}"></div>
    <div class="form-group"><label>Área km²</label><input type="number" id="e-p-area" value="${e.area}"></div>
    <div class="form-group"><label>Moeda</label><input type="text" id="e-p-moeda" value="${e.moeda||""}"></div>
    <div class="btn-row">
      <button class="btn btn-primary" onclick="salvarEditPais(${e.id})">💾 Salvar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `,I())}async function Y(e){const t=await B("paises",e);if(!t)return;const a={...t,id:e,nome:r("e-p-nome"),codigo:r("e-p-codigo").toUpperCase(),capital:r("e-p-capital"),populacao:Number(r("e-p-pop")),area:Number(r("e-p-area")),moeda:r("e-p-moeda")};await L("paises",a),C(),c("País atualizado!"),await y()}async function y(){const e=await p("paises"),t=r("busca-pais").toLowerCase(),a=t?e.filter(s=>s.nome.toLowerCase().includes(t)||(s.capital||"").toLowerCase().includes(t)):e,i=document.getElementById("tbody-paises");if(!i)return;const n=e.reduce((s,l)=>s+Number(l.populacao||0),0),o=e.reduce((s,l)=>s+Number(l.area||0),0);if(document.getElementById("st-total-paises").textContent=String(e.length),document.getElementById("st-total-pop").textContent=u(n),document.getElementById("st-total-area").textContent=u(o),!a.length){i.innerHTML=`<tr><td colspan="8"><div class="empty"><div class="empty-icon">${t?"🔎":"🌍"}</div><p>${t?'Nenhum resultado para "'+t+'"':"Nenhum país cadastrado ainda."}</p></div></td></tr>`;return}i.innerHTML=a.map(s=>`
    <tr>
      <td><strong>${s.nome}</strong></td>
      <td><span class="badge badge-gray">${s.codigo||"—"}</span></td>
      <td>${s.continente?`<span class="badge badge-blue">${s.continente}</span>`:"—"}</td>
      <td>${s.capital||"—"}</td>
      <td>${u(s.populacao)}</td>
      <td>${u(s.area)}</td>
      <td style="font-size:13px">${s.moeda||"—"}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-warning btn-sm" onclick="editarPais(${JSON.stringify(s).replace(/"/g,'"')})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deletarPais(${s.id})">🗑️</button>
        </div>
      </td>
    </tr>`).join("")}async function z(){const e=await p("paises");["c-pais"].forEach(t=>{const a=document.getElementById(t);a&&(a.innerHTML='<option value="">-- Selecione --</option>'+e.map(i=>`<option value="${i.nome}">${i.nome}</option>`).join(""))})}async function Z(){var t;const e=r("p-nome");if(!e){c("Informe o nome do país para buscar","error");return}try{c("Buscando dados...","info");const a=await fetch(`http://localhost:3001/api/restcountries?name=${encodeURIComponent(e)}`);if(!a.ok)throw new Error;const n=(await a.json())[0];d("p-nome",n.name.common),d("p-codigo",n.cca2),d("p-capital",((t=n.capital)==null?void 0:t[0])||""),d("p-populacao",n.population||""),d("p-area",n.area||"");const o=Object.values(n.currencies||{})[0];d("p-moeda",o?`${o.name} (${Object.keys(n.currencies)[0]})`:""),c(`Dados de "${n.name.common}" carregados!`)}catch{c("País não encontrado na API","error")}}async function ee(){await z()}async function te(){const e=r("c-nome");if(!e){c("Informe o nome da cidade","error");return}const t={nome:e,pais:r("c-pais"),populacao:Number(r("c-populacao")||0),lat:r("c-lat")?Number(r("c-lat")):null,lng:r("c-lng")?Number(r("c-lng")):null,tipo:r("c-tipo")||"cidade"};await x("cidades",t),["c-nome","c-populacao","c-lat","c-lng"].forEach(a=>d(a,"")),c("Cidade salva!"),await w(),await $()}async function ae(e){confirm("Excluir esta cidade?")&&(await M("cidades",e),c("Cidade excluída!","info"),await w(),await $())}function ne(e){const t=document.getElementById("modal-content");t&&(t.innerHTML=`
    <div class="modal-title">✏️ Editar Cidade</div>
    <div class="form-group"><label>Nome</label><input type="text" id="e-c-nome" value="${e.nome}"></div>
    <div class="form-group"><label>País</label><input type="text" id="e-c-pais" value="${e.pais||""}"></div>
    <div class="form-group"><label>Tipo</label>
      <select id="e-c-tipo">
        <option ${e.tipo==="capital"?"selected":""}>capital</option>
        <option ${e.tipo==="metrópole"?"selected":""}>metrópole</option>
        <option ${e.tipo==="cidade"?"selected":""}>cidade</option>
        <option ${e.tipo==="município"?"selected":""}>município</option>
      </select>
    </div>
    <div class="form-group"><label>População</label><input type="number" id="e-c-pop" value="${e.populacao}"></div>
    <div class="form-group"><label>Latitude</label><input type="number" id="e-c-lat" value="${e.lat||""}" step="any"></div>
    <div class="form-group"><label>Longitude</label><input type="number" id="e-c-lng" value="${e.lng||""}" step="any"></div>
    <div class="btn-row">
      <button class="btn btn-primary" onclick="salvarEditCidade(${e.id})">💾 Salvar</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `,I())}async function oe(e){const t=await B("cidades",e);if(!t)return;const a={...t,id:e,nome:r("e-c-nome"),pais:r("e-c-pais"),tipo:r("e-c-tipo"),populacao:Number(r("e-c-pop")),lat:r("e-c-lat")?Number(r("e-c-lat")):null,lng:r("e-c-lng")?Number(r("e-c-lng")):null};await L("cidades",a),C(),c("Cidade atualizada!"),await w(),await $()}async function w(){const e=await p("cidades"),t=r("busca-cidade").toLowerCase(),a=t?e.filter(o=>o.nome.toLowerCase().includes(t)||(o.pais||"").toLowerCase().includes(t)):e,i=document.getElementById("tbody-cidades");if(!i)return;if(document.getElementById("st-total-cidades").textContent=String(e.length),document.getElementById("st-total-capitais").textContent=String(e.filter(o=>o.tipo==="capital").length),document.getElementById("st-total-metropoles").textContent=String(e.filter(o=>o.tipo==="metrópole").length),!a.length){i.innerHTML=`<tr><td colspan="6"><div class="empty"><div class="empty-icon">${t?"🔎":"🏙️"}</div><p>${t?"Nenhum resultado.":"Nenhuma cidade cadastrada."}</p></div></td></tr>`;return}const n={capital:"badge-green",metrópole:"badge-blue",cidade:"badge-amber",município:"badge-gray"};i.innerHTML=a.map(o=>`
    <tr>
      <td><strong>${o.nome}</strong></td>
      <td>${o.pais||"—"}</td>
      <td><span class="badge ${n[o.tipo]||"badge-gray"}">${o.tipo||"cidade"}</span></td>
      <td>${u(o.populacao)}</td>
      <td style="font-size:12px;color:var(--cinza-600)">${o.lat!=null&&o.lng!=null?`${Number(o.lat).toFixed(4)}, ${Number(o.lng).toFixed(4)}`:"—"}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-warning btn-sm" onclick="editarCidade(${JSON.stringify(o).replace(/"/g,'"')})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deletarCidade(${o.id})">🗑️</button>
          ${o.lat!=null&&o.lng!=null?`<button class="btn btn-secondary btn-sm" onclick="climaCidade(${o.lat},${o.lng},'${o.nome}')">🌡️</button>`:""}
        </div>
      </td>
    </tr>`).join("")}async function ie(){var t;const e=r("c-nome");if(!e){c("Informe o nome da cidade para buscar","error");return}["c-populacao","c-tipo"].forEach(a=>{a!=="c-tipo"&&d(a,"")});try{c("Buscando cidade (geo API)...","info");const a=await fetch(`http://localhost:3001/api/geocoding?name=${encodeURIComponent(e)}`);if(!a.ok)throw new Error("Erro na API de geocoding");const i=await a.json(),n=(t=i==null?void 0:i.results)==null?void 0:t[0];if(!n){c("Cidade não encontrada na API","error");return}const o=n.latitude,s=n.longitude,l=n.name||e;d("c-nome",l),d("c-lat",String(o)),d("c-lng",String(s));const m=n.country;if(m){const h=document.getElementById("c-pais");h&&Array.from(h.options).find(P=>P.value===m)&&d("c-pais",m)}const f=n.population??n.populationEstimate??n.pop;f!=null&&d("c-populacao",String(f)),c(`Coordenadas de "${l}" carregadas!`)}catch{c("Erro ao buscar cidade na API","error")}}const S=[],re={0:"☀️ Céu limpo",1:"🌤️ Principalmente limpo",2:"⛅ Parcialmente nublado",3:"☁️ Nublado",45:"🌫️ Névoa",48:"🌫️ Névoa com geada",51:"🌦️ Garoa leve",53:"🌦️ Garoa moderada",55:"🌧️ Garoa densa",61:"🌧️ Chuva leve",63:"🌧️ Chuva moderada",65:"🌧️ Chuva forte",71:"❄️ Neve leve",73:"❄️ Neve moderada",75:"❄️ Neve forte",80:"🌦️ Chuva leve",81:"🌧️ Chuva moderada",82:"⛈️ Chuva violenta",95:"⛈️ Trovoada",96:"⛈️ Trovoada com granizo",99:"⛈️ Trovoada violenta"};function k(e){return re[e]||"🌡️ Condição "+e}function se(e){return["N","NE","L","SE","S","SO","O","NO"][Math.round(e%360/45)%8]}async function $(){const e=await p("cidades"),t=document.getElementById("cl-cidade");t&&(t.innerHTML='<option value="">-- Selecionar cidade --</option>'+e.filter(a=>a.lat!=null&&a.lng!=null).map(a=>`<option value="${a.lat},${a.lng},${a.nome}">${a.nome} (${a.pais||"?"})</option>`).join(""))}function ce(){const e=document.getElementById("cl-cidade");if(!(e!=null&&e.value))return;const[t,a,i]=e.value.split(",");j(t,a,i)}async function de(){const e=r("cl-lat"),t=r("cl-lng");if(!e||!t){c("Informe latitude e longitude","error");return}await j(e,t,`${e}, ${t}`)}async function j(e,t,a="Local"){_("clima");const i=document.getElementById("clima-result");if(i){i.innerHTML='<div class="card"><div style="text-align:center;padding:2rem;color:var(--cinza-600)"><div style="font-size:36px">⏳</div><p>Consultando clima...</p></div></div>';try{const n=await fetch(`http://localhost:3001/api/clima?lat=${encodeURIComponent(String(e))}&lng=${encodeURIComponent(String(t))}`);if(!n.ok)throw new Error("Erro na API");const o=await n.json(),s=o.current,l=o.daily,m=k(s.weather_code),f=m.split(" ")[0],h=l.time.map((P,E)=>{var A;return`<div style="text-align:center;background:var(--sage-50);border:1px solid var(--sage-200);border-radius:var(--radius);padding:.75rem .5rem;min-width:80px">
        <div style="font-size:11px;color:var(--cinza-600);margin-bottom:.25rem">${new Date(P+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"2-digit"})}</div>
        <div style="font-size:18px">${k(l.weather_code[E]).split(" ")[0]}</div>
        <div style="font-size:13px;font-weight:600;color:var(--verde-800)">${Math.round(l.temperature_2m_max[E])}°</div>
        <div style="font-size:12px;color:var(--cinza-600)">${Math.round(l.temperature_2m_min[E])}°</div>
        <div style="font-size:11px;color:#2d6ea8">${((A=l.precipitation_sum[E])==null?void 0:A.toFixed(1))||0}mm</div>
      </div>`}).join("");i.innerHTML=`
      <div class="card">
        <div class="clima-card">
          <div class="clima-icon">${f}</div>
          <div class="clima-info">
            <div class="clima-temp">${Math.round(s.temperature_2m)}°C</div>
            <div class="clima-city">📍 ${a} · Sensação ${Math.round(s.apparent_temperature)}°C</div>
            <div style="font-size:14px;color:var(--verde-600);margin-top:.25rem">${m.split(" ").slice(1).join(" ")}</div>
          </div>
          <div style="text-align:right">
            <div class="chip" style="margin-bottom:.35rem">💧 ${s.relative_humidity_2m}% umidade</div><br>
            <div class="chip" style="margin-bottom:.35rem">💨 ${Math.round(s.wind_speed_10m)} km/h ${se(s.wind_direction_10m)}</div><br>
            <div class="chip">☁️ ${s.cloud_cover}% nuvens</div>
          </div>
        </div>
        <div style="margin-top:1rem">
          <div style="font-size:13px;font-weight:600;color:var(--cinza-600);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.5px">Previsão 7 dias</div>
          <div style="display:flex;gap:.5rem;overflow-x:auto;padding-bottom:.25rem">${h}</div>
        </div>
      </div>`;const T={nome:a,lat:String(e),lng:String(t),temp:Math.round(s.temperature_2m),desc:m.split(" ").slice(1).join(" "),hora:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})};S.unshift(T),le(),c(`Clima de ${a}: ${Math.round(s.temperature_2m)}°C`)}catch{i.innerHTML='<div class="card"><div class="empty"><div class="empty-icon">❌</div><p>Erro ao consultar a API de clima.<br><small style="color:var(--cinza-600)">Verifique a conexão com a internet.</small></p></div></div>',c("Erro ao consultar API de clima","error")}}}function le(){const e=document.getElementById("historico-clima");if(e){if(!S.length){e.innerHTML='<p style="color:var(--cinza-600);font-size:14px">Nenhuma consulta realizada.</p>';return}e.innerHTML=S.slice(0,10).map(t=>`
    <div class="info-row">
      <span class="info-label">${t.hora}</span>
      <span class="info-val">📍 ${t.nome}</span>
      <span class="chip" style="margin-left:auto">${t.temp}°C · ${t.desc}</span>
    </div>`).join("")}}function I(){var e;(e=document.getElementById("modal"))==null||e.classList.add("open")}function C(){var e;(e=document.getElementById("modal"))==null||e.classList.remove("open")}async function ue(){N=await R(),q(),await b(),await ee(),await $(),await y(),await v(),await w()}var O;(O=document.getElementById("modal"))==null||O.addEventListener("click",e=>{const t=e.target,a=e.currentTarget;t===a&&C()});ue();
