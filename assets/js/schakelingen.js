/* Stroomwijs – klikbare schakelschema's (module Schakelingen) */
/* ---------- schakelingen-simulator ---------- */
(function(){
const LV="var(--phase)",DD="var(--line)",NU="var(--neutral)";
const ln=(x1,y1,x2,y2,live)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${live?LV:DD}" stroke-width="${live?4:2.5}" stroke-linecap="round"/>`;
const pl=(pts,live)=>`<polyline points="${pts}" fill="none" style="stroke:${live?LV:DD}" stroke-width="${live?4:2.5}" stroke-linejoin="round" stroke-linecap="round"/>`;
const nl=pts=>`<polyline points="${pts}" fill="none" style="stroke:${NU}" stroke-width="2.5" stroke-linejoin="round"/>`;
const dot=(x,y,live)=>`<circle cx="${x}" cy="${y}" r="4.5" style="fill:${live?LV:"var(--muted)"}"/>`;
const tx=(x,y,t,a="middle",c="var(--muted)",w=400)=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="12" font-weight="${w}" style="fill:${c}">${t}</text>`;
const lamp=(x,y,on)=>`${on?`<circle cx="${x}" cy="${y}" r="30" fill="#F6CF45" opacity=".35"/>`:""}<circle cx="${x}" cy="${y}" r="16" style="fill:${on?"#F6CF45":"var(--surface)"};stroke:var(--ink)" stroke-width="2"/><line x1="${x-11}" y1="${y-11}" x2="${x+11}" y2="${y+11}" style="stroke:var(--ink)" stroke-width="2"/><line x1="${x+11}" y1="${y-11}" x2="${x-11}" y2="${y+11}" style="stroke:var(--ink)" stroke-width="2"/>`;
const hit=(id,x,y,w,h,label)=>`<rect class="hit" data-sw="${id}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" tabindex="0" role="button" aria-label="${label}"/>`;
const src=(y1,y2)=>tx(18,y1+4,"L","middle",LV,600)+tx(18,y2+4,"N","middle",NU,600);

const SIMS={
 enkel:{st:{s:false},draw(s){const o=s.s;return{h:200,svg:
  src(50,160)+ln(32,50,150,50,true)+dot(150,50,true)+
  (o?ln(150,50,200,50,true):ln(150,50,194,26,true))+dot(200,50,o)+
  pl("200,50 440,50 440,84",o)+lamp(440,100,o)+nl("32,160 440,160 440,116")+
  tx(175,82,"Schakelaar")+tx(475,104,"Lamp","start")+tx(320,42,o?"geschakelde fase":"geschakelde fase (spanningsloos)")+
  hit("s",135,12,80,56,"Schakelaar omzetten"),
  status:o?"Schakelaar dicht: de fase loopt door naar de lamp.":"Schakelaar open: de draad naar de lamp is spanningsloos."}},
  act(s){s.s=!s.s}},
 dubbel:{st:{a:false,b:false},draw(s){return{h:210,svg:
  src(40,185)+ln(32,40,120,40,true)+ln(120,40,120,120,true)+
  `<rect x="104" y="14" width="92" height="140" rx="6" fill="none" style="stroke:var(--muted)" stroke-dasharray="4 3"/>`+
  dot(120,40,true)+(s.a?ln(120,40,170,40,true):ln(120,40,164,18,true))+dot(170,40,s.a)+
  dot(120,120,true)+(s.b?ln(120,120,170,120,true):ln(120,120,164,98,true))+dot(170,120,s.b)+
  pl("170,40 470,40 470,64",s.a)+lamp(470,80,s.a)+
  pl("170,120 360,120 360,124",s.b)+lamp(360,140,s.b)+
  nl("32,185 470,185 470,96")+nl("360,156 360,185")+
  tx(150,170,"Serieschakelaar")+tx(500,84,"Lamp A","start")+tx(390,144,"Lamp B","start")+
  hit("a",108,12,80,50,"Wip A omzetten")+hit("b",108,92,80,50,"Wip B omzetten"),
  status:`Lamp A ${s.a?"aan":"uit"}, lamp B ${s.b?"aan":"uit"}. Beide wippen delen dezelfde inkomende fase.`}},
  act(s,id){s[id]=!s[id]}},
 hotel:{st:{w1:0,w2:1},draw(s){const on=s.w1===s.w2,Y=[60,140];return{h:220,svg:
  src(100,200)+ln(32,100,120,100,true)+dot(120,100,true)+
  ln(120,100,170,Y[s.w1],true)+dot(170,60,s.w1===0)+dot(170,140,s.w1===1)+
  ln(170,60,370,60,s.w1===0)+ln(170,140,370,140,s.w1===1)+
  dot(370,60,s.w1===0)+dot(370,140,s.w1===1)+ln(420,100,370,Y[s.w2],s.w1===s.w2)+dot(420,100,on)+
  pl("420,100 500,100 500,114",on)+lamp(500,130,on)+nl("32,200 500,200 500,146")+
  tx(270,50,"wisseldraad 1")+tx(270,132,"wisseldraad 2")+tx(145,178,"Wissel 1")+tx(395,178,"Wissel 2")+tx(106,92,"gem.","end")+tx(434,92,"gem.","start")+
  hit("w1",108,44,76,112,"Wisselschakelaar 1 omzetten")+hit("w2",356,44,76,112,"Wisselschakelaar 2 omzetten"),
  status:on?"Beide schakelaars kiezen dezelfde wisseldraad: de lamp brandt.":"De schakelaars kiezen elk een andere wisseldraad: de lamp is uit. Zet één van beide om."}},
  act(s,id){s[id]=1-s[id]}},
 kruis:{st:{w1:0,k:0,w2:1},draw(s){const Y=[60,140],t1=s.w1,t2=s.k?1-t1:t1,on=s.w2===t2;
  const kr=s.k?ln(230,60,290,140,t1===0)+ln(230,140,290,60,t1===1):ln(230,60,290,60,t1===0)+ln(230,140,290,140,t1===1);
  return{h:220,svg:
  src(100,200)+ln(32,100,90,100,true)+dot(90,100,true)+ln(90,100,130,Y[s.w1],true)+
  ln(130,60,230,60,t1===0)+ln(130,140,230,140,t1===1)+
  `<rect x="218" y="42" width="84" height="116" rx="6" fill="none" style="stroke:var(--muted)" stroke-dasharray="4 3"/>`+kr+
  dot(230,60,t1===0)+dot(230,140,t1===1)+dot(290,60,t2===0)+dot(290,140,t2===1)+
  ln(290,60,390,60,t2===0)+ln(290,140,390,140,t2===1)+
  ln(430,100,390,Y[s.w2],on)+dot(430,100,on)+pl("430,100 500,100 500,114",on)+lamp(500,130,on)+nl("32,200 500,200 500,146")+
  tx(110,178,"Wissel 1")+tx(260,178,"Kruisschakelaar")+tx(410,178,"Wissel 2")+
  hit("w1",80,44,64,112,"Wisselschakelaar 1 omzetten")+hit("k",214,38,92,124,"Kruisschakelaar omzetten")+hit("w2",376,44,64,112,"Wisselschakelaar 2 omzetten"),
  status:`Kruisschakelaar staat ${s.k?"gekruist":"recht door"}. ${on?"De lamp brandt.":"De lamp is uit."} Elke schakelaar keert de toestand om.`}},
  act(s,id){if(id==="k")s.k=1-s.k;else s[id]=1-s[id]}},
 tele:{st:{on:false,p:-1},draw(s){const X=[90,170,250];let knops="";
  X.forEach((x,i)=>{const pr=s.p===i;knops+=ln(x,40,x,72,true)+dot(x,72,true)+(pr?ln(x-12,72,x+12,72,true):ln(x-12,64,x+12,64,false))+ln(x,64,x,pr?72:64,false)+dot(x,82,pr)+ln(x,82,x,120,pr)+tx(x,140,"drukknop")+hit("p"+i,x-26,52,52,44,"Drukknop "+(i+1)+" indrukken");});
  const puls=s.p>=0;return{h:220,svg:
  src(40,195)+ln(32,40,420,40,true)+knops+ln(90,120,300,120,puls)+
  `<rect x="300" y="104" width="56" height="32" rx="3" style="fill:var(--sunk);stroke:var(--ink)" stroke-width="2"/>`+tx(328,125,"TR","middle","var(--ink)",600)+
  nl("356,120 380,120 380,195")+`<line x1="328" y1="104" x2="440" y2="${s.on?44:30}" style="stroke:var(--muted)" stroke-dasharray="3 3"/>`+
  dot(420,40,true)+(s.on?ln(420,40,466,40,true):ln(420,40,460,18,true))+dot(466,40,s.on)+
  pl("466,40 520,40 520,84",s.on)+lamp(520,100,s.on)+nl("32,195 520,195 520,116")+
  tx(445,68,"contact")+tx(328,158,"spoel"),
  status:(s.on?"Lamp aan.":"Lamp uit.")+" Elke puls op een drukknop laat de teleruptor omklappen. De drukknoppen staan parallel."}},
  act(s,id,re){s.p=+id.slice(1);s.on=!s.on;clearTimeout(s.t);s.t=setTimeout(()=>{s.p=-1;re()},260)}},
 minu:{st:{on:false,p:-1,end:0},draw(s){const X=[90,170,250];let knops="";const left=Math.max(0,Math.ceil((s.end-Date.now())/1000));
  X.forEach((x,i)=>{const pr=s.p===i;knops+=ln(x,40,x,72,true)+dot(x,72,true)+(pr?ln(x-12,72,x+12,72,true):ln(x-12,64,x+12,64,false))+ln(x,64,x,pr?72:64,false)+dot(x,82,pr)+ln(x,82,x,120,pr)+tx(x,140,"drukknop")+hit("p"+i,x-26,52,52,44,"Drukknop "+(i+1)+" indrukken");});
  return{h:220,svg:
  src(40,195)+ln(32,40,420,40,true)+knops+ln(90,120,300,120,s.p>=0)+
  `<rect x="300" y="104" width="56" height="32" rx="3" style="fill:var(--sunk);stroke:var(--ink)" stroke-width="2"/>`+tx(328,125,"MIN","middle","var(--ink)",600)+
  nl("356,120 380,120 380,195")+`<line x1="328" y1="104" x2="440" y2="${s.on?44:30}" style="stroke:var(--muted)" stroke-dasharray="3 3"/>`+
  dot(420,40,true)+(s.on?ln(420,40,466,40,true):ln(420,40,460,18,true))+dot(466,40,s.on)+
  pl("466,40 520,40 520,84",s.on)+lamp(520,100,s.on)+nl("32,195 520,195 520,116")+
  tx(445,68,"contact")+tx(328,158,s.on?`nog ${left} s`:"uit","middle",s.on?LV:"var(--muted)",600),
  status:s.on?`Lamp aan, gaat uit over ${left} s. Druk opnieuw om de tijd te herstarten.`:"Lamp uit. Druk op een drukknop."}},
  act(s,id,re){s.p=+id.slice(1);s.on=true;s.end=Date.now()+6000;clearTimeout(s.t);s.t=setTimeout(()=>{s.p=-1;re()},260);
   clearInterval(s.iv);s.iv=setInterval(()=>{if(Date.now()>=s.end){s.on=false;clearInterval(s.iv)}re()},250)}},
};
document.querySelectorAll(".sim").forEach(el=>{
  const def=SIMS[el.dataset.sim];if(!def)return;const st={...def.st};
  const re=()=>{const f=document.activeElement&&document.activeElement.dataset?document.activeElement.dataset.sw:null;const inside=el.contains(document.activeElement);
    const r=def.draw(st);el.innerHTML=`<svg viewBox="0 0 560 ${r.h}" width="100%" role="img" aria-label="Interactief schakelschema">${r.svg}</svg><p class="status" aria-live="polite">${r.status}</p>`;
    if(inside&&f){const n=el.querySelector(`[data-sw="${f}"]`);if(n)n.focus()}};
  const go=id=>{def.act(st,id,re);re()};
  el.addEventListener("click",e=>{const t=e.target.closest("[data-sw]");if(t)go(t.dataset.sw)});
  el.addEventListener("keydown",e=>{const t=e.target.closest("[data-sw]");if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();go(t.dataset.sw)}});
  re();
});
})();
