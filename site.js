/* Abitare il Sentiero — struttura e navigazione del sito.
   Script "classico" (NO type="module"): nessun problema di MIME sul server.

   Carica gli include condivisi (header/footer) e poi inizializza il menu. */
(function () {
  "use strict";

  // ---- Include condivisi: <div data-include="partials/header.html"></div> --
  function loadIncludes() {
    var nodes = document.querySelectorAll("[data-include]");
    return Promise.all(
      Array.prototype.map.call(nodes, function (node) {
        var url = node.getAttribute("data-include");
        return fetch(url)
          .then(function (r) {
            if (!r.ok) throw new Error(r.status + " " + url);
            return r.text();
          })
          .then(function (html) {
            var tmp = document.createElement("div");
            tmp.innerHTML = html;
            var frag = document.createDocumentFragment();
            while (tmp.firstChild) frag.appendChild(tmp.firstChild);
            node.parentNode.replaceChild(frag, node);
          })
          .catch(function (e) {
            console.error("Include non caricato:", url, e);
          });
      })
    );
  }

  function initNav() {
    // Sfondo dell'header allo scroll. Sulle pagine senza hero a tutto schermo
    // (es. privacy, cookie) l'header resta sempre solido, così il menu è leggibile.
    var header = document.getElementById("site-header");
    var noHero = !document.querySelector(".ais-hero");
    function onScroll() {
      if (!header) return;
      if (noHero || window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Menu a tendina "Esperienze"
    var expToggle = document.getElementById("exp-toggle");
    var expMenu = document.getElementById("exp-menu");
    if (expToggle && expMenu) {
      expToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = expMenu.classList.toggle("open");
        expToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function () {
        expMenu.classList.remove("open");
        expToggle.setAttribute("aria-expanded", "false");
      });
    }

    // Menu mobile (hamburger)
    var burger = document.getElementById("nav-burger");
    var mobile = document.getElementById("mobile-menu");
    if (burger && mobile) {
      burger.addEventListener("click", function () {
        mobile.classList.toggle("open");
        document.body.classList.toggle("menu-open");
      });
      mobile.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          mobile.classList.remove("open");
          document.body.classList.remove("menu-open");
        });
      });
    }

    // Scroll alle ancore (#id): tiene conto della barra annunci + menu fissi,
    // così in alto si vede il TITOLO della sezione (non la card sotto).
    function anchorOffset() {
      var h = 0;
      var bar = document.querySelector(".ais-topbar");
      var head = document.getElementById("site-header");
      if (bar) h += bar.offsetHeight;
      if (head) h += head.offsetHeight;
      return h + 44;
    }
    function scrollToId(id, smooth) {
      var target = id && id.length > 1 ? document.getElementById(decodeURIComponent(id.slice(1))) : null;
      if (!target) return false;
      // punta al titolo della sezione (eyebrow/titolo), non al bordo con il suo padding
      var top = target.getBoundingClientRect().top;
      var head = target.querySelector(".ais-eyebrow, .ais-level__t, h1, h2, h3");
      if (head) {
        var d = head.getBoundingClientRect().top - top;
        if (d > 0 && d < 260) top += d;
      }
      var y = top + window.pageYOffset - anchorOffset();
      window.scrollTo({ top: Math.max(0, y), behavior: smooth ? "smooth" : "auto" });
      return true;
    }
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (scrollToId(id, true)) {
          e.preventDefault();
          if (history.replaceState) history.replaceState(null, "", id);
        }
      });
    });
    // Link da un'altra pagina (pagina.html#id): riallinea dopo il caricamento
    if (location.hash.length > 1) {
      var fixHash = function () { scrollToId(location.hash, false); };
      window.addEventListener("load", function () { fixHash(); setTimeout(fixHash, 250); });
    }

    // Segnala che gli include sono pronti (per cookies.js / forms.js)
    document.dispatchEvent(new CustomEvent("includes:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      loadIncludes().then(initNav);
    });
  } else {
    loadIncludes().then(initNav);
  }

  // Micro-reveal delle sezioni (lento, discreto). Rispetta prefers-reduced-motion
  // e degrada in modo sicuro: se qualcosa va storto, tutto resta visibile.
  function initReveal() {
    try {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !("IntersectionObserver" in window)) return;
      var root = document.documentElement;
      root.classList.add("ais-anim");
      var sections = document.querySelectorAll("main > section");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("ais-shown"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      sections.forEach(function (s, i) { if (i < 2) s.classList.add("ais-shown"); else io.observe(s); });
      // rete di sicurezza: rivela tutto dopo 2.5s in ogni caso
      setTimeout(function () { sections.forEach(function (s) { s.classList.add("ais-shown"); }); }, 2500);
    } catch (e) { /* no-op: contenuto resta visibile */ }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReveal);
  } else {
    initReveal();
  }

  // Slider di foto (scroll-snap nativo + frecce, puntini e autoplay opzionale).
  // Script classico: senza JS lo slider resta scorrevole con swipe/trackpad.
  function initSliders() {
    var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var roots = document.querySelectorAll("[data-slider]");
    Array.prototype.forEach.call(roots, function (root) {
      var track = root.querySelector(".ais-slider__track");
      if (!track) return;
      var n = track.children.length;
      if (n < 2) return;
      var dotsBox = root.querySelector(".ais-slider__dots");
      var prev = root.querySelector(".ais-slider__btn--prev");
      var next = root.querySelector(".ais-slider__btn--next");
      var delay = parseInt(root.getAttribute("data-autoplay"), 10) || 0;
      var dots = [], idx = 0, paused = false, visible = true, ticking = false, resumeT = null;

      function mark() {
        dots.forEach(function (d, i) {
          if (i === idx) d.setAttribute("aria-current", "true");
          else d.removeAttribute("aria-current");
        });
      }
      function go(i) {
        i = (i + n) % n;
        var left = i * track.clientWidth;
        try { track.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" }); }
        catch (e) { track.scrollLeft = left; }
      }
      function pause(ms) {
        paused = true;
        clearTimeout(resumeT);
        if (ms) resumeT = setTimeout(function () { paused = false; }, ms);
      }

      if (dotsBox) {
        for (var i = 0; i < n; i++) {
          (function (k) {
            var b = document.createElement("button");
            b.type = "button";
            b.className = "ais-slider__dot";
            b.setAttribute("aria-label", "Vai all\u2019immagine " + (k + 1));
            b.addEventListener("click", function () { pause(9000); go(k); });
            dotsBox.appendChild(b);
            dots.push(b);
          })(i);
        }
      }
      if (prev) prev.addEventListener("click", function () { pause(9000); go(idx - 1); });
      if (next) next.addEventListener("click", function () { pause(9000); go(idx + 1); });

      track.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          ticking = false;
          var w = track.clientWidth || 1;
          idx = Math.max(0, Math.min(n - 1, Math.round(track.scrollLeft / w)));
          mark();
        });
      }, { passive: true });
      window.addEventListener("resize", function () { track.scrollLeft = idx * track.clientWidth; });

      root.classList.add("ais-slider--js");
      mark();

      if (delay && !reduce) {
        root.addEventListener("mouseenter", function () { pause(0); });
        root.addEventListener("mouseleave", function () { paused = false; });
        root.addEventListener("focusin", function () { pause(0); });
        root.addEventListener("focusout", function () { paused = false; });
        root.addEventListener("touchstart", function () { pause(9000); }, { passive: true });
        if ("IntersectionObserver" in window) {
          new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.3 }).observe(root);
        }
        setInterval(function () {
          if (!paused && visible && !document.hidden) go(idx + 1);
        }, delay);
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSliders);
  } else {
    initSliders();
  }

  // Slider "peek": immagine centrale con anteprima della precedente e della successiva.
  // Script classico. Senza JS resta visibile la prima foto. Su mobile: una foto per volta, swipe.
  function initPeek() {
    var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    Array.prototype.forEach.call(document.querySelectorAll("[data-peek]"), function (root) {
      var slides = Array.prototype.slice.call(root.querySelectorAll(".ais-peek__slide"));
      var n = slides.length;
      if (n < 3) return;
      var stage = root.querySelector(".ais-peek__stage") || root;
      var prevBtn = root.querySelector(".ais-peek__btn--prev");
      var nextBtn = root.querySelector(".ais-peek__btn--next");
      var dotsBox = root.querySelector(".ais-peek__dots");
      var delay = parseInt(root.getAttribute("data-autoplay"), 10) || 0;
      var idx = 0, dots = [], paused = false, visible = true, resumeT = null;

      function rel(i) {
        var r = (((i - idx) % n) + n) % n;
        if (r > n / 2) r -= n;
        return r;
      }
      function render() {
        stage.scrollLeft = 0;
        slides.forEach(function (s, i) {
          var r = rel(i);
          s.className = "ais-peek__slide" +
            (r === 0 ? " is-active" : r === -1 ? " is-prev" : r === 1 ? " is-next" : r < 0 ? " is-far-l" : " is-far-r");
          s.setAttribute("aria-hidden", r === 0 ? "false" : "true");
        });
        dots.forEach(function (d, i) {
          if (i === idx) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
        });
      }
      function go(i) { idx = ((i % n) + n) % n; render(); }
      function pause(ms) {
        paused = true;
        clearTimeout(resumeT);
        if (ms) resumeT = setTimeout(function () { paused = false; }, ms);
      }

      if (dotsBox) {
        for (var k = 0; k < n; k++) {
          (function (j) {
            var b = document.createElement("button");
            b.type = "button";
            b.className = "ais-peek__dot";
            b.setAttribute("aria-label", "Vai all\u2019immagine " + (j + 1));
            b.addEventListener("click", function () { pause(9000); go(j); });
            dotsBox.appendChild(b);
            dots.push(b);
          })(k);
        }
      }
      slides.forEach(function (s, i) {
        s.addEventListener("click", function () {
          var r = rel(i);
          if (r === -1 || r === 1) { pause(9000); go(idx + r); }
        });
      });
      if (prevBtn) prevBtn.addEventListener("click", function () { pause(9000); go(idx - 1); });
      if (nextBtn) nextBtn.addEventListener("click", function () { pause(9000); go(idx + 1); });

      var sx = 0, sy = 0;
      stage.addEventListener("touchstart", function (e) {
        var t = e.touches[0]; sx = t.clientX; sy = t.clientY; pause(9000);
      }, { passive: true });
      stage.addEventListener("touchend", function (e) {
        var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(idx + (dx < 0 ? 1 : -1));
      }, { passive: true });
      stage.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { pause(9000); go(idx - 1); }
        else if (e.key === "ArrowRight") { pause(9000); go(idx + 1); }
      });

      root.classList.add("ais-peek--js");
      render();

      if (delay && !reduce) {
        root.addEventListener("mouseenter", function () { pause(0); });
        root.addEventListener("mouseleave", function () { paused = false; });
        if ("IntersectionObserver" in window) {
          new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.3 }).observe(root);
        }
        setInterval(function () { if (!paused && visible && !document.hidden) go(idx + 1); }, delay);
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPeek);
  } else {
    initPeek();
  }

  // Dati: window.AIS_DATA (events.js). Con ?preview=1 usa la bozza salvata da admin.html.
  var PREVIEW = /[?&]preview=1/.test(location.search);
  function getData() {
    if (PREVIEW) {
      try {
        var pv = JSON.parse(localStorage.getItem("ais_preview") || "null");
        if (pv && pv.experiences && pv.events) return pv;
      } catch (e) {}
    }
    return window.AIS_DATA;
  }
  if (PREVIEW) {
    document.addEventListener("DOMContentLoaded", function () {
      var b = document.createElement("div");
      b.className = "ais-previewbar";
      b.textContent = "Anteprima bozza \u2014 non ancora pubblicata";
      document.body.appendChild(b);
    });
  }

  // Date dinamiche: legge window.AIS_DATA (events.js) e confronta con il giorno di oggi.
  //  data-events="calendar"    -> tutte le date future, raggruppate per mese
  //  data-events="upcoming"    -> le prossime N (data-limit) tra tutte le esperienze attive
  //  data-events="experience"  -> le date future di una sola esperienza (data-exp)
  // data-cta="link" (vai alla pagina) | "book" (WhatsApp). Se events.js manca resta l'HTML statico.

  // CTA fissa (pagina Escape): compare dopo l'hero, si nasconde sulle sezioni date/contatto
  function initStickyCta() {
    var bar = document.querySelector("[data-sticky-cta]");
    if (!bar) return;
    bar.hidden = false;
    var hide = {};
    function update() {
      var past = window.pageYOffset > 520;
      var busy = hide.date || hide.parliamone || hide.footer;
      bar.classList.toggle("is-on", past && !busy);
    }
    window.addEventListener("scroll", update, { passive: true });
    if ("IntersectionObserver" in window) {
      [["date", "#date"], ["parliamone", "#parliamone"], ["footer", "#contatti"]].forEach(function (p) {
        var el = document.querySelector(p[1]);
        if (!el) return;
        new IntersectionObserver(function (en) { hide[p[0]] = en[0].isIntersecting; update(); }).observe(el);
      });
    }
    update();
  }

  function initEvents() {
    var D = getData();
    var nodes = document.querySelectorAll("[data-events]");
    if (!D || !D.events || !nodes.length) return;
    var MESI = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
    var MAB = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];
    var GG = ["dom","lun","mar","mer","gio","ven","sab"];
    var TIPI = { soglia: "Soglia", avventura: "Avventura", immersione: "Immersione" };
    var WA = "https://wa.me/+393667187733";
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    function pd(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
    function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
    function short(d) { return d.getDate() + " " + MAB[d.getMonth()]; }
    function longDate(s, f) {
      var a = GG[s.getDay()] + " " + s.getDate();
      if (s.getTime() === f.getTime()) return a + " " + MAB[s.getMonth()] + " " + s.getFullYear();
      var b = GG[f.getDay()] + " " + f.getDate();
      if (s.getMonth() === f.getMonth()) return a + " \u2013 " + b + " " + MAB[s.getMonth()] + " " + s.getFullYear();
      return a + " " + MAB[s.getMonth()] + " \u2013 " + b + " " + MAB[f.getMonth()] + " " + f.getFullYear();
    }
    var ICO = function (n) { return '<svg class="ais-ico"><use href="#i-' + n + '"></use></svg>'; };

    var all = D.events.map(function (e) {
      return { e: e, x: D.experiences[e.exp] || {}, s: pd(e.start), f: pd(e.end || e.start) };
    }).filter(function (i) { return i.f >= today; })
      .sort(function (a, b) { return a.s - b.s; });

    function row(i, o) {
      var x = i.x, e = i.e;
      var days = i.s.getTime() === i.f.getTime() ? "" + i.s.getDate() : i.s.getDate() + "\u2013" + i.f.getDate();
      var place = e.place || x.place || "";
      var price = "";
      if (x.price) {
        var dl = addDays(i.s, -x.price.daysBefore);
        price = today <= dl
          ? '<p class="ais-cal__meta ais-cal__price">\u20ac' + x.price.early + " early bird fino al " + short(dl) + " &middot; poi \u20ac" + x.price.regular + "</p>"
          : '<p class="ais-cal__meta ais-cal__price">\u20ac' + x.price.regular + "</p>";
      }
      var href, label, ext = "";
      if (o.cta === "book") {
        var txt = "Ciao Matteo, vorrei prenotare " + x.name + " (" + longDate(i.s, i.f) + ").";
        href = WA + "?text=" + encodeURIComponent(txt);
        label = "Scrivimi per prenotare &rarr;";
        ext = ' target="_blank" rel="noopener noreferrer"';
      } else {
        href = (x.url || "#") + "#date";
        label = "Scopri e prenota &rarr;";
      }
      return '<div class="ais-cal__row"><div class="ais-cal__date"><b>' + days + "</b><span>" + MAB[i.s.getMonth()].toUpperCase() + "</span></div><div>" +
        (o.chip && TIPI[x.type] ? '<span class="ais-caltype ais-caltype--' + x.type + '">' + TIPI[x.type] + "</span>" : "") +
        '<h3 class="ais-cal__t">' + x.name + (e.note ? '<span class="ais-cal__flag">' + e.note + "</span>" : "") + "</h3>" +
        '<p class="ais-cal__meta">' + longDate(i.s, i.f) + "</p>" +
        '<p class="ais-cal__meta ais-cal__facts"><span>' + ICO("clock") + x.duration + "</span><span>" + ICO("pin") + place + "</span></p>" + price +
        '</div><a class="ais-textlink ais-cal__cta" href="' + href + '"' + ext + ">" + label + "</a></div>";
    }
    function empty() {
      return '<p class="ais-cal__note">Nuove date in arrivo. <a class="ais-textlink" href="' + WA + '" target="_blank" rel="noopener noreferrer">Scrivimi</a> per essere avvisato.</p>';
    }


    // Calendario a card con immagine e filtro per tipologia
    var FILTRI = [
      { k: "tutte", label: "Tutte" },
      { k: "soglia", label: "Soglia", sub: "meno di 1 giorno" },
      { k: "avventura", label: "Avventura", sub: "fino a 1 giorno" },
      { k: "immersione", label: "Immersione", sub: "pi\u00f9 giorni" }
    ];
    function card(i, cta) {
      var x = i.x, e = i.e;
      var place = e.place || x.place || "";
      var days = i.s.getTime() === i.f.getTime() ? "" + i.s.getDate() : i.s.getDate() + "\u2013" + i.f.getDate();
      var price = "";
      if (x.price) {
        var dl = addDays(i.s, -x.price.daysBefore);
        price = today <= dl
          ? '<p class="ais-calcard__price"><b>\u20ac' + x.price.early + "</b> early bird fino al " + short(dl) + " &middot; poi \u20ac" + x.price.regular + "</p>"
          : '<p class="ais-calcard__price"><b>\u20ac' + x.price.regular + "</b></p>";
      }
      var href = (x.url || "#") + "#date", label = "Scopri e prenota", ext = "";
      if (cta === "book") {
        href = WA + "?text=" + encodeURIComponent("Ciao Matteo, vorrei prenotare " + x.name + " (" + longDate(i.s, i.f) + ").");
        label = "Scrivimi per prenotare"; ext = ' target="_blank" rel="noopener noreferrer"';
      }
      return '<article class="ais-calcard" data-type="' + x.type + '">' +
        '<a class="ais-calcard__media" href="' + (x.url || "#") + '" tabindex="-1" aria-hidden="true"><img alt="" loading="lazy" src="' + (x.img || "images/full-bosco.jpg") + '"/>' +
        '<span class="ais-calcard__date"><b>' + days + "</b><span>" + MAB[i.s.getMonth()].toUpperCase() + "</span></span>" +
        (e.note ? '<span class="ais-calcard__flag">' + e.note + "</span>" : "") + "</a>" +
        '<div class="ais-calcard__body"><span class="ais-caltype ais-caltype--' + x.type + '">' + (TIPI[x.type] || "") + "</span>" +
        '<h3 class="ais-calcard__t"><a href="' + (x.url || "#") + '">' + x.name + "</a></h3>" +
        '<p class="ais-calcard__meta">' + longDate(i.s, i.f) + "</p>" +
        '<p class="ais-calcard__meta">' + ICO("clock") + x.duration + " &middot; " + ICO("pin") + place + "</p>" + price +
        '<a class="ais-calcard__cta" href="' + href + '"' + ext + ">" + label + " " + ICO("arrow") + "</a></div></article>";
    }
    function renderCalendar(node, list, cta) {
      if (!list.length) { node.innerHTML = empty(); return; }
      var counts = { tutte: list.length };
      list.forEach(function (i) { counts[i.x.type] = (counts[i.x.type] || 0) + 1; });
      var bar = '<div class="ais-calfilter" role="group" aria-label="Filtra per tipologia">' +
        FILTRI.filter(function (f) { return f.k === "tutte" || counts[f.k]; }).map(function (f) {
          return '<button type="button" class="ais-calfilter__btn" data-filter="' + f.k + '" aria-pressed="' + (f.k === "tutte") + '">' +
            "<span>" + f.label + (f.sub ? ' <small>' + f.sub + "</small>" : "") + '</span><i>' + counts[f.k] + "</i></button>";
        }).join("") + "</div>";
      var html = "", key = "", open = false;
      list.forEach(function (i) {
        var k = i.s.getFullYear() + "-" + i.s.getMonth();
        if (k !== key) {
          if (open) html += "</div></section>";
          key = k;
          var m = MESI[i.s.getMonth()];
          html += '<section class="ais-calgroup"><h3 class="ais-calmonth">' + m.charAt(0).toUpperCase() + m.slice(1) + " " + i.s.getFullYear() + '</h3><div class="ais-calgrid">';
          open = true;
        }
        html += card(i, cta);
      });
      if (open) html += "</div></section>";
      node.innerHTML = bar + '<div class="ais-calresults">' + html + "</div>" +
        '<p class="ais-cal__note ais-calfilter__none" hidden>Nessuna data in questa tipologia, per ora. <a class="ais-textlink" href="' + WA + '" target="_blank" rel="noopener noreferrer">Scrivimi</a> per essere avvisato.</p>';
      var btns = node.querySelectorAll(".ais-calfilter__btn");
      var none = node.querySelector(".ais-calfilter__none");
      function apply(k) {
        Array.prototype.forEach.call(btns, function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === k)); });
        var shown = 0;
        Array.prototype.forEach.call(node.querySelectorAll(".ais-calgroup"), function (g) {
          var n = 0;
          Array.prototype.forEach.call(g.querySelectorAll(".ais-calcard"), function (c) {
            var ok = k === "tutte" || c.getAttribute("data-type") === k;
            c.hidden = !ok; if (ok) n++;
          });
          g.hidden = n === 0; shown += n;
        });
        none.hidden = shown !== 0;
      }
      Array.prototype.forEach.call(btns, function (b) {
        b.addEventListener("click", function () { apply(b.getAttribute("data-filter")); });
      });
    }

    Array.prototype.forEach.call(nodes, function (node) {
      var mode = node.getAttribute("data-events");
      var cta = node.getAttribute("data-cta") || "link";
      var limit = parseInt(node.getAttribute("data-limit"), 10) || 0;
      var list, html = "";
      if (mode === "calendar") {
        renderCalendar(node, all.filter(function (i) { return i.x.active; }), cta);
        node.setAttribute("data-events-ready", "true");
        return;
      }
      if (mode === "experience") {
        var slug = node.getAttribute("data-exp");
        list = all.filter(function (i) { return i.e.exp === slug; });
        if (limit) list = list.slice(0, limit);
        html = list.length ? list.map(function (i) { return row(i, { cta: cta, chip: false }); }).join("") : empty();
      } else {
        list = all.filter(function (i) { return i.x.active; });
        if (mode === "upcoming") {
          if (limit) list = list.slice(0, limit);
          html = list.length ? list.map(function (i) { return row(i, { cta: cta, chip: true }); }).join("") : empty();
        }
      }
      node.innerHTML = html;
      node.setAttribute("data-events-ready", "true");
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEvents);
  } else {
    initEvents();
  }

  // Contenuti gestiti da admin.html: domande, info utili, "cosa impari", prezzi.
  // Il markup statico resta come riserva se i dati mancano o JavaScript non parte.
  function initContent() {
    var D = getData();
    if (!D || !D.experiences) return;
    function esc(t) {
      return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function fmt(text, x) {
      var p = x && x.price;
      var t = esc(text == null ? "" : text);
      t = t.replace(/\{early\}/g, p ? p.early : "\u2014").replace(/\{regular\}/g, p ? p.regular : "\u2014").replace(/\{days\}/g, p ? p.daysBefore : "\u2014");
      t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]/g, '<span class="todo">[$1]</span>');
      return t;
    }
    function ico(n) { return '<svg class="ais-ico"><use href="#i-' + esc(n) + '"></use></svg>'; }
    Array.prototype.forEach.call(document.querySelectorAll("[data-content]"), function (node) {
      var x = D.experiences[node.getAttribute("data-exp")];
      var kind = node.getAttribute("data-content");
      if (!x) return;
      var list = x[kind];
      if (!list || !list.length) return;
      var html = "";
      if (kind === "faq") {
        html = list.map(function (f) { return "<details><summary>" + fmt(f.q, x) + "</summary><p>" + fmt(f.a, x) + "</p></details>"; }).join("");
      } else if (kind === "info") {
        html = list.map(function (r) {
          return '<div class="ais-data__row"><div class="ais-data__k">' + (r.ico ? ico(r.ico) : "") + esc(r.k) + '</div><div class="ais-data__v">' + fmt(r.v, x) + "</div></div>";
        }).join("");
      } else if (kind === "learn") {
        html = list.map(function (c) {
          return '<article class="ais-pcard"><div class="ais-pcard__media"><img alt="" src="' + esc(c.img) + '" loading="lazy"/></div><div class="ais-pcard__body"><h3>' +
            ico(c.icon || "sparkles") + esc(c.title) + '</h3><ul class="ais-pcard__chips">' +
            (c.chips || []).map(function (ch) { return "<li>" + esc(ch) + "</li>"; }).join("") + "</ul></div></article>";
        }).join("");
        node.classList.toggle("ais-pgrid--3", list.length === 3 || list.length === 6);
      } else { return; }
      node.innerHTML = html;
      node.setAttribute("data-content-ready", "true");
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-price]"), function (n) {
      var x = D.experiences[n.getAttribute("data-exp")];
      var p = x && x.price;
      if (!p) return;
      var k = n.getAttribute("data-price");
      var v = k === "early" ? p.early : k === "regular" ? p.regular : p.daysBefore;
      if (v != null) n.textContent = v;
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContent);
  } else {
    initContent();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStickyCta);
  } else {
    initStickyCta();
  }
})();
