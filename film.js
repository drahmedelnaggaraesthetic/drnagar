/* Travel page film: quiet card above the journey header, vertical player on tap. Loaded after the app, never at launch. */
(function () {
  'use strict';
  var ITEMS = {
    gyno: { hash: /^\/(en\/)?library\/topics\/b-gynecomastia\/?$/, src: '/assets/gyno-case.mp4', poster: '/assets/gyno-case-poster.webp', band: '/assets/gyno-case-band.webp', dur: '0:17' },
    travel: { hash: /^#\/travel\/?$/, src: '/assets/saudi-journey.mp4', poster: '/assets/saudi-journey-poster.webp', band: '/assets/saudi-journey-band.webp', dur: '1:08' }
  };
  var CUR = ITEMS.travel, SRC, POSTER, BAND;
  function pick() { CUR = ITEMS.travel; SRC = CUR.src; POSTER = CUR.poster; BAND = CUR.band; }
  pick();
  var TXT_T = {
    ar: { title: 'من السعودية إلى القاهرة', open: 'شغّل فيلم رحلة مريض من السعودية', close: 'إغلاق', play: 'تشغيل', pause: 'إيقاف', dialog: 'فيلم رحلة المريض', sound: 'بصوت الدكتور', watch: 'من السعودية إلى القاهرة', from: 'السعودية', from_k: 'المغادرة', to: 'القاهرة', to_k: 'الوصول' },
    en: { title: 'From Saudi Arabia to Cairo', open: 'Play the film of a patient journey from Saudi Arabia', close: 'Close', play: 'Play', pause: 'Pause', dialog: 'Patient journey film', sound: "With the doctor's voice", watch: 'From Saudi Arabia to Cairo', from: 'Saudi Arabia', from_k: 'DEPARTURE', to: 'Cairo', to_k: 'ARRIVAL' }
  };
  var TXT_G = {
    ar: { open: 'شغّل فيديو حالة تثدي قبل وبعد', play: 'تشغيل', sound: 'من حالات العيادة', watch: 'التثدي عند الرجال · قبل وبعد' },
    en: { open: 'Play a gynecomastia before-and-after video', play: 'Play', sound: 'FROM THE CLINIC', watch: 'Before and after' }
  };
  var TXT = TXT_T;
  var css = '#drexf{margin:-18px -17px 20px;display:block;position:relative}' +
    '#drexf .drexf-card{position:relative;display:block;width:100%;height:520px;border:0;padding:0;margin:0;cursor:pointer;background:#0a0805;overflow:hidden;font:inherit;color:#f3e8c8;text-align:start;-webkit-tap-highlight-color:transparent}' +
    '#drexf .drexf-card>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;filter:saturate(.82) brightness(.7);transform:scale(1.04);transition:transform 1.6s cubic-bezier(.22,.6,.2,1)}' +
    '#drexf.in .drexf-card>img{transform:scale(1)}' +
    '#drexf .drexf-card video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;opacity:0;transition:opacity .6s ease;background:#0a0805;filter:saturate(.9) brightness(.92)}' +
    '#drexf.live .drexf-card video{opacity:1}' +
    '#drexf .drexf-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,8,5,.5) 0%,rgba(10,8,5,0) 34%,rgba(244,237,221,0) 52%,#f4edDd 99%);pointer-events:none}' +
    '#drexf .drexf-k{position:absolute;z-index:2;top:16px;inset-inline:18px;display:flex;justify-content:space-between;font-size:11px;letter-spacing:.14em;color:#efe2bd;transition:opacity .5s}' +
    '#drexf.live .drexf-k{opacity:0}' +
    '#drexf .drexf-w{position:relative;z-index:3;display:flex;align-items:center;gap:12px;margin:-22px 17px 0;padding-top:12px;border-top:1px solid #b8924c;color:#2a2118;font-size:15px;cursor:pointer}' +
    '#drexf .drexf-w:before{content:"";position:absolute;top:-1px;inset-inline-start:0;height:2px;width:var(--p,0%);background:#8a6a2c;transition:width .25s linear}' +
    '#drexf .drexf-w i{display:block;width:0;height:0;border-style:solid;border-width:6px 0 6px 10px;border-color:transparent transparent transparent #8a7150;flex:none}' +
    '#drexf.live.playing .drexf-w i{width:10px;height:12px;border:0;background:linear-gradient(90deg,#8a7150 0 3px,transparent 3px 7px,#8a7150 7px 10px)}' +
    '#drexf .drexf-w b{font-weight:400;flex:1}' +
    '#drexf .drexf-w small{font-size:11px;letter-spacing:.1em;color:#8a7150;direction:ltr}' +
    '#drexf .drexf-m{display:none;flex:none;width:30px;height:30px;margin:-6px 0;border:0;background:none;padding:0;cursor:pointer;align-items:center;justify-content:center;color:#8a7150}' +
    '#drexf.live .drexf-m{display:flex}' +
    '#drexf .drexf-m svg{width:18px;height:18px}' +
    '#drexf .drexf-m .x{display:none}#drexf.muted .drexf-m .x{display:block}' +
    '#drexf[data-item=gyno]{margin:-22px -20px 8px}#drexf[data-item=gyno] .drexf-card{height:300px}#drexf[data-item=gyno] .drexf-card>img{object-position:50% 50%;filter:saturate(.85) brightness(.8)}#drexf[data-item=gyno] .drexf-card video{object-position:50% 45%}#drexf[data-item=gyno] .drexf-card:after{background:linear-gradient(180deg,rgba(12,10,5,.6) 0%,rgba(12,10,5,0) 30%,rgba(28,22,16,0) 50%,#1c1610 99%)}#drexf[data-item=gyno] .drexf-w{color:#efe6cf;border-top-color:#b8924c;margin-top:-30px}#drexf[data-item=gyno] .drexf-w i{border-left-color:#d8b76a}#drexf[data-item=gyno].live.playing .drexf-w i{background:linear-gradient(90deg,#d8b76a 0 3px,transparent 3px 7px,#d8b76a 7px 10px)}#drexf[data-item=gyno] .drexf-w small,#drexf[data-item=gyno] .drexf-m{color:#b99a58}#drexf[data-item=gyno] .drexf-w:before{background:#d8b76a}@media(prefers-reduced-motion:reduce){#drexf .drexf-card>img{transition:none;transform:none}#drexf .drexf-card video{transition:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var L = function () { return document.documentElement.lang === 'en' ? 'en' : 'ar'; };
  var fmt = function (s) { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); };
  var MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6"/><path class="x" d="M17 7l4 10M21 7l-4 10"/></svg>';
  function build(it) {
    it = it || ITEMS.travel; var t = (it === ITEMS.gyno ? TXT_G : TXT_T)[L()], d = document.createElement('div'); d.id = 'drexf'; d.setAttribute('data-item', it === ITEMS.gyno ? 'gyno' : 'travel'); d.setAttribute('data-lang', L());
    d.innerHTML = '<div class="drexf-card" role="button" tabindex="0" aria-label="' + t.open + '"><img alt="" decoding="async" loading="lazy" src="' + it.band + '"><span class="drexf-k"><span>' + t.sound + '</span><span>' + it.dur + '</span></span></div>' +
      '<div class="drexf-w" role="button" tabindex="0" aria-label="' + t.play + '"><i></i><b>' + t.watch + '</b><small>' + it.dur + '</small><button type="button" class="drexf-m" aria-label="' + t.sound + '">' + MIC + '</button></div>';
    var card = d.querySelector('.drexf-card'), w = d.querySelector('.drexf-w'), m = d.querySelector('.drexf-m'), sm = w.querySelector('small'), v = null, io2 = null, userPaused = false;
    function setP(p) { d.style.setProperty('--p', (p * 100) + '%'); }
    function reset() { d.classList.remove('live', 'playing', 'muted'); setP(0); sm.textContent = it.dur; if (v) { try { v.pause(); } catch (e) {} v.remove(); v = null; } if (io2) { io2.disconnect(); io2 = null; } }
    function toggle() {
      if (!v) {
        Array.prototype.forEach.call(document.querySelectorAll('audio'), function (a) { try { a.pause(); } catch (e) {} });
        v = document.createElement('video'); v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', ''); v.preload = 'auto'; v.poster = it.poster; v.src = it.src;
        card.insertBefore(v, card.querySelector('.drexf-k'));
        v.addEventListener('timeupdate', function () { var p = v.duration ? v.currentTime / v.duration : 0; setP(p); sm.textContent = fmt(v.currentTime) + ' / ' + fmt(v.duration); });
        v.addEventListener('play', function () { d.classList.add('playing'); });
        v.addEventListener('pause', function () { d.classList.remove('playing'); });
        v.addEventListener('ended', function () { reset(); });
        v.addEventListener('playing', function () { d.classList.add('live'); });
        v.addEventListener('click', function () { toggle(); });
        if ('IntersectionObserver' in window) { io2 = new IntersectionObserver(function (e) { if (!e[0].isIntersecting && v && !v.paused) v.pause(); }, { threshold: .25 }); io2.observe(d); }
        var vv = v, again = function () { if (v !== vv) return; var q = vv.play(); if (q && q.catch) q.catch(function () { if (v === vv) reset(); }); }, pr = vv.play(); if (pr && pr.catch) pr.catch(function (er) { if (er && er.name === 'AbortError' && v === vv) { if (vv.readyState >= 2) again(); else vv.addEventListener('loadeddata', again, { once: true }); } else if (v === vv) reset(); });
        return;
      }
      if (v.paused) { var q = v.play(); if (q && q.catch) q.catch(function () {}); } else v.pause();
    }
    function onTap(e) { if (e.target.closest && e.target.closest('.drexf-m')) return; toggle(); }
    card.addEventListener('click', onTap); w.addEventListener('click', onTap);
    [card, w].forEach(function (el) { el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }); });
    m.addEventListener('click', function (e) { e.stopPropagation(); if (!v) return; v.muted = !v.muted; d.classList.toggle('muted', v.muted); });
    d._reset = reset;
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { d.classList.add('in'); io.disconnect(); } }, { threshold: .6 }); io.observe(d); } else d.classList.add('in');
    return d;
  }
  var queued = false;
  function sync() {
    queued = false;
    var root = document.getElementById('root') || document.body;
    var it = ITEMS.travel.hash.test(location.hash) ? ITEMS.travel : (ITEMS.gyno.hash.test(location.pathname) ? ITEMS.gyno : null);
    var cur = document.getElementById('drexf');
    if (!it) { if (cur) { cur._reset && cur._reset(); cur.remove(); } return; }
    var panel = root.querySelector(it === ITEMS.gyno ? 'article.dre-panel' : '.dre-panel');
    if (!panel) { if (cur) cur.remove(); return; }
    var want = it === ITEMS.gyno ? 'gyno' : 'travel';
    if (cur && (cur.getAttribute('data-lang') !== L() || cur.getAttribute('data-item') !== want)) { cur._reset && cur._reset(); cur.remove(); cur = null; }
    if (it === ITEMS.gyno) { if (cur && cur.parentNode === panel) return; if (cur) { cur._reset && cur._reset(); cur.remove(); } panel.insertBefore(build(it), panel.firstChild); return; }
    if (cur && cur.nextElementSibling === panel) return;
    if (cur) { cur._reset && cur._reset(); cur.remove(); }
    panel.parentNode.insertBefore(build(it), panel);
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(sync); } }
  var root = document.getElementById('root');
  if (root) new MutationObserver(queue).observe(root, { childList: true, subtree: true });
  new MutationObserver(queue).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.addEventListener('hashchange', queue);
  queue();
  /* Rhinoplasty opening: quiet ambient loop (muted, no controls) replacing the portrait. */
  var RH = { hash: /^#\/rhino\/?$/, src: '/assets/rhino-hero.mp4', poster: '/assets/rhino-hero-poster.webp' };
  var rcss = '#drexr{position:relative;display:block;height:400px;overflow:hidden;background:#0a0805;border-radius:inherit;margin-bottom:6px}' +
    '#drexr img,#drexr video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 58%}' +
    '#drexr img{filter:saturate(.85) brightness(1)}' +
    '#drexr video{opacity:0;transition:opacity 1.4s ease;filter:saturate(.9) brightness(1)}' +
    '#drexr.live video{opacity:1}' +
    '#drexr:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,8,5,.35) 0%,rgba(10,8,5,0) 30%,rgba(236,225,201,0) 55%,#ece1c9 99%);pointer-events:none}' +
    '.dre-hero .dre-portrait.drexr-gone{display:none}' +
    '@media(prefers-reduced-motion:reduce){#drexr video{display:none}}';
  var rst = document.createElement('style'); rst.textContent = rcss; document.head.appendChild(rst);
  function buildR(panel) {
    var cs = getComputedStyle(panel), d = document.createElement('div'); d.id = 'drexr'; d.setAttribute('aria-hidden', 'true');
    d.style.marginInline = '-' + cs.paddingLeft + ' -' + cs.paddingRight; d.style.marginInline = ''; d.style.marginLeft = '-' + cs.paddingLeft; d.style.marginRight = '-' + cs.paddingRight; d.style.marginTop = '-' + cs.paddingTop;
    d.innerHTML = '<img alt="" decoding="async" src="' + RH.poster + '">';
    var v = document.createElement('video'); v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); v.preload = 'auto'; v.disableRemotePlayback = true; v.setAttribute('disableremoteplayback', ''); v.src = RH.src;
    v.addEventListener('playing', function () { d.classList.add('live'); });
    d.appendChild(v);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { if (!v.isConnected) return; if (e[0].isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }, { threshold: .1 }).observe(d);
    return d;
  }
  function syncR() {
    var root = document.getElementById('root'); if (!root) return;
    var cur = document.getElementById('drexr');
    if (!RH.hash.test(location.hash)) { if (cur) cur.remove(); return; }
    var panel = root.querySelector('.dre-panel'); if (!panel) return;
    var por = panel.querySelector('.dre-portrait'); if (por) por.classList.add('drexr-gone');
    if (cur && cur.parentNode === panel) return;
    if (cur) cur.remove();
    panel.insertBefore(buildR(panel), panel.firstChild);
  }
  var rq = false; function queueR() { if (!rq) { rq = true; requestAnimationFrame(function () { rq = false; syncR(); }); } }
  (function () { var r = document.getElementById('root'); if (r) new MutationObserver(queueR).observe(r, { childList: true, subtree: true }); window.addEventListener('hashchange', queueR); queueR(); })();
})();
