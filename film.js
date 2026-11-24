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
    ar: { title: 'من السعودية إلى القاهرة', open: 'شغّل فيلم رحلة مريض من السعودية', close: 'إغلاق', play: 'تشغيل', pause: 'إيقاف', dialog: 'فيلم رحلة المريض', sound: '', watch: 'من السعودية إلى القاهرة', from: 'السعودية', from_k: 'المغادرة', to: 'القاهرة', to_k: 'الوصول' },
    en: { title: 'From Saudi Arabia to Cairo', open: 'Play the film of a patient journey from Saudi Arabia', close: 'Close', play: 'Play', pause: 'Pause', dialog: 'Patient journey film', sound: "", watch: 'From Saudi Arabia to Cairo', from: 'Saudi Arabia', from_k: 'DEPARTURE', to: 'Cairo', to_k: 'ARRIVAL' }
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
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { if (!v.isConnected) return; if (e[0].isIntersecting) { if(v.dataset.src&&!v.getAttribute('src')){v.src=v.dataset.src;}var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }, { threshold: .1 }).observe(d);
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
  /* Assessment: soft muted ambient video behind the panel, veiled in cream so the title stays legible. */
  var AS = { hash: /^#\/assessment\/?$/, src: '/assets/assess-light.mp4', poster: '/assets/assess-loop-poster.webp' };
  var acss = '#drexa{position:absolute;inset:0;overflow:hidden;border-radius:inherit;z-index:0;pointer-events:none;background:#ece1c9}' +
    '#drexa img,#drexa video{position:absolute;left:0;top:-50%;width:100%;height:150%;object-fit:cover;object-position:50% 50%;filter:saturate(.9) contrast(1)}' +
    '#drexa video{opacity:0;transition:opacity 1.6s ease}#drexa.live video{opacity:1}' +
    '#drexa:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(236,225,201,.9) 0%,rgba(236,225,201,.12) 14%,rgba(236,225,201,.1) 36%,rgba(236,225,201,.8) 52%,rgba(236,225,201,.9) 100%)}' +
    '.drexa-host{position:relative;overflow:hidden}.drexa-host>*:not(#drexa){position:relative;z-index:1}' +
    '@media(prefers-reduced-motion:reduce){#drexa video{display:none}}';
  var ast = document.createElement('style'); ast.textContent = acss; document.head.appendChild(ast);
  function buildA() {
    var d = document.createElement('div'); d.id = 'drexa'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<img alt="" decoding="async" src="' + AS.poster + '">';
    var v = document.createElement('video'); v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); v.preload = 'auto'; v.disableRemotePlayback = true; v.dataset.src=AS.src;
    v.addEventListener('playing', function () { d.classList.add('live'); });
    d.appendChild(v);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { if (!v.isConnected) return; if (e[0].isIntersecting) { if(v.dataset.src&&!v.getAttribute('src')){v.src=v.dataset.src;}var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }, { threshold: .05 }).observe(d); else { v.src=AS.src; }
    return d;
  }
  function syncA() {
    var root = document.getElementById('root'); if (!root) return;
    var cur = document.getElementById('drexa');
    if (!AS.hash.test(location.hash)) { if (cur) cur.remove(); return; }
    var panel = root.querySelector('.dre-panel'); if (!panel) return;
    if (cur && cur.parentNode === panel) return;
    if (cur) cur.remove();
    panel.classList.add('drexa-host'); panel.insertBefore(buildA(), panel.firstChild);
  }
  var aq = false; function queueA() { if (!aq) { aq = true; requestAnimationFrame(function () { aq = false; syncA(); }); } }
  (function () { var r = document.getElementById('root'); if (r) new MutationObserver(queueA).observe(r, { childList: true, subtree: true }); window.addEventListener('hashchange', queueA); queueA(); })();
function bodyEntry(){if(!/^#\/body\/?$/.test(location.hash))return;var host=document.querySelector('.dre-panel');if(!host)return;var en=(document.documentElement.lang||'').indexOf('en')===0;var x=document.getElementById('drex-gyno-body');if(!x){x=document.createElement('a');x.id='drex-gyno-body';x.className='drex-gyno-inside';host.after(x)}var text=en?'Gynecomastia & chest sculpting':'علاج التثدي ونحت الصدر للرجال';if(x.dataset.l===(en?'en':'ar'))return;x.dataset.l=en?'en':'ar';x.href=(en?'/en':'')+'/library/topics/b-gynecomastia/';x.innerHTML='<span><b>'+text+'</b><small>'+(en?'Treatment guide · Before & after film':'دليل الإجراء · فيلم قبل وبعد')+'</small></span><span aria-hidden="true">↗</span>'}
var bgq=false;new MutationObserver(function(){if(bgq)return;bgq=true;requestAnimationFrame(function(){bgq=false;bodyEntry()})}).observe(document.getElementById('root'),{childList:true,subtree:true});window.addEventListener('hashchange',bodyEntry);bodyEntry();

var approvedCSS=document.createElement('style');approvedCSS.textContent=`
.dre-root .dre-route-assessment>.dre-route-banner{display:none!important}
.dre-root .dre-panel.drexa-host{position:relative!important;padding:0!important;border:0!important;box-shadow:none!important;background:transparent!important;overflow:visible!important;min-height:calc((100vw - 2px)*16/9)!important;isolation:isolate}
#drexa{position:absolute!important;inset:0 -17px!important;width:calc(100% + 34px)!important;height:calc((100vw - 2px)*16/9)!important;margin:0!important;border-radius:0!important;z-index:-1!important;pointer-events:none}
#drexa img,#drexa video{inset:0!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:top center!important;filter:none!important}
#drexa:after{background:linear-gradient(180deg,rgba(236,225,201,.96),rgba(236,225,201,.86) 23%,rgba(236,225,201,.4) 40%,transparent 52%,transparent 89%,#ece1c9 100%)!important}
.drexa-host>div:last-child{padding:20px 18px 0!important}.drexa-host .dre-h1{font-size:30px!important;line-height:1.28!important;margin:10px 0!important}.drexa-host .dre-sub{font-size:14px!important;line-height:1.65!important}.drexa-host .dre-hero-badges{display:none!important}
html[lang=en] .drexa-host .dre-h1{font-size:27px!important}html[lang=en] .drexa-host .dre-sub{font-size:13px!important;line-height:1.5!important}
.drex-gyno-inside{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:24px 0;margin:22px 0;border-block:1px solid #c6af7d;text-decoration:none;color:inherit}.drex-gyno-inside b{display:block;font-size:21px;font-weight:500}.drex-gyno-inside small{display:block;margin-top:7px;font-size:13px;opacity:.75}
.dre-root .dre-root-unused{display:none}
@media(min-width:800px){.dre-root .dre-panel.drexa-host{min-height:720px!important}#drexa{width:405px!important;height:720px!important;inset:0 0 auto auto!important}.drexa-host>div:last-child{width:48%;padding:110px 28px!important}#drexa:after{background:linear-gradient(180deg,transparent 82%,#ece1c9)!important}.drexa-host .dre-h1,html[lang=en] .drexa-host .dre-h1{font-size:40px!important}}
`;document.head.appendChild(approvedCSS);
var ps=document.createElement('style');ps.textContent='.dre-root .dre-panel:has(img[src*="M4SQ7PEA"]),.dre-root .dre-panel-dark:has(img[src*="SQ2TYPB3"]){margin-inline:-17px!important;width:calc(100% + 34px)!important;max-width:none!important}.dre-root .dre-panel:has(img[src*="M4SQ7PEA"]) .dre-hero,.dre-root .dre-panel-dark:has(img[src*="SQ2TYPB3"]) .dre-hero{position:relative;display:block!important}.dre-root .dre-panel:has(img[src*="M4SQ7PEA"]) .dre-portrait,.dre-root .dre-panel-dark:has(img[src*="SQ2TYPB3"]) .dre-portrait{width:100%!important;position:relative}.dre-root .dre-panel:has(img[src*="M4SQ7PEA"]) .dre-hero>div:first-child,.dre-root .dre-panel-dark:has(img[src*="SQ2TYPB3"]) .dre-hero>div:first-child{padding:24px!important}.dre-root .dre-panel:has(img[src*="M4SQ7PEA"]) .dre-hero>.dre-portrait,.dre-root .dre-panel-dark:has(img[src*="SQ2TYPB3"]) .dre-hero>.dre-portrait{order:-1}';document.head.appendChild(ps);
var posterFit=document.createElement('style');posterFit.textContent='.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"]) .dre-portrait:after,.dre-root .dre-panel .dre-hero:has(img[src*="M4SQ7PEA"]) .dre-portrait:after{inset:92% 0 0}.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"])>div:not(.dre-portrait),.dre-root .dre-panel .dre-hero:has(img[src*="M4SQ7PEA"])>div:not(.dre-portrait){padding:25px 20px!important;box-sizing:border-box!important}.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"])>div:not(.dre-portrait) h1{color:#eadfc9!important}@media(min-width:800px){.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"]),.dre-root .dre-panel .dre-hero:has(img[src*="M4SQ7PEA"]){display:grid!important;grid-template-columns:1fr 1fr!important;align-items:center}.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"]) .dre-portrait,.dre-root .dre-panel .dre-hero:has(img[src*="M4SQ7PEA"]) .dre-portrait{width:100%!important}.dre-root .dre-panel:has(img[src*="M4SQ7PEA"]),.dre-root .dre-panel-dark:has(img[src*="SQ2TYPB3"]){margin:0!important;width:100%!important}}';document.head.appendChild(posterFit);
var desktopFix=document.createElement('style');desktopFix.textContent='.dre-root .dre-panel:has(#drexa) .dre-chapter-art{display:none!important}.drexa-host>.dre-chapter-art{display:none!important}.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"]),.dre-root .dre-panel .dre-hero:has(img[src*="M4SQ7PEA"]){display:flex!important;flex-direction:column!important}.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"])>div:has(.dre-portrait),.dre-root .dre-panel .dre-hero:has(img[src*="M4SQ7PEA"])>div:has(.dre-portrait){order:-1!important;padding:0!important;width:100%!important}.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"])>div:has(.dre-portrait)>.dre-small,.dre-root .dre-panel .dre-hero:has(img[src*="M4SQ7PEA"])>div:has(.dre-portrait)>.dre-small{padding:10px 20px!important;margin:0!important;background:#14110d;color:#cbbb9b}.dre-root .dre-panel:has(img[src*="SQ2TYPB3"]),.dre-root .dre-panel:has(img[src*="M4SQ7PEA"]){background:#14110d!important;color:#eadfc9!important;border:0!important;box-shadow:none!important;padding:0!important}.dre-panel:has(img[src*="SQ2TYPB3"]) .dre-h1,.dre-panel:has(img[src*="M4SQ7PEA"]) .dre-h1{color:#eadfc9!important}.dre-panel:has(img[src*="SQ2TYPB3"]) .dre-sub,.dre-panel:has(img[src*="M4SQ7PEA"]) .dre-sub{color:#cbbb9b!important}@media(min-width:800px){.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"]),.dre-root .dre-panel .dre-hero:has(img[src*="M4SQ7PEA"]){display:grid!important;grid-template-columns:1fr 1fr!important}.dre-root .dre-panel .dre-hero:has(img[src*="SQ2TYPB3"])>div:has(.dre-portrait),.dre-root .dre-panel .dre-hero:has(img[src*="M4SQ7PEA"])>div:has(.dre-portrait){grid-column:1!important;grid-row:1!important}}';document.head.appendChild(desktopFix);
var decisive=document.createElement('style');decisive.textContent='.dre-root .dre-route-assessment>.dre-route-banner{display:none!important}.dre-root :is(.dre-panel,.dre-panel-dark) .dre-hero:has(img[src*="SQ2TYPB3"]),.dre-root :is(.dre-panel,.dre-panel-dark) .dre-hero:has(img[src*="M4SQ7PEA"]){display:flex!important;flex-direction:column!important;gap:0!important}.dre-root :is(.dre-panel,.dre-panel-dark) .dre-hero>div:has(>.dre-portrait){padding:0!important;order:-1!important;width:100%!important}.dre-root .dre-panel-dark:has(img[src*="SQ2TYPB3"]){background:#14110d!important;padding:0!important}.dre-root .dre-panel-dark:has(img[src*="SQ2TYPB3"]) .dre-h1{color:#eadfc9!important}@media(min-width:800px){.dre-root :is(.dre-panel,.dre-panel-dark) .dre-hero:has(img[src*="SQ2TYPB3"]),.dre-root :is(.dre-panel,.dre-panel-dark) .dre-hero:has(img[src*="M4SQ7PEA"]){display:grid!important;grid-template-columns:1fr 1fr!important}.dre-root :is(.dre-panel,.dre-panel-dark) .dre-hero>div:has(>.dre-portrait){grid-column:1!important;grid-row:1!important}}';document.head.appendChild(decisive);
function posterOrder(){document.querySelectorAll('.dre-portrait').forEach(function(p){if(!p.querySelector('img[src*="SQ2TYPB3"],img[src*="M4SQ7PEA"]'))return;var h=p.closest('.dre-hero');if(!h)return;var w=p.parentElement===h?p:p.parentElement;if(h.firstElementChild!==w)h.prepend(w);h.style.setProperty('display',innerWidth>=800?'grid':'flex','important');h.style.setProperty('grid-template-columns','1fr 1fr','important');w.style.setProperty('padding','0','important');w.style.setProperty('order','-1','important');w.style.setProperty('grid-column','1','important');w.style.setProperty('grid-row','1','important');})}addEventListener('resize',posterOrder);var pq=false;new MutationObserver(function(){if(pq)return;pq=true;requestAnimationFrame(function(){pq=false;posterOrder()})}).observe(document.getElementById('root'),{childList:true,subtree:true});posterOrder();
document.addEventListener('click',function(e){var t=e.target.closest('.dre-portrait');if(t&&t.querySelector('img[src*="SQ2TYPB3"],img[src*="M4SQ7PEA"]')){e.preventDefault();e.stopImmediatePropagation()}},true);
var ppad=document.createElement('style');ppad.textContent='.dre-root :is(.dre-panel,.dre-panel-dark) .dre-hero:has(img[src*="SQ2TYPB3"])>div:not(:has(.dre-portrait)),.dre-root :is(.dre-panel,.dre-panel-dark) .dre-hero:has(img[src*="M4SQ7PEA"])>div:not(:has(.dre-portrait)){padding:28px 22px!important;box-sizing:border-box!important;min-width:0!important;max-width:100%!important}';document.head.appendChild(ppad);
var libstyle=document.createElement('style');libstyle.textContent='.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head{position:relative;isolation:isolate;margin:-32px -17px 24px!important;padding:350px 22px 28px!important;min-height:0;background:#080909!important;color:#e8dbb9!important;text-align:start!important;overflow:hidden}.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head:before{content:"";position:absolute;z-index:-1;inset:0;background:url(/assets/library-doctor.webp) 65% top/auto 350px no-repeat;mask-image:linear-gradient(#000 0%,#000 75%,transparent 100%);-webkit-mask-image:linear-gradient(#000 0%,#000 75%,transparent 100%)}.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head .dre-kicker{color:#ad9566!important;font-size:10px!important;letter-spacing:.13em!important}.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head .dre-h1{color:#eadfc5!important;font-size:31px!important;line-height:1.35!important;margin:13px 0!important}.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head .dre-sub{color:#bcb5a5!important;font-size:15px!important;line-height:1.8!important;margin:0!important}.dre-root .dre-route.dre-route-library .dre-library-content{padding-top:32px!important}@media(min-width:800px){.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head{margin:-32px -32px 30px!important;padding:85px 52% 85px 46px!important;min-height:420px;direction:ltr!important}.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head:before{background-position:right center;background-size:auto 100%;mask-image:linear-gradient(90deg,transparent 32%,#000 64%);-webkit-mask-image:linear-gradient(90deg,transparent 32%,#000 64%)}.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head .dre-h1{font-size:40px!important}.dre-route-library[dir=rtl] .dre-library-head{text-align:right!important}}';document.head.appendChild(libstyle);
var libfix=document.createElement('style');libfix.textContent='.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head:before{inset:0!important;width:100%!important;height:350px!important;display:block!important;opacity:1!important;transform:none!important;border:0!important;border-radius:0!important;filter:none!important;background:url(/assets/library-doctor.webp) 65% top/auto 350px no-repeat!important;mask-image:linear-gradient(#000 0%,#000 75%,transparent 100%)!important;-webkit-mask-image:linear-gradient(#000 0%,#000 75%,transparent 100%)!important}.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head:after{display:none!important}@media(min-width:800px){.dre-root .dre-route.dre-route-library .dre-library-content .dre-library-head:before{height:100%!important;background-position:right center!important;background-size:auto 100%!important;mask-image:linear-gradient(90deg,transparent 32%,#000 64%)!important;-webkit-mask-image:linear-gradient(90deg,transparent 32%,#000 64%)!important}}';document.head.appendChild(libfix);

})();
