/* drelnajar.online instant search. Self-contained: no dependencies, injects its own CSS.
   Loads /search-index.json lazily on first open. Mounts (a) a search bar in the home hero and
   (b) a magnifier button in the masthead; both open the same full-screen sheet.
   Config (optional, set before this script runs):
     window.DRE_SEARCH = { index:'/search-index.json', pins:{ 'b-gynecomastia': '/#/body' } }
   pins override the destination URL of an entry id. */
(function () {
  if (window.__dreSearch) return; window.__dreSearch = true;
  var CFG = window.DRE_SEARCH || {};
  var INDEX_URL = CFG.index || '/search-index.json';
  var PINS = CFG.pins || {};
  var data = null, loading = null, sheet, input, list, open = false, sel = 0, cur = [], previousFocus;

  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  var T = {
    ar: { ph: 'ابحث: التثدي، الأنف، الفيزر…', bar: 'ابحث عن إجراء أو سؤال', none: 'لا توجد نتيجة مطابقة. جرّب كلمة أبسط أو اسم الإجراء.', close: 'إغلاق', pop: 'الأكثر بحثاً', go: 'افتح',
      kinds: { sec: 'قسم', b: 'إجراء', a: 'إجراء', f: 'إجراء', t: 'رحلة السفر', rc: 'التعافي', m: 'معلومة شائعة', q: 'سؤال', n: 'الأنف', rf: 'الأنف', other: 'مقال' },
      chips: [['التثدي', 'تثدي'], ['الأنف', 'انف'], ['الفيزر', 'فيزر'], ['شد البطن', 'شد البطن'], ['الجفون', 'جفون'], ['التعافي', 'تعافي']] },
    en: { ph: 'Search: gynecomastia, rhinoplasty…', bar: 'Search a procedure or question', none: 'No match. Try a simpler word or the procedure name.', close: 'Close', pop: 'Popular', go: 'Open',
      kinds: { sec: 'Section', b: 'Procedure', a: 'Procedure', f: 'Procedure', t: 'Travel', rc: 'Recovery', m: 'Common belief', q: 'Question', n: 'Nose', rf: 'Nose', other: 'Article' },
      chips: [['Gynecomastia', 'gynecomastia'], ['Rhinoplasty', 'rhinoplasty'], ['VASER', 'vaser'], ['Tummy tuck', 'abdominoplasty'], ['Eyelids', 'eyelid'], ['Recovery', 'recovery']] }
  };
  var WEIGHT = { sec: 3, b: 5, f: 5, a: 4, t: 3, rc: 2, n: 1.5, rf: 1, m: 1, q: 1, other: 1 };

  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
      .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/[ؤ]/g, 'و').replace(/[ئ]/g, 'ي')
      .replace(/[^a-z0-9\u0600-\u06FF\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function stripAl(w) { return w.length > 3 && w.indexOf('ال') === 0 ? w.slice(2) : w; }
  function kindOf(e) { if (e.sec) return 'sec'; var m = /^([a-z]+)-/.exec(e.id); var k = m ? m[1] : 'other'; return T.ar.kinds[k] ? k : 'other'; }

  function prep(raw) {
    raw.forEach(function (e) {
      e.kind = kindOf(e);
      ['ar', 'en'].forEach(function (L) {
        var x = e[L]; if (!x) return;
        x._t = norm(x.t); x._s = norm(x.s); x._d = norm(x.d); x._k = norm(x.k);
        x._a = norm((e.al || '') + ' ' + (L === 'en' ? ((e.ar && e.ar.t) || '') : ((e.en && e.en.t) || '')));
      });
    });
    return raw;
  }
  function score(e, L, toks) {
    var x = e[L] || e[L === 'ar' ? 'en' : 'ar']; if (!x) return 0;
    var total = 0;
    for (var i = 0; i < toks.length; i++) {
      var q = toks[i], q2 = stripAl(q), s = 0;
      if (hasWord(x._t, q) || hasWord(x._t, q2)) s = 12;
      else if (x._t.indexOf(q2) > -1) s = 8;
      else if (x._a.indexOf(q) > -1 || x._a.indexOf(q2) > -1) s = 9;
      else if (x._s.indexOf(q) > -1) s = 6;
      else if (x._d.indexOf(q2) > -1) s = 3;
      else if (x._k.indexOf(q2) > -1) s = 1;
      if (!s) return 0; // every word must match
      total += s;
    }
    if (x._t.indexOf(toks.join(' ')) === 0) total += 4;
    return total * (WEIGHT[e.kind] || 1);
  }
  function hasWord(h, w) { return (' ' + h + ' ').indexOf(' ' + w) > -1 || (' ' + h).indexOf(' ال' + w) > -1; }

  function search(qs) {
    var L = lang(), q = norm(qs); if (!q) return [];
    var toks = q.split(' ').filter(Boolean), out = [];
    data.forEach(function (e) { var s = score(e, L, toks); if (s > 0) out.push([s, e]); });
    out.sort(function (a, b) { return b[0] - a[0]; });
    return out.slice(0, 8).map(function (p) { return p[1]; });
  }
  function urlOf(e) {
    var u = PINS[e.id] || e.u, L = lang();
    if (/^\/#\//.test(u)) return L === 'en' ? '/en' + u : u;
    return L === 'en' && u.indexOf('/en/') !== 0 ? '/en' + u : u;
  }

  /* ---------- UI ---------- */
  var css = '' +
    '.dsr-bar{display:flex;align-items:center;gap:12px;width:100%;max-width:560px;min-height:52px;padding:0 18px;margin:18px 0 0;border:1px solid rgba(201,178,124,.38);border-radius:999px;background:rgba(18,14,9,.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:rgba(236,226,202,.78);font:inherit;font-size:15px;text-align:start;cursor:text}' +
    '.dsr-bar:hover,.dsr-bar:focus-visible{border-color:rgba(214,190,134,.75);outline:0}' +
    '.dsr-bar svg,.dsr-ico svg{width:20px;height:20px;flex:none;stroke:#d6be86;fill:none;stroke-width:1.7;stroke-linecap:round}' +
    '.dsr-ico{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;border:1px solid rgba(201,178,124,.45);background:transparent;cursor:pointer;padding:0;flex:none}' +
    '.dsr-sheet{position:fixed;inset:0;z-index:2147483000;display:none;background:rgba(8,6,4,.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);overflow-y:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}.dsr-sheet::-webkit-scrollbar{display:none}' +
    '.dsr-sheet.on{display:block}' +
    '.dsr-wrap{max-width:640px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 16px) 16px 40px}' +
    '.dsr-top{display:flex;align-items:center;gap:10px}' +
    '.dsr-field{flex:1;display:flex;align-items:center;gap:10px;height:54px;padding:0 16px;border:1px solid rgba(214,190,134,.6);border-radius:999px;background:rgba(255,255,255,.04)}' +
    '.dsr-field svg{width:20px;height:20px;stroke:#d6be86;fill:none;stroke-width:1.7;stroke-linecap:round;flex:none}' +
    '.dsr-in{flex:1;min-width:0;height:100%;border:0;outline:0;background:transparent;color:#f3ead4;font:inherit;font-size:16px}' +
    '.dsr-in::-webkit-search-cancel-button,.dsr-in::-webkit-search-decoration{-webkit-appearance:none;display:none}.dsr-in::placeholder{color:rgba(236,226,202,.45)}' +
    '.dsr-x{width:44px;height:44px;border-radius:50%;border:1px solid rgba(201,178,124,.35);background:transparent;color:#d6be86;font-size:20px;line-height:1;cursor:pointer;flex:none}' +
    '.dsr-label{margin:22px 4px 10px;font-size:12px;letter-spacing:.06em;color:rgba(214,190,134,.7)}' +
    '.dsr-chips{display:flex;flex-wrap:wrap;gap:8px}' +
    '.dsr-chip{padding:10px 16px;border-radius:999px;border:1px solid rgba(201,178,124,.35);background:transparent;color:#eadfc3;font:inherit;font-size:14px;cursor:pointer}' +
    '.dsr-list{list-style:none;margin:18px 0 0;padding:0}' +
    '.dsr-item{display:block;padding:14px 16px;margin:0 0 8px;border:1px solid rgba(201,178,124,.18);border-radius:16px;background:rgba(255,255,255,.035);text-decoration:none;color:#f3ead4}' +
    '.dsr-item[aria-selected=true],.dsr-item:hover{border-color:rgba(214,190,134,.7);background:rgba(214,190,134,.09)}' +
    '.dsr-kind{display:inline-block;font-size:11px;color:#d6be86;margin-bottom:4px;letter-spacing:.04em}' +
    '.dsr-t{display:block;font-size:16px;line-height:1.5}' +
    '.dsr-t mark{background:none;color:#d6be86;font-weight:700}' +
    '.dsr-d{display:block;margin-top:3px;font-size:13px;line-height:1.55;color:rgba(236,226,202,.6);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}' +
    '.dsr-none{margin:28px 4px;color:rgba(236,226,202,.7);line-height:1.7}' +
    'html.dsr-lock,html.dsr-lock body{overflow:hidden}';
  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hl(t, q) {
    var toks = norm(q).split(' ').filter(Boolean).map(stripAl).filter(function (w) { return w.length > 1; });
    var out = esc(t); if (!toks.length) return out;
    var low = norm(t);
    if (low.length !== t.length) return out; // normalisation changed length; skip highlight
    var ranges = [];
    toks.forEach(function (w) { var i = low.indexOf(w); if (i > -1) ranges.push([i, i + w.length]); });
    if (!ranges.length) return out;
    ranges.sort(function (a, b) { return a[0] - b[0]; });
    var res = '', p = 0;
    ranges.forEach(function (r) { if (r[0] < p) return; res += esc(t.slice(p, r[0])) + '<mark>' + esc(t.slice(r[0], r[1])) + '</mark>'; p = r[1]; });
    return res + esc(t.slice(p));
  }

  function build() {
    if (sheet) return;
    var st = document.createElement('style'); st.id = 'dsr-css'; st.textContent = css; document.head.appendChild(st);
    sheet = document.createElement('div'); sheet.className = 'dsr-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true');
    sheet.innerHTML = '<div class="dsr-wrap"><div class="dsr-top"><label class="dsr-field">' + ICON + '<input class="dsr-in" type="search" enterkeyhint="search" autocomplete="off" autocorrect="off" spellcheck="false"></label><button class="dsr-x" type="button">×</button></div><div class="dsr-body"></div></div>';
    document.body.appendChild(sheet);
    input = sheet.querySelector('.dsr-in'); list = sheet.querySelector('.dsr-body');
    sheet.querySelector('.dsr-x').addEventListener('click', close);
    sheet.addEventListener('click', function (e) { if (e.target === sheet) close(); });
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!cur.length) return; sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + cur.length) % cur.length; mark(); }
      if (e.key === 'Enter') { e.preventDefault(); if (cur[sel]) go(cur[sel]); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !open && !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); openSheet(); }
    });
  }
  function mark() {
    var els = list.querySelectorAll('.dsr-item');
    for (var i = 0; i < els.length; i++) els[i].setAttribute('aria-selected', i === sel ? 'true' : 'false');
    if (els[sel] && els[sel].scrollIntoView) els[sel].scrollIntoView({ block: 'nearest' });
  }
  function go(e) { close(); var u = urlOf(e); if (/^\/#\//.test(u) && location.pathname === '/') { location.hash = u.slice(1); } else { location.href = u; } }

  function render() {
    var L = lang(), tx = T[L], q = input.value;
    sheet.setAttribute('dir', L === 'ar' ? 'rtl' : 'ltr'); input.placeholder = tx.ph; sheet.querySelector('.dsr-x').setAttribute('aria-label', tx.close);
    if (!data) { list.innerHTML = ''; return; }
    if (!norm(q)) {
      cur = []; var h = '<div class="dsr-label">' + tx.pop + '</div><div class="dsr-chips">';
      tx.chips.forEach(function (c) { h += '<button type="button" class="dsr-chip" data-q="' + esc(c[1]) + '">' + esc(c[0]) + '</button>'; });
      list.innerHTML = h + '</div>';
      Array.prototype.forEach.call(list.querySelectorAll('.dsr-chip'), function (b) { b.addEventListener('click', function () { input.value = b.getAttribute('data-q'); render(); input.focus(); }); });
      return;
    }
    cur = search(q); sel = 0;
    if (!cur.length) { list.innerHTML = '<p class="dsr-none">' + esc(tx.none) + '</p>'; return; }
    var html = '<ul class="dsr-list" role="listbox">';
    cur.forEach(function (e, i) {
      var x = e[L] || e.ar || e.en;
      html += '<li><a class="dsr-item" role="option" href="' + esc(urlOf(e)) + '" data-i="' + i + '" aria-selected="' + (i === 0) + '"><span class="dsr-kind">' + esc(tx.kinds[e.kind] || tx.kinds.other) + '</span><span class="dsr-t">' + hl(x.t, q) + '</span>' + (x.d && x.d !== x.t && x.d.length > 20 ? '<span class="dsr-d">' + esc(x.d) + '</span>' : '') + '</a></li>';
    });
    list.innerHTML = html + '</ul>';
    Array.prototype.forEach.call(list.querySelectorAll('.dsr-item'), function (a) {
      a.addEventListener('click', function (ev) { ev.preventDefault(); go(cur[+a.getAttribute('data-i')]); });
    });
  }
  function load() {
    if (data) return Promise.resolve(); if (loading) return loading;
    // XHR on purpose: the site wraps window.fetch for its asset leases.
    loading = new Promise(function (res, rej) {
      var x = new XMLHttpRequest(); x.open('GET', INDEX_URL); x.onload = function () { try { res(JSON.parse(x.responseText)); } catch (e) { rej(e); } }; x.onerror = rej; x.send();
    }).then(function (j) { data = prep(j); if (open) render(); }).catch(function () { loading = null; });
    return loading;
  }
  function openSheet(prefill) {
    previousFocus=document.activeElement;build(); open = true; sheet.classList.add('on'); document.documentElement.classList.add('dsr-lock');
    input.value = prefill || ''; render(); input.focus(); load();
  }
  function close() { if (!sheet) return; open = false; sheet.classList.remove('on'); document.documentElement.classList.remove('dsr-lock');if(previousFocus&&previousFocus.isConnected)previousFocus.focus(); }

  /* ---------- mounting (React re-renders, so re-check) ---------- */
  function mountBar() {
    var onHome = /^#?\/?$/.test(location.hash.replace('#', '')) || location.hash === '#/' || location.hash === '';
    var host = document.querySelector('.dre5-hero-ctas');
    var ex = document.getElementById('dsr-bar');
    if (!onHome || !host) { if (ex && !onHome) ex.remove(); }
    else if (!ex) {
      var b = document.createElement('button'); b.type = 'button'; b.id = 'dsr-bar'; b.className = 'dsr-bar';
      b.innerHTML = ICON + '<span></span>'; b.firstElementChild.nextSibling.textContent = T[lang()].bar;
      b.addEventListener('click', function () { openSheet(); });
      var wrap = host.parentNode; wrap.parentNode.insertBefore(b, wrap.nextSibling);
    } else { ex.lastChild.textContent = T[lang()].bar; }
    var line = document.querySelector('.dre-brandline');
    if (line && !document.getElementById('dsr-ico')) {
      var i = document.createElement('button'); i.type = 'button'; i.id = 'dsr-ico'; i.className = 'dsr-ico'; i.innerHTML = ICON; i.setAttribute('aria-label', T[lang()].bar);
      i.addEventListener('click', function () { openSheet(); });
      var chips = line.querySelector('.dre-chips'); line.insertBefore(i, chips || line.lastChild);
    }
  }
  function init() {
    var st = document.createElement('style'); st.textContent = css; st.id = 'dsr-css'; document.head.appendChild(st);
    var t; new MutationObserver(function () { clearTimeout(t); t = setTimeout(mountBar, 120); }).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('hashchange', function () { mountBar(); close(); });new MutationObserver(function(){mountBar();if(open)render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});document.addEventListener('keydown',function(e){if(!open||e.key!=='Tab')return;var els=Array.prototype.slice.call(sheet.querySelectorAll('button,input,a'));if(!els.length)return;var f=els[0],l=els[els.length-1];if(e.shiftKey&&document.activeElement===f){e.preventDefault();l.focus()}else if(!e.shiftKey&&document.activeElement===l){e.preventDefault();f.focus()}});
    mountBar();
    window.DreSearch = { open: openSheet, close: close };
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
