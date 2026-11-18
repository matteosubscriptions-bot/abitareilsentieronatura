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

    // Scroll fluido per le ancore interne alla pagina (#id)
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id && id.length > 1) {
          var target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

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
})();
