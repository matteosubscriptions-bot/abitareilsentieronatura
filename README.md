# Abitare il Sentiero — sito (versione "natura")

Sito di **Abitare il Sentiero**: esperienze nel selvatico per adulti, con il weekend di punta
**Escape the City** e proposte per **scuole, ragazzi e team**. La struttura è ispirata a un
catalogo-percorso (sul modello di madrenaturaeducamp.it): barra annunci, catalogo a card per livelli,
evento in evidenza con urgenza, caroselli video, pagina Testimonianze, FAQ e bande CTA per la guida.
La palette e la voce restano quelle del brand (forest/cream/sand/earth + un accento caldo terracotta;
Cormorant Garamond + Inter).

Sito **statico multi-pagina**: una pagina = un file `.html`. **Nessuna build**, **nessuno
`<script type="module">`** (così non si ripresenta l'errore MIME `text/plain` sul server).
Header e footer sono **incorporati in ogni pagina** (fonte in `partials/`), quindi il menu c'è
sempre anche se il server non carica gli include via fetch.

## Struttura
```
index.html                 → Home (hero, selettore percorsi, evento in evidenza, catalogo a livelli, metodo, testimonianze, guida)
esperienze.html            → Catalogo/percorso completo (Soglie · Immersioni · Percorsi & Comunità)
escape-the-city.html       → Escape the City (punta) — racconto giorno-per-giorno, €135 · early bird €115
orienteering-sensoriale.html · tribu-del-bosco.html · guardiani-del-fuoco.html   → 3 esperienze NUOVE (bozze di testo da rivedere)
accendi-il-tuo-fuoco.html · la-mappa-del-tuo-viaggio.html · via-degli-dei.html · elementi-di-convivenza.html · cammino.html
scuole-team.html           → Scuole e ragazzi + Team e organizzazioni
testimonianze.html         → Video + recensioni scritte + "lascia la tua"
chi-sono.html              → Matteo Mancini (storia/timeline, metodo)
privacy.html · cookie-policy.html
partials/header.html · partials/footer.html   → testata (con barra annunci) e footer, UNICI
config.js · site.js · cookies.js · forms.js · styles.css · images/ · videos/ · downloads/
```

## Catalogo (per livelli)
- **Soglie** (poche ore): Orienteering sensoriale (6h) · Tribù del bosco (6h) · Accendi il tuo Fuoco (3h) · La Mappa del tuo Viaggio (3h)
- **Immersioni** (con pernotto): **Escape the City** (30h) · Guardiani del Fuoco (18→12) · Via degli Dei (24h) · Elementi di Convivenza (2 gg) · Il Cammino (4 gg)
- **Percorsi & Comunità**: direzione futura (Cerchio dell'Anno), non prenotabile.

## Date delle esperienze (dinamiche)
Le date stanno in **un solo file: `events.js`**. Da lì si aggiornano da sole il **Calendario** (`calendario.html`), le
**"prossime 3 esperienze"** (`esperienze.html`), le date, i prezzi, le FAQ, le info utili e il "cosa impari" di ogni pagina esperienza. Le date **passate spariscono
da sole** (si confronta con il giorno di oggi) e l'**early bird** di Escape (€115 fino a 15 giorni prima, poi €135)
è calcolato per ogni data. Per aggiungere una data: una riga in `events` (`start`/`end` in formato `AAAA-MM-GG`).
`active:false` = esperienza nascosta (non compare in calendario/prossime date). Le date attuali sono **indicative (2027)**.
Il **Calendario** è a **card con foto** (campo `img` di ogni esperienza in `events.js`) e si **filtra per tipologia**
(Soglia: meno di 1 giorno · Avventura: fino a 1 giorno · Immersione: più giorni).
Se JavaScript non parte resta visibile l'elenco statico di riserva presente nell'HTML.

## Ancore e menu fisso
I link interni (`#id`, anche da un'altra pagina con `pagina.html#id`) scrollano in modo che il **titolo della sezione**
resti visibile sotto barra annunci + menu (logica in `site.js`, `scrollToId`; margine di sicurezza in `styles.css`, `scroll-padding-top`).

## Pagina Escape (e struttura di tutte le pagine esperienza)
Struttura: hero → foto → intro "Sopravvivere o convivere" → **Nessun segnale** → Cosa impari (card con foto) → Testimonianze →
banda CTA → galleria → Cosa porti a casa → Date → Info → FAQ → Altri corsi → CTA. Barra **"Prenota" fissa** (`data-sticky-cta`),
visibile dopo l'hero e nascosta su date/contatto. Il canale per le **urgenze** (nessun segnale sul posto) è un segnaposto da definire.
Le altre 8 pagine esperienza seguono lo **stesso schema**: hero → foto → introduzione → pannello foto con la frase-chiave
specifica → card con foto → (recensioni *oppure* "cosa potresti portarti a casa") → banda CTA → galleria → date → info → FAQ →
altri corsi → CTA, con barra "Prenota" fissa. Le sezioni lunghe "Cosa succede" e "Per chi è" sono state tolte (restano nella
cronologia git). Le recensioni vere esistono solo per Accendi e La Mappa; nelle altre ci sono esempi dichiarati come tali.

## Pagina di gestione (`admin.html`)
Apri `admin.html` (non è linkata dal sito ed è `noindex`). Per ogni esperienza gestisci: **generale** (nome, tipologia, durata, luogo di base,
foto, visibilità), **prezzo** (intero, early bird, giorni prima), **date** con **luogo per ogni data** e etichetta, **domande**, **info utili**
e **cosa impari**. Tutto finisce in `events.js` (fonte unica) e le pagine si aggiornano da sole.
- **Anteprima**: il pulsante apre la pagina con `?preview=1` e mostra la bozza, senza pubblicarla.
- **Pubblica sul sito**: scrive `events.js` nel repository via API GitHub. Serve un *fine-grained token* con permesso **Contents: Read and write**
  solo su questo repository (GitHub → Settings → Developer settings). Il token si può ricordare solo su questo browser.
  Alternativa senza token: **Scarica events.js** e sostituisci il file nel repository.
- Le modifiche non pubblicate restano come bozza nel browser. **Importa** carica un `events.js` scaricato da questa pagina.
- Nei testi: `**grassetto**`, `[da completare]` (evidenziato), `{early}` `{regular}` `{days}` (si riempiono col prezzo).
- Nota: l'HTML delle pagine conserva ancora il testo originale come riserva (utile senza JavaScript); quello che vedi sul sito
  viene da `events.js`. Chi pubblica da `admin.html` non deve toccare l'HTML.
- Sicurezza: la pagina è pubblica ma senza token non può scrivere nulla; i dati in `events.js` sono comunque pubblici.

## Pagine temporaneamente nascoste
Per ora **nessun link** porta a queste 5 pagine (i file restano nel repo, raggiungibili solo con l'URL diretto):
`la-mappa-del-tuo-viaggio.html` · `via-degli-dei.html` · `cammino.html` · `tribu-del-bosco.html` · `guardiani-del-fuoco.html`.
Sono state tolte da menu, footer, catalogo (`esperienze.html`), calendario e rimandi interni.
Per riattivarle: ripristina le voci in `partials/header.html` / `partials/footer.html` (poi ricopia il blocco nelle pagine),
le card in `esperienze.html` e le righe in `calendario.html` — oppure recupera tutto dal commit precedente
(`git show HEAD~1:<file>`). Le testimonianze segnaposto citano ancora "La Mappa del tuo Viaggio" come testo.

## Da completare (segnaposto)
- **Testi delle 3 nuove esperienze** (Orienteering sensoriale, Tribù del bosco, Guardiani del Fuoco):
  sono **bozze on-brand** da rivedere con i tuoi contenuti reali.
- **Prezzi** diversi da Escape: riga "Investimento → scrivimi"; inserisci le cifre quando le definisci.
- **Logistica**: righe `[da completare]` nelle "Info utili" (pernottamento, pasti, ritrovo).
- **Testimonianze**: video e recensioni sono **segnaposto** da sostituire con quelle reali.
- **Immagini/video stand-in**: alcune foto sono placeholder (una, `images/full-fuoco.jpg`, ha un
  watermark "AI生成"): sostituiscile con foto reali mantenendo gli stessi nomi file.
- **Barra annunci**: testo in `partials/header.html` (pagamento a rate · early bird) — aggiornalo quando serve.
- **Dati titolare** nelle policy (indirizzo, eventuale P.IVA): completali prima della pubblicazione.

## Configurazione
Tutto ciò che va personalizzato è in `config.js` (endpoint email `FORM_ENDPOINT`, PDF guida,
`GA_MEASUREMENT_ID`, `META_PIXEL_ID`). GA e Meta Pixel partono **solo** dopo il consenso ai cookie.

## Anteprima locale
```sh
python3 -m http.server 8099
# poi apri http://localhost:8099/
```

## Palette & accento
forest `rgb(45 90 39)` · cream `rgb(253 251 247)` · sand `rgb(245 240 232)` · earth `rgb(196 169 125)`
· **accento caldo** terracotta `#b0542d` (solo per CTA primarie e urgenze). Font: Cormorant Garamond
(display) + Inter (testo). Stile in fondo a `styles.css` (layer `.ais-*`, incluso il layer "v5"
catalogo-percorso: topbar, card, livelli, evento, banda CTA calda, recensioni).
