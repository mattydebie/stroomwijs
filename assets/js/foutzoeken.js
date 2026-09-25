/* Stroomwijs – foutzoek-wegwijzer */
/* ---------- foutzoek-wegwijzer ---------- */
(function(){
const el=document.getElementById("tree");if(!el)return;
const N={
 start:{q:"Wat zie je?",o:[["Eén automaat staat uit","aut"],["Een differentieel staat uit","diff"],["Het hele huis zit zonder stroom","alles"],["Eén lamp of stopcontact werkt niet, niets is gesprongen","punt"]]},
 aut:{q:"Wanneer viel de automaat uit?",o:[["Meteen toen ik een toestel aanzette of insteek","aut_toestel"],["Na een tijdje, terwijl veel toestellen tegelijk draaiden","aut_over"],["Hij valt meteen weer uit als ik hem opzet","aut_kort"]]},
 aut_toestel:{r:"ok",t:"Waarschijnlijk een defect toestel.",s:["Trek het toestel uit en zet de automaat terug op.","Blijft hij op, dan zit de fout in het toestel of zijn snoer. Gebruik het niet meer tot het nagekeken is.","Valt hij opnieuw uit zonder het toestel, ga dan naar \"valt meteen weer uit\"."]},
 aut_over:{r:"ok",t:"Overbelasting: te veel vermogen op één kring.",s:["Tel het vermogen: een kring met automaat van 20 A draagt ongeveer 4600 W (20 A × 230 V).","Zet zware verbruikers (strijkijzer, waterkoker, elektrische verwarming) op verschillende kringen.","Gebeurt het vaak, dan is een extra kring de oplossing. Een zwaardere automaat plaatsen is nooit de oplossing: die beschermt de kabel dan niet meer."]},
 aut_kort:{q:"Trek alle toestellen van die kring uit en zet alle lampen van die kring uit. Zet de automaat dan terug op. Wat gebeurt er?",o:[["Hij blijft op","aut_kort_dev"],["Hij valt nog steeds meteen uit","aut_kort_bek"]]},
 aut_kort_dev:{r:"ok",t:"De fout zit in één van de toestellen of lampen.",s:["Steek de toestellen één voor één weer in, en schakel de lampen één voor één aan.","Het toestel waarbij de automaat uitvalt, is de boosdoener.","Let ook op verlengsnoeren en stekkerdozen: die gaan vaker stuk dan je denkt."]},
 aut_kort_bek:{r:"stop",t:"Kortsluiting in de vaste bekabeling.",s:["Laat de automaat uit en probeer niet herhaaldelijk opnieuw.","Denk na: werd er recent geboord, een schilderij opgehangen of iets gewijzigd aan de kring? Een nagel of boor in een kabel is een klassieker.","Laat de kring nakijken door een vakman."]},
 diff:{q:"Gaat de differentieel terug op?",o:[["Ja, en hij blijft op","diff_eens"],["Ja, maar hij valt af en toe opnieuw uit","diff_soms"],["Nee, hij valt meteen terug uit","diff_meteen"]]},
 diff_eens:{r:"ok",t:"Waarschijnlijk een eenmalige storing.",s:["Een onweer, een oud toestel dat opstartte of een spanningspiek kan een differentieel eenmalig doen uitvallen.","Druk ter controle op de testknop: hij moet meteen uitschakelen.","Hou het in het oog. Gebeurt het opnieuw, volg dan \"valt af en toe opnieuw uit\"."]},
 diff_soms:{q:"Zie je een patroon?",o:[["Bij regen of vochtig weer","diff_vocht"],["Telkens bij een bepaald toestel","diff_toestel"],["Geen duidelijk patroon","diff_som"]]},
 diff_vocht:{r:"warn",t:"Vocht in een buitenpunt of een vochtige ruimte.",s:["Kijk naar buitenstopcontacten, tuinverlichting, een tuinhuis of een verlichting in een vochtige kelder.","Schakel die kring uit en kijk of het probleem wegblijft bij het volgende regenweer.","Een doos met water erin laat je vervangen of dichten door een vakman."]},
 diff_toestel:{r:"ok",t:"Dat toestel heeft een lekstroom.",s:["Typische boosdoeners: een oude boiler, wasmachine, vaatwasser, frigo of diepvries met een versleten weerstand of isolatie.","Laat het toestel nakijken of vervangen.","Werkt het op een andere kring wel, dan lekt het waarschijnlijk net onder de drempel en tellen de lekstromen op."]},
 diff_som:{r:"warn",t:"Kleine lekstromen die optellen.",s:["Elk toestel met elektronica (pc, tv, led-drivers, omvormers) lekt een beetje. Achter één differentieel van 30 mA tellen die op.","Hangen er veel kringen achter die ene differentieel, laat ze dan beter verdelen over twee differentiëlen.","Duurt het, laat een vakman de isolatieweerstand per kring meten."]},
 diff_meteen:{q:"Zet alle automaten onder die differentieel uit. Zet dan de differentieel op. Blijft hij nu op?",o:[["Ja","diff_zoek"],["Nee, ook met alle automaten uit valt hij uit","diff_bord"]]},
 diff_zoek:{q:"Zet de automaten nu één voor één terug op. Bij welke valt de differentieel uit?",o:[["Bij één bepaalde automaat","diff_kring"],["Hij blijft op, ook met alles aan","diff_eens"]]},
 diff_kring:{q:"Laat die ene automaat uit, zet de rest op. Trek alle toestellen van die kring uit, en probeer die automaat opnieuw. Valt de differentieel nog uit?",o:[["Nee, nu blijft hij op","diff_kring_dev"],["Ja, nog steeds","diff_kring_bek"]]},
 diff_kring_dev:{r:"ok",t:"Een toestel op die kring lekt naar de aarde.",s:["Steek de toestellen één voor één weer in tot de differentieel uitvalt.","Dat toestel laat je nakijken of vervangen."]},
 diff_kring_bek:{r:"stop",t:"Isolatiefout in de bekabeling van die kring.",s:["Laat de automaat van die kring uit; de rest van het huis kan weer werken.","Denk aan vocht (buitenpunt, badkamer, lekkage) of een beschadigde kabel.","Een vakman meet de isolatieweerstand en zoekt de plek."]},
 diff_bord:{r:"stop",t:"Fout in het bord zelf of in de differentieel.",s:["De fout zit vóór de automaten: in de bedrading van het bord, een nul die verkeerd aangesloten is, of een defecte differentieel.","Blijf van het bord af en bel een vakman."]},
 alles:{q:"Hebben de buren ook geen stroom?",o:[["Ja, de straat zit zonder","alles_net"],["Nee, alleen wij","alles_bord"]]},
 alles_net:{r:"ok",t:"Een storing op het net.",s:["Daar kan je niets aan doen. Meld de storing bij je netbeheerder (in Vlaanderen Fluvius) of kijk op hun storingskaart.","Zet gevoelige toestellen uit, zodat ze bij het terugkomen van de spanning niet allemaal tegelijk opstarten."]},
 alles_bord:{q:"Staat de hoofdschakelaar of hoofddifferentieel in je bord uit?",o:[["Ja","diff"],["Nee, alles staat op maar er is geen spanning","alles_meter"]]},
 alles_meter:{r:"stop",t:"Probleem vóór je bord.",s:["Kijk of je meter iets aangeeft. Bij een budgetmeter of digitale meter kan de toevoer onderbroken zijn.","De zekering of hoofdschakelaar vóór de meter is van de netbeheerder. Kom daar niet aan; bel de netbeheerder."]},
 punt:{q:"Wat werkt er niet?",o:[["Een lamp","punt_lamp"],["Een stopcontact","punt_stop"]]},
 punt_lamp:{q:"Heb je de lamp zelf al vervangen door een lamp die zeker werkt?",o:[["Ja, nog steeds niets","punt_lamp2"],["Nee","punt_lamp_vervang"]]},
 punt_lamp_vervang:{r:"ok",t:"Begin bij het eenvoudigste.",s:["Vervang de lamp door een lamp die ergens anders werkt.","Bij een ledspot met driver of transformator kan ook de driver stuk zijn."]},
 punt_lamp2:{q:"Wordt de lamp bediend met een hotel- of kruisschakeling of een teleruptor?",o:[["Ja","punt_lamp_hotel"],["Nee, een gewone schakelaar","punt_los"]]},
 punt_lamp_hotel:{r:"warn",t:"Kijk naar de schakeling.",s:["Probeer de lamp vanaf elke bedieningsplaats. Werkt het in bepaalde combinaties wel, dan zit er een losse wisseldraad of staat de fase op een wisselcontact (zie module Schakelingen).","Bij een teleruptor: hoor je hem klikken in het bord als je drukt? Geen klik: stuurkring of spoel. Wel een klik: vermogenscontact of lampkring."]},
 punt_stop:{q:"Werken de andere stopcontacten op dezelfde kring wel?",o:[["Ja, alleen dit ene niet","punt_een"],["Nee, meerdere na elkaar werken niet","punt_los"]]},
 punt_een:{r:"warn",t:"Het stopcontact zelf of zijn aansluiting.",s:["Test eerst met een ander toestel: misschien is het toestel stuk.","Schakel de automaat uit, controleer met de tweepolige tester dat het punt spanningsloos is, en haal het stopcontact uit de doos.","Kijk of een draad los zit of uit een klem geschoven is. Vervang het stopcontact als het verkleurd, gebarsten of versleten is."]},
 punt_los:{r:"warn",t:"Waarschijnlijk een losse verbinding.",s:["Werkt een reeks punten niet, dan zit de losse verbinding meestal in het laatste punt dat nog wél werkt: daar lust de kabel door naar het volgende.","Schakel de automaat uit, meet met de tweepolige tester dat het punt spanningsloos is, en controleer de klemmen.","Is de draad verkleurd of de klem gesmolten, dan laat je het punt en de kabel nakijken: een losse verbinding wordt warm en kan brand veroorzaken."]}
};
let path=["start"];
function draw(){
 const id=path[path.length-1],n=N[id];
 const crumbs=path.slice(0,-1).map((p,i)=>{const nx=path[i+1];const opt=N[p].o.find(o=>o[1]===nx);return `<li>${opt?opt[0]:""}</li>`}).join("");
 let body;
 if(n.q){body=`<p class="tq">${n.q}</p><div class="opts">${n.o.map(o=>`<button type="button" data-go="${o[1]}">${o[0]}</button>`).join("")}</div>`;}
 else{const lab={ok:"Zelf op te lossen",warn:"Voorzichtig zelf te bekijken",stop:"Stop, bel een vakman"}[n.r];
  body=`<div class="res ${n.r}"><span class="pill">${lab}</span><p class="tq">${n.t}</p><ol class="tight">${n.s.map(s=>`<li>${s}</li>`).join("")}</ol></div>`;}
 el.innerHTML=(path.length>1?`<ol class="crumbs">${crumbs}</ol>`:"")+body+`<div class="treenav">${path.length>1?`<button type="button" class="reset" data-back="1">Stap terug</button><button type="button" class="reset" data-restart="1">Opnieuw beginnen</button>`:""}</div>`;
}
el.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
 if(b.dataset.go)path.push(b.dataset.go);else if(b.dataset.back)path.pop();else if(b.dataset.restart)path=["start"];
 draw();el.querySelector(".opts button, .res")?.focus?.();});
draw();
})();
