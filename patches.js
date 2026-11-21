/* Abitare il Sentiero — AGGIORNAMENTI DEI CONTENUTI (dati)
   Questo file è CODICE: lo prendi da GitHub insieme agli altri. Non contiene i tuoi dati.
   Quando apri admin.html compare "Aggiornamento contenuti disponibile": premendo "Applica" le modifiche qui sotto
   vengono fatte sul TUO events.js senza toccare quello che hai cambiato tu. Dove un valore è già stato modificato da te
   la modifica viene saltata e te lo diciamo. Ogni aggiornamento si applica una sola volta (id registrato nei dati).
   Script classico (niente type="module"). */
(function () {
  "use strict";

  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function get(o, path) { var n = o; for (var i = 0; i < path.length; i++) { if (n == null) return undefined; n = n[path[i]]; } return n; }
  function put(o, path, v) {
    var n = o;
    for (var i = 0; i < path.length - 1; i++) { if (n[path[i]] == null || typeof n[path[i]] !== "object") n[path[i]] = {}; n = n[path[i]]; }
    n[path[path.length - 1]] = v;
  }
  // sostituisce testo in tutte le stringhe sotto un nodo; ritorna quante sostituzioni
  function replaceIn(node, from, to) {
    var n = 0;
    (function walk(x, parent, key) {
      if (typeof x === "string") { if (x.indexOf(from) >= 0) { parent[key] = x.split(from).join(to); n++; } return; }
      if (x && typeof x === "object") Object.keys(x).forEach(function (k) { walk(x[k], x, k); });
    })(node, { v: node }, "v");
    return n;
  }
  // toglie dalle liste le stringhe uguali a uno dei valori
  function dropIn(node, values) {
    var n = 0;
    (function walk(x) {
      if (Array.isArray(x)) {
        for (var i = x.length - 1; i >= 0; i--) { if (typeof x[i] === "string" && values.indexOf(x[i]) >= 0) { x.splice(i, 1); n++; } else walk(x[i]); }
      } else if (x && typeof x === "object") Object.keys(x).forEach(function (k) { walk(x[k]); });
    })(node);
    return n;
  }

  var LIB = {
    apply: function (data, patch) {
      var rep = [];
      (patch.ops || []).forEach(function (op) {
        var label = op.label || op.op, scope = op.scope ? get(data, op.scope) : null;
        if (op.op === "set") {
          var cur = get(data, op.path);
          if (op.ifEquals !== undefined && !same(cur, op.ifEquals)) { rep.push({ ok: false, label: label, note: "già modificato da te: lascio il tuo valore" }); return; }
          put(data, op.path, JSON.parse(JSON.stringify(op.value))); rep.push({ ok: true, label: label });
        } else if (op.op === "replaceText") {
          if (scope == null) { rep.push({ ok: false, label: label, note: "sezione non presente" }); return; }
          var c = replaceIn(scope, op.from, op.to);
          rep.push(c ? { ok: true, label: label } : { ok: false, label: label, note: "testo non trovato (già modificato?)" });
        } else if (op.op === "dropStrings") {
          if (scope == null) { rep.push({ ok: false, label: label, note: "sezione non presente" }); return; }
          var d = dropIn(scope, op.values);
          rep.push(d ? { ok: true, label: label } : { ok: false, label: label, note: "già tolto o modificato" });
        }
      });
      data.patchesApplied = (data.patchesApplied || []).filter(function (x) { return x !== patch.id; }).concat([patch.id]);
      return rep;
    }
  };

  var ESC = ["experiences", "escape-the-city"];
  var PATCHES = [
    {
      id: "2026-11-21-escape",
      title: "Escape the City: promo €115 fino al 31/12, poi early bird €125; piccoli gruppi max 12; luoghi; testi senza coltello",
      ops: [
        { op: "set", label: "Prezzo: promo €115 fino al 31 dicembre 2026, poi early bird €125 (intero €135)", path: ESC.concat(["price"]),
          ifEquals: { early: 115, regular: 135, daysBefore: 15 }, value: { early: 125, regular: 135, daysBefore: 15, promo: { price: 115, until: "2026-12-31" } } },
        { op: "set", label: "Luogo di base: Toscana, Emilia, Lombardia", path: ESC.concat(["place"]), ifEquals: "Appennino", value: "Toscana, Emilia, Lombardia" },
        { op: "set", label: "Gruppo: max 12", path: ESC.concat(["group"]), ifEquals: "6–10", value: "max 12" },
        { op: "replaceText", label: "Info utili: luogo", scope: ESC, from: "Appennino Tosco-Emiliano [punto di ritrovo da comunicare agli iscritti]", to: "Toscana, Emilia, Lombardia [il luogo cambia a ogni edizione: punto di ritrovo da comunicare agli iscritti]" },
        { op: "replaceText", label: "Info utili: gruppo", scope: ESC, from: "6–10 partecipanti.", to: "Piccoli gruppi, massimo 12 partecipanti." },
        { op: "replaceText", label: "Info utili: riga prezzo con promo", scope: ESC, from: "**€{early}** early bird — iscrivendoti", to: "{promoline}**€{early}** early bird — iscrivendoti" },
        { op: "replaceText", label: "Domande: «Quanto costa?» con promo", scope: ESC, from: "€{early} con l'early bird, iscrivendoti fino a {days} giorni prima dell'edizione", to: "{promoline}€{early} con l'early bird, iscrivendoti fino a {days} giorni prima dell'edizione" },
        { op: "dropStrings", label: "Cosa impari: tolto «Coltello»", scope: ESC.concat(["learn"]), values: ["Coltello"] },
        { op: "replaceText", label: "Attività: «Nodi, corde e coltello» → «Nodi e corde»", scope: ESC, from: "Nodi, corde e coltello", to: "Nodi e corde" },
        { op: "replaceText", label: "Attività: testo nodi senza utensile", scope: ESC, from: "Fibre naturali, nodi essenziali, un utensile intagliato nel legno, in sicurezza.", to: "Fibre naturali e nodi essenziali, per legare, costruire e fissare." },
        { op: "replaceText", label: "Attività: «Il sit spot» → «Riflessione e condivisione»", scope: ESC, from: "Il sit spot", to: "Riflessione e condivisione" },
        { op: "replaceText", label: "Attività: testo riflessione", scope: ESC, from: "Un tempo da solo nel bosco, in silenzio, a osservare.", to: "Un momento da solo nel bosco per fermarti e riflettere, poi il confronto con il gruppo." },
        { op: "replaceText", label: "Testimonianze: titolo senza «sit spot»", scope: ["testimonials"], from: "Il sit spot, da solo nel bosco", to: "Da solo nel bosco, in silenzio" }
      ]
    }
  ];

  window.AIS_PATCH_LIB = LIB;
  window.AIS_PATCHES = PATCHES;
})();
