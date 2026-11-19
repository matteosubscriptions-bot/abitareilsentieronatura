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

  // Menu / footer: le esperienze con "mostra nel menu" (admin.html) compaiono nel menu a tendina,
  // nel menu mobile e nel footer. Il markup statico resta come riserva.
  function renderMenu() {
    var D = getData();
    if (!D || !D.experiences) return;
    var keys = Object.keys(D.experiences);
    if (!keys.some(function (k) { return typeof D.experiences[k].menu === "boolean"; })) return;
    var list = keys.filter(function (k) { return D.experiences[k].menu === true && D.experiences[k].url; });
    var urls = keys.map(function (k) { return D.experiences[k].url; });
    function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
    var dm = document.getElementById("exp-menu");
    if (dm) {
      dm.innerHTML = list.map(function (k) { return '<a href="' + esc(D.experiences[k].url) + '">' + esc(D.experiences[k].name) + "</a>"; }).join("") +
        '<a href="esperienze.html" class="nav-dropdown-all">Tutte le esperienze &rarr;</a>';
    }
    var mm = document.getElementById("mobile-menu");
    if (mm) {
      Array.prototype.forEach.call(mm.querySelectorAll("a"), function (a) { if (urls.indexOf(a.getAttribute("href")) >= 0) a.remove(); });
      var all = mm.querySelector('a[href="esperienze.html"]');
      list.slice().reverse().forEach(function (k) {
        var a = document.createElement("a");
        a.href = D.experiences[k].url; a.textContent = D.experiences[k].name;
        if (all) all.insertAdjacentElement("afterend", a); else mm.insertBefore(a, mm.firstChild);
      });
    }
    var ft = document.querySelector("footer");
    if (ft) {
      var tutte = Array.prototype.filter.call(ft.querySelectorAll('a[href="esperienze.html"]'), function (a) { return /^Tutte/.test(a.textContent.trim()); })[0];
      if (tutte) {
        Array.prototype.forEach.call(ft.querySelectorAll("a"), function (a) { if (urls.indexOf(a.getAttribute("href")) >= 0) a.remove(); });
        list.forEach(function (k) {
          var a = tutte.cloneNode(false);
          a.href = D.experiences[k].url; a.textContent = D.experiences[k].name;
          tutte.parentNode.insertBefore(a, tutte);
        });
      }
    }
  }

  function initNav() {
    renderMenu();
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

  // Media gestiti da admin.html: header principale, slider e galleria di ogni esperienza.
  // Il markup statico resta come riserva e viene sostituito solo se i dati sono diversi.
  function initMedia() {
    var D = getData();
    if (!D || !D.experiences) return;
    var lib = {};
    (D.media || []).forEach(function (m) { lib[m.src] = m.alt || ""; });
    function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
    var PATTERN = ["g-wide g-tall", "", "", "", "", "g-wide", "", ""];
    Array.prototype.forEach.call(document.querySelectorAll("[data-media]"), function (node) {
      var x = D.experiences[node.getAttribute("data-exp")] || (D.pagemedia && D.pagemedia[node.getAttribute("data-exp")]);
      var m = x && x.media;
      var kind = node.getAttribute("data-media");
      if (!m) return;
      if (kind === "hero") {
        var h = m.hero;
        if (!h || !h.img) return;
        var v = node.querySelector("video"), im = node.querySelector("img");
        var a = lib[h.img] || x.name || "";
        if (h.video) {
          if (v && v.getAttribute("src") === h.video && v.getAttribute("poster") === h.img) return;
          node.innerHTML = '<video autoplay="" loop="" muted="" playsinline="" poster="' + esc(h.img) + '" src="' + esc(h.video) + '"></video>';
          var nv = node.querySelector("video"); if (nv) nv.muted = true;
        } else {
          if (!v && im && im.getAttribute("src") === h.img && im.getAttribute("alt") === a) return;
          node.innerHTML = '<img alt="' + esc(a) + '" src="' + esc(h.img) + '"/>';
        }
      } else if (kind === "slider") {
        var list = m.slider || [];
        if (!list.length) return;
        var stage = node.querySelector(".ais-peek__stage");
        if (!stage) return;
        var old = Array.prototype.slice.call(stage.querySelectorAll(".ais-peek__slide"));
        var same = old.length === list.length && old.every(function (f, i) {
          var fi = f.querySelector("img"), fc = f.querySelector("figcaption");
          return fi && fi.getAttribute("src") === list[i].img && (fc ? fc.textContent : "") === (list[i].cap || "") &&
            fi.getAttribute("alt") === (lib[list[i].img] || list[i].cap || "");
        });
        if (same) return;
        var first = stage.querySelector(".ais-peek__btn");
        old.forEach(function (f) { f.remove(); });
        list.forEach(function (s, i) {
          var f = document.createElement("figure");
          f.className = "ais-peek__slide" + (i === 0 ? " is-active" : "");
          f.setAttribute("role", "group"); f.setAttribute("aria-roledescription", "slide");
          f.setAttribute("aria-label", (i + 1) + " di " + list.length);
          f.innerHTML = '<img alt="' + esc(lib[s.img] || s.cap || "") + '" src="' + esc(s.img) + '"' + (i > 1 ? ' loading="lazy"' : "") + "/>" +
            (s.cap ? '<figcaption class="ais-peek__cap">' + esc(s.cap) + "</figcaption>" : "");
          stage.insertBefore(f, first);
        });
      } else if (kind === "gallery") {
        var g = m.gallery || [];
        if (!g.length) return;
        var cur = Array.prototype.slice.call(node.querySelectorAll("img")).map(function (i) { return i.getAttribute("src"); });
        var sameG = cur.length === g.length && cur.every(function (src, i) { return src === g[i]; });
        if (sameG) return;
        node.innerHTML = g.map(function (src, i) {
          var c = PATTERN[i % PATTERN.length];
          return "<figure" + (c ? ' class="' + c + '"' : "") + '><img alt="' + esc(lib[src] || "") + '" src="' + esc(src) + '" loading="lazy"/></figure>';
        }).join("");
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMedia);
  } else {
    initMedia();
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


  // Testimonianze gestite da admin.html: video (file / YouTube / Vimeo), citazioni, recensioni.
  function parseVideo(u) {
    u = String(u || "").trim();
    if (!u) return null;
    var m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([\w-]{11})/i);
    if (m) return { type: "yt", id: m[1], embed: "https://www.youtube-nocookie.com/embed/" + m[1] + "?autoplay=1&rel=0", poster: "https://i.ytimg.com/vi/" + m[1] + "/hqdefault.jpg" };
    m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (m) return { type: "vimeo", id: m[1], embed: "https://player.vimeo.com/video/" + m[1] + "?autoplay=1", poster: "" };
    if (/\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(u)) return { type: "file", src: u };
    return null;
  }
  function initTestimonials() {
    var D = getData();
    if (!D || !D.testimonials) return;
    function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
    var done = [];
    Array.prototype.forEach.call(document.querySelectorAll("[data-testimonials]"), function (node) {
      var kind = node.getAttribute("data-testimonials"), scope = node.getAttribute("data-scope"), exp = node.getAttribute("data-exp");
      var items = D.testimonials.filter(function (t) {
        return scope === "home" ? t.home : scope === "page" ? t.page : (t.exps || []).indexOf(exp) >= 0;
      });
      var html = "", n = 0;
      if (kind === "video") {
        items.forEach(function (t) {
          var v = parseVideo(t.video);
          if (!v) return;
          n++;
          var media;
          if (v.type === "file") {
            media = '<video controls preload="metadata" playsinline' + (t.poster ? ' poster="' + esc(t.poster) + '"' : "") + ' src="' + esc(v.src) + '"></video>';
          } else {
            var po = t.poster || v.poster;
            media = '<button type="button" class="ais-yt" data-embed="' + esc(v.embed) + '" data-title="' + esc("Video di " + (t.name || "")) + '" aria-label="' + esc("Guarda il video di " + (t.name || "")) + '"' +
              (po ? ' style="background-image:url(\'' + esc(po) + '\')"' : "") + '><span class="ais-yt__play" aria-hidden="true"></span></button>';
          }
          html += '<article class="ais-vtest__card"><div class="ais-vtest__media">' + media + '</div><div class="ais-vtest__body"><p class="ais-vtest__name">' + esc(t.name) + "</p>" +
            (t.label ? '<p class="ais-vtest__exp">' + esc(t.label) + "</p>" : "") + (t.text ? '<p class="ais-vtest__cap">\u201c' + esc(t.text) + "\u201d</p>" : "") + "</div></article>";
        });
      } else {
        items.forEach(function (t) {
          if (t.video && parseVideo(t.video) || !t.text) return;
          n++;
          var who = esc(t.name) + (t.label ? ", " + esc(t.label) : "");
          if (kind === "reviews") {
            html += '<div class="ais-review"><div class="ais-review__stars">\u2605\u2605\u2605\u2605\u2605</div>' + (t.title ? "<h3>" + esc(t.title) + "</h3>" : "") + "<p>" + esc(t.text) + "</p><cite>\u2014 " + who + "</cite></div>";
          } else {
            html += '<blockquote class="ais-quote"><p>' + esc(t.text) + "</p><cite>\u2014 " + who + "</cite></blockquote>";
          }
        });
      }
      // se il contenuto \u00e8 gi\u00e0 uguale non lo ridisegno (evita di ricaricare i video)
      var tmp = document.createElement("div");
      tmp.innerHTML = html;
      function sig(el2) {
        return el2.textContent.replace(/\s+/g, " ").trim() + "|" +
          Array.prototype.map.call(el2.querySelectorAll("video,[data-embed]"), function (v) { return v.getAttribute("src") || v.getAttribute("data-embed"); }).join(",");
      }
      if (sig(tmp) !== sig(node)) node.innerHTML = html;
      node.setAttribute("data-testimonials-ready", "true");
      done.push({ node: node, n: n, kind: kind });
    });
    // sezioni senza contenuti: nascoste; il suggerimento "scorri" solo con 2+ video
    var secs = [];
    done.forEach(function (d) { var s = d.node.closest("section"); if (s && secs.indexOf(s) < 0) secs.push(s); });
    secs.forEach(function (sec) {
      var mine = done.filter(function (d) { return d.node.closest("section") === sec; });
      sec.hidden = !mine.some(function (d) { return d.n > 0; });
      var hint = sec.querySelector("[data-testi-hint]");
      if (hint) hint.hidden = !mine.some(function (d) { return d.kind === "video" && d.n > 1; });
    });
  }
  // YouTube/Vimeo: il player si carica solo al click (nessun cookie prima)
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".ais-yt");
    if (!b) return;
    var f = document.createElement("iframe");
    f.src = b.getAttribute("data-embed");
    f.title = b.getAttribute("data-title") || "Video";
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.setAttribute("allowfullscreen", "");
    f.className = "ais-yt__frame";
    b.parentNode.replaceChild(f, b);
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTestimonials);
  } else {
    initTestimonials();
  }


  // Schede (tab) accessibili: Scuole / Centri estivi / Famiglie
  function initTabs() {
    Array.prototype.forEach.call(document.querySelectorAll(".ais-tabbar"), function (bar) {
      var btns = Array.prototype.slice.call(bar.querySelectorAll("[data-tab]"));
      function show(k, focus) {
        btns.forEach(function (b) {
          var on = b.getAttribute("data-tab") === k;
          b.setAttribute("aria-selected", on ? "true" : "false");
          b.tabIndex = on ? 0 : -1;
          var p = document.getElementById("pan-" + b.getAttribute("data-tab"));
          if (p) p.hidden = !on;
          if (on && focus) b.focus();
        });
      }
      btns.forEach(function (b, i) {
        b.addEventListener("click", function () { show(b.getAttribute("data-tab")); });
        b.addEventListener("keydown", function (e) {
          var j = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : -1;
          if (j < 0) return;
          e.preventDefault();
          show(btns[(j + btns.length) % btns.length].getAttribute("data-tab"), true);
        });
      });
      show(btns[0].getAttribute("data-tab"));
      bar._show = show;
    });
  }

  // Richiesta di proposta: compone il messaggio e prepara i link WhatsApp / email
  function initComposer() {
    var WA = "https://wa.me/+393667187733", MAIL = "abitareilsentiero@gmail.com";
    Array.prototype.forEach.call(document.querySelectorAll("[data-composer]"), function (root) {
      var kind = root.getAttribute("data-composer");
      var type = "scuola", themes = [], props = [];
      var F = {};
      Array.prototype.forEach.call(root.querySelectorAll("[data-f]"), function (f) { F[f.getAttribute("data-f")] = f; });
      var msgEl = root.querySelector("[data-msg]"), wa = root.querySelector("[data-wa]"), mail = root.querySelector("[data-mail]");
      var TL = { scuola: "una scuola", estivo: "un centro estivo", famiglie: "un gruppo di famiglie" };
      function v(k) { return F[k] ? F[k].value.trim() : ""; }
      function build() {
        var L = ["Ciao Matteo,"], g = [];
        if (kind === "aziende") {
          L.push("scrivo per il team di " + (v("name") || "un’azienda") + ".");
          if (v("n")) g.push("circa " + v("n") + " persone");
          if (v("where")) g.push("a " + v("where"));
          if (g.length) L.push("Siamo " + g.join(", ") + ".");
          if (v("when")) L.push("Periodo: " + v("when") + ".");
          var named = props.filter(function (p) { return p !== "__adhoc"; });
          if (named.length) L.push("Ci hanno incuriosito: " + named.join(", ") + ".");
          if (props.indexOf("__adhoc") >= 0) L.push("Vorremmo una proposta su misura" + (v("adhoc") ? ": " + v("adhoc") : "") + ".");
          if (themes.length) L.push("Vorremmo lavorare su: " + themes.join(", ").toLowerCase() + ".");
          if (v("note")) L.push(v("note"));
          L.push("Possiamo sentirci per progettare la giornata?");
        } else {
          L.push("scrivo per " + TL[type] + (v("name") ? " (" + v("name") + ")" : "") + ".");
          if (v("n")) g.push("circa " + v("n") + " bambini");
          if (v("age")) g.push(v("age"));
          if (g.length) L.push("Siamo " + g.join(", ") + (v("where") ? ", a " + v("where") : "") + ".");
          else if (v("where")) L.push("Siamo a " + v("where") + ".");
          if (v("when")) L.push("Periodo: " + v("when") + ".");
          if (themes.length) L.push("Ci piacerebbe: " + themes.join(", ").toLowerCase() + ".");
          if (v("note")) L.push(v("note"));
          L.push("Possiamo sentirci per costruire una proposta insieme?");
        }
        return L.join("\n");
      }
      var edited = false, resetBtn = root.querySelector("[data-msg-reset]");
      function update() {
        var m = edited && msgEl ? msgEl.value : build();
        if (msgEl && !edited && "value" in msgEl) msgEl.value = m;
        if (resetBtn) resetBtn.hidden = !edited;
        if (wa) wa.href = WA + "?text=" + encodeURIComponent(m);
        if (mail) mail.href = "mailto:" + MAIL + "?subject=" + encodeURIComponent(kind === "aziende" ? "Richiesta di proposta per il team" : "Richiesta di proposta: " + TL[type]) + "&body=" + encodeURIComponent(m);
      }
      if (msgEl) msgEl.addEventListener("input", function () { edited = true; update(); });
      if (resetBtn) resetBtn.addEventListener("click", function () { edited = false; update(); });
      Array.prototype.forEach.call(root.querySelectorAll("[data-f]"), function (f) { f.addEventListener("input", update); f.addEventListener("change", update); });
      Array.prototype.forEach.call(root.querySelectorAll("[data-type]"), function (b) {
        b.addEventListener("click", function () { setType(b.getAttribute("data-type")); });
      });
      function setType(t) {
        type = t;
        Array.prototype.forEach.call(root.querySelectorAll("[data-type]"), function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-type") === t ? "true" : "false"); });
        update();
      }
      Array.prototype.forEach.call(root.querySelectorAll("[data-theme]"), function (b) {
        b.addEventListener("click", function () {
          var t = b.getAttribute("data-theme"), i = themes.indexOf(t);
          if (i < 0) themes.push(t); else themes.splice(i, 1);
          b.setAttribute("aria-pressed", i < 0 ? "true" : "false");
          update();
        });
      });
      // proposte di interesse (aziende): scelta multipla + "su misura" con descrizione
      var adhocBox = root.querySelector("[data-adhoc]");
      function setProp(name, on) {
        var i = props.indexOf(name);
        if (on && i < 0) props.push(name); else if (!on && i >= 0) props.splice(i, 1);
        Array.prototype.forEach.call(root.querySelectorAll("[data-prop]"), function (b) {
          if (b.getAttribute("data-prop") === name) b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        if (adhocBox) adhocBox.hidden = props.indexOf("__adhoc") < 0;
        update();
      }
      Array.prototype.forEach.call(root.querySelectorAll("[data-prop]"), function (b) {
        b.addEventListener("click", function () { var n = b.getAttribute("data-prop"); setProp(n, props.indexOf(n) < 0); });
      });
      Array.prototype.forEach.call(document.querySelectorAll("[data-pick-prop]"), function (a) {
        a.addEventListener("click", function () { setProp(a.getAttribute("data-pick-prop"), true); });
      });
      // i pulsanti "Richiedi una proposta" delle schede preselezionano il tipo
      Array.prototype.forEach.call(document.querySelectorAll("[data-pick-type]"), function (a) {
        a.addEventListener("click", function () { setType(a.getAttribute("data-pick-type")); });
      });
      update();
    });
  }
  function onReady(fn) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }

  // Link di download (es. la guida in PDF): compare solo se il file esiste davvero.
  function initDocLinks() {
    Array.prototype.forEach.call(document.querySelectorAll("a[data-doc]"), function (a) {
      var href = a.getAttribute("href") || "";
      function show() { a.hidden = false; }
      if (!href || /^(https?:)?\/\//.test(href) || location.protocol === "file:") { show(); return; }
      try {
        fetch(href, { method: "HEAD", cache: "no-store" }).then(function (r) {
          var t = r.headers.get("content-type") || "";
          if (r.ok && t.indexOf("text/html") < 0) show();
        }, function () {});
      } catch (e) {}
    });
  }
  onReady(initDocLinks);
  onReady(initTabs);
  onReady(initComposer);


  // Testi e immagini delle pagine modificati da admin.html (data.pages): chiave -> testo/foto.
  // Marcatori nel testo: **grassetto**  //corsivo//  ==evidenziato==  [da completare]  e a capo.
  function liteToHtml(txt, el) {
    var ex = el.querySelector && el.querySelector("span.it");
    var st = ex && ex.getAttribute("style") ? ' style="' + ex.getAttribute("style") + '"' : "";
    return String(txt).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\/\/(.+?)\/\//g, '<span class="it"' + st + ">$1</span>")
      .replace(/==(.+?)==/g, '<mark class="ais-hl">$1</mark>')
      .replace(/\[([^\]]+)\]/g, '<span class="todo">[$1]</span>')
      .replace(/\n/g, "<br/>");
  }
  function pageSlug() {
    var f = location.pathname.split("/").pop().replace(/\.html$/, "");
    return f || "index";
  }
  function applyEdits() {
    var D = getData();
    if (!D || !D.pages) return;
    var P = D.pages[pageSlug()] || {}, G = D.pages._global || {};
    Array.prototype.forEach.call(document.querySelectorAll("[data-edit]"), function (n) {
      var k = n.getAttribute("data-edit"), S = k.indexOf("g-") === 0 ? G : P;
      if (typeof S[k] === "string" && S[k] !== "") n.innerHTML = liteToHtml(S[k], n);
      if (n.tagName === "A" && S[k + "@href"]) n.setAttribute("href", S[k + "@href"]);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-edit-img]"), function (n) {
      var k = n.getAttribute("data-edit-img");
      if (P[k]) n.setAttribute("src", P[k]);
      if (typeof P[k + ".alt"] === "string") n.setAttribute("alt", P[k + ".alt"]);
    });
    if (P["@title"]) document.title = P["@title"];
    if (P["@description"]) {
      Array.prototype.forEach.call(document.querySelectorAll('meta[name="description"],meta[property="og:description"]'), function (m) { m.setAttribute("content", P["@description"]); });
    }
  }

  // CTA fissa (pagina Escape): compare dopo l'hero, si nasconde sulle sezioni date/contatto
  function initStickyCta() {
    var bar = document.querySelector("[data-sticky-cta]");
    if (!bar) return;
    bar.hidden = false;
    var hide = {};
    function update() {
      var past = window.pageYOffset > 520;
      var busy = hide.date || hide.parliamone || hide.richiesta || hide.contatto || hide.footer;
      bar.classList.toggle("is-on", past && !busy);
    }
    window.addEventListener("scroll", update, { passive: true });
    if ("IntersectionObserver" in window) {
      [["date", "#date"], ["parliamone", "#parliamone"], ["richiesta", "#richiesta"], ["contatto", "#contatto"], ["footer", "#contatti"]].forEach(function (p) {
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
      if (kind === "related") {
        if (!x.related) return;
        var TP = { soglia: "Soglia", avventura: "Avventura", immersione: "Immersione" };
        var rel = x.related.filter(function (sl) { return D.experiences[sl]; });
        var secR = node.closest("section");
        if (!rel.length) { if (secR) secR.hidden = true; return; }
        if (secR) secR.hidden = false;
        node.classList.toggle("ais-catalog--2", rel.length !== 3);
        node.innerHTML = rel.map(function (sl) {
          var y = D.experiences[sl];
          var im = y.img || (y.media && y.media.hero && y.media.hero.img) || "";
          return '<article class="ais-ecard"><div class="ais-ecard__media"><img alt="' + esc(y.name) + '" src="' + esc(im) + '" loading="lazy"/>' +
            (y.badge ? '<span class="ais-ecard__badge">' + esc(y.badge) + "</span>" : "") + '</div><div class="ais-ecard__body"><span class="ais-ecard__tag">' +
            esc((TP[y.type] || "") + (y.duration ? " \u00b7 " + y.duration : "")) + '</span><h3 class="ais-ecard__t">' + esc(y.name) + "</h3>" +
            (y.blurb ? '<p class="ais-ecard__d">' + esc(y.blurb) + "</p>" : "") + '<div class="ais-ecard__meta"><span>' + ico("clock") + "<b>" + esc(y.duration || "") + "</b></span>" +
            (y.group ? "<span>" + ico("users") + esc(y.group) + "</span>" : "") + (y.place ? "<span>" + ico("pin") + esc(y.place) + "</span>" : "") +
            '</div><a class="ais-ecard__cta" href="' + esc(y.url) + '">Scopri di pi\u00f9 ' + ico("arrow") + "</a></div></article>";
        }).join("");
        node.setAttribute("data-content-ready", "true");
        return;
      }
      var list = x[kind];
      if (!list || !list.length) return;
      var html = "";
      if (kind === "faq") {
        html = list.map(function (f) { return "<details><summary>" + fmt(f.q, x) + "</summary><p>" + fmt(f.a, x) + "</p></details>"; }).join("");
      } else if (kind === "info") {
        html = list.map(function (r) {
          return '<div class="ais-data__row"><div class="ais-data__k">' + (r.ico ? ico(r.ico) : "") + esc(r.k) + '</div><div class="ais-data__v">' + fmt(r.v, x) + "</div></div>";
        }).join("");
      } else if (kind === "activities") {
        html = list.map(function (a) {
          return '<div class="ais-practice">' + '<svg class="ais-ico ais-practice__ico"><use href="#i-' + esc(a.icon || "sparkles") + '"></use></svg><h3>' + esc(a.title) + "</h3><p>" + fmt(a.text, x) + "</p></div>";
        }).join("");
        node.classList.toggle("ais-grid--4", list.length === 4);
        node.classList.toggle("ais-grid--3", list.length !== 4);
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
  onReady(applyEdits);
})();
