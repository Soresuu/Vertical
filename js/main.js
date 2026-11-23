/*
 * Vertical — coming soon
 * Interacciones (reproducen el prototipo de Figma):
 *  - Hover en Athletes / Creators / Artists: resalta esa palabra y atenúa el resto.
 *  - Clic en una categoría: muestra la lista de talentos en lugar de fotos y texto.
 *    Clic de nuevo en la misma (o en el logo): vuelve al inicio.
 *  - Hover en una foto o en el nombre de un fundador: resalta foto + nombre y
 *    atenúa lo demás. Clic: abre su perfil.
 *  - Hover en enlaces de la lista y del contacto: cambio de color.
 *  - EN / ES: cambia el idioma con un clic (se recuerda en el navegador).
 *  En pantallas táctiles, el primer toque aplica el mismo resaltado que el hover.
 */
(function () {
  'use strict';

  var C = window.VERTICAL_CONTENT;
  var STORAGE_KEY = 'vertical-lang';
  var mqMobile = window.matchMedia('(max-width: 767px)');

  var landing = document.getElementById('landing');
  var leadEl = document.getElementById('lead');
  var foundersEl = document.getElementById('founders');
  var foundersView = document.getElementById('founders-view');
  var rosterView = document.getElementById('roster-view');
  var rosterEl = document.getElementById('roster');
  var rosterTitle = document.getElementById('roster-title');
  var liveEl = document.getElementById('live');

  var state = {
    lang: initialLang(),
    category: null   // 'athletes' | 'creators' | 'artists' | null
  };

  /* ---------- Idioma ---------- */

  function initialLang() {
    var fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && C.i18n[fromUrl]) return fromUrl;
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && C.i18n[saved]) return saved;
    } catch (e) { /* almacenamiento no disponible */ }
    return C.defaultLang;
  }

  function t() { return C.i18n[state.lang]; }

  function setLang(lang) {
    if (!C.i18n[lang]) return;
    state.lang = lang;
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* noop */ }
    render();
  }

  /* ---------- Utilidades ---------- */

  function formatMarker(key) {
    if (state.category === key) return '(X)';
    var n = C.markers[key];
    return '(' + (mqMobile.matches && n < 10 ? '0' + n : n) + ')';
  }

  function markerEl(key) {
    var s = document.createElement('span');
    s.className = 'marker';
    s.setAttribute('aria-hidden', 'true');
    s.dataset.marker = key;
    s.textContent = formatMarker(key);
    return s;
  }

  // Convierte "texto {clave} texto" en nodos, usando build(clave) para cada {clave}
  function fillTemplate(target, template, build) {
    template.split(/(\{[a-z]+\})/g).forEach(function (part) {
      var m = part.match(/^\{([a-z]+)\}$/);
      if (m && (m[1] === 'br' || m[1] === 'brd')) {
        // {br}: salto de línea siempre · {brd}: salto solo en escritorio (en móvil, espacio)
        var br = document.createElement('br');
        if (m[1] === 'brd') {
          br.className = 'br-desktop';
          target.appendChild(br);
          var sp = document.createElement('span');
          sp.className = 'br-mobile-space';
          sp.textContent = ' ';
          target.appendChild(sp);
          return;
        }
        target.appendChild(br);
        return;
      }
      target.appendChild(m ? build(m[1]) : document.createTextNode(part));
    });
  }

  /* ---------- Render ---------- */

  function renderStatic() {
    var dict = t();
    document.documentElement.lang = state.lang;
    document.title = dict.title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', dict.description);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = dict[el.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', dict[el.dataset.i18nAria]);
    });
    document.querySelectorAll('.lang__btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang));
    });
  }

  function renderLead() {
    var dict = t();
    leadEl.textContent = '';
    fillTemplate(leadEl, dict.lead, function (key) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat hl';
      b.dataset.cat = key;
      b.setAttribute('aria-pressed', String(state.category === key));
      b.setAttribute('aria-controls', 'roster-view');
      b.appendChild(markerEl(key));
      b.appendChild(document.createTextNode(dict.categories[key]));
      return b;
    });
  }

  function renderFounders() {
    var dict = t();
    foundersEl.textContent = '';
    dict.founders.forEach(function (paragraph) {
      var p = document.createElement('p');
      p.className = 'founders__p';
      fillTemplate(p, paragraph, function (key) {
        var person = C.people[key];
        var a = document.createElement('a');
        a.className = 'person hl';
        a.href = person.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.dataset.person = key;
        a.appendChild(markerEl(key));
        a.appendChild(document.createTextNode(person.name));
        return a;
      });
      foundersEl.appendChild(p);
    });
    // Enlaces de las fotos
    document.querySelectorAll('.photo').forEach(function (a) {
      a.href = C.people[a.dataset.person].url;
    });
  }

  function renderRoster() {
    rosterEl.textContent = '';
    if (!state.category) return;
    rosterTitle.textContent = t().rosterTitle[state.category];
    C.talents[state.category].forEach(function (talent) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'roster__link trim';
      a.href = talent.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = talent.name;
      li.appendChild(a);
      rosterEl.appendChild(li);
    });
  }

  function renderView() {
    var cat = state.category;
    if (cat) {
      landing.dataset.category = cat;
    } else {
      delete landing.dataset.category;
    }
    foundersView.hidden = !!cat;
    rosterView.hidden = !cat;
  }

  function render() {
    renderStatic();
    renderLead();
    renderFounders();
    renderRoster();
    renderView();
    setFocusCat(landing.dataset.focusCat || null);
  }

  /* ---------- Estados de resaltado (hover / foco / toque) ---------- */

  function setFocusCat(key) {
    if (key) landing.dataset.focusCat = key; else delete landing.dataset.focusCat;
    leadEl.querySelectorAll('.cat').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.cat === key || b.dataset.cat === state.category);
    });
  }

  function setFocusPerson(key) {
    if (key) landing.dataset.focusPerson = key; else delete landing.dataset.focusPerson;
    document.querySelectorAll('[data-person]').forEach(function (el) {
      el.classList.toggle('is-on', el.dataset.person === key);
    });
  }

  function clearFocus() {
    setFocusCat(null);
    setFocusPerson(null);
  }

  function selectCategory(key) {
    state.category = state.category === key ? null : key;
    setFocusPerson(null);
    // Actualiza marcadores (X) y estado pulsado sin perder el foco del botón
    leadEl.querySelectorAll('.cat').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.cat === state.category));
    });
    refreshMarkers();
    renderRoster();
    renderView();
    setFocusCat(landing.dataset.focusCat || null);
    liveEl.textContent = state.category
      ? t().showing.replace('{category}', t().rosterTitle[state.category])
      : '';
  }

  function refreshMarkers() {
    document.querySelectorAll('.marker').forEach(function (m) {
      m.textContent = formatMarker(m.dataset.marker);
    });
  }

  /* ---------- Eventos ---------- */

  var isTouch = false;

  document.addEventListener('pointerdown', function (e) {
    isTouch = e.pointerType === 'touch' || e.pointerType === 'pen';
    if (!isTouch) return;
    // En táctil, el toque aplica el resaltado del hover
    var person = e.target.closest('[data-person]');
    var cat = e.target.closest('.cat');
    if (person) { setFocusCat(null); setFocusPerson(person.dataset.person); }
    else if (cat) { setFocusPerson(null); setFocusCat(cat.dataset.cat); }
    else clearFocus();
  }, { passive: true });

  // Hover con ratón
  document.addEventListener('pointerover', function (e) {
    if (e.pointerType !== 'mouse') return;
    var person = e.target.closest('[data-person]');
    var cat = e.target.closest('.cat');
    setFocusPerson(person && !state.category ? person.dataset.person : null);
    setFocusCat(cat ? cat.dataset.cat : null);
  });
  document.addEventListener('pointerleave', function (e) {
    if (e.pointerType === 'mouse') clearFocus();
  });

  // Teclado: el foco reproduce el hover
  document.addEventListener('focusin', function (e) {
    if (isTouch) return;
    var person = e.target.closest('[data-person]');
    var cat = e.target.closest('.cat');
    setFocusPerson(person ? person.dataset.person : null);
    setFocusCat(cat ? cat.dataset.cat : null);
  });
  document.addEventListener('focusout', function (e) {
    if (!e.relatedTarget || !e.relatedTarget.closest('[data-person], .cat')) clearFocus();
  });

  document.addEventListener('click', function (e) {
    var cat = e.target.closest('.cat');
    if (cat) { selectCategory(cat.dataset.cat); return; }

    var langBtn = e.target.closest('.lang__btn');
    if (langBtn) { setLang(langBtn.dataset.lang); return; }

    if (e.target.closest('#logo')) {
      // El logo vuelve al estado inicial (como en el prototipo)
      e.preventDefault();
      state.category = null;
      clearFocus();
      landing.classList.remove('is-resetting');
      void landing.offsetWidth; // reinicia la animación
      landing.classList.add('is-resetting');
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && state.category) {
      var btn = leadEl.querySelector('.cat[data-cat="' + state.category + '"]');
      selectCategory(state.category);
      if (btn) btn.focus();
    }
  });

  // Cambia (1) ↔ (01) al cruzar el breakpoint móvil
  var onMq = function () { refreshMarkers(); };
  if (mqMobile.addEventListener) mqMobile.addEventListener('change', onMq);
  else mqMobile.addListener(onMq);

  render();
})();
