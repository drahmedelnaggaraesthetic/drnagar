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

  const boot = () => {
    const root = document.getElementById('root');
    if (!root || !root.hasChildNodes()) return;
    if (!reducedTitle) root.querySelectorAll('.dre7-title').forEach(buildMask);
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
    if (document.querySelector('.dre5') && (!document.querySelector('.dre-mo-mq') || !document.querySelector('.dre-mo-explore'))) { window.clearTimeout(t); boot(); return; }
    window.clearTimeout(t);
    t = window.setTimeout(boot, 80);
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
