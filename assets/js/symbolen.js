/* Stroomwijs – symbolen, flitskaarten en voorbeeldschema */
/* ---------- symbolen ---------- */
(function(){
const S='style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"';
const L=(a,b,c,d)=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" ${S}/>`;
const cup=`<path d="M30 34 A15 15 0 0 0 60 34" ${S}/>`;
const SYM={
 licht:["Lichtpunt",L(14,38,50,38)+L(50,28,70,48)+L(50,48,70,28)],
 cd:["Contactdoos (algemeen)",L(15,20,45,20)+L(45,20,45,34)+cup],
 cdA:["Contactdoos met beschermingsgeleider",L(15,20,45,20)+L(45,20,45,34)+cup+L(39,32,51,32)],
 enk:["Schakelaar (enkelpolig)",`<circle cx="32" cy="50" r="5" ${S}/>`+L(36,46,66,16)],
 twee:["Schakelaar (tweepolig)",`<circle cx="32" cy="50" r="5" ${S}/>`+L(36,46,58,24)+L(44.5,30.5,51.5,37.5)+L(49.5,25.5,56.5,32.5)+L(54.5,20.5,61.5,27.5)],
 wis:["Wisselschakelaar (hotel)",`<circle cx="38" cy="44" r="5" ${S}/>`+L(42,40,64,18)+L(64,18,70,24)+L(34,48,12,70)+L(12,70,6,64)],
 kruis:["Kruisschakelaar",`<circle cx="38" cy="44" r="5" ${S}/>`+L(42,40,64,18)+L(64,18,70,24)+L(34,48,12,70)+L(12,70,6,64)+L(34,40,12,18)+L(12,18,6,24)+L(42,48,64,70)+L(64,70,70,64)],
 serie:["Omschakelaar (serieschakelaar)",`<circle cx="38" cy="44" r="5" ${S}/>`+L(42,40,64,18)+L(64,18,70,24)+L(34,40,12,18)+L(12,18,6,24)],
 druk:["Drukknop",`<circle cx="45" cy="38" r="14" ${S}/><circle cx="45" cy="38" r="5" ${S}/>`],
 aard:["Aarding",L(45,12,45,40)+L(29,40,61,40)+L(35,48,55,48)+L(41,56,49,56)],
 smelt:["Smeltzekering",`<rect x="25" y="30" width="40" height="16" ${S}/>`+L(10,38,80,38)],
 kwh:["kWh-teller",L(10,38,20,38)+`<rect x="20" y="18" width="50" height="38" ${S}/><text x="45" y="43" text-anchor="middle" font-size="14" font-weight="600" style="fill:var(--ink)">kWh</text>`]
};
window.SYMBOLS=SYM;
const svg=(k,w=90)=>`<svg viewBox="0 0 90 76" width="${w}" height="${Math.round(w*76/90)}" aria-hidden="true">${SYM[k][1]}</svg>`;
const grid=document.getElementById("symgrid");
if(grid)grid.innerHTML=Object.keys(SYM).map(k=>`<div class="sym">${svg(k)}<span>${SYM[k][0]}</span></div>`).join("");

/* flitskaarten */
const fl=document.getElementById("flash");
if(fl){let score=0,n=0,cur=null,opts=[],done=false;
 const keys=Object.keys(SYM);
 const next=()=>{let k;do{k=keys[Math.floor(Math.random()*keys.length)]}while(k===cur&&keys.length>1);cur=k;done=false;
  const o=new Set([k]);while(o.size<4)o.add(keys[Math.floor(Math.random()*keys.length)]);opts=[...o].sort(()=>Math.random()-.5);draw();};
 const draw=(pick)=>{fl.innerHTML=`<div class="flash-card">${svg(cur,150)}</div><div class="flash-side"><p class="flash-score">${score} van ${n} juist</p><div class="opts">${opts.map(k=>`<button type="button" data-k="${k}" ${done?"disabled":""} class="${done?(k===cur?"right":k===pick?"wrong":""):""}">${SYM[k][0]}</button>`).join("")}</div>${done?`<button type="button" class="nextbtn">Volgende symbool</button>`:""}</div>`;};
 fl.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
  if(b.classList.contains("nextbtn")){next();fl.querySelector(".opts button")?.focus();return}
  if(done)return;n++;if(b.dataset.k===cur)score++;done=true;draw(b.dataset.k);fl.querySelector(".nextbtn")?.focus();});
 next();}

/* voorbeeldschema */
const ex=document.getElementById("exschema");
if(ex){const box=(y,t1,t2)=>`<rect x="150" y="${y}" width="130" height="36" rx="4" style="fill:var(--sunk);stroke:var(--ink)" stroke-width="1.5"/><text x="215" y="${y+15}" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--ink)">${t1}</text><text x="215" y="${y+29}" text-anchor="middle" font-size="11" font-family="IBM Plex Mono,monospace" style="fill:var(--ink)">${t2}</text>`;
 const vl=(y1,y2)=>`<line x1="215" y1="${y1}" x2="215" y2="${y2}" style="stroke:var(--ink)" stroke-width="2"/>`;
 const pt=(y,k,lab,sub,rot)=>`<line x1="215" y1="${y}" x2="250" y2="${y}" style="stroke:var(--ink)" stroke-width="2"/><g transform="translate(${rot?314:250},${y-38}) ${rot?"rotate(90 0 38)":""}"><g transform="${rot?"translate(-45,0)":""}">${SYM[k][1]}</g></g><text x="345" y="${y-2}" font-size="13" font-weight="600" style="fill:var(--ink)">${lab}</text><text x="345" y="${y+14}" font-size="11" style="fill:var(--muted)">${sub}</text>`;
 ex.innerHTML=box(6,"Teller","kWh")+vl(42,56)+box(56,"Hoofddifferentieel","300 mA · A")+vl(92,106)+box(106,"Differentieel","30 mA · A")+vl(142,156)+box(156,"Automaat A","C20")+
  `<text x="20" y="176" font-size="12" style="fill:var(--muted)">kring A</text><text x="20" y="192" font-size="11" font-family="IBM Plex Mono,monospace" style="fill:var(--muted)">XVB 3G2,5</text><text x="20" y="206" font-size="11" style="fill:var(--muted)">ingewerkt</text>`+
  vl(192,360)+
`<line x1="215" y1="225" x2="265" y2="225" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><path d="M280 210 A15 15 0 0 0 280 240" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><line x1="288" y1="206" x2="288" y2="244" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><text x="310" y="223" font-size="13" font-weight="600" style="fill:var(--ink)">A1 · 2×</text><text x="310" y="239" font-size="11" style="fill:var(--muted)">dubbel stopcontact, zetel</text>`+
`<line x1="215" y1="275" x2="265" y2="275" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><path d="M280 260 A15 15 0 0 0 280 290" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><line x1="288" y1="256" x2="288" y2="294" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><text x="310" y="273" font-size="13" font-weight="600" style="fill:var(--ink)">A2 · 2×</text><text x="310" y="289" font-size="11" style="fill:var(--muted)">dubbel stopcontact, tv-meubel</text>`+
`<line x1="215" y1="325" x2="265" y2="325" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><path d="M280 310 A15 15 0 0 0 280 340" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><line x1="288" y1="306" x2="288" y2="344" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><text x="310" y="323" font-size="13" font-weight="600" style="fill:var(--ink)">A3</text><text x="310" y="339" font-size="11" style="fill:var(--muted)">enkel stopcontact, raam</text>`+
`<circle cx="215" cy="365" r="5" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><line x1="219" y1="361" x2="249" y2="331" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><line x1="215" y1="370" x2="215" y2="394" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><line x1="205" y1="394" x2="225" y2="414" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><line x1="225" y1="394" x2="205" y2="414" style="stroke:var(--ink);fill:none" stroke-width="2.2" stroke-linecap="round"/><text x="310" y="363" font-size="13" font-weight="600" style="fill:var(--ink)">A4</text><text x="310" y="379" font-size="11" style="fill:var(--muted)">schakelaar aan de deur</text><text x="310" y="400" font-size="13" font-weight="600" style="fill:var(--ink)">A5</text><text x="310" y="416" font-size="11" style="fill:var(--muted)">lichtpunt</text>`;
}
})();
