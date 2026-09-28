# Stroomwijs

Interactieve cursus voor doe-het-zelvers die hun woning willen bekabelen volgens het Belgische AREI (Boek 1), stand september 2026. Statische website, geen build-stap, geen afhankelijkheden behalve Google Fonts.

## Lokaal bekijken

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

`index.html` rechtstreeks openen werkt ook, maar via een lokale server gedraagt de site zich zoals op GitHub Pages.

## Structuur

```
index.html                 alle cursusinhoud (één <section> per module)
assets/css/style.css       vormgeving, licht en donker thema
assets/js/quiz-data.js     toetsvragen per module
assets/js/core.js          nummering, voortgang, navigatie, toetsen, rekenhulp, kringcontrole
assets/js/schakelingen.js  klikbare schakelschema's
assets/js/klemmen.js       achterkant van schakelaars met klemmen
assets/js/symbolen.js      symbolen, flitskaarten, voorbeeldschema
assets/js/foutzoeken.js    foutzoek-wegwijzer
assets/js/kringplanner.js  kringplanner
```

## Disclaimer

Deze cursus vat het AREI samen en vervangt de officiële tekst niet. Een nieuwe of gewijzigde installatie moet gekeurd worden door een erkend keuringsorganisme.
