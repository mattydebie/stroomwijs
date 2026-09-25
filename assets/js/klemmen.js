/* Stroomwijs – klemmen-viewer (module Schakelingen) */
/* ---------- klemmen-viewer ---------- */
(function(){
const root=document.getElementById("klem");if(!root)return;
const C={bruin:"#7A4A26",zwart:"#1E1E1E",grijs:"#8E959B",blauw:"#2A5C9E",gg:"url(#kgg)"};
const LX=300,RX=400;
const T={
 enkel:{n:"Enkelpolig",terms:[["L",LX,100],["1",RX,100]],wires:[["L","bruin","l","fase van de automaat"],["1","zwart","r","geschakelde fase naar de lamp"]],
  note:"De eenvoudigste: fase op L, de draad naar de lamp op 1. Nul en aarde gaan niet via de schakelaar."},
 twee:{n:"Tweepolig",terms:[["L",LX,80],["N",LX,160],["1",RX,80],["2",RX,160]],wires:[["L","bruin","l","fase"],["N","blauw","l","nul"],["1","zwart","r","fase naar de lamp"],["2","blauw","r","nul naar de lamp"]],
  note:"Twee ingangen, twee uitgangen. Sommige merken schrijven L1 en L2 (of P en N) aan de ingang. Hier gaat de nul wél via de schakelaar, want die onderbreekt beide polen."},
 wissel:{n:"Wissel (hotel)",terms:[["L",LX,120],["1",RX,80],["1'",RX,160]],wires:[["L","bruin","l","fase (1e) of naar lamp (2e schakelaar)"],["1","grijs","r","wisseldraad 1"],["1'","grijs","r","wisseldraad 2"]],
  note:"Twee identieke schakelaars. Bij de eerste komt de fase op L, bij de tweede de draad naar de lamp. De wisseldraden komen op 1 en 1'. Of wisseldraad 1 op 1 of op 1' komt, maakt niet uit: de lamp werkt, alleen de stand van de wip is dan omgekeerd."},
 dwissel:{n:"Dubbele wissel",terms:[["L1",LX,70],["L2",LX,170],["1",RX,50],["1'",RX,95],["2",RX,145],["2'",RX,190]],wires:[["L1","bruin","l","fase"],["1","grijs","r","wisseldraden lamp 1"],["1'","grijs","r",""],["2","grijs","r","wisseldraden lamp 2"],["2'","grijs","r",""]],bridge:["L1","L2"],
  note:"Twee wisselschakelaars onder één plaat. Hangen beide lampen op dezelfde kring, dan leg je een brugje van L1 naar L2 (vaak al voorzien of meegeleverd). Zitten ze op verschillende kringen, dan komt op L2 de fase van de andere kring en haal je het brugje weg."},
 serie:{n:"Serie (dubbel)",terms:[["L",LX,120],["1",RX,80],["2",RX,160]],wires:[["L","bruin","l","fase"],["1","zwart","r","naar lamp A"],["2","zwart","r","naar lamp B"]],
  note:"Eén fase in op L, die intern naar beide wippen gaat. Uitgang 1 is de linkerwip, uitgang 2 de rechter (controleer op de tekening). Markeer de twee zwarte draden."},
 kruis:{n:"Kruis",terms:[["1",LX,80],["1'",LX,160],["2",RX,80],["2'",RX,160]],wires:[["1","grijs","l","wisseldraden van wissel 1"],["1'","grijs","l",""],["2","grijs","r","wisseldraden naar wissel 2"],["2'","grijs","r",""]],
  note:"Vier klemmen in twee paren. Het paar aan dezelfde kant hoort meestal bij elkaar, maar de markering verschilt per merk (cijfers of pijltjes). Volg hier echt de tekening op de achterkant: de twee wisseldraden van dezelfde kant moeten op één paar."},
 druk:{n:"Drukknop",terms:[["L",LX,120],["1",RX,120]],wires:[["L","bruin","l","fase (of stuurspanning)"],["1","zwart","r","stuurdraad naar teleruptor"]],
  note:"Aangesloten zoals een enkelpolige schakelaar, maar het contact veert terug. Alle drukknoppen van dezelfde teleruptor komen parallel: L aan L, 1 aan 1."},
 stop:{n:"Stopcontact",terms:[["L",LX,90],["N",RX,90],["⏚",350,165]],wires:[["L","bruin","l","fase"],["N","blauw","r","nul"],["⏚","gg","l","beschermingsgeleider"]],
  note:"Het Belgische stopcontact met penaarde is niet gepolariseerd: de stekker past in twee richtingen, dus L en N zijn elektrisch gelijkwaardig. Hou toch één vaste gewoonte aan (bv. fase links). De aarde komt altijd op de middelste klem met het aardingssymbool."}
};
const tabs=root.querySelector(".klem-tabs"),view=root.querySelector(".klem-view");
let cur="wissel";
function wire(x,y,col,side,label){
  const ex=side==="l"?20:680;
  const lab=label?`<text x="${side==="l"?24:676}" y="${y-9}" text-anchor="${side==="l"?"start":"end"}" font-size="12" style="fill:var(--ink)">${label}</text>`:"";
  return `<line x1="${x}" y1="${y}" x2="${ex}" y2="${y}" style="stroke:var(--muted)" stroke-width="8" stroke-linecap="round"/><line x1="${x}" y1="${y}" x2="${ex}" y2="${y}" stroke="${C[col]}" stroke-width="5.5" stroke-linecap="round"/>${lab}`;
}
function draw(){
  const t=T[cur],pos={};t.terms.forEach(([id,x,y])=>pos[id]=[x,y]);
  let w="";t.wires.forEach(([id,col,side,lab])=>{const [x,y]=pos[id];w+=wire(x,y,col,side,lab)});
  let br="";if(t.bridge){const [a,b]=t.bridge;br=`<path d="M${pos[a][0]-4} ${pos[a][1]} C ${pos[a][0]-40} ${pos[a][1]+30}, ${pos[b][0]-40} ${pos[b][1]-30}, ${pos[b][0]-4} ${pos[b][1]}" fill="none" stroke="#7A4A26" stroke-width="4"/><text x="${pos[a][0]-46}" y="${(pos[a][1]+pos[b][1])/2+4}" text-anchor="end" font-size="12" style="fill:var(--muted)">brug</text>`;}
  let tm="";t.terms.forEach(([id,x,y])=>{const left=x<350&&id!=="⏚";tm+=`<circle cx="${x}" cy="${y}" r="12" style="fill:var(--surface);stroke:var(--ink)" stroke-width="2"/><line x1="${x-7}" y1="${y}" x2="${x+7}" y2="${y}" style="stroke:var(--ink)" stroke-width="2"/><text x="${id==="⏚"?x:left?x+22:x-22}" y="${id==="⏚"?y-18:y+5}" text-anchor="${id==="⏚"?"middle":left?"start":"end"}" font-family="IBM Plex Mono,monospace" font-size="16" font-weight="600" style="fill:var(--ink)">${id}</text>`});
  view.innerHTML=`<svg viewBox="0 0 700 230" width="100%" role="img" aria-label="Achterkant van een ${t.n.toLowerCase()} met klemmen en draden">
   <defs><pattern id="kgg" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="6" height="12" fill="#2F8A3C"/><rect x="6" width="6" height="12" fill="#E3C21C"/></pattern></defs>
   <rect x="262" y="24" width="176" height="192" rx="12" style="fill:var(--sunk);stroke:var(--ink)" stroke-width="2"/>
   <text x="350" y="42" text-anchor="middle" font-size="11" style="fill:var(--muted)">ACHTERKANT</text>${w}${br}${tm}</svg><p class="status">${t.note}</p>`;
  tabs.querySelectorAll("button").forEach(b=>b.setAttribute("aria-selected",b.dataset.k===cur));
}
Object.entries(T).forEach(([k,t])=>{const b=document.createElement("button");b.type="button";b.role="tab";b.dataset.k=k;b.textContent=t.n;b.onclick=()=>{cur=k;draw()};tabs.appendChild(b)});
draw();
})();
