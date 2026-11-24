/* drelnajar.online motion pass - vanilla, no libs. All effects reduced-motion aware. */
(() => {
  'use strict';
  const reduced = true; // Keep unrelated magnetic and parallax effects quiet.
  const reducedTitle = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* 1R. hero headline line-by-line mask reveal.
     React keeps its own h1 children untouched (its flip re-render stays safe);
     we append one absolutely-positioned clone overlay and rebuild it on language flip. */
  const buildMask = (h) => {
    if (h.closest('.dre-mo-title')) return;
    const existing = h.querySelector(':scope > .dre-mo-title');
    /* Real title text, excluding any overlay clone (the clone doubles textContent). */
    const cloneless = h.cloneNode(true);
    const cc = cloneless.querySelector(':scope > .dre-mo-title');
    if (cc) cc.remove();
    const sig = cloneless.textContent;
    if (existing) {
      /* Prerendered overlay already animating from first paint: remember its clock
         so a rebuild after the app commits resumes the sweep instead of replaying it. */
      if (window.__dreMoT0 === undefined) {
        const inEl = existing.querySelector('.dre-mo-in');
        const an = inEl && inEl.getAnimations ? inEl.getAnimations()[0] : null;
        if (an && typeof an.startTime === 'number') window.__dreMoT0 = an.startTime;
        else window.__dreMoT0 = performance.now() - 10000; /* unknown clock: treat as finished so the rebuild lands on the final state */
      }
      window.__dreMoSig = sig;
      if (existing.dataset.sig === sig) return;
      existing.remove();
    }
    /* Rebuild right after the app commits over the prerendered DOM: continue the same sweep. */
    const resume = window.__dreCapture ? 0 : (window.__dreMoSig === sig && typeof window.__dreMoT0 === 'number' ? performance.now() - window.__dreMoT0 : 0);
    const clone = document.createElement('div');
    clone.className = 'dre7-title dre-mo-title';
    clone.setAttribute('aria-hidden', 'true');
    clone.dataset.sig = sig;
    let idx = 0;
    let line = document.createElement('span');
    let inner = document.createElement('span');
    line.className = 'dre-mo-line';
    inner.className = 'dre-mo-in';
    inner.style.setProperty('--d', (idx * 140) + 'ms');
    line.appendChild(inner);
    [...h.childNodes].forEach((n) => {
      if (n.nodeName === 'BR') {
        clone.appendChild(line);
        idx++;
        line = document.createElement('span');
        inner = document.createElement('span');
        line.className = 'dre-mo-line';
        inner.className = 'dre-mo-in';
        inner.style.setProperty('--d', (idx * 140) + 'ms');
        line.appendChild(inner);
      } else {
        inner.appendChild(n.cloneNode(true));
      }
    });
    clone.appendChild(line);
    h.classList.add('mo-src');
    if (resume > 0) clone.querySelectorAll('.dre-mo-in').forEach((el) => { el.style.animationDelay = 'calc(var(--d) - ' + Math.round(resume) + 'ms)'; });
    h.appendChild(clone);
  };

  /* 5. procedure marquee (real site services, AR + EN) */
  const MQ = {
    ar: ['عيادات القاهرة', 'جراحة التجميل والإصلاح', 'تنسيق القوام', 'تجميل الأنف', 'تنسيق الرقبة وخط الفك'],
    en: ['CAIRO CLINICS', 'AESTHETIC & RECONSTRUCTIVE SURGERY', 'BODY CONTOURING', 'RHINOPLASTY', 'NECK & JAWLINE CONTOURING']
  };
  const isEN = () => {
    const t = document.querySelector('.dre7-title');
    return t ? !/[؀-ۿ]/.test(t.textContent) : false;
  };
  const buildMarquee = (lang) => {
    const items = MQ[lang];
    const track = [];
    for (let r = 0; r < 2; r++) items.forEach((t) => track.push('<span class="dre5-mq-item"><i></i>' + t + '</span>'));
    const mq = document.createElement('div');
    mq.className = 'dre5-mq dre-mo-mq';
    mq.dataset.lang = lang;
    const tr = document.createElement('div');
    tr.className = 'dre5-mq-track';
    tr.innerHTML = track.join('');
    mq.appendChild(tr);
    return mq;
  };
  const ensureMarquee = () => {
    const d5 = document.querySelector('.dre5');
    const cover = d5 && d5.querySelector(':scope > .dre7-cover');
    if (!cover) return;
    const lang = isEN() ? 'en' : 'ar';
    const existing = d5.querySelector(':scope > .dre-mo-mq');
    if (existing) {
      if (existing.dataset.lang !== lang) { existing.replaceWith(buildMarquee(lang)); return; }
      if (window.__dreMqT0 === undefined) {
        const tr = existing.querySelector('.dre5-mq-track');
        const an = tr && tr.getAnimations ? tr.getAnimations()[0] : null;
        window.__dreMqT0 = an && typeof an.startTime === 'number' ? an.startTime : null;
      }
      return;
    }
    const mq = buildMarquee(lang);
    if (window.__dreMqT0) mq.querySelector('.dre5-mq-track').style.animationDelay = '-' + ((performance.now() - window.__dreMqT0) / 1000).toFixed(2) + 's';
    cover.insertAdjacentElement('afterend', mq);
  };

  /* standalone explore-journeys pill below the hero photo (his ask) */
  const ensureExplore = () => {
    const d5 = document.querySelector('.dre5');
    const cover = d5 && d5.querySelector(':scope > .dre7-cover');
    if (!cover) return;
    const lang = isEN() ? 'en' : 'ar';
    const existing = d5.querySelector(':scope > .dre-mo-explore');
    if (existing && existing.dataset.lang === lang) return;
    const d = document.createElement('div');
    d.className = 'dre-mo-explore';
    d.dataset.lang = lang;
    const a = document.createElement('a');
    a.href = '#journeys';
    a.className = 'dre5-btn';
    const label = lang === 'ar' ? 'استكشف الرحلات' : 'Explore the journeys';
    const sp = document.createElement('span');
    sp.textContent = label;
    const b = document.createElement('b');
    b.setAttribute('aria-hidden', 'true');
    b.textContent = '↓';
    a.appendChild(sp);
    a.appendChild(b);
    d.appendChild(a);
    const mq = d5.querySelector(':scope > .dre-mo-mq');
    if (mq) d5.insertBefore(d, mq);
    else cover.insertAdjacentElement('afterend', d);
    if (existing) existing.remove();
  };

  /* 3. before/after handle invite (once per slider, stops on touch) */
  const hinted = new WeakSet();
  const baIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !hinted.has(e.target)) {
        hinted.add(e.target);
        e.target.classList.add('dre-mo-hint');
        window.setTimeout(() => e.target.classList.remove('dre-mo-hint'), 3300);
        baIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  document.addEventListener('pointerdown', (e) => {
    const b = e.target.closest && e.target.closest('.dre5-ba');
    if (b) { hinted.add(b); b.classList.remove('dre-mo-hint'); }
  }, true);

  /* 6. magnetic gold CTAs (fine pointer only) */
  const bootMagnetic = (root) => {
    if (!finePointer || reduced) return;
    root.querySelectorAll('.dre5-btn-gold, .dre-brandcta a, .dre-brandcta button, .dre-mo-explore .dre5-btn').forEach((el) => {
      if (el.dataset.moMag) return;
      el.dataset.moMag = '1';
      el.addEventListener('pointermove', (ev) => {
        const r = el.getBoundingClientRect();
        const dx = (ev.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (ev.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.transform = 'translate(' + (dx * 5).toFixed(1) + 'px,' + (dy * 4).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1)';
        el.style.transform = '';
        window.setTimeout(() => { el.style.transition = ''; }, 500);
      });
    });
  };

  /* 7. hero parallax: gentle whole-card drift (caption strip is gone; 30px margins absorb travel) */
  let parallaxArmed = false;
  const bootParallax = () => {
    if (reduced || parallaxArmed) return;
    if (!document.querySelector('.dre7-cover-frame')) return;
    parallaxArmed = true;
    let ticking = false;
    const update = () => {
      ticking = false;
      const f = document.querySelector('.dre7-cover-frame');
      if (!f) return;
      const y = Math.min(10, Math.max(0, window.scrollY * 0.03));
      f.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  };

  /* Header entrance: the prerendered masthead animates via the preboot-scoped CSS
     from first paint; React's fresh masthead must not replay it at boot. */
  const bootHeader = (root) => {
    const mast = root.querySelector('.dre-masthead');
    if (!mast) return;
    if (window.__dreHdrDone) { mast.style.animation = 'none'; return; }
    window.__dreHdrDone = true;
  };
  /* Old behavior: an open portal menu closes on scroll. */
  if (!window.__dreScrollClose) {
    window.__dreScrollClose = true;
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 4) return;
      lastY = y;
      document.querySelectorAll('details[open].dre-navigation, details[open].dre-navgroup').forEach((d) => { d.open = false; });
    }, { passive: true });
  }
  /* Info strip: 316 topics, 3 Cairo clinics, reply within an hour;
     availability by working hours; dotted patient-countries map. */
  const STATS_CFG = { topics: 316, clinics: 3, openHour: 14, closeHour: 22, closedDay: 5 };
  const AR_D = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const EN_D = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  /* Patient-story strip: flat live dotted map, sequential light beams to Cairo,
     seven tappable story circles (all audio voice notes, inline), one 16s master timeline. */
  const STORY_COUNTRIES = 12;
  const STORIES = [
    { id: 'morocco', kind: 'audio', src: 'assets/stories/morocco.mp3', at: [57.6, 19.4], lift: 6,
      ar: { n: 'المغرب', sub: 'مامي ميك أوفر · رسالة صوتية', q: 'لو ضليت أشكرك كلش ما راح أوفي شكري' },
      en: { n: 'Morocco', sub: 'mommy makeover · voice note', q: '"No matter how much I thank you..."' } },
    { id: 'belgium', kind: 'audio', src: 'assets/stories/belgium.mp3', at: [61.6, 13.1], lift: 5,
      ar: { n: 'بلجيكا', sub: 'رسالة صوتية', q: '«جينا من بلجيكا للقاهرة»' },
      en: { n: 'Belgium', sub: 'voice note', q: '"we came from Belgium to Cairo"' } },
    { id: 'saudi', kind: 'audio', src: 'assets/stories/saudi.mp3', at: [75.0, 22.0], lift: 3,
      ar: { n: 'السعودية', sub: 'رحلة علاجية · رسالة صوتية', q: '«ما حسيت إني بعيد عن أهلي أبدًا»' },
      en: { n: 'Saudi Arabia', sub: 'treatment journey · voice note', q: '"I never felt far from my family"' } },
    { id: 'syria', kind: 'audio', src: 'assets/patient-experiences/recording-1.mp3', at: [72.8, 18.4], lift: 2.5,
      ar: { n: 'سوريا', sub: 'رسالة صوتية · فيلر', q: 'أول تجربة فيلر... والنتيجة طبيعية' },
      en: { n: 'Syria', sub: 'voice note · filler', q: 'First-time filler... a natural result' } },
    { id: 'egypt', kind: 'audio', src: 'assets/patient-experiences/recording-2.mp3', home: true,
      ar: { n: 'مصر', sub: 'رسالة صوتية · متابعة', q: 'المتابعة بعد العملية، يوم بيوم' },
      en: { n: 'Egypt', sub: 'voice note · aftercare', q: 'Day-by-day aftercare follow-up' } },
    { id: 'features', kind: 'audio', src: 'assets/patient-experiences/recording-3.mp3',
      ar: { n: 'الملامح كما هي', sub: 'رسالة صوتية', q: 'الملامح كما هي' },
      en: { n: 'Features kept natural', sub: 'voice note', q: 'My features, just as they are' } },
    { id: 'rhino', kind: 'audio', src: 'assets/patient-experiences/recording-4.mp3',
      ar: { n: 'تجربة تجميل الأنف', sub: 'رسالة صوتية', q: 'تجربة تجميل الأنف' },
      en: { n: 'Rhinoplasty story', sub: 'voice note', q: 'A rhinoplasty story' } }
  ];
  const CAIRO_AT = [70.3, 21.1];
  const beamPath = (a, b, lift, s) =>
    'M' + (a[0] * s).toFixed(1) + ',' + (a[1] * s).toFixed(1) +
    ' Q' + ((a[0] + b[0]) / 2 * s).toFixed(1) + ',' + (((a[1] + b[1]) / 2 - lift) * s).toFixed(1) +
    ' ' + (b[0] * s).toFixed(1) + ',' + (b[1] * s).toFixed(1);
  const buildStats = (root) => {
    const explore = root.querySelector('.dre-mo-explore');
    if (!explore) return;
    if (!/^\/(en\/)?$/.test(location.pathname)) return;
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
    const day = now.getDay(); const h = now.getHours();
    const open = day !== STATS_CFG.closedDay && h >= STATS_CFG.openHour && h < STATS_CFG.closeHour;
    let nextDay, nextDayEn;
    if (day !== STATS_CFG.closedDay && h < STATS_CFG.openHour) { nextDay = 'اليوم'; nextDayEn = 'today'; }
    else { let nd = (day + 1) % 7; if (nd === STATS_CFG.closedDay) nd = (nd + 1) % 7; nextDay = AR_D[nd]; nextDayEn = EN_D[nd]; }
    /* Live language: React sets <html lang> synchronously on every toggle; the prerendered
       page carries the right lang from first paint. __dreInitialLang/pathname are only fallbacks. */
    const htmlLang = (document.documentElement.lang || '').toLowerCase();
    const isEn = htmlLang ? htmlLang.startsWith('en') : (window.__dreInitialLang === 'en' || /^\/en\//.test(location.pathname));
    let wrap = root.querySelector('.drex-stats');
    if (wrap && wrap.__drexLang && wrap.__drexLang !== (isEn ? 'en' : 'ar')) {
      /* Language toggled: texts are baked at build time, so rebuild the strip fresh
         in the new language; stop any story still playing first. */
      if (window.__drexAudio) { try { window.__drexAudio.pause(); } catch (e) {} window.__drexAudio = null; }
      wrap.remove();
      wrap = null;
    }
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'drex-stats drex-tl-run';
      wrap.__drexLang = isEn ? 'en' : 'ar';
      wrap.setAttribute('dir', isEn ? 'ltr' : 'rtl');
      const L = (o) => isEn ? o.en : o.ar;
      const arcs = STORIES.filter(s => s.at).map(s =>
        '<svg class="drex-arc" viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true"><path d="M' + s.at[0] + ',' + s.at[1] +
        ' Q' + (s.at[0] + CAIRO_AT[0]) / 2 + ',' + ((s.at[1] + CAIRO_AT[1]) / 2 - s.lift) + ' ' + CAIRO_AT[0] + ',' + CAIRO_AT[1] + '"/></svg>').join('');
      const beams = STORIES.map((s, i) => s.at ? '<i class="drex-beam drex-b' + i + '" aria-hidden="true"></i>' : '').join('');
      const quotes = STORIES.filter(s => s.at).map((s, i) =>
        '<div class="drex-q drex-q' + i + '" data-i="' + i + '"><p>' + L(s).q + '</p><small>' + L(s).n + ' · ' + L(s).sub + '</small></div>').join('');
      const cells = STORIES.map((s, i) => {
        const glyph = '<i class="drex-mic-g"><u></u><u></u><u></u></i>';
        return '<button type="button" class="drex-cell' + (s.home ? ' home' : '') + '" data-i="' + i + '" aria-label="' + L(s).n + '">' +
          '<i class="drex-ring' + (s.at ? ' drex-r' + i : '') + '"></i><i class="drex-thumb">' + glyph + '</i><span>' + L(s).n + '</span></button>';
      }).join('');
      wrap.innerHTML =
        '<div class="drex-hear"><span class="drex-eq"><i></i><i></i><i></i><i></i></span>' + (isEn ? 'Hear our patients' : 'اسمع مرضانا') + '</div>' +
        '<div class="drex-mwrap"><img src="/stats-map-alive.svg" alt="" loading="lazy">' + arcs + beams +
        '<i class="drex-cpulse" aria-hidden="true"></i></div>' +
        '<div class="drex-qstack">' + quotes + '</div>' +
        '<div class="drex-srow">' + cells + '</div>' +
        '<div class="drex-stateline"><b dir="ltr">' + STORY_COUNTRIES + '</b><span>' + (isEn ? 'countries · patients worldwide' : 'دولة · مرضى من حول العالم') + '</span></div>' +
        '<div class="drex-fline">' +
        '<div class="f"><b dir="ltr">' + STATS_CFG.topics + '</b><span>' + (isEn ? 'medical topics' : 'موضوع طبي') + '</span></div><i class="sep"></i>' +
        '<div class="f"><b dir="ltr">3</b><span>' + (isEn ? 'clinics in Cairo' : 'عيادات بالقاهرة') + '</span></div><i class="sep"></i>' +
        '<div class="f"><b dir="ltr">1</b><span>' + (isEn ? 'reply within an hour' : 'رد خلال ساعة') + '</span></div></div>' +
        '<div class="drex-avl' + (open ? '' : ' off') + '"><i></i><span>' +
        (open ? (isEn ? 'available now' : 'متاح الآن') : (isEn ? 'opens ' + nextDayEn + ' 2 PM' : 'يستقبل ' + nextDay + ' 2 ظهرًا')) + '</span></div>';
      explore.parentElement.insertBefore(wrap, explore.nextSibling);
    } else {
      wrap.setAttribute('dir', isEn ? 'ltr' : 'rtl');
      const avl = wrap.querySelector('.drex-avl');
      if (avl) { avl.classList.toggle('off', !open); }
    }
    hydrateStats(wrap, isEn);
  };
  const hydrateStats = (wrap, isEn) => {
    if (wrap.__drexHydrated) return;
    wrap.__drexHydrated = true;
    const mwrap = wrap.querySelector('.drex-mwrap');
    const beams = wrap.querySelectorAll('.drex-beam');
    const supportsPath = CSS.supports('offset-path', 'path("M0,0 L1,1")');
    const layoutBeams = () => {
      if (!supportsPath || !mwrap) return;
      const s = mwrap.clientWidth / 120;
      let bi = 0;
      STORIES.forEach((st) => {
        if (!st.at) return;
        const el = wrap.querySelector('.drex-b' + STORIES.indexOf(st));
        if (el) el.style.offsetPath = 'path("' + beamPath(st.at, CAIRO_AT, st.lift, s) + '")';
        bi++;
      });
      const cp = wrap.querySelector('.drex-cpulse');
      if (cp) { cp.style.left = (CAIRO_AT[0] * s) + 'px'; cp.style.top = (CAIRO_AT[1] * s) + 'px'; }
    };
    layoutBeams();
    window.addEventListener('resize', layoutBeams, { passive: true });
    /* start all motion only when the strip scrolls into view */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((es, io) => {
        if (es.some(e => e.isIntersecting)) { wrap.classList.add('drex-live'); io.disconnect(); }
      }, { threshold: 0.12 }).observe(wrap);
    } else wrap.classList.add('drex-live');
    /* one shared audio element; every story plays inline */
    let audio = null, playingCell = null;
    const qstack = wrap.querySelector('.drex-qstack');
    const holdQuote = (i) => {
      if (!qstack) return;
      qstack.classList.add('drex-hold');
      qstack.querySelectorAll('.drex-q').forEach(q => q.classList.toggle('on', +q.dataset.i === i));
    };
    const releaseQuote = () => {
      if (!qstack) return;
      qstack.classList.remove('drex-hold');
      qstack.querySelectorAll('.drex-q').forEach(q => q.classList.remove('on'));
    };
    const stopMedia = () => {
      if (audio) { audio.pause(); audio = null; window.__drexAudio = null; }
      if (playingCell) { playingCell.classList.remove('playing'); playingCell = null; }
      releaseQuote();
    };
    const jumpTo = (i) => {
      wrap.style.setProperty('--drextl', (-i * 4) + 's');
      wrap.classList.remove('drex-tl-run');
      void wrap.offsetWidth;
      wrap.classList.add('drex-tl-run');
    };
    wrap.querySelectorAll('.drex-cell').forEach((cell) => {
      cell.addEventListener('click', () => {
        const i = +cell.dataset.i;
        const st = STORIES[i];
        if (playingCell === cell) { stopMedia(); return; }
        stopMedia();
        if (st.at) jumpTo(STORIES.filter(s => s.at).indexOf(st));
        playingCell = cell;
        cell.classList.add('playing');
        holdQuote(st.at ? STORIES.filter(s => s.at).indexOf(st) : -1);
        audio = new Audio(st.src);
        window.__drexAudio = audio;
        audio.preload = 'auto';
        audio.addEventListener('ended', stopMedia);
        audio.play().catch(() => stopMedia());
      });
    });
  };
  const boot = () => {
    const root = document.getElementById('root');
    if (!root || !root.hasChildNodes()) return;
    if (!reducedTitle) root.querySelectorAll('.dre7-title').forEach(buildMask);
    bootHeader(root);
    buildStats(root);
    ensureMarquee();
    ensureExplore();
    if (!window.__dreCapture) root.querySelectorAll('.dre5-ba').forEach((b) => baIO.observe(b));
    bootMagnetic(root);
    bootParallax();
  };

  let t = 0;
  new MutationObserver(() => {
    /* If the app just committed over the prerendered DOM, restore motion additions in the
       same frame so nothing visibly pops; otherwise keep the debounce. */
    if (document.querySelector('.dre5') && (!document.querySelector('.dre-mo-mq') || !document.querySelector('.dre-mo-explore') || !document.querySelector('.drex-stats'))) { window.clearTimeout(t); boot(); return; }
    window.clearTimeout(t);
    t = window.setTimeout(boot, 80);
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
