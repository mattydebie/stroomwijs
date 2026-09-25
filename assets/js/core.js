/* Stroomwijs – modulenummering, voortgang, navigatie, toetsen, rekenhulp en kringcontrole */
const SECS=[...document.querySelectorAll("section.mod")];
const MODS=SECS.map(s=>s.dataset.name);
SECS.forEach((s,i)=>{s.id="m"+i;const nm=s.querySelector(".num");if(nm)nm.textContent="MODULE "+String(i).padStart(2,"0");const q=s.querySelector(".quiz");if(q)q.dataset.quiz=i;});

const KEY="stroomwijs-v3";
let state={};
try{state=JSON.parse(localStorage.getItem(KEY)||"null");
  if(!state){state={};const old=JSON.parse(localStorage.getItem("stroomwijs-v2")||"{}");const oldM=MODS.filter(m=>m!=="Schakelingen");
    Object.keys(old).forEach(k=>{const [i,j]=k.split("-");if(oldM[+i])state[oldM[+i]+"|"+j]=old[k]});}
}catch(e){state={}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
const total=Object.values(Q).reduce((s,a)=>s+a.length,0);

function renderNav(){
  const ol=document.getElementById("navlist");ol.innerHTML="";
  MODS.forEach((m,i)=>{
    const qs=Q[MODS[i]]||[],done=qs.every((q,j)=>state[MODS[i]+"|"+j]===q.a);
    const li=document.createElement("li");
    li.innerHTML=`<a href="#m${i}" class="${done?"done":""}"><span class="n">${String(i).padStart(2,"0")}</span><span>${m}</span></a>`;
    ol.appendChild(li);
  });
  let right=0;Object.keys(Q).forEach(n=>Q[n].forEach((q,j)=>{if(state[n+"|"+j]===q.a)right++}));
  document.getElementById("progtxt").textContent=`${right} van ${total} vragen juist`;
  document.getElementById("progbar").style.width=(right/total*100)+"%";
}

function renderQuiz(el){
  const m=+el.dataset.quiz,qs=Q[MODS[m]]||[];
  const right=qs.filter((q,j)=>state[MODS[m]+"|"+j]===q.a).length;
  el.innerHTML=`<h3>Toets module ${String(m).padStart(2,"0")} <small>${right}/${qs.length} juist</small></h3>`;
  qs.forEach((q,j)=>{
    const k=MODS[m]+"|"+j,ans=state[k];
    const d=document.createElement("div");d.className="q";
    d.innerHTML=`<p class="pr">${j+1}. ${q.p}</p>`;
    const opts=document.createElement("div");opts.className="opts";
    q.o.forEach((t,oi)=>{
      const b=document.createElement("button");b.type="button";b.textContent=t;
      if(ans!==undefined){b.disabled=true;if(oi===q.a)b.classList.add("right");else if(oi===ans)b.classList.add("wrong");}
      b.onclick=()=>{state[k]=oi;save();renderQuiz(el);renderNav();};
      opts.appendChild(b);
    });
    d.appendChild(opts);
    if(ans!==undefined){const f=document.createElement("div");f.className="fb";f.innerHTML=`<b>${ans===q.a?"Juist.":"Niet juist."}</b>${q.e}`;d.appendChild(f);}
    el.appendChild(d);
  });
  if(qs.some((q,j)=>state[MODS[m]+"|"+j]!==undefined)){
    const r=document.createElement("button");r.className="reset";r.type="button";r.textContent="Toets opnieuw maken";
    r.onclick=()=>{qs.forEach((q,j)=>delete state[MODS[m]+"|"+j]);save();renderQuiz(el);renderNav();};
    el.appendChild(r);
  }
}
document.querySelectorAll(".quiz").forEach(renderQuiz);
renderNav();

/* power calc */
function calc(){const P=+document.getElementById("cP").value||0,U=+document.getElementById("cU").value||1;
  document.getElementById("cI").textContent=(P/U).toLocaleString("nl-BE",{maximumFractionDigits:1})+" A";}
["cP","cU"].forEach(id=>document.getElementById(id).addEventListener("input",calc));calc();

/* circuit checker */
const MAXA={"1.5":16,"2.5":20,"4":25,"6":32,"10":40};
function check(){
  const t=kType.value,s=kSec.value,a=+kAut.value,n=+kPts.value||0,dp=kDp.checked,df=kDiff.checked;
  const out=[];let ok=true;
  const add=(good,txt,info)=>{out.push([info?"info":good?"ok":"nok",txt]);if(!good&&!info)ok=false;};
  const fmt=s.replace(".",",");
  add(a<=MAXA[s],a<=MAXA[s]?`${a} A automaat past bij ${fmt} mm² (max. ${MAXA[s]} A).`:`${a} A is te hoog voor ${fmt} mm². Max. ${MAXA[s]} A.`);
  if(t==="stop"){
    add(+s>=2.5,+s>=2.5?"Stopcontactkring in minstens 2,5 mm².":"Stopcontacten vragen minstens 2,5 mm².");
    add(n<=8,n<=8?`${n} punten: binnen het maximum van 8.`:`${n} punten: max. 8 contactpunten per kring.`);
  }
  if(t==="gemengd"){
    add(s==="2.5"||+s>2.5,+s>=2.5?"Gemengde kring volledig in 2,5 mm².":"Een gemengde kring is volledig in 2,5 mm².");
    const lim=dp?20:16;
    add(a<=lim,a<=lim?`${a} A is toegelaten${dp?" met tweepolige schakelaars":""}.`:`Gemengd met ${dp?"tweepolige":"enkelpolige"} schakelaars: max. ${lim} A.`);
    add(n<=8,n<=8?`${n} punten samen: binnen het maximum van 8.`:`${n} punten: max. 8 punten (licht + stopcontacten samen).`);
  }
  if(t==="licht"){add(true,"Voor verlichting is het aantal lichtpunten niet beperkt tot 8; hou het wel overzichtelijk per zone.",true);}
  if(t==="toegewezen"){add(n<=1,n<=1?"Eén toestel op deze kring.":"Een toegewezen kring voedt één toestel.");}
  if(t!=="toegewezen") add(df,df?"Beschermd door een differentieel van 30 mA.":"Licht- en stopcontactkringen moeten achter 30 mA.");
  else add(true,df?"Achter 30 mA: goed.":"Een vast toestel zonder stopcontact mag achter de 300 mA; een laadpaal niet.",true);
  kStamp.textContent=ok?"Conform":"Niet conform";kStamp.className="stamp "+(ok?"ok":"nok");
  kList.innerHTML=out.map(([c,t])=>`<li class="${c}">${t}</li>`).join("");
}
const kType=document.getElementById("kType"),kSec=document.getElementById("kSec"),kAut=document.getElementById("kAut"),kPts=document.getElementById("kPts"),kDp=document.getElementById("kDp"),kDiff=document.getElementById("kDiff"),kStamp=document.getElementById("kStamp"),kList=document.getElementById("kList");
[kType,kSec,kAut,kPts,kDp,kDiff].forEach(e=>e.addEventListener("input",check));check();

if(location.hash){const t=document.querySelector(location.hash);if(t)t.scrollIntoView();}
