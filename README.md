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
