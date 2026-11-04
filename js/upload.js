/* =====================================================================
   GUEST PHOTO UPLOADER — reusable component
   ONETONE STUDIO

   Used in two places:
   • index.html  → embedded in the Memories section (mounted by main.js)
   • upload.html → the light page the QR code opens (mounted below)

   Sends each chosen photo/video, one request per file, to the studio's
   Google Apps Script web app (apps-script/Code.gs), which saves it into
   the studio's Google Drive. Guests never sign in.

   It also provides window.GuestServices, the small connection to the
   studio's Apps Script that the guestbook (main.js) uses too.

   Settings live in js/config.js → guestServices (appsScriptUrl, eventKey,
   demoMode) and memories (maxFileMB). You shouldn't need to edit this file.
   ===================================================================== */
(function () {
  'use strict';

  var C = window.WEDDING_CONFIG;
  if (!C) return;
  var M = C.memories || {};
  var S = C.guestServices || {};

  /* ---------- Helpers (same conventions as main.js) ------------------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function tr(lang, v) { return v == null ? '' : typeof v === 'object' ? (v[lang] != null ? v[lang] : v.en || '') : String(v); }
  function text(lang, key, vars) {
    var s = (C.text[lang] && C.text[lang][key] != null) ? C.text[lang][key] : (C.text.en[key] || '');
    Object.keys(vars || {}).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  function recall(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function mb(bytes) { return (bytes / 1048576).toFixed(bytes < 10485760 ? 1 : 0) + ' MB'; }

  /* ---------- Connection to the studio's Apps Script ----------------- */
  var endpoint = String(S.appsScriptUrl || '').trim();
  var live = S.demoMode === false && /^https:\/\/script\.google\.com\/.+\/exec$/.test(endpoint);
  var maxBytes = (M.maxFileMB || 35) * 1048576;
  var PARALLEL = 2;          // uploads at once — gentle on phone data and on Apps Script

  // Must stay a "simple" request: text/plain body and no upload-progress
  // listeners. Anything else triggers a CORS preflight, which Apps Script
  // web apps never answer, so every upload would fail.
  function post(body) {
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = ctrl && setTimeout(function () { ctrl.abort(); }, 5 * 60 * 1000);
    return fetch(endpoint, {
      method: 'POST', body: body, redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) { return r.json(); })
      .catch(function () { return { ok: false, error: 'network' }; })
      .then(function (res) { if (timer) clearTimeout(timer); return res; });
  }

  function readBase64(file) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(String(r.result).split(',')[1] || ''); };
      r.onerror = function () { reject(r.error); };
      r.readAsDataURL(file);
    });
  }

  // GET ?action=…&event=… → parsed JSON, or null on any failure
  function get(action, params) {
    if (!live) return Promise.resolve(null);
    var url = endpoint + '?action=' + action + '&event=' + encodeURIComponent(S.eventKey);
    Object.keys(params || {}).forEach(function (k) { url += '&' + k + '=' + encodeURIComponent(params[k]); });
    return fetch(url).then(function (r) { return r.json(); }).catch(function () { return null; });
  }

  // POST an object (the event key is added) → { ok, error?, … }
  function send(obj) {
    if (!live) return Promise.resolve({ ok: false, error: 'demo' });
    obj.event = S.eventKey;
    return post(JSON.stringify(obj));
  }

  // Newest uploads for the website wall: [{ src, by }]
  function recent(limit) {
    return get('recent', { limit: limit || 6 }).then(function (res) { return (res && res.ok && res.photos) || []; });
  }

  /* ---------- The component ------------------------------------------- */
  // opts: { lang, onUploaded(count) }
  function mount(root, opts) {
    opts = opts || {};
    var lang = opts.lang || 'en';
    var uid = 'up-' + Math.random().toString(36).slice(2, 8);
    var ui = function (k, v) { return text(lang, k, v); };

    root.classList.add('uploader');
    root.innerHTML =
      '<p class="up-closed" data-up="closed" hidden data-t="uploadClosed"></p>' +
      '<form class="up-form" novalidate>' +
        '<label class="up-field"><span class="up-field__label" data-t="yourName"></span>' +
          '<input type="text" data-up="name" autocomplete="name" maxlength="60" enterkeyhint="done">' +
          '<span class="up-field__hint" data-t="yourNameHint"></span></label>' +
        '<input class="sr-only" type="file" id="' + uid + '" data-up="files" multiple accept="image/*,video/*">' +
        '<label class="up-drop" for="' + uid + '">' +
          '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="12" width="36" height="28" rx="4"/><circle cx="24" cy="26" r="7"/><path d="M17 12l3-5h8l3 5"/></svg>' +
          '<span class="up-drop__label" data-t="chooseFiles"></span><span class="up-drop__hint" data-up="hint"></span></label>' +
        '<ul class="up-list" data-up="list" aria-live="polite"></ul>' +
        '<button class="btn btn--solid up-send" type="submit" disabled><span data-up="sendLabel"></span></button>' +
        '<p class="up-status" data-up="status" role="status" aria-live="polite"></p>' +
      '</form>';

    var el = function (k) { return $('[data-up="' + k + '"]', root); };
    var form = $('form', root), input = el('files'), list = el('list'), drop = $('.up-drop', root);
    var sendBtn = $('.up-send', root), statusEl = el('status'), nameInput = el('name');

    // Each chosen file: { file, state: ready|sending|done|error|skipped, reason, el }
    var items = [];
    var busy = false, closed = false;

    function add(files) {
      Array.prototype.forEach.call(files, function (f) {
        var it = { file: f, state: 'ready', reason: '' };
        if (!/^(image|video)\//.test(f.type)) { it.state = 'skipped'; it.reason = 'notAllowed'; }
        else if (f.size > maxBytes) { it.state = 'skipped'; it.reason = 'tooBig'; }
        if (it.state === 'ready' && /^image\//.test(f.type)) it.thumb = URL.createObjectURL(f);
        it.el = document.createElement('li');
        it.el.className = 'up-item';
        list.appendChild(it.el);
        items.push(it);
        paint(it);
      });
      input.value = '';
      refresh();
    }

    function paint(it) {
      var label = {
        ready: mb(it.file.size), sending: ui('statusSending'),
        done: ui('statusDone'), error: ui('statusFailed'), skipped: ui(it.reason)
      }[it.state];
      it.el.setAttribute('data-state', it.state);
      it.el.innerHTML =
        '<span class="up-item__thumb">' + (it.thumb ? '<img src="' + it.thumb + '" alt="">' : (/^video/.test(it.file.type) ? '▶' : '·')) + '</span>' +
        '<span class="up-item__body"><span class="up-item__name">' + esc(it.file.name) + '</span>' +
        '<span class="up-item__meta">' + esc(label) + '</span>' +
        '<span class="up-item__bar"><i style="transform:scaleX(' + (it.state === 'done' ? 1 : 0) + ')"></i></span></span>' +
        (it.state === 'ready' || it.state === 'skipped' || it.state === 'error'
          ? '<button type="button" class="up-item__x" aria-label="' + esc(ui('remove') + ': ' + it.file.name) + '">×</button>' : '');
    }

    function count(state) { return items.filter(function (i) { return i.state === state; }).length; }

    function refresh() {
      var ready = count('ready'), failed = count('error'), done = count('done');
      sendBtn.disabled = !(live && !busy && !closed && (ready + failed) > 0);
      el('sendLabel').textContent = failed && !ready ? ui('retry') : ui('send');
      statusEl.textContent =
        busy ? ui('sending') :
        closed ? ui('uploadClosed') :
        failed ? ui('someFailed', { n: failed }) :
        done && !ready ? ui('sentAll', { n: done }) :
        ready ? ui('filesReady', { n: ready }) : '';
      drop.classList.toggle('is-disabled', busy || closed);
      input.disabled = busy || closed;
      nameInput.disabled = busy;
    }

    function sendOne(it) {
      it.state = 'sending'; paint(it);
      return readBase64(it.file).then(function (data) {
        return send({
          guest: nameInput.value.trim() || 'Guest',
          name: it.file.name, type: it.file.type, size: it.file.size, data: data
        });
      }).then(function (res) {
        if (res.ok) it.state = 'done';
        else if (res.error === 'closed') { closed = true; it.state = 'error'; }
        else if (res.error === 'too_big' || res.error === 'type') { it.state = 'skipped'; it.reason = res.error === 'type' ? 'notAllowed' : 'tooBig'; }
        else it.state = 'error';
        paint(it);
      }, function () { it.state = 'error'; paint(it); });
    }

    function run() {
      var queue = items.filter(function (i) { return i.state === 'ready' || i.state === 'error'; });
      if (!queue.length || !live) return;
      var before = count('done');
      busy = true; refresh();
      store('wedding-guest-name', nameInput.value.trim());
      var next = function () {
        if (closed) return Promise.resolve();
        var it = queue.shift();
        return it ? sendOne(it).then(next) : Promise.resolve();
      };
      var workers = [];
      for (var i = 0; i < PARALLEL; i++) workers.push(next());
      Promise.all(workers).then(function () {
        busy = false;
        el('closed').hidden = !closed;
        refresh();
        var sent = count('done') - before;
        if (sent && opts.onUploaded) opts.onUploaded(sent);
      });
    }

    list.addEventListener('click', function (e) {
      var x = e.target.closest('.up-item__x');
      if (!x || busy) return;
      var li = x.closest('.up-item');
      items = items.filter(function (it) {
        if (it.el !== li) return true;
        if (it.thumb) URL.revokeObjectURL(it.thumb);
        li.remove(); return false;
      });
      refresh();
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    input.addEventListener('change', function () { add(input.files); });
    window.addEventListener('beforeunload', function (e) { if (busy) { e.preventDefault(); e.returnValue = ''; } });

    // Drag & drop on desktop
    ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('is-over'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('is-over'); }); });
    drop.addEventListener('drop', function (e) { if (!busy && !closed && e.dataTransfer) add(e.dataTransfer.files); });

    function setLanguage(next) {
      lang = next === 'ta' ? 'ta' : 'en';
      $$('[data-t]', root).forEach(function (n) { n.textContent = ui(n.getAttribute('data-t')); });
      el('hint').textContent = ui('sizeHint', { mb: M.maxFileMB || 35 });
      items.forEach(paint);
      refresh();
    }

    nameInput.value = recall('wedding-guest-name') || '';
    setLanguage(lang);
    return { setLanguage: setLanguage };
  }

  window.GuestServices = { live: live, get: get, send: send };
  window.GuestUploader = { mount: mount, recent: recent, live: live };

  /* ---------- upload.html page set-up --------------------------------- */
  var host = $('[data-uploader]');
  if (!document.body.classList.contains('up-page') || !host) return;

  var th = C.theme || {};
  Object.keys(th).forEach(function (k) { document.documentElement.style.setProperty('--' + k, th[k]); });
  if (C.footer) { var s = $('#studio-link'); s.href = C.footer.studioUrl; s.textContent = C.footer.studioName; }

  var uploader = mount(host, {});
  function applyLanguage(next) {
    var lang = next === 'ta' ? 'ta' : 'en';
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (n) { n.textContent = text(lang, n.getAttribute('data-i18n')); });
    $$('[data-couple]').forEach(function (n) { n.textContent = tr(lang, C.couple[n.getAttribute('data-couple')].first); });
    $$('[data-config]').forEach(function (n) {
      n.textContent = tr(lang, n.getAttribute('data-config').split('.').reduce(function (o, k) { return o && o[k]; }, C));
    });
    $$('.lang__btn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    document.title = text(lang, 'uploadTitle') + ' · ' + tr(lang, C.couple.partner1.first) + ' & ' + tr(lang, C.couple.partner2.first);
    uploader.setLanguage(lang);
    store('wedding-lang', lang);
  }
  $$('.lang__btn').forEach(function (b) { b.addEventListener('click', function () { applyLanguage(b.getAttribute('data-lang')); }); });
  applyLanguage(new URLSearchParams(location.search).get('lang') || recall('wedding-lang') || C.defaultLanguage || 'en');
})();
