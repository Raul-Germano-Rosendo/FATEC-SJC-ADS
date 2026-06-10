(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();let v;const O="CrudMundo",_=1;function H(){return new Promise((e,t)=>{const a=indexedDB.open(O,_);a.onupgradeneeded=i=>{const o=i.target.result;o.objectStoreNames.contains("continentes")||o.createObjectStore("continentes",{keyPath:"id",autoIncrement:!0}),o.objectStoreNames.contains("paises")||o.createObjectStore("paises",{keyPath:"id",autoIncrement:!0}),o.objectStoreNames.contains("cidades")||o.createObjectStore("cidades",{keyPath:"id",autoIncrement:!0})},a.onsuccess=i=>{v=i.target.result,e(v)},a.onerror=()=>t(a.error)})}function u(e){return new Promise((t,a)=>{const o=v.transaction(e,"readonly").objectStore(e).getAll();o.onsuccess=()=>t(o.result),o.onerror=()=>a(o.error)})}function S(e,t){return new Promise((a,i)=>{const n=v.transaction(e,"readonly").objectStore(e).get(t);n.onsuccess=()=>a(n.result),n.onerror=()=>i(n.error)})}function L(e,t){return new Promise((a,i)=>{const n=v.transaction(e,"readwrite").objectStore(e).put(t);n.onsuccess=()=>a(n.result),n.onerror=()=>i(n.error)})}function x(e,t){return new Promise((a,i)=>{const n=v.transaction(e,"readwrite").objectStore(e).add(t);n.onsuccess=()=>a(n.result),n.onerror=()=>i(n.error)})}function B(e,t){return new Promise((a,i)=>{const n=v.transaction(e,"readwrite").objectStore(e).delete(t);n.onsuccess=()=>a(),n.onerror=()=>i(n.error)})}function p(e){if(!e&&e!==0)return"—";const t=Number(e);return t>=1e9?(t/1e9).toFixed(1)+"B":t>=1e6?(t/1e6).toFixed(1)+"M":t>=1e3?t.toLocaleString("pt-BR"):String(t)}function q(e){return!e&&e!==0?"—":Number(e).toLocaleString("pt-BR")}function r(e){var a,i,o,n;const t=document.getElementById(e);return((n=(i=(a=t==null?void 0:t.value)==null?void 0:a.toString)==null?void 0:(o=i.call(a)).trim)==null?void 0:n.call(o))||""}function d(e,t){const a=document.getElementById(e);a&&(a.value=t??"")}function c(e,t="success"){const a=document.getElementById("toast-area"),i=document.createElement("div");i.className=`toast toast-${t}`;const o={success:"✅",error:"❌",info:"ℹ️"};i.innerHTML=`<span>${o[t]||"ℹ️"}</span>${e}`,a.appendChild(i),setTimeout(()=>i.remove(),3500)}function k(e){var t,a,i;document.querySelectorAll(".page").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".nav-tab").forEach(o=>o.classList.remove("active")),(t=document.getElementById("form-"+e))==null||t.classList.add("active"),(a=document.getElementById("page-"+e))==null||a.classList.add("active"),(i=document.getElementById("tab-"+e))==null||i.classList.add("active"),e==="paises"&&f(),e==="cidades"&&b(),e==="continentes"&&g(),e==="clima"&&y()}async function D(){const e=r("ct-nome");if(!e){c("Informe o nome do continente","error");return}const t={nome:e,area:r("ct-area")||0,populacao:r("ct-pop")||0,paises:r("ct-paises")||0,notas:r("ct-notas")};await x("continentes",t),["ct-nome","ct-area","ct-pop","ct-paises","ct-notas"].forEach(a=>d(a,"")),c("Continente salvo!"),await g(),await w()}async function R(e){if(!confirm("Excluir este continente?"))return;const t=await u("paises"),a=await S("continentes",e);if(t.some(i=>i.continente===(a==null?void 0:a.nome))){c("Existem países vinculados a este continente!","error");return}await B("continentes",e),c("Continente excluído!","info"),await g(),await w()}function F(e){document.getElementById("modal-content").innerHTML=`
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
  `,E()}async function U(e){const t={id:e,nome:r("e-ct-nome"),area:r("e-ct-area"),populacao:r("e-ct-pop"),paises:r("e-ct-paises"),notas:r("e-ct-notas")};await L("continentes",t),$(),c("Continente atualizado!"),await g(),await w()}async function g(){const e=await u("continentes"),t=document.getElementById("tbody-cont");if(document.getElementById("st-total-cont").textContent=String(e.length),document.getElementById("st-total-cont-pop").textContent=p(e.reduce((a,i)=>a+Number(i.populacao||0),0)),document.getElementById("st-total-cont-area").textContent=p(e.reduce((a,i)=>a+Number(i.area||0),0)),!e.length){t.innerHTML='<tr><td colspan="6"><div class="empty"><div class="empty-icon">🗺️</div><p>Clique em "Preencher padrão" para os 7 continentes.</p></div></td></tr>';return}t.innerHTML=e.map(a=>`
    <tr>
      <td><strong>${a.nome}</strong></td>
      <td>${q(a.area)} km²</td>
      <td>${p(a.populacao)}</td>
      <td><span class="badge badge-green">${a.paises||"—"} países</span></td>
      <td style="max-width:180px;font-size:13px;color:var(--cinza-600)">${a.notas||"—"}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-warning btn-sm" onclick="editarContinente(${JSON.stringify(a).replace(/"/g,'"')})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deletarContinente(${a.id})">🗑️</button>
        </div>
      </td>
    </tr>`).join("")}async function G(){if((await u("continentes")).length>0){c("Já existem continentes cadastrados!","info");return}const t=[{nome:"América do Sul",area:1784e4,populacao:43426e4,paises:12,notas:"Maior floresta tropical do mundo, o Amazonas."},{nome:"América do Norte",area:24709e3,populacao:597634e3,paises:23,notas:"Terceiro maior continente por área."},{nome:"Europa",area:1053e4,populacao:748e6,paises:44,notas:"Berço da civilização ocidental."},{nome:"África",area:3037e4,populacao:1460481772,paises:54,notas:"Continente com maior número de países."},{nome:"Ásia",area:44579e3,populacao:4753079727,paises:49,notas:"Maior e mais populoso continente."},{nome:"Oceania",area:86e5,populacao:44491724,paises:14,notas:"Menor continente em população."},{nome:"Antártica",area:142e5,populacao:0,paises:0,notas:"Continente gelado, sem população permanente."}];for(const a of t)await x("continentes",a);c("7 continentes adicionados!"),await g(),await w()}async function w(){const e=await u("continentes"),t=document.getElementById("p-continente");t.innerHTML='<option value="">-- Selecione --</option>'+e.map(a=>`<option value="${a.nome}">${a.nome}</option>`).join("")}async function M(){const e=await u("paises"),t=document.getElementById("c-pais");t&&(t.innerHTML='<option value="">-- Selecione --</option>'+e.map(a=>`<option value="${a.nome}">${a.nome}</option>`).join(""))}async function J(){const e=r("p-nome");if(!e){c("Informe o nome do país","error");return}const t={nome:e,codigo:r("p-codigo").toUpperCase(),continente:r("p-continente"),capital:r("p-capital"),populacao:r("p-populacao")||0,area:r("p-area")||0,moeda:r("p-moeda")};await x("paises",t),["p-nome","p-codigo","p-capital","p-populacao","p-area","p-moeda"].forEach(a=>d(a,"")),c("País salvo!"),await f(),await M()}async function V(e){confirm("Excluir este país? As cidades vinculadas ficarão sem país.")&&(await B("paises",e),c("País excluído!","info"),await f(),await M())}function W(e){document.getElementById("modal-content").innerHTML=`
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
  `,E()}async function K(e){const a={...await S("paises",e),id:e,nome:r("e-p-nome"),codigo:r("e-p-codigo").toUpperCase(),capital:r("e-p-capital"),populacao:r("e-p-pop"),area:r("e-p-area"),moeda:r("e-p-moeda")};await L("paises",a),$(),c("País atualizado!"),await f()}async function f(){const e=await u("paises"),t=r("busca-pais").toLowerCase(),a=t?e.filter(s=>s.nome.toLowerCase().includes(t)||(s.capital||"").toLowerCase().includes(t)):e,i=document.getElementById("tbody-paises"),o=e.reduce((s,l)=>s+Number(l.populacao||0),0),n=e.reduce((s,l)=>s+Number(l.area||0),0);if(document.getElementById("st-total-paises").textContent=String(e.length),document.getElementById("st-total-pop").textContent=p(o),document.getElementById("st-total-area").textContent=p(n),!a.length){i.innerHTML=`<tr><td colspan="8"><div class="empty"><div class="empty-icon">${t?"🔎":"🌍"}</div><p>${t?'Nenhum resultado para "'+t+'"':"Nenhum país cadastrado ainda."}</p></div></td></tr>`;return}i.innerHTML=a.map(s=>`
    <tr>
      <td><strong>${s.nome}</strong></td>
      <td><span class="badge badge-gray">${s.codigo||"—"}</span></td>
      <td>${s.continente?`<span class="badge badge-blue">${s.continente}</span>`:"—"}</td>
      <td>${s.capital||"—"}</td>
      <td>${p(s.populacao)}</td>
      <td>${p(s.area)}</td>
      <td style="font-size:13px">${s.moeda||"—"}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-warning btn-sm" onclick="editarPais(${JSON.stringify(s).replace(/"/g,'"')})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deletarPais(${s.id})">🗑️</button>
        </div>
      </td>
    </tr>`).join("")}async function Q(){const e=r("c-nome");if(!e){c("Informe o nome da cidade","error");return}const t={nome:e,pais:r("c-pais"),populacao:r("c-populacao")||0,lat:r("c-lat")||null,lng:r("c-lng")||null,tipo:r("c-tipo")||"cidade"};await x("cidades",t),["c-nome","c-populacao","c-lat","c-lng"].forEach(a=>d(a,"")),c("Cidade salva!"),await b(),await y()}async function X(e){confirm("Excluir esta cidade?")&&(await B("cidades",e),c("Cidade excluída!","info"),await b(),await y())}function Y(e){document.getElementById("modal-content").innerHTML=`
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
  `,E()}async function Z(e){const a={...await S("cidades",e),id:e,nome:r("e-c-nome"),pais:r("e-c-pais"),tipo:r("e-c-tipo"),populacao:r("e-c-pop"),lat:r("e-c-lat")||null,lng:r("e-c-lng")||null};await L("cidades",a),$(),c("Cidade atualizada!"),await b(),await y()}async function b(){const e=await u("cidades"),t=r("busca-cidade").toLowerCase(),a=t?e.filter(n=>n.nome.toLowerCase().includes(t)||(n.pais||"").toLowerCase().includes(t)):e,i=document.getElementById("tbody-cidades");if(document.getElementById("st-total-cidades").textContent=String(e.length),document.getElementById("st-total-capitais").textContent=String(e.filter(n=>n.tipo==="capital").length),document.getElementById("st-total-metropoles").textContent=String(e.filter(n=>n.tipo==="metrópole").length),!a.length){i.innerHTML=`<tr><td colspan="6"><div class="empty"><div class="empty-icon">${t?"🔎":"🏙️"}</div><p>${t?"Nenhum resultado.":"Nenhuma cidade cadastrada."}</p></div></td></tr>`;return}const o={capital:"badge-green",metrópole:"badge-blue",cidade:"badge-amber",município:"badge-gray"};i.innerHTML=a.map(n=>`
    <tr>
      <td><strong>${n.nome}</strong></td>
      <td>${n.pais||"—"}</td>
      <td><span class="badge ${o[n.tipo]||"badge-gray"}">${n.tipo||"cidade"}</span></td>
      <td>${p(n.populacao)}</td>
      <td style="font-size:12px;color:var(--cinza-600)">${n.lat&&n.lng?`${Number(n.lat).toFixed(4)}, ${Number(n.lng).toFixed(4)}`:"—"}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-warning btn-sm" onclick="editarCidade(${JSON.stringify(n).replace(/"/g,'"')})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deletarCidade(${n.id})">🗑️</button>
          ${n.lat&&n.lng?`<button class="btn btn-secondary btn-sm" onclick="climaCidade(${n.lat},${n.lng},'${n.nome}')">🌡️</button>`:""}
        </div>
      </td>
    </tr>`).join("")}const P=[],ee={0:"☀️ Céu limpo",1:"🌤️ Principalmente limpo",2:"⛅ Parcialmente nublado",3:"☁️ Nublado",45:"🌫️ Névoa",48:"🌫️ Névoa com geada",51:"🌦️ Garoa leve",53:"🌦️ Garoa moderada",55:"🌧️ Garoa densa",61:"🌧️ Chuva leve",63:"🌧️ Chuva moderada",65:"🌧️ Chuva forte",71:"❄️ Neve leve",73:"❄️ Neve moderada",75:"❄️ Neve forte",80:"🌦️ Chuva leve",81:"🌧️ Chuva moderada",82:"⛈️ Chuva violenta",95:"⛈️ Trovoada",96:"⛈️ Trovoada com granizo",99:"⛈️ Trovoada violenta"};function T(e){return ee[e]||"🌡️ Condição "+e}function te(e){return["N","NE","L","SE","S","SO","O","NO"][Math.round(e%360/45)%8]}async function y(){const e=await u("cidades"),t=document.getElementById("cl-cidade");t&&(t.innerHTML='<option value="">-- Selecionar cidade --</option>'+e.filter(a=>a.lat&&a.lng).map(a=>`<option value="${a.lat},${a.lng},${a.nome}">${a.nome} (${a.pais||"?"})</option>`).join(""))}function ae(){const e=document.getElementById("cl-cidade");if(!e||!e.value)return;const[t,a,i]=e.value.split(",");N(t,a,i)}async function ne(){const e=r("cl-lat"),t=r("cl-lng");if(!e||!t){c("Informe latitude e longitude","error");return}await N(e,t,`${e}, ${t}`)}async function N(e,t,a="Local"){k("clima");const i=document.getElementById("clima-result");i.innerHTML='<div class="card"><div style="text-align:center;padding:2rem;color:var(--cinza-600)"><div style="font-size:36px">⏳</div><p>Consultando clima...</p></div></div>';try{const o=await fetch(`/api/clima?lat=${encodeURIComponent(String(e))}&lng=${encodeURIComponent(String(t))}`);if(!o.ok)throw new Error("Erro na API");const n=await o.json(),s=n.current,l=n.daily,m=T(s.weather_code),C=m.split(" ")[0],j=l.time.map((I,h)=>{var z;return`<div style="text-align:center;background:var(--sage-50);border:1px solid var(--sage-200);border-radius:var(--radius);padding:.75rem .5rem;min-width:80px">
        <div style="font-size:11px;color:var(--cinza-600);margin-bottom:.25rem">${new Date(I+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"2-digit"})}</div>
        <div style="font-size:18px">${T(l.weather_code[h]).split(" ")[0]}</div>
        <div style="font-size:13px;font-weight:600;color:var(--verde-800)">${Math.round(l.temperature_2m_max[h])}°</div>
        <div style="font-size:12px;color:var(--cinza-600)">${Math.round(l.temperature_2m_min[h])}°</div>
        <div style="font-size:11px;color:#2d6ea8">${((z=l.precipitation_sum[h])==null?void 0:z.toFixed(1))||0}mm</div>
      </div>`}).join("");i.innerHTML=`
      <div class="card">
        <div class="clima-card">
          <div class="clima-icon">${C}</div>
          <div class="clima-info">
            <div class="clima-temp">${Math.round(s.temperature_2m)}°C</div>
            <div class="clima-city">📍 ${a} · Sensação ${Math.round(s.apparent_temperature)}°C</div>
            <div style="font-size:14px;color:var(--verde-600);margin-top:.25rem">${m.split(" ").slice(1).join(" ")}</div>
          </div>
          <div style="text-align:right">
            <div class="chip" style="margin-bottom:.35rem">💧 ${s.relative_humidity_2m}% umidade</div><br>
            <div class="chip" style="margin-bottom:.35rem">💨 ${Math.round(s.wind_speed_10m)} km/h ${te(s.wind_direction_10m)}</div><br>
            <div class="chip">☁️ ${s.cloud_cover}% nuvens</div>
          </div>
        </div>
        <div style="margin-top:1rem">
          <div style="font-size:13px;font-weight:600;color:var(--cinza-600);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.5px">Previsão 7 dias</div>
          <div style="display:flex;gap:.5rem;overflow-x:auto;padding-bottom:.25rem">${j}</div>
        </div>
      </div>`,P.unshift({nome:a,lat:String(e),lng:String(t),temp:Math.round(s.temperature_2m),desc:m.split(" ").slice(1).join(" "),hora:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}),oe(),c(`Clima de ${a}: ${Math.round(s.temperature_2m)}°C`)}catch{i.innerHTML='<div class="card"><div class="empty"><div class="empty-icon">❌</div><p>Erro ao consultar a API de clima.<br><small style="color:var(--cinza-600)">Verifique a conexão com a internet.</small></p></div></div>',c("Erro ao consultar API de clima","error")}}function oe(){const e=document.getElementById("historico-clima");if(!P.length){e.innerHTML='<p style="color:var(--cinza-600);font-size:14px">Nenhuma consulta realizada.</p>';return}e.innerHTML=P.slice(0,10).map(t=>`
    <div class="info-row">
      <span class="info-label">${t.hora}</span>
      <span class="info-val">📍 ${t.nome}</span>
      <span class="chip" style="margin-left:auto">${t.temp}°C · ${t.desc}</span>
    </div>`).join("")}async function ie(){var t;const e=r("p-nome");if(!e){c("Informe o nome do país para buscar","error");return}try{c("Buscando dados...","info");const a=await fetch(`/api/restcountries?name=${encodeURIComponent(e)}`);if(!a.ok)throw new Error;const o=(await a.json())[0];d("p-nome",o.name.common),d("p-codigo",o.cca2),d("p-capital",((t=o.capital)==null?void 0:t[0])||""),d("p-populacao",o.population||""),d("p-area",o.area||"");const n=Object.values(o.currencies||{})[0];d("p-moeda",n?`${n.name} (${Object.keys(o.currencies)[0]})`:""),c(`Dados de "${o.name.common}" carregados!`)}catch{c("País não encontrado na API","error")}}async function re(){var t;const e=r("c-nome");if(!e){c("Informe o nome da cidade para buscar","error");return}try{c("Buscando cidade (geo API)...","info");const a=await fetch(`/api/geocoding?name=${encodeURIComponent(e)}`);if(!a.ok)throw new Error("Erro na API de geocoding");const i=await a.json(),o=(t=i==null?void 0:i.results)==null?void 0:t[0];if(!o){c("Cidade não encontrada na API","error");return}const n=o.latitude,s=o.longitude,l=o.name||e;d("c-nome",l),d("c-lat",String(n)),d("c-lng",String(s));const m=o.country;if(m){const C=document.getElementById("c-pais");C&&Array.from(C.options).find(I=>I.value===m)&&d("c-pais",m)}c(`Coordenadas de "${l}" carregadas!`)}catch{c("Erro ao buscar cidade na API","error")}}function E(){var e;(e=document.getElementById("modal"))==null||e.classList.add("open")}function $(){var e;(e=document.getElementById("modal"))==null||e.classList.remove("open")}var A;(A=document.getElementById("modal"))==null||A.addEventListener("click",e=>{e.target===e.currentTarget&&$()});async function se(){await H(),await w(),await M(),await y(),await f(),await g(),await b()}se();window.setPage=k;window.salvarContinente=D;window.deletarContinente=R;window.editarContinente=F;window.salvarEditContinente=U;window.seedContinentes=G;window.renderContinentes=g;window.renderPaises=f;window.renderCidades=b;window.salvarPais=J;window.deletarPais=V;window.editarPais=W;window.salvarEditPais=K;window.salvarCidade=Q;window.deletarCidade=X;window.editarCidade=Y;window.salvarEditCidade=Z;window.buscarPaisAPI=ie;window.buscarCidadeAPI=re;window.consultarClima=ne;window.consultarClimaSelect=ae;window.climaCidade=N;window.preencherSelectClima=y;window.closeModal=$;window.openModal=E;
