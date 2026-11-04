/* =====================================================================
   THE HERITAGE KALYANAM — site behaviour
   ONETONE STUDIO

   You normally never need to edit this file: all couple content lives
   in js/config.js. This file reads that config and builds the page.

   Sections
   01 Helpers            08 Wishlist, gift, guestbook
   02 Theme & language   09 Memories (QR + wall)
   03 Story & couple     10 Music (YouTube or licensed audio file)
   04 Celebrations       11 Scroll effects, nav, cursor, countdown
   05 Intro & entrance   12 Start-up
   06 Reveals
   ===================================================================== */
(function () {
  'use strict';

  var C = window.WEDDING_CONFIG;
  if (!C) { console.error('js/config.js did not load — check it for a typing mistake.'); return; }
  window.__WEDDING_READY__ = true; // tells the safety net in index.html that we started

  /* ---------- 01 HELPERS ----------------------------------------------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasGSAP = function () { return !!(window.gsap && !reducedMotion); };

  var lang = 'en';
  var siteStarted = false;

  // Pick the right language from a { en, ta } object (or return a plain string)
  function t(v) {
    if (v == null) return '';
    if (typeof v === 'object') return v[lang] != null ? v[lang] : (v.en != null ? v.en : '');
    return String(v);
  }
  // Interface label from config.text
  function ui(key) {
    var set = C.text[lang] || {};
    return set[key] != null ? set[key] : (C.text.en[key] || '');
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function getPath(path) {
    return path.split('.').reduce(function (o, k) { return o ? o[k] : undefined; }, C);
  }
  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* private mode */ } }
  function recall(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function lockScroll(on) { document.body.classList.toggle('is-locked', on); }

  // Map + navigation links (official URL formats, no API key needed)
  function mapsUrl(q) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }
  function wazeUrl(q) { return 'https://waze.com/ul?q=' + encodeURIComponent(q) + '&navigate=yes'; }
  function isRealUrl(u) { return typeof u === 'string' && /^https?:\/\//i.test(u.trim()); }

  function icon(id) { return '<svg aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  /* ---------- 02 THEME & LANGUAGE ------------------------------------- */
  function applyTheme() {
    var th = C.theme || {};
    var root = document.documentElement.style;
    Object.keys(th).forEach(function (k) { root.setProperty('--' + k, th[k]); });
    if (C.meta) {
      if (C.meta.pageTitle) document.title = C.meta.pageTitle;
      var d = $('meta[name="description"]');
      if (d && C.meta.description) d.setAttribute('content', C.meta.description);
    }
    var studio = $('#studio-link');
    if (studio && C.footer) { studio.href = C.footer.studioUrl; studio.textContent = C.footer.studioName; }
  }

  function applyLanguage(next) {
    lang = next === 'ta' ? 'ta' : 'en';
    document.documentElement.lang = lang;

    $$('[data-i18n]').forEach(function (el) { el.textContent = ui(el.getAttribute('data-i18n')); });
    $$('[data-config]').forEach(function (el) { el.textContent = t(getPath(el.getAttribute('data-config'))); });
    $$('[data-couple]').forEach(function (el) { el.textContent = t(C.couple[el.getAttribute('data-couple')].first); });
    $$('.lang__btn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });

    // Accessible labels that aren't visible text
    $('#menu-btn').setAttribute('aria-label', ui('menu'));
    $('#music-minimise').setAttribute('aria-label', ui('hidePlayer'));
    var sw = $('#intro-music-switch');
    if (sw) $('.switch__label', sw).textContent = sw.getAttribute('aria-checked') === 'true' ? ui('musicOn') : ui('musicOff');

    renderAll();
    Music.refreshLabels();
    store('wedding-lang', lang);
  }

  function renderAll() {
    renderMonogram();
    renderCalendar();
    fitCalendar();
    renderHeroDate();
    renderStory();
    if ($('#profiles')) renderProfiles();
    if ($('#likely-grid')) renderLikely();
    renderEvents();
    renderContacts();
    renderWishlist();
    renderGift();
    renderGuestbook();
    renderMemories();
    if (siteStarted) observeReveals();
  }

  /* ---------- 03 STORY & COUPLE --------------------------------------- */
  // Each moment is a print in the family album: photo, handwritten year and the story
  function renderStory() {
    var tilts = [-3, 2.4, -1.4, 3.2, -2.2, 1.6];
    $('#timeline-list').innerHTML = (C.story || []).map(function (m, i) {
      var wide = m.shape === 'landscape';
      return '<li class="moment' + (wide ? ' moment--landscape' : '') + '" style="--r:' + tilts[i % tilts.length] + 'deg">' +
        '<figure class="moment__media"' + (m.focus ? ' style="--focus:' + esc(m.focus) + '"' : '') + '>' +
          '<img src="' + esc(m.image) + '" alt="' + esc(t(m.alt)) + '" width="' + (wide ? 1200 : 900) + '" height="' + (wide ? 750 : 1125) + '" loading="lazy" decoding="async">' +
          '<figcaption class="moment__cap" aria-hidden="true">' + esc(m.year) + '</figcaption></figure>' +
        '<div class="moment__body">' +
          '<h3 class="moment__title"><span class="sr-only">' + esc(m.year) + ', </span>' + esc(t(m.title)) + '</h3>' +
          '<p class="moment__text">' + esc(t(m.text)) + '</p>' +
        '</div></li>';
    }).join('');
    $('#story-closing').textContent = t(C.storyClosing);
    $$('#timeline-list .moment').forEach(function (li) { fadeWords(li); });
    fadeWords($('#story-closing'));
    observeFades('#timeline-list .moment, #story-closing');
    if (siteStarted) layoutAlbum();
  }

  // Hero monogram: the couple's initials inside a sikku kolam ring
  function initial(v) {
    var s = t(v) || '';
    if (window.Intl && Intl.Segmenter) { var it = new Intl.Segmenter(lang, { granularity: 'grapheme' }).segment(s)[Symbol.iterator]().next(); return it.value ? it.value.segment : ''; }
    return s.charAt(0);
  }
  function renderMonogram() {
    $$('[data-initial]').forEach(function (el) { el.textContent = initial(C.couple[el.getAttribute('data-initial')].first); });
  }

  // Calendar: a page from a Tamil daily calendar, dated the wedding day
  // Hero date block: month / weekday · day · year, in the guest's language
  function renderHeroDate() {
    var d = new Date(C.weddingDateISO);
    if (isNaN(d) || !$('#when-day')) return;
    var o = { timeZone: 'Asia/Kuala_Lumpur' }, loc = lang === 'ta' ? 'ta-IN' : 'en-GB';
    var f = function (x) { return d.toLocaleString(loc, Object.assign({}, o, x)); };
    $('#when-month').textContent = f({ month: 'long' });
    $('#when-wd').textContent = f({ weekday: 'long' });
    $('#when-day').textContent = d.toLocaleString('en-GB', Object.assign({}, o, { day: '2-digit' }));
    $('#when-yr').textContent = d.toLocaleString('en-GB', Object.assign({}, o, { year: 'numeric' }));
  }

  // Shrink the fixed-width (landscape) calendar to fit narrow screens
  function fitCalendar() {
    var board = $('.cal-board');
    if (!board) return;
    var wrap = board.parentElement, cs = getComputedStyle(wrap);
    var avail = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    // the landscape card is scaled to fit the screen width (phones included)
    board.style.zoom = avail < 800 ? (avail / 800).toFixed(4) : '';
  }
  window.addEventListener('resize', fitCalendar);

  function renderCalendar() {
    var d = new Date(C.weddingDateISO);
    if (isNaN(d)) return;
    var tz = { timeZone: 'Asia/Kuala_Lumpur' }, loc = lang === 'ta' ? 'ta-IN' : 'en-GB';
    var part = function (o) { return d.toLocaleString(loc, Object.assign({}, tz, o)); };
    var dd = d.toLocaleString('en-GB', Object.assign({ day: '2-digit' }, tz));
    var mm = String(Number(d.toLocaleString('en-GB', Object.assign({ month: 'numeric' }, tz))));
    var yy = d.toLocaleString('en-GB', Object.assign({ year: 'numeric' }, tz));
    $('#cal-big').innerHTML = '<span>' + dd + '</span><i>-</i><span>' + mm + '</span><i>-</i><span>' + yy + '</span>';
    $('#cal-wd').textContent = part({ weekday: 'long' });
    $('#cal-dmy').textContent = part({ day: 'numeric', month: 'long', year: 'numeric' });
    $('#save-date').onclick = saveWeddingDate;
    // the week's events, set like the timings table on a daily calendar
    $('#cal-events').innerHTML = (C.events || []).map(function (ev) {
      var v = ev.venue || (ev.sides && ev.sides[0]) || {};
      var tm = lang === 'ta' && v.timeTa ? v.timeTa : v.time;
      return '<tr><td>' + esc(ev.shortDate.day) + ' ' + esc(t(ev.shortDate.weekday)) + '</td><td>' + esc(t(ev.name)) + '</td><td>' + esc(tm || '') + '</td></tr>';
    }).join('');
    var kal = (C.events || []).filter(function (e) { return e.venue && e.tone === 'kalyanam'; })[0];
    if (kal) {
      $('#cal-muhurtham').textContent = lang === 'ta' && kal.venue.timeTa ? kal.venue.timeTa : kal.venue.time;
      $('#cal-venue').textContent = t(kal.venue.venue);
    }
    $('#cal-forecast').innerHTML = (C.calendarForecast || []).map(function (f) {
      return '<li><span>' + esc(t(f.who)) + '</span><b>' + esc(t(f.mood)) + '</b></li>';
    }).join('');
  }


  // "Save the wedding date": a standard .ics file with the Kalyanam, in Malaysia time (UTC+8).
  // Opens in Apple Calendar, Google Calendar, Outlook and most phone calendars.
  function saveWeddingDate() {
    var start = new Date(C.weddingDateISO);
    if (isNaN(start)) return;
    var kal = (C.events || []).filter(function (e) { return e.venue && e.tone === 'kalyanam'; })[0];
    var venue = kal && kal.venue ? t(kal.venue.venue) : '';
    var couple = t(C.couple.partner1.first) + ' & ' + t(C.couple.partner2.first);
    var end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // about four hours for the ceremony
    var utc = function (d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z'); };
    var ics = function (v) { return String(v || '').replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); };
    var lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ONETONE Studio//Wedding Invitation//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:kalyanam-2027-02-06@onetone-heritage',
      'DTSTAMP:' + utc(new Date()),
      'DTSTART:' + utc(start),
      'DTEND:' + utc(end),
      'SUMMARY:' + ics('The Kalyanam: ' + couple),
      'LOCATION:' + ics(venue),
      'DESCRIPTION:' + ics(kal ? t(kal.description) : ''),
      'END:VEVENT', 'END:VCALENDAR'
    ];
    var blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'kalyanam-wedding-2027-02-06.ics';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000);
  }

  // Each partner as an old-school "marriage bio-data" sheet, studio photo clipped on
  function renderProfiles() {
    $('#profiles').innerHTML = (C.profiles || []).map(function (p, i) {
      var person = C.couple[p.who];
      var row = function (k, v) { return '<dt>' + esc(ui(k)) + '</dt><dd>' + v + '</dd>'; };
      return '<article class="bd bd--' + (i + 1) + '" data-reveal style="--d:' + i * 0.12 + 's">' +
        '<div class="bd__sheet">' +
          '<p class="bd__invoke">|| ' + esc(ui('bioInvoke')) + ' ||</p>' +
          '<h3 class="bd__title">' + esc(ui('bioTitle')) + '</h3>' +
          '<p class="bd__role">' + esc(t(person.role)) + '</p>' +
          '<div class="bd__top">' +
            '<dl class="bd__rows">' +
              row('bioName', '<span class="bd__name">' + esc(t(person.full)) + '</span>') +
              row('bioNick', esc(person.nickname)) +
            '</dl>' +
            '<figure class="bd__photo"><span class="bd__clip" aria-hidden="true"></span>' +
              '<img src="' + esc(p.cutout || p.photo) + '" alt="' + esc(t(person.full)) + '" width="400" height="1100" loading="lazy" decoding="async"></figure>' +
          '</div>' +
          '<dl class="bd__rows">' +
            row('bioAbout', esc(t(p.bio))) +
            row('bioLikes', p.favourites.map(function (f) { return esc(t(f)); }).join(', ')) +
          '</dl>' +
          (p.stamp ? '<p class="bd__stamp">' + esc(t(p.stamp)) + '</p>' : '') +
        '</div></article>';
    }).join('');
  }

  var guessScore = { right: 0, played: 0 };
  function answerKey(c) {
    var a = String((c.a && c.a.en) || '').toLowerCase();
    if (a.indexOf(String(C.couple.partner1.first.en).toLowerCase()) > -1) return 'p1';
    if (a.indexOf(String(C.couple.partner2.first.en).toLowerCase()) > -1) return 'p2';
    return 'both';
  }
  function avatar(who) {
    var p = (C.profiles || []).filter(function (x) { return x.who === who; })[0];
    var src = p ? (p.cutout || p.photo) : '';
    // resolved from css/ (custom properties are resolved where they're used)
    return p ? ' style="--face:url(\'' + esc(/^(https?:)?\//.test(src) ? src : '../' + src) + '\')"' : '';
  }
  function renderLikely() {
    guessScore = { right: 0, played: 0 };
    $('#likely-score').textContent = '';
    $('#likely-grid').innerHTML = (C.likely || []).map(function (c, i) {
      var n = (i + 1 < 10 ? '0' : '') + (i + 1);
      return '<li class="guess" data-reveal data-answer="' + answerKey(c) + '" data-i="' + i + '" style="--d:' + (i % 3) * 0.08 + 's">' +
        '<p class="guess__num">' + n + '</p>' +
        '<h4 class="guess__q">' + esc(t(c.q)) + '</h4>' +
        '<div class="guess__opts" role="group" aria-label="' + esc(t(c.q)) + '">' +
          '<button type="button" class="guess__pick" data-pick="p1"><span class="guess__face"' + avatar('partner1') + '></span><span>' + esc(t(C.couple.partner1.first)) + '</span></button>' +
          '<button type="button" class="guess__pick" data-pick="p2"><span class="guess__face"' + avatar('partner2') + '></span><span>' + esc(t(C.couple.partner2.first)) + '</span></button>' +
          '<button type="button" class="guess__pick guess__pick--both" data-pick="both"><span class="guess__face guess__face--both">♥</span><span>' + esc(ui('likelyBoth')) + '</span></button>' +
        '</div>' +
        '<p class="guess__result" aria-live="polite"></p></li>';
    }).join('');
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.guess__pick');
    if (!b) return;
    var card = b.closest('.guess');
    if (card.classList.contains('is-answered')) return;
    var right = b.getAttribute('data-pick') === card.getAttribute('data-answer');
    var c = C.likely[+card.getAttribute('data-i')];
    card.classList.add('is-answered', right ? 'is-right' : 'is-wrong');
    $$('.guess__pick', card).forEach(function (x) {
      x.disabled = true;
      if (x.getAttribute('data-pick') === card.getAttribute('data-answer')) x.classList.add('is-answer');
    });
    b.classList.add('is-chosen');
    $('.guess__result', card).innerHTML = '<b>' + esc(ui(right ? 'guessRight' : 'guessWrong')) + '</b> ' + esc(t(c.a)) + ' <i>' + esc(t(c.aside)) + '</i>';
    guessScore.played++; if (right) guessScore.right++;
    $('#likely-score').textContent = ui('likelyScore') + ' ' + guessScore.right + ' / ' + guessScore.played;
  });

  // One delegated handler for every flip card (survives re-rendering)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.flip__btn');
    if (!btn) return;
    var on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    $('.flip__front', btn).setAttribute('aria-hidden', String(on));
    $('.flip__back', btn).setAttribute('aria-hidden', String(!on));
  });

  /* ---------- 04 CELEBRATIONS ----------------------------------------- */
  function sideCard(v, side) {
    var time = lang === 'ta' && v.timeTa ? v.timeTa : v.time;
    var label = side === 'bride' ? ui('bridesSide') : side === 'groom' ? ui('groomsSide') : ui('bothFamilies');
    return '<div class="side side--' + side + '">' +
      '<p class="side__who">' + esc(label) + '</p>' +
      '<p class="side__time"><span class="sr-only">' + esc(ui('time')) + ': </span>' + esc(time) + '</p>' +
      '<p class="side__place"><span class="sr-only">' + esc(ui('venue')) + ': </span>' + esc(t(v.venue)) +
        (v.private ? '<span class="side__private">' + esc(ui('privateAddress')) + '</span>' : '') + '</p>' +
      '<div class="side__links" role="group" aria-label="' + esc(ui('getDirections')) + '">' +
        '<a class="brand brand--gmaps" href="' + mapsUrl(v.mapQuery) + '" target="_blank" rel="noopener">' + BRAND.gmaps + '<span>' + esc(ui('googleMaps')) + '</span></a>' +
        '<a class="brand brand--waze" href="' + wazeUrl(v.mapQuery) + '" target="_blank" rel="noopener">' + BRAND.waze + '<span>' + esc(ui('waze')) + '</span></a>' +
      '</div></div>';
  }

  // Brand marks for the action buttons, so Call / WhatsApp / Google Maps / Waze are recognisable at a glance
  var BRAND = {
    call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 2.8l3 3.6-1.8 2.7c1.1 2.4 3 4.4 5.4 5.5l2.7-1.8 3.6 3-1.4 3.6c-.3.8-1.1 1.2-1.9 1.1C8.4 19.6 3.7 14.9 2.8 7.1c-.1-.8.3-1.6 1.1-1.9z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></svg>',
    gmaps: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M12 1.5a7.2 7.2 0 0 0-7.2 7.2c0 5.4 7.2 13.8 7.2 13.8s7.2-8.4 7.2-13.8A7.2 7.2 0 0 0 12 1.5z"/><path fill="#4285F4" d="M12 1.5a7.2 7.2 0 0 1 7.2 7.2c0 1.4-.5 3-1.2 4.5L12 8.7z"/><path fill="#FBBC04" d="M6 13.2l6-4.5 6 4.5c-1.8 3.9-6 9.3-6 9.3S7.8 17.1 6 13.2z"/><path fill="#34A853" d="M12 8.7l-6 4.5c-.8-1.6-1.2-3.1-1.2-4.5 0-2 .8-3.8 2.1-5.1z"/><circle cx="12" cy="8.7" r="2.6" fill="#fff"/></svg>',
    waze: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" stroke="currentColor" stroke-width="1.5" d="M12.5 3c4.7 0 8.5 3.4 8.5 7.6 0 3-1.9 5.3-4.6 6.6H9.3c-1.8 0-3.2-.9-4-2.3-.5.2-1.3.2-2-.4.9-.6 1.2-1.6 1.3-3C4.7 6.8 8.1 3 12.5 3z"/><circle cx="10" cy="9.2" r="1.1" fill="currentColor"/><circle cx="15" cy="9.2" r="1.1" fill="currentColor"/><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" d="M9.6 12.3c1.4 1.4 4.2 1.4 5.6 0"/><circle cx="8.6" cy="19.2" r="1.9" fill="currentColor"/><circle cx="16.4" cy="19.2" r="1.9" fill="currentColor"/></svg>'
  };

  // Family contacts: Call (tel:) and WhatsApp (wa.me) links from each phone number
  // Malaysian numbers are shown in local form with a leading 0 (e.g. 012-000 0001); the country code stays in the links
  function localNumber(v) {
    var n = String(v || '').replace(/^\+\d+\s*/, '').trim();
    return n.charAt(0) === '0' ? n : '0' + n;
  }

  // Open layout: white chalk figures beside each family, a pulli kolam between them. No cards.
  function renderContacts() {
    var sides = C.contacts || [];
    $('#contacts').hidden = !sides.length;
    var IMG = 'assets/images/home/';
    $('#contacts-grid').innerHTML = sides.map(function (s, k) {
      var bride = s.side === 'bride';
      var fig = '<img class="hc-fig" src="' + IMG + (bride ? 'chalk-bride.png' : 'chalk-groom.png') + '" alt="" width="424" height="1080" loading="lazy" decoding="async" aria-hidden="true">';
      var swirl = '<img class="hc-swirl" src="' + IMG + 'chalk-swirl-left.png" alt="" width="248" height="128" aria-hidden="true">';
      var swirlR = '<img class="hc-swirl hc-swirl--r" src="' + IMG + 'chalk-swirl-left.png" alt="" width="248" height="128" aria-hidden="true">';
      var block = '<div class="hc-block">' +
        '<h3 class="hc-side">' + swirl + '<span>' + esc(ui(bride ? 'bridesSide' : 'groomsSide')) + '</span>' + swirlR + '</h3>' +
        '<p class="hc-sub">' + esc(ui(bride ? 'bridesFamily' : 'groomsFamily')) + '</p>' +
        '<ul class="hc-list">' + (s.people || []).map(function (p) {
          var digits = String(p.phone || '').replace(/\D/g, '');
          return '<li class="hc-p">' +
            '<div class="hc-p__info">' +
              '<p class="hc-p__name">' + esc(t(p.name)) + '</p>' +
              '<p class="hc-p__rel">' + esc(t(p.relation)) + '</p>' +
              '<p class="hc-p__num">' + esc(localNumber(p.phone)) + '</p>' +
            '</div>' +
            '<div class="hc-p__btns">' +
              '<a class="hc-btn hc-btn--call" href="tel:+' + digits + '" aria-label="' + esc(ui('call') + ' ' + t(p.name)) + '"><span class="hc-btn__ring hc-btn__ring--call">' + BRAND.call + '</span><span class="hc-btn__label">' + esc(ui('call')) + '</span></a>' +
              '<a class="hc-btn hc-btn--wa" href="https://wa.me/' + digits + '" target="_blank" rel="noopener" aria-label="' + esc(ui('whatsapp') + ' ' + t(p.name)) + '"><span class="hc-btn__ring hc-btn__ring--wa">' + BRAND.wa + '</span><span class="hc-btn__label">' + esc(ui('whatsapp')) + '</span></a>' +
            '</div></li>';
        }).join('') + '</ul></div>';
      // desktop: figure | block (bride) ... block | figure (groom); the kolam sits between the two families
      var row = '<div class="hc-row hc-row--' + esc(s.side) + '">' + (bride ? fig + block : block + fig) + '</div>';
      var kolam = k === 1 ? '<img class="hc-kolam" src="' + IMG + 'chalk-kolam.png" alt="" width="196" height="184" loading="lazy" decoding="async" aria-hidden="true">' : '';
      return kolam + row;
    }).join('');
  }

  function renderEvents() {
    var events = C.events || [];
    $('#days-nav').innerHTML = events.map(function (ev) {
      return '<a href="#ev-' + esc(ev.id) + '" data-day="' + esc(ev.id) + '">' +
        '<span class="days__d">' + esc(ev.shortDate.day) + '</span>' +
        '<span class="days__w">' + esc(t(ev.shortDate.weekday)) + '</span>' +
        '<span class="sr-only">, ' + esc(t(ev.name)) + '</span></a>';
    }).join('');

    // Each celebration is a pair of postage stamps (picture + details), franked with a postmark
    $('#event-list').innerHTML = events.map(function (ev, k) {
      var sides = ev.sides
        ? '<div class="day__sides day__sides--two">' + ev.sides.map(function (s) { return sideCard(s, s.side); }).join('') + '</div>'
        : '<div class="day__sides">' + sideCard(ev.venue, 'both') + '</div>';
      var pid = 'pm-' + esc(ev.id);
      return '<article class="stampset day--' + esc(ev.tone) + '" id="ev-' + esc(ev.id) + '" style="--i:' + k + '">' +
        '<div class="stampset__inner">' +
          '<figure class="stamp stamp--pic"><div class="stamp__paper"><div class="stamp__face">' +
            (ev.art ? '<img src="' + esc(ev.art) + '" alt="" width="896" height="1120" loading="lazy" decoding="async">' : '') +
            '<span class="stamp__cap">' + esc(t(ev.dayLabel)) + '</span>' +
          '</div></div></figure>' +
          '<div class="stamp stamp--text"><div class="stamp__paper"><div class="stamp__face">' +
            '<p class="day__label">' + esc(t(ev.date)) + '</p>' +
            '<h3 class="day__name">' + esc(t(ev.name)) + '</h3>' +
            '<p class="day__desc">' + esc(t(ev.description)) + '</p>' +
            (ev.dressCode ? '<p class="day__wear"><b>' + esc(ui('dressCode')) + '</b> ' + esc(t(ev.dressCode)) + '</p>' : '') +
            sides +
          '</div></div></div>' +
          '<svg class="postmark" viewBox="0 0 220 120" aria-hidden="true">' +
            '<defs><path id="' + pid + '" d="M60 60m-41 0a41 41 0 1 1 82 0a41 41 0 1 1 -82 0"/></defs>' +
            '<circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="2.4"/>' +
            '<circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
            '<text font-size="9.5" letter-spacing="1.6"><textPath href="#' + pid + '" startOffset="2%">' + esc(t(ev.name).toUpperCase()) + ' ✦ ' + esc(t(ev.dayLabel).toUpperCase()) + ' ✦</textPath></text>' +
            '<text x="60" y="58" text-anchor="middle" font-size="24" font-weight="700">' + esc(ev.shortDate.day) + '</text>' +
            '<text x="60" y="74" text-anchor="middle" font-size="10" letter-spacing="2">' + esc(t(ev.shortDate.month).toUpperCase()) + ' 2027</text>' +
            '<path d="M118 34q12 -8 24 0t24 0t24 0t24 0M118 50q12 -8 24 0t24 0t24 0t24 0M118 66q12 -8 24 0t24 0t24 0t24 0M118 82q12 -8 24 0t24 0t24 0t24 0" fill="none" stroke="currentColor" stroke-width="2.4"/>' +
          '</svg>' +
        '</div></article>';
    }).join('');
    observeFades('#event-list .stampset');
    observeDays();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.event__toggle');
    if (!btn) return;
    var open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? ui('lessDetails') : ui('moreDetails');
    document.getElementById(btn.getAttribute('aria-controls')).classList.toggle('is-open', open);
  });

  // Sticky offset per stamp: stacks just under the top bar, but a card taller than
  // the screen sticks by its bottom edge so all of it can be read first
  function layoutPile() {
    var bar = 76, vh = window.innerHeight;
    $$('.stampset').forEach(function (el, k) {
      el.style.setProperty('--top', Math.min(bar + k * 14, vh - el.offsetHeight - 16) + 'px');
    });
  }
  window.addEventListener('resize', layoutPile);

  var dayObserver;
  function observeDays() {
    if (!('IntersectionObserver' in window)) return;
    if (dayObserver) dayObserver.disconnect();
    dayObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id.replace('ev-', '');
        $$('#days-nav a').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-day') === id); });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    $$('.stampset').forEach(function (el) { dayObserver.observe(el); });
    // franked as it lands; earlier stamps settle back into the pile
    var sets = $$('.stampset');
    var landObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-landed');
        var k = sets.indexOf(en.target);
        sets.forEach(function (el, n) { el.classList.toggle('is-buried', n < k); if (n < k) el.classList.add('is-landed'); });
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sets.forEach(function (el) { landObs.observe(el); });
    layoutPile();
    $$('#event-list img').forEach(function (im) { im.addEventListener('load', layoutPile); });
  }

  /* ---------- 08 WISHLIST, GIFT, GUESTBOOK ---------------------------- */
  var WISH_ICONS = {
    coffee: '<path d="M15 12h18l-2.5 20h-13z"/><path d="M7 34h34c0 4.5-7.5 7-17 7S7 38.5 7 34z"/><path d="M20 4c-1.5 2 1.5 3.5 0 6M26 4c-1.5 2 1.5 3.5 0 6"/>',
    pan: '<circle cx="19" cy="26" r="13"/><circle cx="19" cy="26" r="8"/><path d="M32 24h13v4H32"/>',
    dice: '<rect x="8" y="8" width="32" height="32" rx="5"/><circle cx="17" cy="17" r="1.8"/><circle cx="31" cy="17" r="1.8"/><circle cx="24" cy="24" r="1.8"/><circle cx="17" cy="31" r="1.8"/><circle cx="31" cy="31" r="1.8"/>',
    plate: '<circle cx="25" cy="24" r="14"/><circle cx="25" cy="24" r="8.5"/><path d="M4 8v11a3 3 0 0 0 3 3 3 3 0 0 0 3-3V8M7 22v18M45 8c-4 3-4 12 0 14v18"/>',
    luggage: '<rect x="12" y="14" width="24" height="26" rx="3"/><path d="M19 14V8h10v6M19 20v14M29 20v14M16 40v3M32 40v3"/>',
    camera: '<rect x="6" y="14" width="36" height="24" rx="3"/><circle cx="24" cy="26" r="7"/><path d="M17 14l3-5h8l3 5M15 44h18"/>',
    projector: '<rect x="5" y="16" width="38" height="18" rx="3"/><circle cx="32" cy="25" r="5"/><path d="M10 34v4M38 34v4M10 22h12M10 27h8"/>',
    speaker: '<rect x="12" y="5" width="24" height="38" rx="4"/><circle cx="24" cy="29" r="7"/><circle cx="24" cy="29" r="2"/><circle cx="24" cy="14" r="3"/>'
  };

  function renderWishlist() {
    var W = C.wishlist || { items: [] };
    $('#wish-grid').innerHTML = W.items.map(function (it, i) {
      return '<li class="tile" data-reveal style="--d:' + (i % 4) * 0.07 + 's">' +
        '<button type="button" class="tile__btn" aria-pressed="false">' +
          '<img class="tile__icon" src="' + esc(it.art || ('assets/images/icons/' + it.icon + '.png')) + '" alt="" width="700" height="700" loading="lazy" decoding="async">' +
          '<span class="tile__name">' + esc(t(it.name)) + '</span>' +
          '<span class="tile__note">' + esc(t(it.note)) + '</span>' +
          '<span class="tile__heart" aria-hidden="true">♥</span>' +
          '<span class="sr-only">' + esc(ui('loveIt')) + '</span>' +
        '</button></li>';
    }).join('');
  }
  // A little "I'd love this" heart — just for fun, nothing is saved or reserved
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.tile__btn');
    if (!b) return;
    b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
  });
  // Moi envelope, step by step: the wax seal cracks, the flap swings back, the moi card
  // peeks out with a little shower of petals, then opens up into the details
  var moiTimers = [];
  function moiLater(fn, ms) { moiTimers.push(setTimeout(fn, reducedMotion ? 0 : ms)); }
  function moiPetals(moi) {
    var box = $('.menv__petals', moi), cols = ['#E88A1A', '#F2A93B', '#B3261E', '#FFF8EC', '#E9A0AE'];
    if (reducedMotion) return;
    box.innerHTML = '';
    for (var k = 0; k < 16; k++) {
      var p = document.createElement('i');
      var side = k % 2 ? 1 : -1;
      p.style.cssText = '--x:' + (side * (30 + Math.random() * 190)).toFixed(0) + 'px;--y:' + (-(60 + Math.random() * 150)).toFixed(0) + 'px;--fall:' + (140 + Math.random() * 160).toFixed(0) + 'px;--r:' + (Math.random() * 540 - 270).toFixed(0) + 'deg;--d:' + (Math.random() * 0.25).toFixed(2) + 's;--c:' + cols[k % cols.length] + ';--s:' + (0.7 + Math.random() * 0.6).toFixed(2);
      box.appendChild(p);
    }
  }
  document.addEventListener('click', function (e) {
    var openBtn = e.target.closest('[data-action="open-moi"]'), closeBtn = e.target.closest('[data-action="close-moi"]');
    if (!openBtn && !closeBtn) return;
    var moi = (openBtn || closeBtn).closest('.moi'), seal = $('.menv__seal', moi);
    moiTimers.forEach(clearTimeout); moiTimers = [];
    if (openBtn && !moi.classList.contains('is-open')) {
      seal.setAttribute('aria-expanded', 'true');
      moi.classList.add('is-cracked');
      moiLater(function () { moi.classList.add('is-open'); }, 450);
      moiLater(function () { moi.classList.add('is-peek'); }, 1400);
      moiLater(function () {
        // the slip grows smoothly out of the card: measure where the card is, lay the slip
        // out in its final place, then animate it from the card's spot (FLIP)
        var card = $('.menv__card', moi), envEl = $('.menv', moi), letter = $('#gift-letter');
        var sec = moi.closest('section'), s0 = sec.getBoundingClientRect().top;
        var c0 = card.getBoundingClientRect(), e0 = envEl.getBoundingClientRect();
        moi.classList.add('is-out');
        // the section just grew; let the sheet stack re-measure, then undo the jump that
        // causes so nothing on screen moves except the slip itself
        window.dispatchEvent(new Event('resize'));
        var shift = sec.getBoundingClientRect().top - s0;
        if (shift) window.scrollBy({ top: shift, behavior: 'instant' });
        var l1 = letter.getBoundingClientRect(), e1 = envEl.getBoundingClientRect();
        if (!reducedMotion && letter.animate) {
          var k = c0.width / l1.width, ease = 'cubic-bezier(.45, 0, .2, 1)';
          letter.animate([
            { transformOrigin: '50% 0', transform: 'translate(' + (c0.left + c0.width / 2 - (l1.left + l1.width / 2)) + 'px,' + (c0.top - l1.top) + 'px) scale(' + k + ')', opacity: 0 },
            { transformOrigin: '50% 0', opacity: 1, offset: .35 },
            { transformOrigin: '50% 0', transform: 'none', opacity: 1 }
          ], { duration: 1400, easing: ease });
          envEl.animate([{ transform: 'translateY(' + (e0.top - e1.top) + 'px) rotate(-2deg)' }, { transform: 'scale(.74) rotate(-2deg)' }], { duration: 1400, easing: ease });
        }
        letter.focus({ preventScroll: true });
        setTimeout(function () {
          // bring the slip's top just under the top bar (or centre it when it fits)
          var r = letter.getBoundingClientRect(), vh = window.innerHeight, bar = 84;
          var target = r.height < vh - bar - 30 ? r.top - (vh - r.height) / 2 : r.top - bar;
          window.scrollBy({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
        }, reducedMotion ? 0 : 1450);
      }, 2900);
    } else if (closeBtn) {
      moi.classList.remove('is-out');
      moiLater(function () { moi.classList.remove('is-peek'); }, 300);
      moiLater(function () { moi.classList.remove('is-open'); }, 1300);
      moiLater(function () { moi.classList.remove('is-cracked'); seal.setAttribute('aria-expanded', 'false'); seal.focus({ preventScroll: true }); }, 2200);
    }
  });

  function renderGift() {
    var G = C.gift;
    var box = $('#gift');
    if (!G || !G.enabled) { box.hidden = true; return; }
    box.hidden = false;
    $('.menv__seal', box).setAttribute('aria-label', ui('moiOpen'));
    var rows = [
      [ui('bank'), G.bankName, false],
      [ui('accountName'), G.accountName, false],
      [ui('accountNumber'), G.accountNumber, true]
    ];
    $('#gift-details').innerHTML = rows.map(function (r) {
      return '<div><dt>' + esc(r[0]) + '</dt><dd><span>' + esc(r[1]) + '</span>' +
        (r[2] ? '<button class="copy-btn" type="button" data-copy="' + esc(String(r[1]).replace(/\s/g, '')) + '">' + esc(ui('copy')) + '</button>' : '') + '</dd></div>';
    }).join('') + (G.note ? '<div><dt>&nbsp;</dt><dd>' + esc(t(G.note)) + '</dd></div>' : '');
    var qr = $('#gift-qr');
    if (G.qrImage) { qr.src = G.qrImage; qr.parentElement.hidden = false; } else qr.parentElement.hidden = true;
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    var text = b.getAttribute('data-copy');
    var done = function () { b.textContent = ui('copied'); setTimeout(function () { b.textContent = ui('copy'); }, 1800); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, function () {});
    else {
      var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { /* ignore */ }
      ta.remove();
    }
  });

  // Demo mode for everything that talks to the studio's Apps Script
  function inDemo() { return (C.guestServices || {}).demoMode !== false; }

  var liveWishes = null;        // wishes from the studio's Sheet (null = not loaded yet)

  function renderGuestbook() {
    var GB = C.guestbook || { wishes: [] };
    var viaScript = GB.provider !== 'form' && !!window.GuestServices;   // falls back if upload.js didn't load
    var form = $('#wish-form');

    form.hidden = !viaScript;
    $('#guestbook-cta').hidden = viaScript;
    if (viaScript) {
      form.elements.message.placeholder = ui('wishPlaceholder');
      form.elements.message.maxLength = GB.maxLength || 600;
      if (!form.elements.name.value) form.elements.name.value = recall('wedding-guest-name') || '';
      updateWishCount();
      $('button', form).disabled = false;   // stays tappable; in preview mode a note explains nothing was sent
    } else {
      $('#guestbook-cta').innerHTML = isRealUrl(GB.formUrl)
        ? '<a class="btn btn--solid" href="' + esc(GB.formUrl) + '" target="_blank" rel="noopener"><span>' + esc(ui('writeWish')) + '</span>' + icon('i-external') + '</a>'
        : '<span class="btn btn--solid" aria-disabled="true"><span>' + esc(ui('writeWish')) + '</span></span>';
    }
    renderWishes();
  }

  // Wall: sample wishes in demo mode, otherwise wishes from the Sheet
  function renderWishes() {
    var GB = C.guestbook || { wishes: [] };
    var showLive = !inDemo() && GB.provider !== 'form' && GB.showLive !== false;
    var list = showLive ? (liveWishes || []) : GB.wishes;
    $('#wishes-empty').hidden = !(showLive && liveWishes && !liveWishes.length);
    $('#wishes').innerHTML = list.map(function (w, i) {
      // each wish is the back of a little postcard: message on the left, sender and stamp on the right
      return '<li class="wish-card pmini" data-reveal style="--d:' + (i % 3) * 0.1 + 's">' +
        '<p class="wish-card__text">' + esc(t(w.text)) + '</p>' +
        '<span class="pmini__stamp" aria-hidden="true"></span>' +
        '<p class="wish-card__by"><span class="wish-card__name">' + esc(t(w.name)) + '</span>' +
        (w.relation ? '<span class="wish-card__rel">' + esc(t(w.relation)) + '</span>' : '') + '</p></li>';
    }).join('');
    if (siteStarted) observeReveals();
    initWishCarousel();
  }

  // Swipeable carousel for the posted wishes: swipe, prev/next buttons and dots
  function initWishCarousel() {
    var list = $('#wishes'), nav = $('#wishes-nav');
    if (!list || !nav) return;
    var items = list.children;
    nav.hidden = items.length < 2;
    var dots = $('#wishes-dots');
    dots.innerHTML = Array.prototype.map.call(items, function (_, i) {
      return '<button type="button" class="wishes__dot" aria-label="' + (i + 1) + '"></button>';
    }).join('');
    function current() { return Math.round(list.scrollLeft / Math.max(1, list.clientWidth)); }
    function go(i) { var n = Math.max(0, Math.min(items.length - 1, i)); list.scrollTo({ left: n * list.clientWidth, behavior: 'smooth' }); }
    function mark() {
      var c = current();
      Array.prototype.forEach.call(dots.children, function (d, i) { d.classList.toggle('is-on', i === c); });
      $('#wishes-prev').disabled = c <= 0;
      $('#wishes-next').disabled = c >= items.length - 1;
    }
    if (!list._carousel) {
      list._carousel = true;
      list.addEventListener('scroll', mark, { passive: true });
      $('#wishes-prev').addEventListener('click', function () { go(current() - 1); });
      $('#wishes-next').addEventListener('click', function () { go(current() + 1); });
      dots.addEventListener('click', function (e) {
        var b = e.target.closest('.wishes__dot'); if (!b) return;
        go(Array.prototype.indexOf.call(dots.children, b));
      });
    }
    list.scrollLeft = 0;
    mark();
  }

  function updateWishCount() {
    var f = $('#wish-form');
    $('#wish-count').textContent = f.elements.message.value.length + ' / ' + ((C.guestbook || {}).maxLength || 600);
  }

  function loadWishes() {
    var GB = C.guestbook || {};
    if (GB.provider === 'form' || GB.showLive === false || !window.GuestServices || !window.GuestServices.live) return;
    window.GuestServices.get('wishes', { limit: GB.liveCount || 24 }).then(function (res) {
      liveWishes = (res && res.ok && res.wishes) || [];
      renderWishes();
    });
  }

  function initWishForm() {
    var form = $('#wish-form'), status = $('#wish-status'), btn = $('button', form);
    form.elements.message.addEventListener('input', updateWishCount);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim(), message = form.elements.message.value.trim();
      if (!name || !message) { status.textContent = ui('wishMissing'); (name ? form.elements.message : form.elements.name).focus(); return; }
      if (!window.GuestServices || !window.GuestServices.live) { status.textContent = ui('wishDemo'); return; }

      btn.disabled = true; status.textContent = ui('statusSending');
      store('wedding-guest-name', name);
      window.GuestServices.send({
        kind: 'wish', name: name, relation: form.elements.relation.value.trim(),
        message: message, website: form.elements.website.value, lang: lang
      }).then(function (res) {
        if (res && res.ok) {
          status.textContent = res.shown ? ui('wishThanksAuto') : ui('wishThanksApproved');
          form.elements.message.value = ''; updateWishCount();
          if (res.shown) {   // show it straight away, newest first
            liveWishes = [{ name: name, relation: form.elements.relation.value.trim(), text: message }].concat(liveWishes || []);
            renderWishes();
          }
          btn.disabled = false;
        } else if (res && res.error === 'closed') {
          status.textContent = ui('wishClosed');
        } else {
          status.textContent = ui(res && res.error === 'missing' ? 'wishMissing' : 'wishError');
          btn.disabled = false;
        }
      });
    });
  }

  /* ---------- 09 MEMORIES -------------------------------------------- */
  var qrRenderedFor = null;
  var uploader = null;          // embedded GuestUploader instance (js/upload.js)
  var recentPhotos = null;      // newest guest uploads from the Apps Script (null = not loaded)

  function renderMemories() {
    var M = C.memories || { samples: [] };
    var live = !inDemo();
    // "appsScript": guests upload right here (embedded form) or on upload.html via the QR code.
    // "googleForm": an external Google Form link.
    var viaScript = M.provider !== 'googleForm';
    var embedded = viaScript && !!window.GuestUploader;   // falls back to a link if upload.js didn't load
    var upload = viaScript || (live && isRealUrl(M.uploadUrl));
    var uploadHref = viaScript ? 'upload.html' + (lang === 'ta' ? '?lang=ta' : '') : M.uploadUrl;
    var gallery = live && isRealUrl(M.galleryUrl);

    $('#memories-tag').textContent = M.hashtag || '';

    // Embedded uploader
    $('#memories-upcard').hidden = !embedded;
    if (embedded) {
      if (!uploader) {
        uploader = window.GuestUploader.mount($('#memories-uploader'), {
          lang: lang,
          // Drive needs a few seconds to make previews of new photos
          onUploaded: function () { setTimeout(function () { loadRecent(true); }, 6000); }
        });
      } else uploader.setLanguage(lang);
    }

    // "How to share" steps only for the Google Form flow (the embedded form explains itself)
    $('#share-steps').hidden = embedded;
    $('#share-step2').textContent = ui(viaScript ? 'shareStep2' : 'shareStep2Form');
    $('#share-alt').textContent = ui(viaScript ? 'shareAlt' : 'shareAltForm');

    var btn = function (ok, url, label, solid) {
      var cls = 'btn' + (solid ? ' btn--solid' : '');
      var external = isRealUrl(url);
      return ok
        ? '<a class="' + cls + '" href="' + esc(url) + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '><span>' + esc(label) + '</span>' + (external ? icon('i-external') : icon('i-arrow')) + '</a>'
        : '<span class="' + cls + '" aria-disabled="true"><span>' + esc(label) + '</span></span>';
    };
    $('#memories-buttons').innerHTML =
      (embedded ? '' : btn(upload, uploadHref, ui('sharePhotos'), true)) +
      (gallery || !live ? btn(gallery, M.galleryUrl, ui('viewGuestGallery'), embedded) : '');

    // QR code → the upload page (or Google Form). With the form embedded it becomes a
    // small "scan to continue on your phone" card, shown on larger screens only.
    $('#qr-card').classList.toggle('qr-card--mini', embedded);
    $('#qr-caption').textContent = ui(embedded ? 'scanFromPhone' : 'scanToShare');
    var qrTarget = viaScript ? new URL('upload.html', location.href).href
      : upload ? M.uploadUrl : location.href.split('#')[0] + '#memories';
    var holder = $('#qr-code');
    if (qrRenderedFor !== qrTarget) {
      holder.innerHTML = '';
      if (window.QRCode) {
        try {
          new window.QRCode(holder, { text: qrTarget, width: 180, height: 180, colorDark: '#2a1213', colorLight: '#ffffff', correctLevel: window.QRCode.CorrectLevel.M });
          holder.removeAttribute('title'); // qrcodejs adds the URL as a tooltip
        } catch (e) { holder.innerHTML = '<p class="qr-fallback">' + esc(qrTarget) + '</p>'; }
      } else {
        holder.innerHTML = '<p class="qr-fallback">' + esc(upload ? qrTarget : '') + '</p>';
      }
      qrRenderedFor = qrTarget;
    }

    renderWall();
  }

  // Wall, in order of preference when live:
  //  1. Newest uploads pulled from the Apps Script (provider "appsScript", showRecent)
  //  2. Google Drive folder grid (driveFolderId)
  //  3. Any other embeddable wall (embedUrl)
  //  4. Hand-picked highlights from config
  // In demo mode: sample polaroids.
  function renderWall() {
    var M = C.memories || { samples: [] };
    var live = !inDemo();
    var wall = $('#memory-wall'), title = $('#wall-title');
    var folderId = String(M.driveFolderId || '').trim();
    var embedSrc = !live ? '' :
      /^[A-Za-z0-9_-]{10,}$/.test(folderId) ? 'https://drive.google.com/embeddedfolderview?id=' + folderId + '#grid' :
      isRealUrl(M.embedUrl) ? M.embedUrl : '';
    var hasRecent = live && recentPhotos && recentPhotos.length;

    if (embedSrc && !hasRecent) {
      title.textContent = ui('guestUploads'); title.hidden = false;
      var frame = $('iframe', wall);
      if (!frame || frame.getAttribute('src') !== embedSrc) {
        wall.innerHTML = '<iframe src="' + esc(embedSrc) + '" title="' + esc(ui('guestUploads')) + '" loading="lazy" allow="clipboard-write" allowfullscreen></iframe>';
      }
      wall.classList.add('wall--embed');
      return;
    }

    var photos = hasRecent
      ? recentPhotos.map(function (p) { return { src: p.src, caption: p.by, by: '' }; })
      : live ? (M.highlights || []) : (M.samples || []);
    title.textContent = hasRecent ? ui('guestRecent') : live ? ui('guestHighlights') : ui('guestUploads');
    title.hidden = !photos.length;
    wall.classList.remove('wall--embed');
    // A strip of 35mm film: frames with edge numbers and captions printed in the rebate.
    // The set is drawn twice so the strip can drift past in a seamless loop.
    wall.classList.add('wall--film');
    var frame = function (s, i, copy) {
      var n = (i + 1) + (i % 2 ? 'A' : '');
      return '<figure class="film__frame" data-n="\u25B7 ' + n + '"' + (copy ? ' aria-hidden="true"' : '') + '>' +
        '<img src="' + esc(s.src) + '" alt="' + (copy ? '' : esc(t(s.caption))) + '" width="800" height="800" loading="lazy" decoding="async">' +
        '<figcaption>' + esc(t(s.caption)) + (s.by ? ' \u00B7 ' + esc(s.by) : '') + '</figcaption></figure>';
    };
    wall.innerHTML = photos.length ? '<div class="film" data-reveal><div class="film__track">' +
      photos.map(function (s, i) { return frame(s, i, false); }).join('') +
      photos.map(function (s, i) { return frame(s, i, true); }).join('') +
      '</div></div>' : '';
    if (siteStarted) observeReveals();
  }

  // Ask the Apps Script for the newest uploads (only when the uploader is live)
  function loadRecent(force) {
    var M = C.memories || {};
    if (M.provider === 'googleForm' || M.showRecent === false) return;
    if (!window.GuestUploader || !window.GuestUploader.live) return;
    if (recentPhotos && !force) return;
    window.GuestUploader.recent(M.recentCount || 6).then(function (photos) {
      recentPhotos = photos;
      renderWall();
    });
  }

  // Fetch a live wall only when the guest scrolls near it (saves data & quota)
  function whenNear(id, fn) {
    var sec = document.getElementById(id);
    if (!('IntersectionObserver' in window)) return fn();
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); fn(); }
    }, { rootMargin: '800px 0px' });
    io.observe(sec);
  }

  /* ---------- 10 MUSIC ------------------------------------------------ */
  // Two possible sources, chosen in config.music:
  //  • youtubeVideoId — the YouTube IFrame Player API (player stays visible)
  //  • audioFile      — a licensed .mp3 in assets/audio (can play in the background)
  var Music = (function () {
    var M = C.music || {};
    // Accept a bare 11-char ID or any pasted YouTube link (watch, youtu.be, embed, shorts)
    var raw = String(M.youtubeVideoId || M.youtubeUrl || '');
    var hit = raw.match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/|\/live\/|\/v\/)([A-Za-z0-9_-]{11})/) || raw.match(/^([A-Za-z0-9_-]{11})$/);
    var ytId = hit ? hit[1] : '';
    var useFile = !!(M.enabled && M.audioFile);
    var useYT = !useFile && !!(M.enabled && ytId && !/placeholder|your_video/i.test(raw));
    var configured = useFile || useYT;

    var root = $('#music'), toggle = $('#music-toggle'), panel = $('#music-panel'), status = $('#music-status');
    var vol = $('#music-volume'), alt = $('#music-alt');
    var player = null, audio = null, playing = false, apiLoading = false, failed = false, wantsPlay = false;

    function setPlaying(on) {
      playing = on;
      root.classList.toggle('is-playing', on);
      if (on) root.classList.remove('needs-tap');
      toggle.setAttribute('aria-pressed', String(on));
      refreshLabels();
    }
    function say(msg) { status.textContent = msg || ''; }
    function refreshLabels() {
      if (!configured) return;
      var label = playing ? ui('pauseMusic') : ui('playMusic');
      toggle.setAttribute('aria-label', label);
      $('#music-toggle-label').textContent = label;
      $('#music-title').textContent = t(M.trackTitle);
      if (failed) say(ui('musicUnavailable'));
    }
    function showAlt() {
      if (isRealUrl(M.youtubeMusicUrl)) { alt.href = M.youtubeMusicUrl; alt.hidden = false; }
    }
    function fail() {
      failed = true; setPlaying(false); say(ui('musicUnavailable')); showAlt();
      $('.music__player', panel).hidden = true;  // nothing to show — keep the card small
      $('.music__vol', panel).hidden = true;
      panel.hidden = false;
    }
    function blocked() {
      if (playing || failed) return;
      root.classList.add('needs-tap'); say(ui('musicBlocked'));
    }

    // --- licensed audio file ---
    function startFile() {
      if (!audio) {
        audio = new Audio(M.audioFile);
        audio.loop = M.loop !== false;
        audio.volume = (M.volume != null ? M.volume : 45) / 100;
        audio.addEventListener('playing', function () { setPlaying(true); say(''); });
        audio.addEventListener('pause', function () { setPlaying(false); });
        audio.addEventListener('error', fail);
      }
      var p = audio.play();
      if (p && p.catch) p.catch(blocked);
    }

    // --- YouTube ---
    function loadYT() {
      if (window.YT && window.YT.Player) { createPlayer(); return; }
      if (apiLoading) return;
      apiLoading = true;
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () { if (prev) prev(); createPlayer(); };
      var s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.onerror = fail;
      document.head.appendChild(s);
      setTimeout(function () { if (!player) fail(); }, 12000); // network / blocker fallback
    }
    function createPlayer() {
      if (player) return;
      player = new window.YT.Player('yt-player', {
        videoId: ytId,
        playerVars: {
          autoplay: 0, playsinline: 1, controls: 1, rel: 0,
          start: M.startSeconds || 0,
          loop: M.loop !== false ? 1 : 0, playlist: ytId
        },
        events: {
          onReady: function (e) {
            e.target.setVolume(+vol.value);
            if (wantsPlay) e.target.playVideo();
            if (wantsPlay) setTimeout(blocked, 2500); // only if autoplay with sound was refused
          },
          onStateChange: function (e) {
            var S = window.YT.PlayerState;
            if (e.data === S.PLAYING) { setPlaying(true); say(''); }
            else if (e.data === S.PAUSED || e.data === S.ENDED) setPlaying(false);
          },
          onError: fail // 101/150 = owner disallows embedding, 100 = removed, 2/5 = bad ID
        }
      });
    }

    function play() {
      wantsPlay = true; failed = false; alt.hidden = true; say('');
      if (useFile) return startFile();
      // yt-player lives outside the panel, so panel stays hidden — audio keeps playing when minimised
      if (!player) return loadYT();
      if (player.playVideo) player.playVideo();
    }
    function pause() {
      wantsPlay = false;
      if (audio) audio.pause();
      if (player && player.pauseVideo) player.pauseVideo();
    }

    function init() {
      $$('[data-music-only]').forEach(function (el) { el.hidden = !configured; });
      if (!configured) return;
      root.hidden = false;
      vol.value = M.volume != null ? M.volume : 45;
      if (useFile) { $('.music__player', panel).hidden = true; }

      toggle.addEventListener('click', function () {
        if (playing) pause();
        else play();
      });
      // Panel is always hidden (minimised); minimise button is a no-op safety fallback
      var minBtn = $('#music-minimise');
      if (minBtn) minBtn.addEventListener('click', function () { toggle.focus(); });
      vol.addEventListener('input', function () {
        if (audio) audio.volume = vol.value / 100;
        if (player && player.setVolume) player.setVolume(+vol.value);
      });
      refreshLabels();
      // Prepare the YouTube player before the guest taps the door, so the tap starts it at once
      if (!useFile) loadYT();
    }

    return { init: init, play: play, refreshLabels: refreshLabels, get configured() { return configured; } };
  })();

  /* ---------- 05 INTRO & ENTRANCE ------------------------------------- */
  function initIntro() {
    var intro = $('#intro');

    if (C.showIntro === false) { intro.hidden = true; enterSite(); return; }

    // The intro always opens at the top of the invitation
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    var toTop = function () { if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); };
    toTop();
    window.addEventListener('load', toTop);   // browsers restore the old position after load
    lockScroll(true);
    // Start the drawing once fonts are ready so the type never "jumps"
    var go = function () { intro.classList.add('is-playing'); };
    if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 1200); })]).then(go);
    else go();
    $('[data-action="skip-intro"]').focus({ preventScroll: true });

    function leave(withMusic) {
      if (intro.classList.contains('is-opening')) return;
      if (withMusic && Music.configured) Music.play();   // inside the click = counts as user permission
      toTop();
      intro.classList.add('is-opening');                 // light through the seam, then the doors swing open
      lockScroll(false);
      enterSite(true);
      setTimeout(function () { intro.classList.add('is-gone'); intro.hidden = true; }, reducedMotion ? 450 : 3300);
      var h = $('#home'); h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true });
    }
    // Tap the door (or the hint button) to come in — music always starts on enter
    $$('[data-action="enter"]', intro).forEach(function (el) { el.addEventListener('click', function () { leave(true); }); });
    $('[data-action="skip-intro"]').addEventListener('click', function () { leave(false); });
    intro.addEventListener('keydown', function (e) { if (e.key === 'Escape') leave(false); });
  }

  function enterSite(throughDoors) {
    document.documentElement.classList.add('is-entered');
    if (siteStarted) return;
    siteStarted = true;

    // Names rise as the doors finish opening
    if (hasGSAP()) {
      var g = window.gsap, wait = throughDoors ? 1.5 : 0.45;
      g.from('.hero__name', { y: 40, opacity: 0, duration: 1.8, ease: 'expo.out', stagger: 0.2, delay: wait });
      g.from('.hero__amp', { opacity: 0, scale: 0.6, duration: 1.4, ease: 'expo.out', delay: wait + 0.3 });
      g.from('.hero__tamil, .hero__meta', { opacity: 0, y: 12, duration: 1.4, ease: 'power2.out', stagger: 0.15, delay: wait + 0.5 });
    }
    initMotes();
    // The 'come in' line appears only once the guest scrolls down, after the doors have opened
    // Only a guest's own scrolling counts (wheel, touch, keys), not the page moving during the entrance
    var guestScrolled = false;
    ['wheel', 'touchmove', 'keydown'].forEach(function (ev) {
      window.addEventListener(ev, function () { guestScrolled = true; }, { passive: true });
    });
    setTimeout(function () {
      window.addEventListener('scroll', function () {
        if (guestScrolled && window.scrollY > 120) document.documentElement.classList.add('welcome-in');
      }, { passive: true });
    }, throughDoors ? 3800 : 0);
    initKolamEdges();
    initSectionStack();
    // The monogram leans gently toward the pointer
    var mono = $('#mono');
    if (mono && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', function (e) {
        mono.style.setProperty('--mx', ((e.clientX / window.innerWidth - 0.5) * 18).toFixed(1) + 'deg');
        mono.style.setProperty('--my', ((0.5 - e.clientY / window.innerHeight) * 14).toFixed(1) + 'deg');
      }, { passive: true });
    }
    if (!reducedMotion) $$('.story .moment').forEach(function (m) { m.classList.add('is-swaying'); });
    if (!reducedMotion) $$('.hang').forEach(function (h, i) { h.classList.add('is-swaying'); h.style.animationDelay = (-i * 1.7) + 's'; });
    observeReveals();
    initScroll();
    initCursor();
    whenNear('memories', loadRecent);
    whenNear('guestbook', loadWishes);
  }

  // Kolam borders along the top and bottom of the dark rooms; each draws itself in when seen
  // Sections stack like sheets: each one holds still once its end is on screen, and the
  // next slides up over it while it sinks back and dims underneath
  function initSectionStack() {
    if (reducedMotion) return;
    var secs = ['#days-to-go', '#story', '#celebrations', '#contacts', '#wishlist', '#moi', '#guestbook'].map(function (q) { return $(q); }).filter(Boolean);
    var next = secs.map(function (el) { return el.nextElementSibling || $('.footer'); });
    next[next.length - 1] = $('.footer');
    secs.forEach(function (el) {
      el.classList.add('stack-sec');
      var sh = document.createElement('div');
      sh.className = 'stack-shade'; sh.setAttribute('aria-hidden', 'true');
      el.appendChild(sh);
    });
    $('.footer') && $('.footer').classList.add('stack-top');
    function measure() {
      var vh = window.innerHeight;
      secs.forEach(function (el) { el.style.setProperty('--stick', Math.min(0, vh - el.offsetHeight) + 'px'); });
    }
    var ticking = false;
    function frame() {
      ticking = false;
      var vh = window.innerHeight;
      secs.forEach(function (el, k) {
        var n = next[k]; if (!n) return;
        // the story (k = 0) waits until the calendar has been scrolled further before it starts to cover it
        var off = k === 0 ? vh * 0.35 : 0;
        var p = Math.min(1, Math.max(0, (vh - n.getBoundingClientRect().top - off) / (vh - off)));
        el.style.setProperty('--cover', p.toFixed(3));
        // once a section is completely covered, stop painting it so it can't peek out
        // around the edges of the sheet on top while that one sinks back in turn
        el.style.visibility = p >= 1 ? 'hidden' : '';
      });
    }
    measure(); frame();
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    window.addEventListener('resize', function () { measure(); frame(); });
    if ('ResizeObserver' in window) { var ro = new ResizeObserver(measure); secs.forEach(function (el) { ro.observe(el); }); }
  }

  function initKolamEdges() {
    var NS = 'http://www.w3.org/2000/svg', N = 44;
    var edges = [];
    ['#days-to-go', '#story', '#celebrations', '#contacts', '#wishlist', '#moi', '#guestbook', '#memories', '.footer'].map(function (sel) { return [sel, ['top']]; }).forEach(function (pair) {
      var host = $(pair[0]);
      if (!host) return;
      pair[1].forEach(function (pos) {
        var wrap = document.createElement('div');
        wrap.className = 'kedge kedge--' + pos + ' seam';
        wrap.setAttribute('aria-hidden', 'true');
        var svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', (-N * 90) + ' -90 ' + (N * 180) + ' 180');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        for (var k = -N / 2; k < N / 2; k++) {
          var use = document.createElementNS(NS, 'use');
          use.setAttribute('href', '#kolam-unit');
          use.setAttribute('x', k * 180 + 90 - 90); use.setAttribute('y', -90);
          use.setAttribute('width', 180); use.setAttribute('height', 180);
          use.style.setProperty('--d', (Math.abs(k) * 0.06).toFixed(2) + 's');   // draws outward from the centre
          svg.appendChild(use);
        }
        wrap.appendChild(svg);
        host.appendChild(wrap);
        edges.push(wrap);
      });
    });
    if (reducedMotion || !('IntersectionObserver' in window)) { edges.forEach(function (e) { e.classList.add('is-drawn'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-drawn'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    edges.forEach(function (e) { io.observe(e); });
  }

  // Dust drifting in the morning sunbeams (decorative)
  function initMotes() {
    var box = $('#motes');
    if (!box || reducedMotion) return;
    var n = window.innerWidth < 700 ? 14 : 26, html = '';
    for (var i = 0; i < n; i++) {
      html += '<span class="mote" style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (Math.random() * 90).toFixed(1) + '%;' +
        '--s:' + (2 + Math.random() * 3.5).toFixed(1) + 'px;--t:' + (14 + Math.random() * 16).toFixed(1) + 's;' +
        '--dl:-' + (Math.random() * 30).toFixed(1) + 's;--dx:' + (Math.random() * 80 - 40).toFixed(0) + 'px"></span>';
    }
    box.innerHTML = html;
  }

  // The album is as tall as it is wide, so scrolling down turns its pages sideways
  function layoutAlbum() {
    var album = $('#album'), track = $('#album-track');
    if (!album || !track) return;
    if (reducedMotion) { album.style.height = ''; return; }
    var extra = Math.max(0, track.scrollWidth - window.innerWidth);
    album.style.height = (extra + window.innerHeight) + 'px';
    album.dataset.extra = extra;
  }

  /* ---------- 06 REVEALS ---------------------------------------------- */
  // Wrap every word of an element in a span that fades in with a stagger
  function fadeWords(root) {
    if (!root) return;
    var n = 0, walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (tn) {
      if (!tn.nodeValue.trim()) return;
      var frag = document.createDocumentFragment();
      tn.nodeValue.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var sp = document.createElement('span');
        sp.className = 'fw';
        sp.style.setProperty('--w', n++);
        sp.textContent = part;
        frag.appendChild(sp);
      });
      tn.parentNode.replaceChild(frag, tn);
    });
  }
  // Adds .words-in to each element once it is seen, which starts its word fade
  var fadeObserver;
  function observeFades(selector) {
    var els = $$(selector);
    if (reducedMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('words-in'); });
      return;
    }
    if (!fadeObserver) {
      fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('words-in'); fadeObserver.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    }
    els.forEach(function (el) { if (!el.classList.contains('words-in')) fadeObserver.observe(el); });
  }

  var revealObserver;
  function observeReveals() {
    var targets = $$('[data-reveal]:not(.is-in)');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); revealObserver.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    }
    targets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 11 SCROLL, NAV, CURSOR, COUNTDOWN ----------------------- */
  function initScroll() {
    var topbar = $('#topbar'), thread = $('.thread');
    var hero = $('#home'), album = $('#album'), track = $('#album-track');
    layoutAlbum();
    var lastY = window.scrollY, ticking = false;
    var menuOpen = function () { return !$('#menu').hidden; };

    function frame() {
      ticking = false;
      var y = window.scrollY, vh = window.innerHeight;
      var max = document.documentElement.scrollHeight - vh;
      thread.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

      // Courtyard camera: 0 at the top of the hero, 1 when its pinned stage lets go
      if (!reducedMotion) {
        var hr = hero.getBoundingClientRect();
        var hp = Math.min(1, Math.max(0, -hr.top / Math.max(1, hr.height - vh)));
        if (hr.bottom > 0) {
          hero.style.setProperty('--hp', hp.toFixed(4));
          // The kolam is drawn between 10% and 75% of the walk; the welcome appears at the end
          hero.style.setProperty('--kp', Math.min(1, Math.max(0, (hp - 0.1) / 0.65)).toFixed(4));
          var rise = Math.min(1, Math.max(0, (hp - 0.55) / 0.14)), fall = Math.min(1, Math.max(0, (hp - 0.88) / 0.1));
          hero.style.setProperty('--hw', (rise * (1 - fall)).toFixed(4));
        }
        // Album: vertical scroll → sideways page turn
        var ar = album.getBoundingClientRect(), extra = +album.dataset.extra || 0;
        if (ar.top < vh && ar.bottom > 0) {
          var ap = Math.min(1, Math.max(0, -ar.top / Math.max(1, ar.height - vh)));
          track.style.transform = 'translate3d(' + (-ap * extra).toFixed(1) + 'px,0,0)';
        }
      }

      topbar.classList.toggle('is-solid', y > hero.offsetHeight - vh - 40);   // clear over Paati's hall
      if (!menuOpen()) topbar.classList.toggle('is-hidden', y > lastY && y > vh * 0.8);
      lastY = y;

    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    window.addEventListener('resize', function () { layoutAlbum(); frame(); });
    window.addEventListener('load', function () { layoutAlbum(); frame(); });
    frame();

    // Highlight the current section in the desktop nav: the latest section whose top has
    // passed the middle of the screen (sections stack, so earlier ones stay parked underneath)
    var links = $$('.topbar__nav a'), navSecs = $$('main > section[id]'), navTick = false;
    function navFrame() {
      navTick = false;
      var mid = window.innerHeight * 0.5, cur = '';
      navSecs.forEach(function (sec) { if (sec.getBoundingClientRect().top <= mid) cur = sec.id; });
      links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + cur); });
    }
    window.addEventListener('scroll', function () { if (!navTick) { navTick = true; requestAnimationFrame(navFrame); } }, { passive: true });
    navFrame();
  }

  function initMenu() {
    var btn = $('#menu-btn'), menu = $('#menu');
    function set(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? ui('close') : ui('menu'));
      lockScroll(open);
      $('#topbar').classList.remove('is-hidden');
      if (open) $('a', menu).focus();
    }
    btn.addEventListener('click', function () { set(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { set(false); btn.focus(); } });
  }

  function initCursor() {
    if (!finePointer || reducedMotion || C.showCustomCursor === false) return;
    var el = $('.cursor');
    document.documentElement.classList.add('has-cursor');
    window.addEventListener('mousemove', function (e) {
      el.style.setProperty('--cx', e.clientX + 'px');
      el.style.setProperty('--cy', e.clientY + 'px');
    }, { passive: true });
    document.addEventListener('mouseover', function (e) {
      el.classList.toggle('is-hover', !!e.target.closest('a, button, [role="switch"], input'));
    });
    document.addEventListener('mouseleave', function () { el.style.setProperty('--cx', '-100px'); });
  }

  function initCountdown() {
    var target = new Date(C.weddingDateISO).getTime();
    if (isNaN(target)) { $('#countdown').hidden = true; return; }
    var cells = { d: $('[data-cd="d"]'), h: $('[data-cd="h"]'), m: $('[data-cd="m"]'), s: $('[data-cd="s"]') };
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        $('#countdown').hidden = true; $('#countdown-done').hidden = false;
        clearInterval(timer); return;
      }
      var s = Math.floor(diff / 1000);
      cells.d.textContent = pad(Math.floor(s / 86400));
      cells.h.textContent = pad(Math.floor(s % 86400 / 3600));
      cells.m.textContent = pad(Math.floor(s % 3600 / 60));
      cells.s.textContent = pad(s % 60);
    }
    var timer = setInterval(tick, 1000);
    tick();
  }

  /* ---------- 12 START-UP --------------------------------------------- */
  function init() {
    applyTheme();
    Music.init();

    // Language: ?lang=ta in the link wins, then the guest's last choice, then the config default
    var fromUrl = new URLSearchParams(location.search).get('lang');
    applyLanguage(fromUrl || recall('wedding-lang') || C.defaultLanguage || 'en');
    $$('.lang__btn').forEach(function (b) {
      b.addEventListener('click', function () { applyLanguage(b.getAttribute('data-lang')); });
    });

    initMenu();
    initWishForm();
    initCountdown();
    initIntro();
  }

  // Memories: the red 'Add your photos' button opens the uploader panel
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('#memories-add');
    if (!btn) return;
    var open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    document.getElementById('memories').classList.toggle('is-open', open);
    if (open) { var panel = document.getElementById('memories-panel'); if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
