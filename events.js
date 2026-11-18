/* Abitare il Sentiero — DATE DELLE ESPERIENZE (unica fonte)
   ------------------------------------------------------------------
   Modifica SOLO questo file per aggiornare date e dettagli: il Calendario,
   le "prossime 3 esperienze" e le date nelle singole pagine si aggiornano da sole.
   Le date passate spariscono automaticamente (si confronta con il giorno di oggi).

   - experiences: una voce per esperienza.  active:false = esperienza nascosta
     (non compare in calendario / "prossime date"); mettila a true per riattivarla.
   - events: una riga per ogni data. Formato date: "AAAA-MM-GG".
     end = ultimo giorno (se è un solo giorno puoi ometterlo).
     place (opzionale) sovrascrive il luogo dell'esperienza; note (opzionale) = etichetta es. "Pochi posti".
   - price: solo dove c'è un prezzo in chiaro (early bird fino a N giorni prima della data).
   Script classico (niente type="module"). Le date qui sotto sono INDICATIVE: da confermare. */
window.AIS_DATA = {
  experiences: {
    "escape-the-city":         { name: "Escape the City",         type: "immersione", duration: "2 giorni",  place: "Appennino",  url: "escape-the-city.html",         active: true,
                                  price: { early: 115, regular: 135, daysBefore: 15 } },
    "elementi-di-convivenza":  { name: "Elementi di Convivenza",  type: "immersione", duration: "3 giorni",  place: "Appennino",  url: "elementi-di-convivenza.html",  active: true },
    "orienteering-sensoriale": { name: "Orienteering sensoriale", type: "avventura",  duration: "6 ore",     place: "Appennino",  url: "orienteering-sensoriale.html", active: true },
    "accendi-il-tuo-fuoco":    { name: "Accendi il tuo Fuoco",    type: "soglia",     duration: "3 ore",     place: "Toscana",    url: "accendi-il-tuo-fuoco.html",    active: true },
    /* --- pagine nascoste al momento (active:false) --- */
    "tribu-del-bosco":         { name: "Tribù del bosco",         type: "avventura",  duration: "6 ore",     place: "Appennino",  url: "tribu-del-bosco.html",         active: false },
    "guardiani-del-fuoco":     { name: "Guardiani del Fuoco",     type: "immersione", duration: "18 → 12",   place: "Appennino",  url: "guardiani-del-fuoco.html",     active: false },
    "la-mappa-del-tuo-viaggio":{ name: "La Mappa del tuo Viaggio",type: "soglia",     duration: "3 ore",     place: "Appennino",  url: "la-mappa-del-tuo-viaggio.html",active: false },
    "via-degli-dei":           { name: "Via degli Dei",           type: "immersione", duration: "24 ore",    place: "Appennino",  url: "via-degli-dei.html",           active: false },
    "cammino":                 { name: "Il Cammino",              type: "immersione", duration: "4 giorni",  place: "Italia",     url: "cammino.html",                 active: false }
  },
  events: [
    { exp: "accendi-il-tuo-fuoco",     start: "2027-04-11" },
    { exp: "orienteering-sensoriale",  start: "2027-04-24" },
    { exp: "escape-the-city",          start: "2027-05-08", end: "2027-05-09", note: "Pochi posti" },
    { exp: "elementi-di-convivenza",   start: "2027-06-18", end: "2027-06-20" },
    { exp: "escape-the-city",          start: "2027-06-26", end: "2027-06-27" },
    { exp: "accendi-il-tuo-fuoco",     start: "2027-07-04", place: "Emilia-Romagna" },
    { exp: "escape-the-city",          start: "2027-09-11", end: "2027-09-12" },
    { exp: "orienteering-sensoriale",  start: "2027-09-19" },
    { exp: "elementi-di-convivenza",   start: "2027-10-08", end: "2027-10-10" },
    /* date delle pagine nascoste (compaiono solo con active:true) */
    { exp: "la-mappa-del-tuo-viaggio", start: "2027-04-18" },
    { exp: "tribu-del-bosco",          start: "2027-05-16" },
    { exp: "guardiani-del-fuoco",      start: "2027-05-22", end: "2027-05-23" },
    { exp: "via-degli-dei",            start: "2027-06-12", end: "2027-06-13" },
    { exp: "guardiani-del-fuoco",      start: "2027-07-10", end: "2027-07-11" },
    { exp: "cammino",                  start: "2027-09-02", end: "2027-09-05" },
    { exp: "la-mappa-del-tuo-viaggio", start: "2027-10-03" }
  ]
};
