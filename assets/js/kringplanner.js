/* Stroomwijs – kringplanner */
/* ---------- kringplanner ---------- */
(function(){
const root=document.getElementById("planner");if(!root)return;
const TYPES={gewoon:"Gewoon",keuken:"Keuken",badkamer:"Badkamer",buiten:"Buiten"};
const LEVELS=["Kelder","Gelijkvloers","Verdieping","Zolder"];
let uid=0;
const R=(naam,type,lvl,licht,stop)=>({id:uid++,naam,type,lvl,licht,stop});
let rooms=[R("Living","gewoon","Gelijkvloers",3,6),R("Keuken","keuken","Gelijkvloers",3,6),R("Inkomhal en wc","gewoon","Gelijkvloers",3,1),
 R("Wasplaats","gewoon","Gelijkvloers",1,2),R("Garage","gewoon","Gelijkvloers",2,2),R("Slaapkamer 1","gewoon","Verdieping",1,4),
 R("Slaapkamer 2","gewoon","Verdieping",1,3),R("Slaapkamer 3","gewoon","Verdieping",1,3),R("Bureau","gewoon","Verdieping",1,4),
 R("Badkamer","badkamer","Verdieping",2,2),R("Nachthal","gewoon","Verdieping",2,1),R("Tuin en terras","buiten","Gelijkvloers",3,2)];
const DEV=[
 ["wasmachine","Wasmachine","toestel","2,5","C20",true],["droogkast","Droogkast","toestel","2,5","C20",true],["vaatwasser","Vaatwasser","toestel","2,5","C20",true],
 ["oven","Oven (vast)","vast","2,5","C20",true],["kookplaat","Kookplaat","vast","6","C32",true],["boiler","Elektrische boiler","vast","2,5","C20",false],
 ["warmtepomp","Warmtepomp","vast","volgens fabrikant","volgens fabrikant",false],["laadpaal","Laadpaal","laad","6","C32",true],["omvormer","Omvormer zonnepanelen","vast","volgens omvormer","volgens omvormer",true]];
const dev={};DEV.forEach(d=>dev[d[0]]=d[5]);
const STORE_KEY="stroomwijs-plan-v1";
try{const saved=JSON.parse(localStorage.getItem(STORE_KEY));
 if(saved&&Array.isArray(saved.rooms)){
  rooms=saved.rooms;uid=saved.uid||(rooms.length?Math.max(...rooms.map(r=>r.id))+1:0);
  if(saved.dev)DEV.forEach(d=>{if(d[0] in saved.dev)dev[d[0]]=!!saved.dev[d[0]]});
 }
}catch(e){}
const rowsEl=document.getElementById("plRows"),devEl=document.getElementById("plDev"),out=document.getElementById("plOut"),schemaEl=document.getElementById("plSchema"),savedTag=document.getElementById("plSaved");
const opt=(o,v)=>Object.entries(o).map(([k,t])=>`<option value="${k}" ${k===v?"selected":""}>${t}</option>`).join("");
let saveTimer=null;
function saveLocal(){
 try{localStorage.setItem(STORE_KEY,JSON.stringify({rooms,dev,uid}))}catch(e){return}
 if(savedTag){savedTag.textContent="Plan bewaard in deze browser";clearTimeout(saveTimer);saveTimer=setTimeout(()=>savedTag.textContent="",2500);}
}
function renderRows(){
 rowsEl.innerHTML=rooms.map(r=>`<tr data-id="${r.id}">
  <td><input id="plN${r.id}" aria-label="Naam ruimte" value="${r.naam.replace(/"/g,"&quot;")}" data-f="naam"></td>
  <td><select id="plT${r.id}" aria-label="Soort" data-f="type">${opt(TYPES,r.type)}</select></td>
  <td><select id="plL${r.id}" aria-label="Niveau" data-f="lvl">${LEVELS.map(l=>`<option ${l===r.lvl?"selected":""}>${l}</option>`).join("")}</select></td>
  <td><input id="plLi${r.id}" type="number" min="0" max="40" value="${r.licht}" aria-label="Lichtpunten" data-f="licht"></td>
  <td><input id="plS${r.id}" type="number" min="0" max="40" value="${r.stop}" aria-label="Stopcontactpunten" data-f="stop"></td>
  <td><button type="button" class="rm" aria-label="Verwijder ${r.naam}">×</button></td></tr>`).join("");
}
devEl.innerHTML=DEV.map(d=>`<label class="check" for="plD_${d[0]}"><input type="checkbox" id="plD_${d[0]}" data-d="${d[0]}" ${dev[d[0]]?"checked":""}> ${d[1]}</label>`).join("");
rowsEl.addEventListener("input",e=>{const tr=e.target.closest("tr");const r=rooms.find(x=>x.id==tr.dataset.id);const f=e.target.dataset.f;
 r[f]=(f==="licht"||f==="stop")?Math.max(0,parseInt(e.target.value)||0):e.target.value;compute();});
rowsEl.addEventListener("click",e=>{if(!e.target.classList.contains("rm"))return;const tr=e.target.closest("tr");rooms=rooms.filter(x=>x.id!=tr.dataset.id);renderRows();compute();});
document.getElementById("plAdd").onclick=()=>{rooms.push(R("Nieuwe ruimte","gewoon","Gelijkvloers",1,2));renderRows();compute();document.getElementById("plN"+(uid-1)).select();};
devEl.addEventListener("change",e=>{dev[e.target.dataset.d]=e.target.checked;compute();});

function pack(list,max){const cs=[];let cur=null;
 list.forEach(({naam,n})=>{while(n>0){
  if(cur&&cur.n+n<=max){cur.n+=n;cur.r.push(naam);n=0;}
  else if(n>max){if(cur&&cur.n<max){const t=max-cur.n;cur.n+=t;cur.r.push(naam+" (deel)");n-=t;}else{cur={n:0,r:[]};cs.push(cur);}}
  else{cur={n,r:[naam]};cs.push(cur);n=0;}}});
 return cs;}
function compute(){
 const C=[],notes=[];
 LEVELS.forEach(l=>{const inL=rooms.filter(r=>r.lvl===l&&r.type!=="buiten");
  pack(inL.filter(r=>r.licht>0).map(r=>({naam:r.naam,n:r.licht})),10).forEach(c=>C.push({k:"licht",d:`Verlichting ${l.toLowerCase()}: ${c.r.join(", ")}`,sec:"1,5",aut:"C16",p:c.n}));
  pack(inL.filter(r=>r.type==="gewoon"&&r.stop>0).map(r=>({naam:r.naam,n:r.stop})),8).forEach(c=>C.push({k:"stop",d:`Stopcontacten ${l.toLowerCase()}: ${c.r.join(", ")}`,sec:"2,5",aut:"C20",p:c.n}));
  inL.filter(r=>r.type==="keuken"&&r.stop>0).forEach(r=>{const k=Math.max(r.stop>=2?2:1,Math.ceil(r.stop/8));let left=r.stop;
   for(let i=0;i<k;i++){const n=Math.ceil(left/(k-i));left-=n;C.push({k:"stop",d:`Stopcontacten ${r.naam.toLowerCase()} ${i+1}`,sec:"2,5",aut:"C20",p:n});}});
  inL.filter(r=>r.type==="badkamer"&&r.stop>0).forEach(r=>pack([{naam:r.naam,n:r.stop}],8).forEach(c=>C.push({k:"stop",d:`Stopcontacten ${r.naam.toLowerCase()}`,sec:"2,5",aut:"C20",p:c.n})));
 });
 rooms.filter(r=>r.type==="buiten").forEach(r=>{const t=r.licht+r.stop;if(!t)return;
  if(t<=8)C.push({k:"gemengd",d:`${r.naam}: licht en stopcontacten (gemengd)`,sec:"2,5",aut:"C16",p:t});
  else{if(r.licht)pack([{naam:r.naam,n:r.licht}],10).forEach(c=>C.push({k:"licht",d:`Verlichting ${r.naam.toLowerCase()}`,sec:"1,5",aut:"C16",p:c.n}));
   if(r.stop)pack([{naam:r.naam,n:r.stop}],8).forEach(c=>C.push({k:"stop",d:`Stopcontacten ${r.naam.toLowerCase()}`,sec:"2,5",aut:"C20",p:c.n}));}});
 DEV.forEach(([id,naam,k,sec,aut])=>{if(dev[id])C.push({k,d:naam,sec,aut,p:1});});
 const d30=C.filter(c=>["licht","stop","gemengd","toestel"].includes(c.k));
 const nd=d30.length===0?0:Math.max(d30.length>1?2:1,Math.ceil(d30.length/8));
 const groups=Array.from({length:nd},()=>[]);
 const ord=[...d30.filter(c=>c.k==="licht").sort((a,b)=>b.p-a.p),...d30.filter(c=>c.k!=="licht")];
 ord.forEach((c,i)=>groups[i%nd].push(c));
 const vast=C.filter(c=>c.k==="vast"),laad=C.filter(c=>c.k==="laad");
 let L=0;const letter=()=>{let n=L++,s="";do{s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26)-1}while(n>=0);return s};
 groups.forEach(g=>g.forEach(c=>c.l=letter()));vast.forEach(c=>c.l=letter());laad.forEach(c=>c.l=letter());
 const spec=c=>/\d/.test(c.sec)?`${c.sec} mm² · ${c.aut}`:"volgens fabrikant";
 const row=c=>`<li><span class="lt">${c.l}</span><span class="dsc">${c.d}</span><span class="spec">${spec(c)}</span><span class="pts">${c.k==="toestel"||c.k==="vast"||c.k==="laad"?"toestel":c.p+" pt"}</span></li>`;
 const card=(t,sub,list,cls="")=>list.length?`<div class="pcard ${cls}"><div class="ph"><b>${t}</b><span>${sub}</span></div><ul>${list.map(row).join("")}</ul></div>`:"";
 if(rooms.some(r=>r.type==="gewoon"&&r.stop>8))notes.push("Een ruimte met meer dan 8 stopcontactpunten wordt over meerdere kringen verdeeld.");
 if(dev.kookplaat)notes.push("Kookplaat: een eenfasige inductieplaat tot ongeveer 7,4 kW past op 6 mm² met 32 A. Driefasige platen of een driefasige aansluiting vragen een andere oplossing.");
 if(dev.laadpaal)notes.push("Laadpaal: type A 30 mA met 6 mA DC-detectie in de paal, of type B. Controleer de handleiding van je laadpaal (module Laadpaal).");
 if(dev.warmtepomp||dev.omvormer)notes.push("Warmtepomp en omvormer: de fabrikant bepaalt sectie en beveiliging. Controleer ook of een differentieel type A volstaat.");
 if(dev.oven)notes.push("Oven op een stopcontact in plaats van vast aangesloten? Dan hoort hij achter een differentieel van 30 mA.");
 out.innerHTML=`<div class="psum"><span class="chip">${C.length} kringen</span><span class="chip">${nd} × differentieel 30 mA</span><span class="chip">hoofddifferentieel 300 mA · type A</span></div>
  <div class="pgrid">${groups.map((g,i)=>card(`Differentieel ${i+1}`,"30 mA · type A",g)).join("")}${card("Direct achter 300 mA","vaste toestellen",vast,"vast")}${card("Eigen differentieel","30 mA + DC-detectie of type B",laad,"laad")}</div>
  ${notes.length?`<ul class="pnotes">${notes.map(n=>`<li>${n}</li>`).join("")}</ul>`:""}`;
 drawSchema(groups,vast,laad,spec);
 saveLocal();
}

/* eendraadschema, opgebouwd uit dezelfde groepen als de kaarten hierboven */
function symIcon(key,tx,ty,scale){
 const s=window.SYMBOLS&&window.SYMBOLS[key];
 return s?`<g transform="translate(${tx},${ty}) scale(${scale})">${s[1]}</g>`:"";
}
function drawSchema(groups,vast,laad,spec){
 if(!schemaEl)return;
 const cats=[...groups.map((g,i)=>({t:`Differentieel ${i+1}`,sub:"30 mA · type A",items:g,color:"var(--neutral)"})),
  vast.length?{t:"Direct achter 300 mA",sub:"vaste toestellen",items:vast,color:"var(--phase)"}:null,
  laad.length?{t:"Eigen differentieel",sub:"30 mA + DC / type B",items:laad,color:"var(--warn)"}:null].filter(Boolean);
 if(!cats.length){schemaEl.innerHTML="";schemaEl.removeAttribute("viewBox");return;}
 const LW=170,MARGIN=30;
 let i=0;
 cats.forEach(cat=>{cat.items.forEach(it=>{it.x=MARGIN+i*LW+LW/2;i++;});cat.x=(cat.items[0].x+cat.items[cat.items.length-1].x)/2;});
 const leaves=cats.flatMap(c=>c.items);
 const rootX=(leaves[0].x+leaves[leaves.length-1].x)/2;
 const W=MARGIN*2+leaves.length*LW,H=340;
 const line=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--ink)" stroke-width="2"/>`;
 const box=(cx,y,h,t1,t2,color)=>`<rect x="${cx-65}" y="${y}" width="130" height="${h}" rx="4" style="fill:var(--sunk);stroke:${color||"var(--ink)"}" stroke-width="1.5"/><text x="${cx}" y="${y+16}" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--ink)">${t1}</text><text x="${cx}" y="${y+30}" text-anchor="middle" font-size="10.5" font-family="IBM Plex Mono,monospace" style="fill:var(--muted)">${t2}</text>`;
 const kindLabel={licht:"Verlichting",stop:"Stopcontacten",gemengd:"Licht + stopcontacten"};
 const kindIcon={licht:"licht",stop:"cd",gemengd:"cd"};
 let svg=box(rootX,10,36,"Teller","kWh","var(--ink)")+line(rootX,46,rootX,70)
  +box(rootX,70,36,"Hoofddifferentieel","300 mA · type A","var(--ink)")+line(rootX,106,rootX,124);
 if(cats.length>1)svg+=line(cats[0].x,124,cats[cats.length-1].x,124);
 cats.forEach(cat=>{
  svg+=line(cat.x,124,cat.x,138)+box(cat.x,138,36,cat.t,cat.sub,cat.color);
  svg+=line(cat.x,174,cat.x,190);
  if(cat.items.length>1)svg+=line(cat.items[0].x,190,cat.items[cat.items.length-1].x,190);
  cat.items.forEach(it=>{
   svg+=line(it.x,190,it.x,204)+box(it.x,204,34,it.l,spec(it),cat.color);
   svg+=line(it.x,238,it.x,254);
   const icoKey=kindIcon[it.k];
   if(icoKey){svg+=symIcon(icoKey,it.x-13,254,0.29);svg+=`<text x="${it.x+18}" y="272" font-size="12" font-weight="600" style="fill:var(--ink)">×${it.p}</text>`;
    svg+=`<text x="${it.x}" y="298" text-anchor="middle" font-size="10.5" style="fill:var(--muted)">${kindLabel[it.k]||it.k}</text>`;
   }else{svg+=`<text x="${it.x}" y="270" text-anchor="middle" font-size="11.5" style="fill:var(--muted)">${it.d}</text>`;}
  });
 });
 schemaEl.setAttribute("viewBox",`0 0 ${W} ${H}`);
 schemaEl.setAttribute("width",W);schemaEl.setAttribute("height",H);
 schemaEl.innerHTML=svg;
}

document.getElementById("plExport")?.addEventListener("click",()=>{
 const blob=new Blob([JSON.stringify({rooms,dev},null,2)],{type:"application/json"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="stroomwijs-plan.json";
 document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(a.href);
});

renderRows();compute();
})();
