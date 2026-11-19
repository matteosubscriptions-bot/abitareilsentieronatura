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
scuole-gruppi.html         → Scuole & Gruppi · aziende.html → Aziende (scuole-team.html rimanda alla prima)
testimonianze.html         → Video + recensioni scritte + "lascia la tua"
chi-sono.html              → Matteo Mancini: hero, slider, storia in 6 tappe (foto + "cosa è successo / cosa mi ha lasciato"), formazione, galleria. Foto e testi modificabili da admin → Pagine del sito → Chi sono
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
Apri `admin.html` (non è linkata dal sito ed è `noindex`). **Accesso con utente e password** (la sessione dura finché chiudi la scheda; "Esci" in alto).
Per ogni esperienza gestisci: **generale** (nome, tipologia, durata, luogo di base, **immagine della card**, visibilità), **media**
(**header principale**, **slider**, **galleria**, scelti dalla libreria), **prezzo** (intero, early bird, giorni prima), **date** con
**luogo per ogni data** e etichetta, **domande**, **info utili** e **cosa impari** (con foto dalla libreria). Tutto finisce in
`events.js` (fonte unica) e le pagine si aggiornano da sole.
- **Libreria media**: carichi le foto (JPG, PNG, WebP; si ridimensionano a max 2200 px e si salvano in `images/`), dai una descrizione (alt)
  e le scegli da ogni esperienza. Le foto nuove restano "da pubblicare" finché non pubblichi.
- **Menu**: la casella "Mostra nel menu" decide se l'esperienza compare nel menu a tendina, nel menu mobile e nel footer.
- **Collegate**: scegli 2 o 3 esperienze per la sezione "Altri corsi ed esperienze" in fondo a ogni pagina (testi card: descrizione breve, partecipanti, etichetta).
- **Testimonianze** (voce in alto nella colonna a sinistra): testo, titolo, etichetta, **video** (link YouTube/Vimeo oppure file `videos/…mp4`) e
  anteprima opzionale; per ognuna decidi se compare in home, nella pagina Testimonianze e/o nelle pagine delle esperienze. Con un video va nei
  caroselli video, solo testo come citazione/recensione. YouTube/Vimeo si caricano solo al click (player senza cookie prima del play).
  Le pagine esperienza senza testimonianze nascondono la sezione.
- **Anteprima**: il pulsante apre la pagina con `?preview=1` e mostra la bozza (le foto appena caricate si vedono dopo la pubblicazione).
- **Pubblica sul sito**: scrive nel repository (prima le foto nuove, poi `events.js`) via API GitHub. Serve un *fine-grained token* con permesso
  **Contents: Read and write** solo su questo repository (GitHub → Settings → Developer settings). Il token si può ricordare solo su questo browser.
  Alternativa senza token: **Scarica events.js** e sostituisci il file nel repository (le foto nuove vanno caricate a mano in `images/`).
- Le modifiche non pubblicate (foto comprese) restano come bozza nel browser. **Importa** carica un `events.js` scaricato da questa pagina.
- Nei testi: `**grassetto**`, `[da completare]` (evidenziato), `{early}` `{regular}` `{days}` (si riempiono col prezzo).
- L'HTML delle pagine conserva il testo e le foto originali come riserva (utile senza JavaScript); quello che vedi sul sito viene da `events.js`.
- **Sicurezza**: il sito è statico, quindi il login è solo un blocco di cortesia lato browser (le credenziali sono verificate con un hash nel file):
  non protegge i dati, che in `events.js` sono comunque pubblici. Chi non ha il token GitHub non può comunque pubblicare nulla.
  Per una protezione vera, metti una password sul file `admin.html` dall'hosting.

## Pagine nuove
- **Scuole & Gruppi** (`scuole-gruppi.html`): scuole, centri estivi e famiglie — metodologia, proposte per target (schede), come collaboriamo, FAQ e richiesta di proposta
  che compone il messaggio per WhatsApp/email. I campi `[tra parentesi]` sono dati da completare (tesserino, assicurazione, prezzi…). `scuole-team.html` rimanda qui.
- Le due pagine seguono il **template delle esperienze**: hero con chip, **slider sotto l'header**, banda CTA, galleria e barra fissa "Richiedi/Contattami".
  Foto di header, slider e galleria si gestiscono dall'admin (Pagine del sito → pagina → *Media*, dati in `pagemedia`).
- **Aziende** (`aziende.html`): "Sulla stessa traccia", costruita sulla struttura **ACORN** (Ascolto, Coesione, Orientamento, Resilienza, Nuove idee: una mia
  interpretazione, modificabile), attività in forma di idea, come funziona, location (Canyon Park Bagni di Lucca, Parco Avventura Il Gigante) e contatto.
  Le foto `images/team-*.jpg` sono ritagli del PDF "Formazione esperienziale outdoor".

- **Metodo** (`metodologia.html`): "Il corpo fa la prima mossa". Per ognuno dei 7 strumenti (apprendimento esperienziale, testa-cuore-mani, Coyote Mentoring e Lavoro che riconnette,
  8 Shields, cerchi e comunicazione non violenta, bushcraft, permacultura): cos'è, da dove viene, nella mia vita, nel bosco con te. I fatti personali vengono dal prototipo
  (storia, formazioni); le origini storiche degli strumenti sono sintetiche: rivedile. Menu: voce "Metodo".

## Testi e foto di tutte le pagine (admin)
In `admin.html` → **Pagine del sito** (Home, Esperienze, Calendario, Chi sono, Scuole & Gruppi, Aziende, Testimonianze, **Globale** = barra annunci e footer) e,
dentro ogni esperienza, la scheda **Testi pagina**. L'admin legge la pagina pubblicata, elenca testi e foto per sezione e salva solo le differenze in `events.js`
(`pages`). Ogni elemento ha una chiave nel codice (`data-edit="eN"`, `data-edit-img="iN"`). Nei testi: `**grassetto**`, `//corsivo//`, `==evidenziato==`,
`[da completare]`, invio = a capo; i pulsanti hanno anche il campo Link; ogni pagina ha titolo e descrizione per Google. "Ripristina" torna all'originale.
Se aggiungi a mano nuovi testi in una pagina, lancia lo strumento di marcatura (o chiedi) per renderli modificabili.
Le sezioni dinamiche (date, domande, info utili, cosa impari, media, testimonianze, menu) si gestiscono dalle loro schede dedicate.

## Sfondo, slider e gallerie modificabili
In admin → **Home** trovi **Media della home** (sfondo in alto: foto e/o video, slider sotto l'header, galleria) e lo **slider della scheda Escape the City**
(lo stesso della scheda nel **catalogo Esperienze**). Come nelle altre pagine puoi cambiare, aggiungere, togliere e riordinare le foto. Per usare solo una foto
come sfondo della home lascia vuoto il campo video. Le foto singole (card, riquadri) si cambiano da "Testi e foto" della pagina.

## Video dell'esperienza
Ogni pagina esperienza ha un blocco scuro "Guarda com'è" prima di "Cosa impari". In admin → esperienza → scheda **Video**: spunta "Mostra il video nella pagina", incolla il link
YouTube/Vimeo (consigliato) o carica un file, scegli la copertina e i testi (sopratitolo, titolo, etichetta, frase). Spento o senza video, il blocco non compare.

### Più video nella stessa pagina
Nella scheda **Video** puoi aggiungere quanti video vuoi (YouTube/Vimeo o file), riordinarli e dare a ciascuno copertina e didascalia. Con uno solo il video è grande; con due o tre diventa una griglia.

## Nascondere pagine
Da admin: per ogni pagina del sito (Pagine del sito → pagina → **Visibilità della pagina**) e per ogni esperienza (scheda **Generale**):
- **Nascosta**: sparisce da menu (computer e telefono), footer e pulsanti delle altre pagine; il link diretto funziona e la pagina non viene indicizzata.
- **Disattivata**: come Nascosta, e chi apre il link va alla home.
La home non si può nascondere. Il dato sta in `events.js` (`pagesHidden`).

## Video o foto: sfondi, slide, testimonianze
- **Sfondo con video YouTube**: in Media → sfondo in alto → Video, incolla il link YouTube (o indica un file). Parte da solo, senza audio, in loop; la **copertina** (foto) resta come sfondo
  finché il video non parte, e resta se non può partire (apertura da file locale, "riduci movimento" attivo, autoplay bloccato). Per lo sfondo non è supportato Vimeo.

- **Sfondo in alto** di ogni pagina (home, esperienze, calendario, testimonianze, Scuole, Aziende, Metodo, Chi sono, pagine esperienza): in admin → Media scegli **Foto** oppure **Video**.
  Con il video la foto resta come copertina. Meglio clip brevi (5–15 s), senza audio, sotto 5–8 MB.
- **Slide sotto l'header**: ogni slide può avere, oltre alla foto, un **video** (la foto fa da copertina).
- **Gallerie**: per ogni foto puoi **Cambia**, spostare o togliere; "Parti da quelle attuali della pagina" riempie l'elenco con quello che la pagina mostra oggi.
- **Testimonianze**: il più funzionale è **YouTube** (anche "non in elenco"): non pesa sul sito, parte veloce da telefono, si adatta alla connessione. Il **file** (`videos/…`)
  va bene solo per clip brevi e leggere; i file molto pesanti rallentano il sito e GitHub accetta file fino a ~100 MB. L'admin offre entrambe le strade.
- I video caricati dall'admin finiscono in `videos/` (max 40 MB da qui; oltre, copiali a mano in `videos/` e scrivi il percorso).

## Libreria media = cartella `images/`
Aprendo l'admin (e con "Sincronizza con la cartella") la libreria legge la cartella `images/`: prova l'elenco file del server (serve l'indice di directory attivo) e
l'API GitHub del repository (se privato serve il token). I file trovati compaiono in libreria; quelli caricati dall'admin finiscono in `images/` pubblicando.
Le voci il cui file non c'è più sono segnate "file non trovato" e si possono rimuovere in blocco.

## Lavorare in locale (senza GitHub)
Scaricata la cartella del sito sul computer, puoi aprire `admin.html` direttamente (doppio clic) e modificare tutto. In **Pubblica sul sito** trovi:
- **Salva nella cartella del sito…** (Chrome o Edge): scegli la cartella (quella con `index.html`) e l'admin scrive `events.js` e le foto nuove in `images/`.
  Il pulsante **Collega cartella** in alto fa la stessa scelta in anticipo, così l'admin legge anche l'elenco di `images/` e le pagine da modificare (da file locale il browser non le legge da solo).
- **Scarica pacchetto (.zip)** (qualsiasi browser): contiene `events.js` e le foto nuove; decomprimilo dentro la cartella del sito sostituendo `events.js`.
- **Pubblica su GitHub**: come prima, con il token.
Dopo il salvataggio in locale apri `index.html` dalla cartella per vedere le modifiche. Il collegamento alla cartella vale per la sessione: dopo aver ricaricato l'admin va ripetuto.

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
