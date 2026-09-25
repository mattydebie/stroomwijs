/* Stroomwijs – toetsvragen per module, gesleuteld op de modulenaam (data-name van de section) */
const Q={
"Voor je begint":[
 {p:"Je hebt je keuken zelf opnieuw bekabeld. Wat moet er gebeuren voor je de nieuwe kringen gebruikt?",o:["Niets, een particulier mag dat zelf","Een keuring door een erkend keuringsorganisme","Een melding bij de gemeente","Een foto naar Fluvius sturen"],a:1,e:"Een nieuwe installatie of belangrijke wijziging wordt vóór ingebruikname gekeurd door een erkend organisme."},
 {p:"Hoe controleer je dat een kring spanningsloos is?",o:["Met een schroevendraaier met lampje","Door de lamp aan te schakelen","Met een tweepolige spanningstester, na hem eerst te testen","Door de draad kort aan te raken"],a:2,e:"Alleen een tweepolige tester geeft zekerheid. Test hem eerst op een punt dat onder spanning staat."},
 {p:"Je hebt de hoofdschakelaar uitgezet. Welk deel van het bord kan nog onder spanning staan?",o:["Niets","De ingangsklemmen vóór de hoofdschakelaar","Alleen de differentiëlen","Alleen de aardrail"],a:1,e:"De toevoer vanaf de meter tot de hoofdschakelaar blijft onder spanning."}
],
"Basis":[
 {p:"Een oven van 3450 W op 230 V trekt ongeveer…",o:["5 A","10 A","15 A","35 A"],a:2,e:"I = P / U = 3450 / 230 = 15 A."},
 {p:"Welke kleur gebruik je uitsluitend voor de beschermingsgeleider?",o:["Blauw","Bruin","Geel-groen","Zwart"],a:2,e:"Geel-groen is voorbehouden aan de aarding (PE)."},
 {p:"Welke kabel mag je niet zonder buis in de muur leggen?",o:["XVB","VOB","EXVB","Geen enkele, alles moet in buis"],a:1,e:"VOB zijn losse draden en horen altijd in een buis of goot."}
],
"Materiaal & begrippen":[
 {p:"Wat is een 'punt' volgens het AREI?",o:["Eén stopcontact","Eén plaats op de kring, bv. één afdekplaat met stopcontacten of één lichtpunt","Eén schakelaar","Eén meter kabel"],a:1,e:"Een meervoudig stopcontact onder één plaat telt als één punt."},
 {p:"Wat onderbreekt een tweepolige schakelaar?",o:["Enkel de fase","Enkel de nul","Fase en nul tegelijk","Fase en aarde"],a:2,e:"Twee polen: fase én nul. Een enkelpolige onderbreekt enkel de fase."},
 {p:"Je wil de trapverlichting van boven én onder bedienen. Welke schakeling?",o:["Enkelvoudig","Dubbel","Wisselschakeling","Dimmer"],a:2,e:"Twee bedieningsplaatsen = wisselschakeling. Drie of meer: kruisschakelaars of een teleruptor."},
 {p:"Een automaat met opschrift C16 schakelt uit bij…",o:["Lekstroom naar de aarde","Overbelasting en kortsluiting boven 16 A","Spanning boven 16 V","Na 16 minuten"],a:1,e:"De automaat beschermt tegen te veel stroom. Lekstroom is het werk van de differentieel."},
 {p:"Wat betekent IPX4?",o:["Stofdicht","Bestand tegen opspattend water","Waterdicht bij onderdompeling","4 mm isolatie"],a:1,e:"Tweede cijfer 4 = opspattend water. De X betekent: niet getest op vaste voorwerpen."}
],
"Schakelingen":[
 {p:"Hoe noemt men in Vlaanderen een schakeling waarbij je één lamp vanaf twee plaatsen bedient?",o:["Kruisschakeling","Hotelschakeling","Serieschakeling","Teleruptor"],a:1,e:"Hotelschakeling of wisselschakeling: twee wisselschakelaars met twee wisseldraden ertussen."},
 {p:"Op welke klem van de eerste wisselschakelaar komt de fase?",o:["Op een willekeurige klem","Op de gemeenschappelijke klem","Op een wisselcontact","Op de aardingsklem"],a:1,e:"De fase komt op de gemeenschappelijke klem. Op een wisselcontact werkt de schakeling maar half."},
 {p:"Hoeveel draden lopen er tussen de twee wisselschakelaars?",o:["1","2","3","4"],a:1,e:"Twee wisseldraden. Nul en aarde gaan rechtstreeks naar de lamp."},
 {p:"Je wil een lamp in een gang vanaf vier plaatsen bedienen. Wat is de eenvoudigste oplossing?",o:["Vier enkelpolige schakelaars in serie","Twee hotelschakelingen","Een teleruptor met vier drukknoppen","Een dimmer"],a:2,e:"Een teleruptor met drukknoppen in parallel. Een kruisschakeling kan ook, maar wordt snel een kluwen."},
 {p:"Waarom trek je de nul best ook naar elke schakelaardoos?",o:["Het AREI verplicht het in elke doos","Voor bewegingsmelders, verlichte schakelaars en slimme modules later","Om de lamp feller te laten branden","Zodat de schakelaar geaard is"],a:1,e:"Veel elektronische bedieningen hebben de nul nodig. Nu een draad extra bespaart later slijpwerk."},
 {p:"Op een wisselschakelaar staan de klemmen L, 1 en 1'. Waar komen de twee wisseldraden?",o:["Op L en 1","Op 1 en 1'","Op L en 1'","Maakt niet uit, alle drie zijn gelijk"],a:1,e:"L is de gemeenschappelijke klem (fase of draad naar de lamp), 1 en 1' zijn de wisselcontacten."},
 {p:"Een dubbele wisselschakelaar (L1, 1, 1' en L2, 2, 2') bedient twee lampen op dezelfde kring. Wat doe je met L2?",o:["Niets aansluiten","Een brug naar L1 leggen","De nul erop aansluiten","De aarde erop aansluiten"],a:1,e:"Zelfde kring: brug van L1 naar L2, zodat beide schakelaars de fase krijgen."}
],
"Stroombanen":[
 {p:"Welke automaat mag maximaal op een kring in 1,5 mm²?",o:["10 A","16 A","20 A","25 A"],a:1,e:"1,5 mm² mag je beveiligen met max. 16 A automaat (of 10 A smeltzekering)."},
 {p:"In de woonkamer staan 6 dubbele en 3 enkele stopcontacten, elk onder een eigen plaat, op één kring. Mag dat?",o:["Ja, het zijn er maar 9","Nee, dat zijn 9 punten, max. 8","Ja, dubbele tellen niet","Nee, max. 5 stopcontacten"],a:1,e:"Elke afdekplaat telt als één punt. 9 punten is één te veel."},
 {p:"Een gemengde kring met enkelpolige schakelaars. Welke combinatie klopt?",o:["1,5 mm² + 16 A","2,5 mm² + 20 A","2,5 mm² + 16 A","4 mm² + 25 A"],a:2,e:"Gemengd = volledig 2,5 mm². Met enkelpolige schakelaars max. 16 A; 20 A enkel met tweepolige schakelaars van 16 A."},
 {p:"Welk toestel krijgt geen verplichte eigen kring?",o:["Vaatwasser","Droogkast","Staande lamp","Elektrische kookplaat"],a:2,e:"Wasmachine, vaatwasser, droogkast, oven en kookplaat krijgen elk een eigen kring."}
],
"Differentiëlen":[
 {p:"Wat is de rol van de hoofddifferentieel van 300 mA?",o:["Bescherming tegen overbelasting","Vooral brandbeveiliging tegen lekstromen","Bescherming tegen blikseminslag","Meten van het verbruik"],a:1,e:"300 mA beschermt vooral tegen brand. Voor personenbescherming is 30 mA nodig."},
 {p:"Hoeveel eindstroombanen mogen er max. achter één 30 mA-differentieel?",o:["4","6","8","12"],a:2,e:"Sinds 1 juni 2023: max. 8 eindstroombanen per 30 mA."},
 {p:"Welke kring mag direct achter de 300 mA, zonder 30 mA?",o:["Stopcontacten slaapkamer","Verlichting hall","Inbouwkookplaat (vaste aansluiting)","Stopcontact wasmachine"],a:2,e:"Vaste toestellen zonder stopcontact mogen achter de 300 mA. Licht en stopcontacten niet."},
 {p:"Welk type differentieel plaats je in een nieuwe huishoudelijke installatie minimaal?",o:["Type AC","Type A","Type F verplicht","Maakt niet uit"],a:1,e:"In huishoudelijke installaties is type A vereist."}
],
"Aarding":[
 {p:"Wat is de gewenste maximale spreidingsweerstand in een woning?",o:["3 Ω","30 Ω","300 Ω","Er is geen eis"],a:1,e:"Principieel ≤ 30 Ω; tot 100 Ω met bijkomende 30 mA-maatregelen."},
 {p:"Waarom verbind je de waterleiding met de hoofdaardklem?",o:["Om de leiding te beschermen tegen roest","Om spanningsverschillen tussen metalen delen te vermijden","Omdat water stroom geleidt naar de meter","Het is niet nodig bij kunststofleidingen binnenshuis"],a:1,e:"Equipotentiaal: als alles op dezelfde potentiaal staat, loopt er geen stroom door jou."},
 {p:"Waarvoor dient de meetklem?",o:["Om de stroom te meten","Om de aarding los te koppelen voor de meting","Om de nul te aarden","Om bliksem af te leiden"],a:1,e:"Via de meetklem kan de keurder de aardelektrode afzonderlijk meten."}
],
"Badkamer":[
 {p:"Welke volumes kent een badkamer sinds 1 maart 2025?",o:["0, 1, 1bis, 2, 3","0, 1, 2","1, 2, 3","Alleen 0 en 1"],a:1,e:"Volume 1bis ging op in volume 1, volume 3 verdween. Een aparte douche kent enkel 0 en 1."},
 {p:"Mag je een stopcontact plaatsen in volume 1?",o:["Ja, als het IPX4 is","Ja, met een klapdeksel","Nee","Alleen voor een scheerapparaat"],a:2,e:"In volume 0 en 1 komen geen contactdozen."},
 {p:"Wat is de veiligste keuze voor een stopcontact aan de lavabo naast het bad?",o:["In volume 2, met IP44","Buiten volume 2, in de ruimte","Boven het bad, op 2 m","In volume 1, met een eigen automaat"],a:1,e:"Buiten de volumes is altijd toegelaten, mits 30 mA, aarding en kinderbeveiliging."}
],
"Schema's & keuring":[
 {p:"Welke twee schema's vraagt de keurder?",o:["Grondplan en gevelplan","Eendraadschema en situatieschema","Meetrapport en offerte","Stroomschema en bouwplan"],a:1,e:"Het eendraadschema toont de logica, het situatieschema de plaats in de woning."},
 {p:"Hoelang is een conform keuringsverslag van een woning geldig?",o:["5 jaar","10 jaar","25 jaar","Onbeperkt"],a:2,e:"Huishoudelijk: 25 jaar. Niet-huishoudelijk: 5 jaar."},
 {p:"Je koopt een huis met een niet-conform verslag. Hoeveel tijd heb je?",o:["6 maanden","12 maanden","18 maanden","Geen termijn"],a:2,e:"Sinds de laatste wijziging heeft de koper 18 maanden na de akte."}
],
"Laadpaal":[
 {p:"Waarom volstaat een gewone type A-differentieel niet zomaar voor een laadpaal?",o:["Hij is te traag","Een DC-lekstroom > 6 mA kan hem verblinden","Hij kan geen 32 A aan","Type A is verboden in garages"],a:1,e:"Boven 6 mA DC is de werking van type A niet gegarandeerd."},
 {p:"Je laadpaal heeft ingebouwde 6 mA DC-detectie. Wat plaats je in het bord?",o:["Niets extra","Type A 30 mA op een eigen kring","Type AC 300 mA","Type B 300 mA gedeeld met de rest"],a:1,e:"Type A 30 mA + ingebouwde RDC-DD is een geldige combinatie."},
 {p:"Twee laadpalen hangen samen achter de hoofddifferentieel type A. Wat is het probleem?",o:["Geen probleem","De DC-lekstromen tellen op en kunnen de type A verblinden","Ze laden trager","De automaat springt"],a:1,e:"Tak ze parallel af vóór de type A, of vervang die door een type B."}
],
"PV & batterij":[
 {p:"Sinds wanneer bevat het AREI een volledig kader voor gelijkstroominstallaties?",o:["1 juni 2020","1 juni 2023","1 maart 2025","1 april 2026"],a:3,e:"KB van 6 oktober 2025, van toepassing vanaf 1 april 2026."},
 {p:"Je PV-installatie is in 2024 conform gekeurd. Moet je die nu aanpassen?",o:["Ja, vóór eind 2026","Nee, wat conform was bij plaatsing blijft conform","Enkel de omvormer vervangen","Alleen bij verkoop"],a:1,e:"Nieuwe regels gelden voor nieuwe of gewijzigde installaties."},
 {p:"Wat moet je doen met een nieuwe thuisbatterij op het schema?",o:["Niets, het is een toestel","Enkel op het situatieschema","Op eendraad- én situatieschema","Enkel een foto bij het dossier"],a:2,e:"Batterij, omvormer en beveiliging komen op beide schema's."}
],
"Domotica & eindtest":[
 {p:"Een Shelly-module schakelt een lamp. Wat moet hij onderbreken?",o:["De nul","De fase","De aarding","Maakt niet uit"],a:1,e:"Schakelen gebeurt altijd in de fase."},
 {p:"Je legt een KNX-buskabel in dezelfde doos als 230 V-draden. Wanneer mag dat?",o:["Altijd","Nooit, in geen enkel geval","Als ze geïsoleerd is voor de hoogste aanwezige spanning of fysiek gescheiden","Als de buskabel groen is"],a:2,e:"Zeer lage spanning en 230 V moeten gescheiden zijn, of de isolatie moet geschikt zijn voor de hoogste spanning."},
 {p:"Wat controleer je vlak voor de keurder komt?",o:["Of alle lampen branden","Etiketten volgens schema, 30 mA op licht en stopcontacten, testknoppen","Of de meterstand klopt","Of de kabels nieuw zijn"],a:1,e:"Etiketten, differentiëlen en schema's zijn de meest voorkomende opmerkingen."}
],
"Kringplanner":[
 {p:"Waarom spreid je de verlichtingskringen over verschillende differentiëlen?",o:["Omdat het AREI dat eist","Zodat je bij het uitvallen van één differentieel nog licht hebt","Omdat lampen veel lekstroom geven","Om kabel te besparen"],a:1,e:"Het is geen verplichting, wel verstandig: als één differentieel uitvalt, zit je niet volledig in het donker."},
 {p:"Waar mag een vast aangesloten kookplaat komen?",o:["Achter een differentieel van 30 mA, verplicht","Direct achter de hoofddifferentieel van 300 mA","Voor de hoofddifferentieel","Op de stopcontactkring van de keuken"],a:1,e:"Vast aangesloten toestellen zonder stopcontact mogen direct achter de 300 mA. Een eigen kring is verplicht."},
 {p:"Je hebt 11 kringen met licht en stopcontacten. Hoeveel differentiëlen van 30 mA heb je minstens nodig?",o:["1","2","3","11"],a:1,e:"Max. 8 eindstroombanen per 30 mA, dus 11 kringen vragen er minstens 2."}
],
"Symbolen & eendraadschema":[
 {p:"Hoe herken je het symbool voor een lichtpunt?",o:["Een cirkel met een kruis erin","Een lijn die eindigt op een kruis, zonder cirkel","Een cirkel met een stip","Een driehoekje op een lijn"],a:1,e:"Een lichtpunt is een toevoerlijn die eindigt op een kruis. Een cirkel met een kruis is in tabel 2.23 het symbool voor een projector, niet voor een lichtpunt."},
 {p:"Hoe zie je aan het symbool dat een schakelaar twee- of driepolig is?",o:["Aan een pijltje","Aan drie korte dwarsstreepjes op de schuine lijn","Aan een dubbele cirkel","Aan een lijn die aan twee kanten doorloopt"],a:1,e:"Een kale lijn is enkelpolig; drie streepjes erop staan voor twee- of driepolig. Een lijn die aan beide kanten van het cirkeltje doorloopt, is een wisselschakelaar."},
 {p:"Welk gegeven hoort niet op het eendraadschema?",o:["Kabeltype en sectie","Kaliber van de automaat","Merk en kleur van de afdekplaten","Nummers van de punten"],a:2,e:"Merk en afwerking doen er niet toe. Kabel, beveiliging en de punten in volgorde wel."},
 {p:"Punt A3 op het eendraadschema. Waar vind je het terug?",o:["Nergens anders","Met hetzelfde nummer op het situatieschema","Alleen op het etiket van het bord","In het keuringsverslag"],a:1,e:"Het situatieschema toont waar A3 in de woning zit, met hetzelfde nummer."}
],
"Foutzoeken":[
 {p:"De differentieel valt meteen weer uit als je hem opzet. Wat doe je eerst?",o:["Hem vervangen door een van 300 mA","Alle automaten eronder uitzetten en ze dan één voor één terug opzetten","De hoofdschakelaar herhaaldelijk aan- en uitzetten","De aarding losmaken"],a:1,e:"Zo vind je de kring met de lekstroom zonder iets open te maken."},
 {p:"Een automaat valt meteen weer uit, ook met alle toestellen uitgetrokken. Wat is de juiste reactie?",o:["Een zwaardere automaat plaatsen","Blijven proberen tot hij blijft","De kring uitlaten en een vakman laten zoeken","De automaat overbruggen"],a:2,e:"Dan zit de kortsluiting in de vaste bekabeling. Daar begin je als leek niet aan."},
 {p:"Bij strijken en de waterkoker samen valt de automaat van de keuken soms uit. Mag je een automaat van 25 A plaatsen op 2,5 mm²?",o:["Ja, dat lost het op","Nee, dan beschermt de automaat de kabel niet meer","Ja, als het maar tijdelijk is","Ja, met een differentieel erbij"],a:1,e:"De automaat beschermt de kabel. Spreid de toestellen of voorzie een extra kring."},
 {p:"Een stopcontact is warm en bruin verkleurd. Wat doe je?",o:["Er een ander toestel insteken","De kring uitschakelen en een vakman laten komen","De afdekplaat vervangen","Niets, dat is normaal bij zware toestellen"],a:1,e:"Verkleuring wijst op een slechte verbinding die warm wordt. Dat is een brandrisico."}
]
};
