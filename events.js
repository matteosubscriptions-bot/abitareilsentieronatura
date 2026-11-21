/* Abitare il Sentiero — DATI DELLE ESPERIENZE (unica fonte)
   ------------------------------------------------------------------
   Questo file si modifica dalla pagina  admin.html  (consigliato) oppure a mano.
   Da qui si aggiornano da sole: Calendario, "prossime 3 esperienze", date, prezzi,
   domande frequenti, info utili, "cosa impari" e media di ogni pagina esperienza.
   Le date passate spariscono da sole (si confronta con il giorno di oggi).

   Per ogni esperienza (experiences):
   - name, type (soglia|avventura|immersione), duration, place, url, img (foto della card)
   - active: false = nascosta (non compare in calendario / "prossime date")
   - price: { early, regular, daysBefore } = prezzo early bird fino a N giorni prima, poi intero
   - info: righe "Info utili" [{ k, v, ico? }]    - faq: [{ q, a }]
   - learn: card "Cosa impari" [{ img, icon, title, chips[] }]
   - activities: "Cosa facciamo" [{ icon, title, text }]
   - media: { hero: { img, video? }, slider: [{ img, cap }], gallery: [img, ...] }
   - menu: true = compare nel menu (e nel footer);  blurb, group, badge = testi della card;
     related: [slug, slug, slug?] = le 2-3 esperienze collegate ("Altri corsi ed esperienze")
   Testimonianze (testimonials): [{ id, name, label, title?, text?, video?, poster?, home, page, exps[] }]
     video = link YouTube / Vimeo oppure file (videos/nome.mp4); home/page/exps = dove compare.
   Media di pagine non-esperienza (pagemedia): { "scuole-gruppi": { media: { hero, slider, gallery } }, "aziende": {...} }
   Testi e foto delle pagine (pages): { "<pagina>": { "<chiave>": "testo o percorso foto", ... }, "_global": {...} }
     chiavi: eN = testo (eN@href = link), iN = foto (iN.alt = descrizione), @title / @description = SEO.
     Nei testi: **grassetto**  //corsivo//  ==evidenziato==  [da completare]
   Libreria foto (media): [{ src, alt }] — le foto si caricano da admin.html (cartella images/).
   Nei testi: **grassetto**, [testo da completare] (evidenziato), {early} {regular} {days} (dal prezzo).
   Per ogni data (events): exp, start, end?, place? (luogo di quella data), note?  — formato date AAAA-MM-GG.
   Script classico (niente type="module"). Le date sono INDICATIVE: da confermare. */
window.AIS_DATA = {
  "experiences": {
    "escape-the-city": {
      "name": "Escape the City",
      "type": "immersione",
      "duration": "2 giorni",
      "place": "Toscana, Emilia, Lombardia",
      "img": "images/escape-the-city.jpg",
      "url": "escape-the-city.html",
      "active": true,
      "price": {
        "early": 125,
        "regular": 135,
        "daysBefore": 15,
        "promo": {
          "price": 115,
          "until": "2026-12-31"
        }
      },
      "info": [
        {
          "k": "Durata",
          "v": "2 giorni — da sabato mattina a domenica pranzo (sab ore 9 → dom ore 13).",
          "ico": "clock"
        },
        {
          "k": "Luogo",
          "v": "Toscana, Emilia, Lombardia [il luogo cambia a ogni edizione: punto di ritrovo da comunicare agli iscritti]",
          "ico": "pin"
        },
        {
          "k": "Gruppo",
          "v": "Piccoli gruppi, massimo 12 partecipanti.",
          "ico": "users"
        },
        {
          "k": "Difficoltà",
          "v": "Accessibile: serve una normale condizione fisica per camminare nel bosco. [Dettaglio da definire in base al percorso.]"
        },
        {
          "k": "Prezzo",
          "v": "{promoline}**€{early}** early bird — iscrivendoti fino a {days} giorni prima — poi **€{regular}**."
        },
        {
          "k": "Telefono",
          "v": "**Nessun segnale** nel luogo: sei fuori dalla rete, dentro l’esperienza. [Canale per le urgenze: da definire e comunicare agli iscritti]",
          "ico": "eye"
        },
        {
          "k": "Pernottamento",
          "v": "Una notte nel bosco. [Tenda/riparo: fornito o da portare — da completare]"
        },
        {
          "k": "Cosa include",
          "v": "Facilitazione, attività, materiali [pasti ed eventuale attrezzatura da specificare]."
        },
        {
          "k": "Cosa portare",
          "v": "[Checklist specifica inviata prima dell'esperienza.]"
        },
        {
          "k": "Cosa non serve",
          "v": "Esperienza precedente."
        }
      ],
      "faq": [
        {
          "q": "Quanto costa?",
          "a": "{promoline}€{early} con l'early bird, iscrivendoti fino a {days} giorni prima dell'edizione; dopo, €{regular}. Scrivimi per sapere cosa è incluso nell'edizione specifica."
        },
        {
          "q": "Davvero nessun segnale?",
          "a": "Sì. Nel luogo il telefono non prende: per due giorni sei fuori dalla rete. Prima della partenza ricevi le indicazioni su come essere raggiunto in caso di urgenza [da definire]."
        },
        {
          "q": "Devo essere allenato?",
          "a": "Serve una normale condizione fisica per camminare nel bosco e partecipare alle attività. Non è richiesta preparazione specifica."
        },
        {
          "q": "Devo avere esperienza di bushcraft?",
          "a": "No. Il programma è pensato anche per chi parte da zero."
        },
        {
          "q": "Devo saper usare una bussola?",
          "a": "No. Imparerai durante l'esperienza."
        },
        {
          "q": "Cosa succede se piove?",
          "a": "Il programma non viene semplicemente annullato perché piove. Il meteo diventa parte del contesto, con gli opportuni adattamenti di sicurezza: ad esempio si accorcia il trekking e si valorizzano il campo e il fuoco."
        },
        {
          "q": "Dormiamo davvero nel bosco?",
          "a": "Sì, secondo la formula prevista per l'edizione specifica."
        },
        {
          "q": "È un'esperienza spirituale? È una terapia?",
          "a": "No. Possono esserci momenti di silenzio, attenzione e riflessione, ma non è richiesto aderire a nessuna pratica o visione spirituale. È un'esperienza educativa ed esperienziale in natura, non una terapia."
        },
        {
          "q": "E se sono introverso? Posso venire da solo?",
          "a": "Non devi essere estroverso: ci saranno momenti condivisi e momenti personali. E sì, puoi venire da solo — molte persone arrivano senza conoscere nessuno."
        }
      ],
      "learn": [
        {
          "img": "images/accendi-fuoco.jpg",
          "icon": "fire",
          "title": "Tecniche pratiche",
          "chips": [
            "Fuoco",
            "Nodi",
            "Campo base"
          ]
        },
        {
          "img": "images/full-bosco.jpg",
          "icon": "leaf",
          "title": "Connessione col naturale",
          "chips": [
            "Tracce",
            "Alberi e piante",
            "Rispetto"
          ]
        },
        {
          "img": "images/full-avventura.jpg",
          "icon": "eye",
          "title": "Sensi e attenzione",
          "chips": [
            "Bussola e mappa",
            "Vista e udito",
            "Presenza"
          ]
        },
        {
          "img": "images/cammino-cerchio.jpg",
          "icon": "heart",
          "title": "Fiducia in te",
          "chips": [
            "Lavoro di gruppo",
            "Autonomia",
            "Silenzio"
          ]
        }
      ],
      "media": {
        "hero": {
          "img": "images/escape-the-city.jpg",
          "video": "videos/escape-city.mp4"
        },
        "slider": [
          {
            "img": "images/escape-the-city.jpg",
            "cap": "Una notte nel bosco"
          },
          {
            "img": "images/cammino-cerchio.jpg",
            "cap": "Il cerchio"
          },
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": "Accendere il fuoco"
          },
          {
            "img": "images/full-avventura.jpg",
            "cap": "Camminare lenti"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/cammino-giorno2.jpg",
            "cap": "Il rifugio"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          }
        ],
        "gallery": [
          "images/escape-the-city.jpg",
          "images/accendi-fuoco.jpg",
          "images/full-bosco.jpg",
          "images/full-avventura.jpg",
          "images/cammino-cerchio.jpg",
          "images/full-natura.jpg",
          "images/cammino-giorno2.jpg",
          "images/mappa-viaggio.jpg"
        ]
      },
      "menu": true,
      "blurb": "Due giorni nel selvatico, da sabato mattina a domenica pranzo: cammino, orientamento, fuoco, notte nel bosco. Il weekend di punta.",
      "group": "max 12",
      "badge": "Esperienza di punta",
      "related": [
        "elementi-di-convivenza",
        "orienteering-sensoriale"
      ],
      "activities": [
        {
          "icon": "fire",
          "title": "Il fuoco",
          "text": "Lo accendi con metodi primitivi e lo tieni vivo per tutto il weekend."
        },
        {
          "icon": "tent",
          "title": "Il campo base",
          "text": "Monti la tenda, cucini sul fuoco, organizzi il campo con il gruppo."
        },
        {
          "icon": "compass",
          "title": "Orientarsi",
          "text": "Mappa e bussola, ma anche segni, luce e forma del terreno."
        },
        {
          "icon": "hand",
          "title": "Nodi e corde",
          "text": "Fibre naturali e nodi essenziali, per legare, costruire e fissare."
        },
        {
          "icon": "leaf",
          "title": "Tracce e piante",
          "text": "Leggi le tracce degli animali e impari a riconoscere alberi e piante."
        },
        {
          "icon": "eye",
          "title": "Riflessione e condivisione",
          "text": "Un momento da solo nel bosco per fermarti e riflettere, poi il confronto con il gruppo."
        }
      ]
    },
    "orienteering-sensoriale": {
      "name": "Orienteering sensoriale",
      "type": "avventura",
      "duration": "6 ore",
      "place": "Appennino",
      "img": "images/mappa-viaggio.jpg",
      "url": "orienteering-sensoriale.html",
      "active": true,
      "info": [
        {
          "k": "Durata",
          "v": "6 ore — mezza giornata."
        },
        {
          "k": "Dove",
          "v": "Appennino, all’aperto. [punto di ritrovo da completare]"
        },
        {
          "k": "Gruppo",
          "v": "Piccolo — 6–10 persone."
        },
        {
          "k": "Esperienza richiesta",
          "v": "Nessuna: si parte da zero."
        },
        {
          "k": "Cosa portare",
          "v": "Scarpe comode, abbigliamento adatto a stare fuori, acqua. [pranzo al sacco — da completare]"
        },
        {
          "k": "Investimento",
          "v": "Scrivimi per il prezzo e le modalità. [da definire]"
        },
        {
          "k": "Come prenotare",
          "v": "Scrivimi su WhatsApp: ci sentiamo prima, così capiamo se fa per te."
        }
      ],
      "faq": [
        {
          "q": "Quanto costa?",
          "a": "Scrivimi: ti dico il prezzo e cosa è incluso in base alla data. Gruppi piccoli, posti limitati."
        },
        {
          "q": "Serve esperienza?",
          "a": "No. È pensato anche per chi non ha mai usato una mappa o una bussola."
        },
        {
          "q": "È una gara?",
          "a": "No. Non conta la velocità: conta l’attenzione. Si cammina lento, per osservare."
        },
        {
          "q": "Devo saper usare la bussola?",
          "a": "No. Imparerai durante l’esperienza, con le mani."
        }
      ],
      "learn": [
        {
          "img": "images/full-avventura.jpg",
          "icon": "compass",
          "title": "Lettura del territorio",
          "chips": [
            "Forme",
            "Direzioni",
            "Segni"
          ]
        },
        {
          "img": "images/hero-forest.jpg",
          "icon": "eye",
          "title": "I sensi",
          "chips": [
            "Vista",
            "Udito",
            "Tatto"
          ]
        },
        {
          "img": "images/full-bosco.jpg",
          "icon": "sparkles",
          "title": "Attenzione",
          "chips": [
            "Dettagli",
            "Ritmo lento"
          ]
        },
        {
          "img": "images/cammino-cerchio.jpg",
          "icon": "hand",
          "title": "Fiducia",
          "chips": [
            "Ciò che percepisci",
            "Meno schermo"
          ]
        }
      ],
      "media": {
        "hero": {
          "img": "images/mappa-viaggio.jpg"
        },
        "slider": [
          {
            "img": "images/mappa-viaggio.jpg",
            "cap": "Leggere dove sei"
          },
          {
            "img": "images/full-avventura.jpg",
            "cap": "Camminare lenti"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/cammino-giorno2.jpg",
            "cap": "Il rifugio"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          }
        ],
        "gallery": [
          "images/mappa-viaggio.jpg",
          "images/hero-forest.jpg",
          "images/full-bosco.jpg",
          "images/cammino-cerchio.jpg",
          "images/accendi-fuoco.jpg",
          "images/full-avventura.jpg",
          "images/escape-the-city.jpg",
          "images/cammino-giorno2.jpg"
        ]
      },
      "menu": true,
      "blurb": "Orientarsi coi sensi, non col GPS: leggere il territorio, le tracce, i suoni. Una giornata per imparare dove sei.",
      "group": "6–10",
      "related": [
        "accendi-il-tuo-fuoco",
        "escape-the-city"
      ],
      "activities": [
        {
          "icon": "compass",
          "title": "La carta",
          "text": "Si parte da una mappa topografica vera: curve di livello, corsi d’acqua, sentieri."
        },
        {
          "icon": "route",
          "title": "Dalla mappa al terreno",
          "text": "Poi si esce a cercarli nel paesaggio, a passo lento."
        },
        {
          "icon": "eye",
          "title": "I sensi",
          "text": "Vista, udito, tatto: leggere il terreno, la luce, i suoni."
        },
        {
          "icon": "sparkles",
          "title": "I dettagli",
          "text": "Ti fermi e noti qualcosa che prima non c’era."
        }
      ]
    },
    "accendi-il-tuo-fuoco": {
      "name": "Accendi il tuo Fuoco",
      "type": "soglia",
      "duration": "3 ore",
      "place": "Toscana",
      "img": "images/accendi-fuoco.jpg",
      "url": "accendi-il-tuo-fuoco.html",
      "active": true,
      "info": [
        {
          "k": "Durata",
          "v": "3 ore, un pomeriggio."
        },
        {
          "k": "Dove",
          "v": "Toscana / Emilia-Romagna, all’aperto."
        },
        {
          "k": "Gruppo",
          "v": "Piccolo — 6-8 persone, per dare spazio a ciascuno."
        },
        {
          "k": "Esperienza richiesta",
          "v": "Nessuna: si parte da zero, insieme."
        },
        {
          "k": "Cosa portare",
          "v": "Abbigliamento comodo e voglia di sporcarti le mani."
        },
        {
          "k": "Investimento",
          "v": "Scrivimi per il prezzo e le modalità dell’edizione. [da definire]"
        },
        {
          "k": "Come prenotare",
          "v": "Scrivimi su WhatsApp: ci sentiamo prima, così capiamo se fa per te."
        }
      ],
      "faq": [
        {
          "q": "Quanto costa?",
          "a": "Scrivimi: ti dico il prezzo e cosa è incluso in base alla data. Sono gruppi piccoli, i posti sono pochi."
        },
        {
          "q": "Serve esperienza?",
          "a": "No. È pensato anche per chi non ha mai acceso un fuoco senza fiammiferi."
        },
        {
          "q": "È un workshop o un corso?",
          "a": "No: niente slide né modelli. C’è un’esperienza fisica e la riflessione che ne nasce."
        },
        {
          "q": "È coaching?",
          "a": "No. Non ti do risposte da coach: ti offro un’esperienza e uno spazio per osservare come reagisci."
        },
        {
          "q": "Imparerò il bushcraft?",
          "a": "L’archetto è lo strumento, non il fine: non è un corso di sopravvivenza."
        }
      ],
      "learn": [
        {
          "img": "images/hero-forest.jpg",
          "icon": "eye",
          "title": "Osservazione",
          "chips": [
            "Attenzione",
            "Nessun giudizio"
          ]
        },
        {
          "img": "images/accendi-fuoco.jpg",
          "icon": "fire",
          "title": "L’archetto",
          "chips": [
            "Pazienza",
            "Ascolto",
            "Tecnica antica"
          ]
        },
        {
          "img": "images/cammino-cerchio.jpg",
          "icon": "idea",
          "title": "Riconoscimento",
          "chips": [
            "Come reagisci",
            "Il primo passo"
          ]
        },
        {
          "img": "images/full-avventura.jpg",
          "icon": "hand",
          "title": "Azione concreta",
          "chips": [
            "Una scelta tua",
            "Un passo preciso"
          ]
        }
      ],
      "media": {
        "hero": {
          "img": "images/accendi-fuoco.jpg",
          "video": "videos/accendi-fuoco.mp4"
        },
        "slider": [
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": "Accendere il fuoco"
          },
          {
            "img": "images/cammino-cerchio.jpg",
            "cap": "Il cerchio"
          },
          {
            "img": "images/escape-the-city.jpg",
            "cap": "Una notte nel bosco"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          }
        ],
        "gallery": [
          "images/accendi-fuoco.jpg",
          "images/hero-forest.jpg",
          "images/full-bosco.jpg",
          "images/cammino-cerchio.jpg",
          "images/full-avventura.jpg",
          "images/escape-the-city.jpg",
          "images/cammino-giorno2.jpg",
          "images/mappa-viaggio.jpg"
        ]
      },
      "menu": true,
      "blurb": "L’archetto come specchio: guardi come reagisci quando qualcosa non viene subito. Torni con un’azione, non un’idea.",
      "group": "6–8",
      "related": [
        "orienteering-sensoriale",
        "escape-the-city"
      ],
      "activities": [
        {
          "icon": "users",
          "title": "Il cerchio",
          "text": "Ci si siede insieme e si guarda come funziona l’archetto."
        },
        {
          "icon": "fire",
          "title": "L’archetto",
          "text": "Provi tu: il braccio si stanca e la brace non arriva subito."
        },
        {
          "icon": "eye",
          "title": "Osservare",
          "text": "Noti come reagisci: forzi, cambi tecnica, ti fermi, chiedi aiuto?"
        },
        {
          "icon": "hand",
          "title": "Una scelta",
          "text": "Torni a casa con un’azione precisa, decisa da te."
        }
      ]
    },
    "elementi-di-convivenza": {
      "name": "Elementi di Convivenza",
      "type": "immersione",
      "duration": "3 giorni",
      "place": "Appennino",
      "img": "images/cammino-cerchio.jpg",
      "url": "elementi-di-convivenza.html",
      "active": true,
      "info": [
        {
          "k": "Durata",
          "v": "3 giorni — dal venerdì pomeriggio alla domenica."
        },
        {
          "k": "Dove",
          "v": "Appennino, nel bosco."
        },
        {
          "k": "Gruppo",
          "v": "Piccolo e intimo — 6-8 persone."
        },
        {
          "k": "Esperienza richiesta",
          "v": "Nessuna: servono curiosità e voglia di esserci davvero."
        },
        {
          "k": "Cosa portare",
          "v": "Abbigliamento outdoor a strati e scarpe robuste."
        },
        {
          "k": "Investimento",
          "v": "Scrivimi per il prezzo e le modalità. [da definire]"
        },
        {
          "k": "Pernottamento",
          "v": "[Dove si dorme / tenda fornita o da portare — da completare]"
        },
        {
          "k": "Pasti",
          "v": "[Cosa è incluso / cosa portare — da completare]"
        },
        {
          "k": "Punto di ritrovo",
          "v": "[Dove ci si trova e come arrivare — da completare]"
        },
        {
          "k": "Come prenotare",
          "v": "Scrivimi su WhatsApp: ci sentiamo prima, così capiamo se fa per te."
        }
      ],
      "faq": [
        {
          "q": "Quanto costa?",
          "a": "Scrivimi: ti dico il prezzo e cosa è incluso in base alla data e al formato. Gruppi piccoli, posti limitati."
        },
        {
          "q": "Serve esperienza?",
          "a": "No. Non servono abilità tecniche: gli elementi sono strumenti di consapevolezza, non prove da superare."
        },
        {
          "q": "È un corso di survival?",
          "a": "No. Non impari tecniche estreme: fuoco, acqua, buio e riparo sono specchi, non abilità da acquisire."
        },
        {
          "q": "È counseling?",
          "a": "No. Non analizziamo il passato: facciamo esperienze e osserviamo cosa emerge."
        },
        {
          "q": "È una vacanza?",
          "a": "No. È intenso: non torni rilassato come da una spa, ma con una consapevolezza diversa."
        }
      ],
      "learn": [
        {
          "img": "images/accendi-fuoco.jpg",
          "icon": "fire",
          "title": "Fuoco",
          "chips": [
            "Accenderlo con le mani",
            "Come affronti le difficoltà"
          ]
        },
        {
          "img": "images/full-avventura.jpg",
          "icon": "drop",
          "title": "Acqua",
          "chips": [
            "Trovarla, filtrarla",
            "Cosa ti nutre"
          ]
        },
        {
          "img": "images/hero-forest.jpg",
          "icon": "moon",
          "title": "Buio",
          "chips": [
            "Camminare di notte",
            "Cosa emerge"
          ]
        },
        {
          "img": "images/escape-the-city.jpg",
          "icon": "tent",
          "title": "Riparo",
          "chips": [
            "Costruirlo insieme",
            "Sentirsi a casa"
          ]
        },
        {
          "img": "images/cammino-giorno2.jpg",
          "icon": "heart",
          "title": "Cibo",
          "chips": [
            "Cucinare sul fuoco",
            "Condividere"
          ]
        },
        {
          "img": "images/full-bosco.jpg",
          "icon": "leaf",
          "title": "Terra",
          "chips": [
            "A piedi nudi",
            "Ciò che ti sostiene"
          ]
        }
      ],
      "media": {
        "hero": {
          "img": "images/convivenza.jpg",
          "video": "videos/convivenza.mp4"
        },
        "slider": [
          {
            "img": "images/cammino-cerchio.jpg",
            "cap": "Il cerchio"
          },
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": "Accendere il fuoco"
          },
          {
            "img": "images/escape-the-city.jpg",
            "cap": "Una notte nel bosco"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          }
        ],
        "gallery": [
          "images/cammino-cerchio.jpg",
          "images/hero-forest.jpg",
          "images/full-bosco.jpg",
          "images/accendi-fuoco.jpg",
          "images/full-avventura.jpg",
          "images/escape-the-city.jpg",
          "images/cammino-giorno2.jpg",
          "images/mappa-viaggio.jpg"
        ]
      },
      "menu": true,
      "blurb": "Fuoco, acqua, terra, riparo, cibo, buio: sei elementi come porte per guardarti dentro. Dal venerdì pomeriggio alla domenica.",
      "group": "6–8",
      "related": [
        "escape-the-city",
        "accendi-il-tuo-fuoco"
      ],
      "activities": [
        {
          "icon": "fire",
          "title": "Fuoco e cibo",
          "text": "Accendi il fuoco con le mani e cucini insieme."
        },
        {
          "icon": "drop",
          "title": "Acqua",
          "text": "Trovi e filtri una sorgente."
        },
        {
          "icon": "tent",
          "title": "Riparo",
          "text": "Costruisci un riparo con il gruppo."
        },
        {
          "icon": "moon",
          "title": "Buio e terra",
          "text": "Cammini di notte, poi a piedi nudi sulla terra."
        }
      ]
    },
    "tribu-del-bosco": {
      "name": "Tribù del bosco",
      "type": "avventura",
      "duration": "6 ore",
      "place": "Appennino",
      "img": "images/full-avventura.jpg",
      "url": "tribu-del-bosco.html",
      "active": false,
      "info": [
        {
          "k": "Durata",
          "v": "6 ore — mezza giornata."
        },
        {
          "k": "Dove",
          "v": "Appennino, nel bosco. [punto di ritrovo da completare]"
        },
        {
          "k": "Gruppo",
          "v": "Piccolo e intimo — 6–12 persone."
        },
        {
          "k": "Esperienza richiesta",
          "v": "Nessuna: servono curiosità e voglia di esserci."
        },
        {
          "k": "Cosa portare",
          "v": "Abbigliamento comodo che può sporcarsi, scarpe robuste. [pranzo al sacco — da completare]"
        },
        {
          "k": "Investimento",
          "v": "Scrivimi per il prezzo e le modalità. [da definire]"
        },
        {
          "k": "Come prenotare",
          "v": "Scrivimi su WhatsApp: ci sentiamo prima, così capiamo se fa per te."
        }
      ],
      "faq": [
        {
          "q": "Quanto costa?",
          "a": "Scrivimi: ti dico il prezzo e cosa è incluso in base alla data. Gruppi piccoli, posti limitati."
        },
        {
          "q": "Serve esperienza?",
          "a": "No. Basta la voglia di mettersi in gioco e stare all’aperto."
        },
        {
          "q": "È adatto anche se non conosco nessuno?",
          "a": "Sì. Molte persone arrivano da sole: il gruppo si forma durante l’esperienza."
        },
        {
          "q": "È un team building aziendale?",
          "a": "Questa è la versione per singoli. Per team e aziende vedi la pagina Aziende."
        }
      ],
      "learn": [
        {
          "img": "images/cammino-cerchio.jpg",
          "icon": "users",
          "title": "Il gruppo",
          "chips": [
            "Nessun ruolo imposto",
            "Ognuno il suo posto"
          ]
        },
        {
          "img": "images/full-avventura.jpg",
          "icon": "sparkles",
          "title": "Il gioco",
          "chips": [
            "Esplorare",
            "Senza essere bravi"
          ]
        },
        {
          "img": "images/accendi-fuoco.jpg",
          "icon": "fire",
          "title": "Il fuoco",
          "chips": [
            "Il centro",
            "Il cerchio"
          ]
        },
        {
          "img": "images/full-bosco.jpg",
          "icon": "leaf",
          "title": "La cura",
          "chips": [
            "Lasciare meglio",
            "Rispetto del luogo"
          ]
        }
      ],
      "media": {
        "hero": {
          "img": "images/cammino-cerchio.jpg"
        },
        "slider": [
          {
            "img": "images/cammino-cerchio.jpg",
            "cap": "Il cerchio"
          },
          {
            "img": "images/escape-the-city.jpg",
            "cap": "Una notte nel bosco"
          },
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": "Accendere il fuoco"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          }
        ],
        "gallery": [
          "images/cammino-cerchio.jpg",
          "images/hero-forest.jpg",
          "images/full-bosco.jpg",
          "images/accendi-fuoco.jpg",
          "images/full-avventura.jpg",
          "images/escape-the-city.jpg",
          "images/cammino-giorno2.jpg",
          "images/mappa-viaggio.jpg"
        ]
      },
      "menu": false,
      "blurb": "Una giornata per tornare a fare gruppo come una piccola tribù: gioco, fuoco, collaborazione, cura del luogo.",
      "group": "6–12",
      "related": [
        "escape-the-city",
        "orienteering-sensoriale"
      ],
      "activities": [
        {
          "icon": "fire",
          "title": "Il fuoco",
          "text": "Si accende insieme, al centro del gruppo."
        },
        {
          "icon": "hand",
          "title": "Costruire",
          "text": "Qualcosa da fare con le mani, tutti insieme."
        },
        {
          "icon": "sparkles",
          "title": "Giocare",
          "text": "Davvero, senza dover essere bravi."
        },
        {
          "icon": "users",
          "title": "Il cerchio",
          "text": "Ci si siede e ci si racconta."
        }
      ]
    },
    "guardiani-del-fuoco": {
      "name": "Guardiani del Fuoco",
      "type": "immersione",
      "duration": "18 → 12",
      "place": "Appennino",
      "img": "images/full-bosco.jpg",
      "url": "guardiani-del-fuoco.html",
      "active": false,
      "info": [
        {
          "k": "Durata",
          "v": "Dalle 18 alle 12 del giorno dopo — una notte."
        },
        {
          "k": "Dove",
          "v": "Appennino, nel bosco. [punto di ritrovo da completare]"
        },
        {
          "k": "Gruppo",
          "v": "Piccolo — 6–10 persone."
        },
        {
          "k": "Pernottamento",
          "v": "Nel bosco, vicino al fuoco. [tenda/riparo: fornito o da portare — da completare]"
        },
        {
          "k": "Pasti",
          "v": "Cena e colazione sul fuoco, condivise. [cosa portare — da completare]"
        },
        {
          "k": "Esperienza richiesta",
          "v": "Nessuna: si impara insieme."
        },
        {
          "k": "Cosa portare",
          "v": "Abbigliamento caldo a strati, sacco a pelo, scarpe robuste, torcia. [lista completa — da completare]"
        },
        {
          "k": "Investimento",
          "v": "Scrivimi per il prezzo e le modalità. [da definire]"
        },
        {
          "k": "Come prenotare",
          "v": "Scrivimi su WhatsApp: ci sentiamo prima, così capiamo se fa per te."
        }
      ],
      "faq": [
        {
          "q": "Quanto costa?",
          "a": "Scrivimi: ti dico il prezzo e cosa è incluso in base alla data. Gruppi piccoli, posti limitati."
        },
        {
          "q": "Serve esperienza?",
          "a": "No. Accendiamo e custodiamo il fuoco insieme: si impara facendo."
        },
        {
          "q": "Si dorme davvero nel bosco?",
          "a": "Sì, vicino al fuoco, secondo la formula dell’edizione. Ti diamo tutte le indicazioni prima."
        },
        {
          "q": "È un corso di sopravvivenza?",
          "a": "No. Il fuoco è lo strumento, non il fine: il punto è imparare a custodire."
        }
      ],
      "learn": [
        {
          "img": "images/accendi-fuoco.jpg",
          "icon": "fire",
          "title": "Il fuoco",
          "chips": [
            "Con le mani",
            "Pazienza, non forza"
          ]
        },
        {
          "img": "images/hero-forest.jpg",
          "icon": "moon",
          "title": "La veglia",
          "chips": [
            "Il buio",
            "Il silenzio"
          ]
        },
        {
          "img": "images/cammino-cerchio.jpg",
          "icon": "users",
          "title": "I turni",
          "chips": [
            "Cura condivisa",
            "Responsabilità"
          ]
        },
        {
          "img": "images/full-bosco.jpg",
          "icon": "heart",
          "title": "La cura",
          "chips": [
            "Senza controllare",
            "Ascoltare"
          ]
        }
      ],
      "media": {
        "hero": {
          "img": "images/full-fuoco.jpg",
          "video": "videos/accendi-fuoco.mp4"
        },
        "slider": [
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": "Accendere il fuoco"
          },
          {
            "img": "images/cammino-cerchio.jpg",
            "cap": "Il cerchio"
          },
          {
            "img": "images/escape-the-city.jpg",
            "cap": "Una notte nel bosco"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          }
        ],
        "gallery": [
          "images/escape-the-city.jpg",
          "images/hero-forest.jpg",
          "images/full-bosco.jpg",
          "images/cammino-cerchio.jpg",
          "images/accendi-fuoco.jpg",
          "images/full-avventura.jpg",
          "images/cammino-giorno2.jpg",
          "images/mappa-viaggio.jpg"
        ]
      },
      "menu": false,
      "blurb": "Custodire il fuoco per una notte: accenderlo, mantenerlo a turni, il cerchio al buio, dormire nel bosco. Dalle 18 alle 12.",
      "group": "6–10",
      "related": [
        "escape-the-city",
        "accendi-il-tuo-fuoco"
      ],
      "activities": [
        {
          "icon": "fire",
          "title": "Il fuoco",
          "text": "Al tramonto lo accendi con le mani."
        },
        {
          "icon": "users",
          "title": "I turni",
          "text": "A turno lo alimenti e lo custodisci."
        },
        {
          "icon": "moon",
          "title": "Storie e silenzio",
          "text": "Nel cerchio si racconta, si ascolta, si sta zitti."
        },
        {
          "icon": "tent",
          "title": "La notte",
          "text": "Si dorme vicino alla brace; al mattino colazione sul fuoco."
        }
      ]
    },
    "la-mappa-del-tuo-viaggio": {
      "name": "La Mappa del tuo Viaggio",
      "type": "soglia",
      "duration": "3 ore",
      "place": "Appennino",
      "img": "images/mappa-viaggio.jpg",
      "url": "la-mappa-del-tuo-viaggio.html",
      "active": false,
      "info": [
        {
          "k": "Durata",
          "v": "3 ore."
        },
        {
          "k": "Dove",
          "v": "All’aperto, nella natura circostante."
        },
        {
          "k": "Gruppo",
          "v": "Piccolo — 6-8 persone. Disponibile anche per team."
        },
        {
          "k": "Esperienza richiesta",
          "v": "Nessuna: bastano curiosità e voglia di mettersi in gioco."
        },
        {
          "k": "Cosa portare",
          "v": "Abbigliamento comodo; al resto penso io."
        },
        {
          "k": "Investimento",
          "v": "Scrivimi per il prezzo e le modalità (anche per team). [da definire]"
        },
        {
          "k": "Come prenotare",
          "v": "Scrivimi su WhatsApp: ci sentiamo prima, così capiamo se fa per te."
        }
      ],
      "faq": [
        {
          "q": "Quanto costa?",
          "a": "Scrivimi: ti dico il prezzo e cosa è incluso, anche nella formula per team. Gruppi piccoli, posti limitati."
        },
        {
          "q": "Serve esperienza?",
          "a": "No. Serve solo la voglia di guardare il tuo percorso da un’altra prospettiva."
        },
        {
          "q": "È team building?",
          "a": "No: niente giochi per «creare coesione». C’è un’esperienza condivisa che genera connessione da sé."
        },
        {
          "q": "È coaching?",
          "a": "No. Non ti do risposte: ti offro strumenti e metafore per trovare le tue."
        },
        {
          "q": "È un corso di orientamento?",
          "a": "No. Mappa e bussola sono metafore: non si tratta di imparare a orientarsi nel bosco."
        }
      ],
      "learn": [
        {
          "img": "images/mappa-viaggio.jpg",
          "icon": "compass",
          "title": "Cartografia",
          "chips": [
            "Mappe reali",
            "Metafore del percorso"
          ]
        },
        {
          "img": "images/full-avventura.jpg",
          "icon": "idea",
          "title": "La bussola interiore",
          "chips": [
            "Il tuo nord",
            "La direzione vera"
          ]
        },
        {
          "img": "images/hero-forest.jpg",
          "icon": "hand",
          "title": "Il disegno",
          "chips": [
            "Con le tue mani",
            "Da portare a casa"
          ]
        },
        {
          "img": "images/cammino-cerchio.jpg",
          "icon": "users",
          "title": "Persone e team",
          "chips": [
            "A un bivio",
            "Direzione condivisa"
          ]
        }
      ],
      "media": {
        "hero": {
          "img": "images/mappa-viaggio.jpg",
          "video": "videos/mappa-viaggio.mp4"
        },
        "slider": [
          {
            "img": "images/mappa-viaggio.jpg",
            "cap": "Leggere dove sei"
          },
          {
            "img": "images/full-avventura.jpg",
            "cap": "Camminare lenti"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/cammino-giorno2.jpg",
            "cap": "Il rifugio"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          }
        ],
        "gallery": [
          "images/mappa-viaggio.jpg",
          "images/hero-forest.jpg",
          "images/full-bosco.jpg",
          "images/cammino-cerchio.jpg",
          "images/accendi-fuoco.jpg",
          "images/full-avventura.jpg",
          "images/escape-the-city.jpg",
          "images/cammino-giorno2.jpg"
        ]
      },
      "menu": false,
      "blurb": "Disegni la mappa del tuo percorso con mappa e bussola come metafore. Un oggetto concreto da portare a casa.",
      "group": "6–8",
      "related": [
        "accendi-il-tuo-fuoco",
        "escape-the-city"
      ],
      "activities": [
        {
          "icon": "compass",
          "title": "Leggere la carta",
          "text": "Curve di livello, corsi d’acqua, sentieri."
        },
        {
          "icon": "idea",
          "title": "Le metafore",
          "text": "Ogni elemento della mappa diventa una domanda sul tuo percorso."
        },
        {
          "icon": "hand",
          "title": "Disegnare",
          "text": "Carta e penna: la tua mappa, fatta con le tue mani."
        },
        {
          "icon": "route",
          "title": "La bussola",
          "text": "Ogni bussola ha un nord: qual è il tuo?"
        }
      ]
    },
    "via-degli-dei": {
      "name": "Via degli Dei",
      "type": "immersione",
      "duration": "24 ore",
      "place": "Appennino",
      "img": "images/full-natura.jpg",
      "url": "via-degli-dei.html",
      "active": false,
      "info": [
        {
          "k": "Durata",
          "v": "Un giorno e una notte (circa 24 ore)."
        },
        {
          "k": "Dove",
          "v": "Appennino, sulla Via degli Dei tra Bologna e Firenze."
        },
        {
          "k": "Gruppo",
          "v": "Piccolo — 8-12 persone."
        },
        {
          "k": "Esperienza richiesta",
          "v": "Saper camminare qualche ora; ritmo lento, niente performance."
        },
        {
          "k": "Cosa portare",
          "v": "Zaino leggero, scarpe da cammino, sacco a pelo."
        },
        {
          "k": "Investimento",
          "v": "Scrivimi per il prezzo e le modalità. [da definire]"
        },
        {
          "k": "Pernottamento",
          "v": "[Dove si dorme / tenda fornita o da portare — da completare]"
        },
        {
          "k": "Pasti",
          "v": "[Cosa è incluso / cosa portare — da completare]"
        },
        {
          "k": "Punto di ritrovo",
          "v": "[Dove ci si trova e come arrivare — da completare]"
        },
        {
          "k": "Come prenotare",
          "v": "Scrivimi su WhatsApp: ci sentiamo prima, così capiamo se fa per te."
        }
      ],
      "faq": [
        {
          "q": "Quanto costa?",
          "a": "Scrivimi: ti dico il prezzo e cosa è incluso in base alla data e al formato. Gruppi piccoli, posti limitati."
        },
        {
          "q": "Serve esperienza?",
          "a": "No. Basta saper camminare qualche ora: il ritmo è lento e pensato per osservare."
        },
        {
          "q": "È un tour organizzato?",
          "a": "No: niente pullman né programma rigidissimo. C’è un cammino e una condivisione."
        },
        {
          "q": "È un pellegrinaggio?",
          "a": "Nessuna promessa di illuminazione. Cammini, bivacchi, incontri persone vere."
        },
        {
          "q": "È una sfida fisica?",
          "a": "No. Il ritmo è lento: il punto non è arrivare in fretta, ma abitare il sentiero."
        }
      ],
      "learn": [
        {
          "img": "images/cammino-giorno2.jpg",
          "icon": "route",
          "title": "La Via degli Dei",
          "chips": [
            "Faggi",
            "Crinali",
            "Borghi di pietra"
          ]
        },
        {
          "img": "images/escape-the-city.jpg",
          "icon": "tent",
          "title": "Bivacco nel bosco",
          "chips": [
            "Tenda",
            "Fuoco",
            "Silenzio"
          ]
        },
        {
          "img": "images/hero-forest.jpg",
          "icon": "leaf",
          "title": "L’ecovillaggio",
          "chips": [
            "Storie concrete",
            "Chi vive diversamente"
          ]
        },
        {
          "img": "images/cammino-cerchio.jpg",
          "icon": "users",
          "title": "Gruppo intimo",
          "chips": [
            "8–12 persone",
            "Si cammina insieme"
          ]
        }
      ],
      "media": {
        "hero": {
          "img": "images/via-degli-dei.jpg",
          "video": "videos/via-degli-dei.mp4"
        },
        "slider": [
          {
            "img": "images/full-avventura.jpg",
            "cap": "Camminare lenti"
          },
          {
            "img": "images/cammino-giorno2.jpg",
            "cap": "Il rifugio"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          },
          {
            "img": "images/cammino-cerchio.jpg",
            "cap": "Il cerchio"
          }
        ],
        "gallery": [
          "images/cammino-giorno2.jpg",
          "images/hero-forest.jpg",
          "images/full-bosco.jpg",
          "images/cammino-cerchio.jpg",
          "images/accendi-fuoco.jpg",
          "images/full-avventura.jpg",
          "images/escape-the-city.jpg",
          "images/mappa-viaggio.jpg"
        ]
      },
      "menu": false,
      "blurb": "Un giorno e una notte sul sentiero storico tra Bologna e Firenze: bivacco nel bosco e visita a un ecovillaggio.",
      "group": "8–12",
      "related": [
        "escape-the-city",
        "orienteering-sensoriale"
      ],
      "activities": [
        {
          "icon": "route",
          "title": "Il cammino",
          "text": "Un tratto del sentiero storico tra Bologna e Firenze, a passo lento."
        },
        {
          "icon": "tent",
          "title": "Il campo",
          "text": "Si montano le tende prima del tramonto."
        },
        {
          "icon": "fire",
          "title": "La sera",
          "text": "Il fuoco, la cena, le storie condivise."
        },
        {
          "icon": "leaf",
          "title": "L’ecovillaggio",
          "text": "Il mattino dopo incontri chi ha scelto di viverci."
        }
      ]
    },
    "cammino": {
      "name": "Il Cammino",
      "type": "immersione",
      "duration": "4 giorni",
      "place": "Italia",
      "img": "images/cammino-giorno2.jpg",
      "url": "cammino.html",
      "active": false,
      "info": [
        {
          "k": "Durata",
          "v": "4 giorni, zaino in spalla."
        },
        {
          "k": "Dove",
          "v": "Italia, su sentieri scelti con cura."
        },
        {
          "k": "Gruppo",
          "v": "Piccolo — 6-8 persone che camminano con intenzione."
        },
        {
          "k": "Esperienza richiesta",
          "v": "Una discreta abitudine a camminare; il ritmo è sostenibile."
        },
        {
          "k": "Cosa portare",
          "v": "Zaino, scarpe da trekking già rodate, sacco a pelo. Ti mando la lista completa."
        },
        {
          "k": "Investimento",
          "v": "Scrivimi per il prezzo e le modalità. [da definire]"
        },
        {
          "k": "Pernottamento",
          "v": "[Dove si dorme / tenda fornita o da portare — da completare]"
        },
        {
          "k": "Pasti",
          "v": "[Cosa è incluso / cosa portare — da completare]"
        },
        {
          "k": "Punto di ritrovo",
          "v": "[Dove ci si trova e come arrivare — da completare]"
        },
        {
          "k": "Come prenotare",
          "v": "Scrivimi su WhatsApp: ci sentiamo prima, così capiamo se fa per te."
        }
      ],
      "faq": [
        {
          "q": "Quanto costa?",
          "a": "Scrivimi: ti dico il prezzo e cosa è incluso in base alla data e al formato. Gruppi piccoli, posti limitati."
        },
        {
          "q": "Devo essere allenato?",
          "a": "Serve una discreta abitudine a camminare. Il ritmo è lento e sostenibile: conta la presenza, non la prestazione."
        },
        {
          "q": "È un trek impegnativo?",
          "a": "No. La difficoltà tecnica non conta: il cammino è metafora, non prestazione."
        },
        {
          "q": "È terapia di gruppo?",
          "a": "No. Non ti chiedo di condividere traumi: le cose emergono da sé, se vogliono."
        },
        {
          "q": "Mi prometti una trasformazione?",
          "a": "No. Ti prometto un cammino onesto e condiviso: quello che ne nasce è tuo."
        }
      ],
      "learn": [
        {
          "img": "images/cammino-cerchio.jpg",
          "icon": "sparkles",
          "title": "La Chiamata",
          "chips": [
            "Ascolto",
            "Perché sei qui"
          ]
        },
        {
          "img": "images/full-avventura.jpg",
          "icon": "route",
          "title": "La Sfida",
          "chips": [
            "La tappa più lunga",
            "Silenzio"
          ]
        },
        {
          "img": "images/cammino-giorno2.jpg",
          "icon": "compass",
          "title": "La Visione",
          "chips": [
            "Il punto più alto",
            "Il cerchio serale"
          ]
        },
        {
          "img": "images/full-bosco.jpg",
          "icon": "heart",
          "title": "Il Ritorno",
          "chips": [
            "Un dono",
            "Una decisione"
          ]
        }
      ],
      "media": {
        "hero": {
          "img": "images/cammino-eroe.jpg",
          "video": "videos/cammino.mp4"
        },
        "slider": [
          {
            "img": "images/full-avventura.jpg",
            "cap": "Camminare lenti"
          },
          {
            "img": "images/cammino-giorno2.jpg",
            "cap": "Il rifugio"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          },
          {
            "img": "images/furgone.jpg",
            "cap": "Case in cammino"
          }
        ],
        "gallery": [
          "images/full-avventura.jpg",
          "images/hero-forest.jpg",
          "images/full-bosco.jpg",
          "images/cammino-cerchio.jpg",
          "images/accendi-fuoco.jpg",
          "images/escape-the-city.jpg",
          "images/cammino-giorno2.jpg",
          "images/mappa-viaggio.jpg"
        ]
      },
      "menu": false,
      "blurb": "Quattro giorni zaino in spalla. Ogni tappa è una fase del viaggio: la chiamata, la sfida, la visione, il ritorno.",
      "group": "6–8",
      "related": [
        "escape-the-city",
        "orienteering-sensoriale"
      ],
      "activities": [
        {
          "icon": "route",
          "title": "Zaino in spalla",
          "text": "Ogni giorno una tappa, un passo dopo l’altro."
        },
        {
          "icon": "users",
          "title": "Il cerchio",
          "text": "La sera, attorno al fuoco, si condivide quello che è emerso."
        },
        {
          "icon": "moon",
          "title": "Un tratto in silenzio",
          "text": "Cammini da solo per un pezzo di strada."
        },
        {
          "icon": "sparkles",
          "title": "Il punto più alto",
          "text": "Dopo la fatica, lo sguardo si apre."
        }
      ]
    }
  },
  "events": [
    {
      "exp": "accendi-il-tuo-fuoco",
      "start": "2027-04-11"
    },
    {
      "exp": "orienteering-sensoriale",
      "start": "2027-04-24"
    },
    {
      "exp": "escape-the-city",
      "start": "2027-05-08",
      "end": "2027-05-09",
      "note": "Pochi posti"
    },
    {
      "exp": "elementi-di-convivenza",
      "start": "2027-06-18",
      "end": "2027-06-20"
    },
    {
      "exp": "escape-the-city",
      "start": "2027-06-26",
      "end": "2027-06-27"
    },
    {
      "exp": "accendi-il-tuo-fuoco",
      "start": "2027-07-04",
      "place": "Emilia-Romagna"
    },
    {
      "exp": "escape-the-city",
      "start": "2027-09-11",
      "end": "2027-09-12"
    },
    {
      "exp": "orienteering-sensoriale",
      "start": "2027-09-19"
    },
    {
      "exp": "elementi-di-convivenza",
      "start": "2027-10-08",
      "end": "2027-10-10"
    },
    {
      "exp": "la-mappa-del-tuo-viaggio",
      "start": "2027-04-18"
    },
    {
      "exp": "tribu-del-bosco",
      "start": "2027-05-16"
    },
    {
      "exp": "guardiani-del-fuoco",
      "start": "2027-05-22",
      "end": "2027-05-23"
    },
    {
      "exp": "via-degli-dei",
      "start": "2027-06-12",
      "end": "2027-06-13"
    },
    {
      "exp": "guardiani-del-fuoco",
      "start": "2027-07-10",
      "end": "2027-07-11"
    },
    {
      "exp": "cammino",
      "start": "2027-09-02",
      "end": "2027-09-05"
    },
    {
      "exp": "la-mappa-del-tuo-viaggio",
      "start": "2027-10-03"
    }
  ],
  "media": [
    {
      "src": "images/abitare-sentiero.jpg",
      "alt": ""
    },
    {
      "src": "images/accendi-fuoco.jpg",
      "alt": "Mani che accendono il fuoco con l’archetto"
    },
    {
      "src": "images/agricoltura.jpg",
      "alt": ""
    },
    {
      "src": "images/cammino-cerchio.jpg",
      "alt": "Cerchio attorno al fuoco sotto le stelle"
    },
    {
      "src": "images/cammino-eroe.jpg",
      "alt": "Cammino in montagna"
    },
    {
      "src": "images/cammino-giorno2.jpg",
      "alt": "Baita di pietra e sentiero in montagna"
    },
    {
      "src": "images/convivenza.jpg",
      "alt": "Elementi di Convivenza"
    },
    {
      "src": "images/escape-the-city.jpg",
      "alt": "Escape the City: il gruppo attorno al fuoco"
    },
    {
      "src": "images/full-abitare.jpg",
      "alt": "Anni nel mondo corporate"
    },
    {
      "src": "images/full-avventura.jpg",
      "alt": "Persona sul sentiero all’alba tra la nebbia"
    },
    {
      "src": "images/full-bosco.jpg",
      "alt": "Il bosco come luogo da leggere"
    },
    {
      "src": "images/full-cammino.jpg",
      "alt": "Oggi, guida e facilitatore in natura"
    },
    {
      "src": "images/full-fuoco.jpg",
      "alt": ""
    },
    {
      "src": "images/full-natura.jpg",
      "alt": "Agricoltura e permacultura"
    },
    {
      "src": "images/furgone.jpg",
      "alt": "Furgone nel bosco al tramonto"
    },
    {
      "src": "images/hero-forest.jpg",
      "alt": "Luce tra gli alberi, lontano da tutto"
    },
    {
      "src": "images/mappa-viaggio.jpg",
      "alt": "Mappa e bussola su un tavolo di legno"
    },
    {
      "src": "images/per-chi-andrea.jpg",
      "alt": ""
    },
    {
      "src": "images/per-chi-federica.jpg",
      "alt": ""
    },
    {
      "src": "images/per-chi-marco.jpg",
      "alt": ""
    },
    {
      "src": "images/per-chi-sara.jpg",
      "alt": ""
    },
    {
      "src": "images/team-appunti-mani.jpg",
      "alt": "Mani che scrivono su un foglietto, nell’erba"
    },
    {
      "src": "images/team-archetto.jpg",
      "alt": "Mani che usano l’archetto per accendere il fuoco"
    },
    {
      "src": "images/team-ascolto-bosco.jpg",
      "alt": "Persona nel bosco che ascolta con le mani a coppa"
    },
    {
      "src": "images/team-codice-carte.jpg",
      "alt": "Carte e bandana su un ceppo nel bosco"
    },
    {
      "src": "images/team-fuoco-scintille.jpg",
      "alt": "Scintille da una pietra focaia su corteccia di betulla"
    },
    {
      "src": "images/team-impronta.jpg",
      "alt": "Mano che indica un’impronta nel terreno"
    },
    {
      "src": "images/team-land-art.jpg",
      "alt": "Land art di rami tra gli alberi"
    },
    {
      "src": "images/team-mani-terra.jpg",
      "alt": "Mano nella terra"
    },
    {
      "src": "images/team-mappa-disegnata.jpg",
      "alt": "Mappa illustrata del percorso tra le mani"
    },
    {
      "src": "images/team-mappa-zaino.jpg",
      "alt": "Escursionista di spalle con mappa e zaino"
    },
    {
      "src": "images/team-scarpe-bussola.jpg",
      "alt": "Scarpone, mappa e bussola nel sottobosco"
    },
    {
      "src": "images/team-tenda-bushcraft.jpg",
      "alt": "Riparo di bushcraft nel bosco con il fuoco"
    },
    {
      "src": "images/testimonial-1.jpg",
      "alt": ""
    },
    {
      "src": "images/testimonial-2.jpg",
      "alt": ""
    },
    {
      "src": "images/testimonial-3.jpg",
      "alt": ""
    },
    {
      "src": "images/testimonial-4.jpg",
      "alt": ""
    },
    {
      "src": "images/testimonial-5.jpg",
      "alt": ""
    },
    {
      "src": "images/testimonial-6.jpg",
      "alt": ""
    },
    {
      "src": "images/via-degli-dei.jpg",
      "alt": "Via degli Dei"
    }
  ],
  "testimonials": [
    {
      "id": "t1",
      "name": "Giulia",
      "label": "Escape the City",
      "text": "La prima notte nel bosco non la scordo. Ci torno con la mente ancora adesso.",
      "video": "videos/testimonial-1.mp4",
      "poster": "images/testimonial-1.jpg",
      "home": true,
      "page": true,
      "exps": []
    },
    {
      "id": "t2",
      "name": "Davide",
      "label": "La Mappa del tuo Viaggio",
      "text": "Ho iniziato a notare cose che di solito non vedo. È rimasto un modo diverso di guardare.",
      "video": "videos/testimonial-2.mp4",
      "poster": "images/testimonial-2.jpg",
      "home": true,
      "page": true,
      "exps": []
    },
    {
      "id": "t3",
      "name": "Marta",
      "label": "Escape the City",
      "text": "Sono arrivata da sola, senza conoscere nessuno. Sono tornata con un gruppo.",
      "video": "videos/testimonial-3.mp4",
      "poster": "images/testimonial-3.jpg",
      "home": true,
      "page": true,
      "exps": []
    },
    {
      "id": "t4",
      "name": "Luca",
      "label": "Accendi il tuo Fuoco",
      "text": "Il fuoco non prendeva. Poi ho capito che stavo forzando. Vale anche fuori dal bosco.",
      "video": "videos/testimonial-4.mp4",
      "poster": "images/testimonial-4.jpg",
      "home": true,
      "page": true,
      "exps": []
    },
    {
      "id": "t5",
      "name": "Andrea",
      "label": "Escape the City",
      "text": "Due giorni senza telefono e senza dover produrre niente. Non mi capitava da anni.",
      "video": "videos/testimonial-5.mp4",
      "poster": "images/testimonial-5.jpg",
      "home": true,
      "page": true,
      "exps": [
        "escape-the-city"
      ]
    },
    {
      "id": "t6",
      "name": "Elena",
      "label": "dopo Escape the City",
      "title": "Due giorni che ricordo ancora",
      "text": "Pensavo fosse un corso di sopravvivenza. Era un modo per tornare a fare esperienza con tutto il corpo.",
      "home": false,
      "page": true,
      "exps": [
        "escape-the-city"
      ]
    },
    {
      "id": "t7",
      "name": "Paolo",
      "label": "dopo Escape the City",
      "title": "Da solo nel bosco, in silenzio",
      "text": "Il momento in cui mi sono seduto da solo, al buio, è stato il più potente. Nessuno mi diceva cosa sentire.",
      "home": false,
      "page": true,
      "exps": [
        "escape-the-city"
      ]
    },
    {
      "id": "t8",
      "name": "Giulia",
      "label": "dopo Accendi il tuo Fuoco",
      "title": "Ho smesso di forzare",
      "text": "L’archetto mi ha mostrato, con le mani, che spingevo troppo. Me lo sono portato a casa.",
      "home": false,
      "page": true,
      "exps": []
    },
    {
      "id": "t9",
      "name": "Roberta",
      "label": "dopo La Mappa del tuo Viaggio",
      "title": "Una mappa sopra la scrivania",
      "text": "La mappa che ho disegnato è appesa dove la vedo ogni giorno. Mi ricorda dove voglio andare.",
      "home": false,
      "page": true,
      "exps": []
    },
    {
      "id": "t10",
      "name": "Giulia",
      "label": "Escape · edizione di marzo",
      "text": "La notte nel bosco mi faceva paura. È diventata la parte che ricordo di più.",
      "video": "videos/testimonial-1.mp4",
      "poster": "images/testimonial-1.jpg",
      "home": false,
      "page": false,
      "exps": [
        "escape-the-city"
      ]
    },
    {
      "id": "t11",
      "name": "Marta",
      "label": "Escape · edizione di giugno",
      "text": "Sono arrivata da sola senza conoscere nessuno. Sono tornata con un gruppo.",
      "video": "videos/testimonial-3.mp4",
      "poster": "images/testimonial-3.jpg",
      "home": false,
      "page": false,
      "exps": [
        "escape-the-city"
      ]
    },
    {
      "id": "t12",
      "name": "Davide",
      "label": "Escape · edizione di marzo",
      "text": "Accendere il fuoco con le mani mi ha insegnato più sulla pazienza di tanti libri.",
      "video": "videos/testimonial-2.mp4",
      "poster": "images/testimonial-2.jpg",
      "home": false,
      "page": false,
      "exps": [
        "escape-the-city"
      ]
    },
    {
      "id": "t14",
      "name": "Elena",
      "label": "34, Firenze",
      "text": "3 ore che hanno cambiato il mio approccio ai problemi.",
      "home": false,
      "page": false,
      "exps": [
        "accendi-il-tuo-fuoco"
      ]
    },
    {
      "id": "t15",
      "name": "Giulia",
      "label": "41, Torino",
      "text": "L’archetto mi ha mostrato che forzavo troppo.",
      "home": false,
      "page": false,
      "exps": [
        "accendi-il-tuo-fuoco"
      ]
    },
    {
      "id": "t16",
      "name": "Chiara",
      "label": "32, Roma",
      "text": "Ho portato a casa una decisione per il mio progetto. Non un consiglio: una scelta.",
      "home": false,
      "page": false,
      "exps": [
        "accendi-il-tuo-fuoco"
      ]
    },
    {
      "id": "t17",
      "name": "Roberta",
      "label": "38, Bologna",
      "text": "La mappa che ho disegnato è appesa sopra la scrivania. Mi ricorda dove voglio andare.",
      "home": false,
      "page": false,
      "exps": [
        "la-mappa-del-tuo-viaggio"
      ]
    },
    {
      "id": "t18",
      "name": "Filippo",
      "label": "33, Firenze",
      "text": "Disegnare la mappa del mio percorso è stato più utile di mesi di coaching.",
      "home": false,
      "page": false,
      "exps": [
        "la-mappa-del-tuo-viaggio"
      ]
    },
    {
      "id": "t19",
      "name": "Marco",
      "label": "45, Milano",
      "text": "Ho portato il mio team. Siamo tornati con una direzione condivisa che non sapevamo di avere.",
      "home": false,
      "page": false,
      "exps": [
        "la-mappa-del-tuo-viaggio"
      ]
    }
  ],
  "pages": {},
  "pagemedia": {
    "scuole-gruppi": {
      "media": {
        "hero": {
          "img": "images/full-bosco.jpg"
        },
        "slider": [
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco, aula a cielo aperto"
          },
          {
            "img": "images/team-mani-terra.jpg",
            "cap": "Mani nella terra"
          },
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": "Il fuoco, con le regole"
          },
          {
            "img": "images/mappa-viaggio.jpg",
            "cap": "Orientarsi con la mappa"
          },
          {
            "img": "images/cammino-giorno2.jpg",
            "cap": "Il rifugio"
          },
          {
            "img": "images/hero-forest.jpg",
            "cap": "La luce tra gli alberi"
          },
          {
            "img": "images/team-fuoco-scintille.jpg",
            "cap": "Scintille"
          }
        ],
        "gallery": [
          "images/team-mani-terra.jpg",
          "images/accendi-fuoco.jpg",
          "images/full-bosco.jpg",
          "images/mappa-viaggio.jpg",
          "images/cammino-giorno2.jpg",
          "images/hero-forest.jpg",
          "images/team-tenda-bushcraft.jpg",
          "images/team-ascolto-bosco.jpg"
        ]
      }
    },
    "aziende": {
      "media": {
        "hero": {
          "img": "images/cammino-cerchio.jpg"
        },
        "slider": [
          {
            "img": "images/cammino-cerchio.jpg",
            "cap": "Il cerchio"
          },
          {
            "img": "images/team-archetto.jpg",
            "cap": "L’archetto"
          },
          {
            "img": "images/team-codice-carte.jpg",
            "cap": "Il Codice della Foresta"
          },
          {
            "img": "images/team-mappa-zaino.jpg",
            "cap": "La mappa del viaggio"
          },
          {
            "img": "images/team-scarpe-bussola.jpg",
            "cap": "Fuori sentiero"
          },
          {
            "img": "images/team-land-art.jpg",
            "cap": "Architetti di mondi"
          },
          {
            "img": "images/escape-the-city.jpg",
            "cap": "Una notte nel bosco"
          }
        ],
        "gallery": [
          "images/cammino-cerchio.jpg",
          "images/team-fuoco-scintille.jpg",
          "images/team-appunti-mani.jpg",
          "images/team-impronta.jpg",
          "images/full-avventura.jpg",
          "images/team-mani-terra.jpg",
          "images/hero-forest.jpg",
          "images/team-tenda-bushcraft.jpg"
        ]
      }
    },
    "metodologia": {
      "media": {
        "hero": {
          "img": "images/hero-forest.jpg"
        },
        "slider": [
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": "Fare con le mani"
          },
          {
            "img": "images/team-impronta.jpg",
            "cap": "Leggere le tracce"
          },
          {
            "img": "images/mappa-viaggio.jpg",
            "cap": "Orientarsi"
          },
          {
            "img": "images/cammino-giorno2.jpg",
            "cap": "Il tempo lento"
          },
          {
            "img": "images/escape-the-city.jpg",
            "cap": "Il gruppo"
          },
          {
            "img": "images/team-fuoco-scintille.jpg",
            "cap": "Il fuoco"
          }
        ],
        "gallery": [
          "images/team-mappa-zaino.jpg",
          "images/team-scarpe-bussola.jpg",
          "images/hero-forest.jpg",
          "images/team-mappa-disegnata.jpg",
          "images/team-codice-carte.jpg",
          "images/team-land-art.jpg",
          "images/escape-the-city.jpg",
          "images/accendi-fuoco.jpg"
        ]
      }
    },
    "chi-sono": {
      "media": {
        "hero": {
          "img": "images/hero-forest.jpg"
        },
        "slider": [
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco, da sempre"
          },
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": "Le mani sul fuoco"
          },
          {
            "img": "images/cammino-giorno2.jpg",
            "cap": "In cammino"
          },
          {
            "img": "images/mappa-viaggio.jpg",
            "cap": "La mappa"
          },
          {
            "img": "images/team-mani-terra.jpg",
            "cap": "La terra"
          },
          {
            "img": "images/team-fuoco-scintille.jpg",
            "cap": "Scintille"
          },
          {
            "img": "images/escape-the-city.jpg",
            "cap": "Una notte nel bosco"
          }
        ],
        "gallery": [
          "images/team-mani-terra.jpg",
          "images/accendi-fuoco.jpg",
          "images/team-ascolto-bosco.jpg",
          "images/cammino-cerchio.jpg",
          "images/full-avventura.jpg",
          "images/team-impronta.jpg",
          "images/mappa-viaggio.jpg",
          "images/team-land-art.jpg"
        ]
      }
    },
    "index": {
      "media": {
        "hero": {
          "img": "images/hero-forest.jpg",
          "video": "videos/hero.mp4"
        },
        "slider": [
          {
            "img": "images/escape-the-city.jpg",
            "cap": "Una notte nel bosco"
          },
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": "Accendere il fuoco con le mani"
          },
          {
            "img": "images/full-avventura.jpg",
            "cap": "Camminare lenti"
          },
          {
            "img": "images/mappa-viaggio.jpg",
            "cap": "Leggere dove sei"
          },
          {
            "img": "images/cammino-cerchio.jpg",
            "cap": "Il cerchio"
          },
          {
            "img": "images/full-bosco.jpg",
            "cap": "Il bosco"
          },
          {
            "img": "images/cammino-giorno2.jpg",
            "cap": "Il rifugio"
          },
          {
            "img": "images/furgone.jpg",
            "cap": "Case in cammino"
          }
        ],
        "gallery": [
          "images/cammino-cerchio.jpg",
          "images/accendi-fuoco.jpg",
          "images/full-bosco.jpg",
          "images/cammino-eroe.jpg",
          "images/convivenza.jpg",
          "images/full-natura.jpg",
          "images/via-degli-dei.jpg",
          "images/cammino-giorno2.jpg",
          "images/full-avventura.jpg"
        ]
      }
    },
    "escape-card": {
      "media": {
        "hero": {
          "img": ""
        },
        "slider": [
          {
            "img": "images/escape-the-city.jpg",
            "cap": ""
          },
          {
            "img": "images/cammino-cerchio.jpg",
            "cap": ""
          },
          {
            "img": "images/accendi-fuoco.jpg",
            "cap": ""
          },
          {
            "img": "images/full-avventura.jpg",
            "cap": ""
          }
        ],
        "gallery": []
      }
    }
  },
  "patchesApplied": [
    "2026-11-21-escape"
  ]
};
