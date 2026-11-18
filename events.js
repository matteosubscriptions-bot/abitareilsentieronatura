/* Abitare il Sentiero — DATI DELLE ESPERIENZE (unica fonte)
   ------------------------------------------------------------------
   Questo file si modifica dalla pagina  admin.html  (consigliato) oppure a mano.
   Da qui si aggiornano da sole: Calendario, "prossime 3 esperienze", date, prezzi,
   domande frequenti, info utili e "cosa impari" di ogni pagina esperienza.
   Le date passate spariscono da sole (si confronta con il giorno di oggi).

   Per ogni esperienza (experiences):
   - name, type (soglia|avventura|immersione), duration, place, url, img
   - active: false = nascosta (non compare in calendario / "prossime date")
   - price: { early, regular, daysBefore } = prezzo early bird fino a N giorni prima, poi intero
   - info: righe "Info utili" [{ k, v, ico? }]    - faq: [{ q, a }]
   - learn: card "Cosa impari" [{ img, icon, title, chips[] }]
   Nei testi: **grassetto**, [testo da completare] (evidenziato), {early} {regular} {days} (dal prezzo).
   Per ogni data (events): exp, start, end?, place? (luogo di quella data), note?  — formato date AAAA-MM-GG.
   Script classico (niente type="module"). Le date sono INDICATIVE: da confermare. */
window.AIS_DATA = {
  "experiences": {
    "escape-the-city": {
      "name": "Escape the City",
      "type": "immersione",
      "duration": "2 giorni",
      "place": "Appennino",
      "img": "images/escape-the-city.jpg",
      "url": "escape-the-city.html",
      "active": true,
      "price": {
        "early": 115,
        "regular": 135,
        "daysBefore": 15
      },
      "info": [
        {
          "k": "Durata",
          "v": "2 giorni — da sabato mattina a domenica pranzo (sab ore 9 → dom ore 13).",
          "ico": "clock"
        },
        {
          "k": "Luogo",
          "v": "Appennino Tosco-Emiliano [punto di ritrovo da comunicare agli iscritti]",
          "ico": "pin"
        },
        {
          "k": "Gruppo",
          "v": "6–10 partecipanti.",
          "ico": "users"
        },
        {
          "k": "Difficoltà",
          "v": "Accessibile: serve una normale condizione fisica per camminare nel bosco. [Dettaglio da definire in base al percorso.]"
        },
        {
          "k": "Prezzo",
          "v": "**€{early}** early bird — iscrivendoti fino a {days} giorni prima — poi **€{regular}**."
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
          "a": "€{early} con l'early bird, iscrivendoti fino a {days} giorni prima dell'edizione; dopo, €{regular}. Scrivimi per sapere cosa è incluso nell'edizione specifica."
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
            "Campo base",
            "Coltello"
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
          "a": "Questa è la versione per singoli. Per team e organizzazioni vedi la pagina Scuole & Team."
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
  ]
};
