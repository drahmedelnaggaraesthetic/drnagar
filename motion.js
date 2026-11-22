/* drelnajar.online motion pass - vanilla, no libs. All effects reduced-motion aware. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* 1R. hero headline line-by-line mask reveal.
     React keeps its own h1 children untouched (its flip re-render stays safe);
     we append one absolutely-positioned clone overlay and rebuild it on language flip. */
  const buildMask = (h) => {
    if (h.closest('.dre-mo-title')) return;
    const sig = h.textContent;
    const existing = h.querySelector(':scope > .dre-mo-title');
    if (existing && existing.dataset.sig === sig) return;
    if (existing) existing.remove();
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
      if (existing.dataset.lang !== lang) existing.replaceWith(buildMarquee(lang));
      return;
    }
    cover.insertAdjacentElement('afterend', buildMarquee(lang));
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
    root.querySelectorAll('.dre5-btn-gold, .dre-brandcta a, .dre-brandcta button').forEach((el) => {
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

  /* 7. hero parallax (rAF-throttled, capped 38px) */
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
      const y = Math.min(38, Math.max(0, window.scrollY * 0.07));
      f.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
  };

  const boot = () => {
    const root = document.getElementById('root');
    if (!root || !root.hasChildNodes()) return;
    if (!reduced) root.querySelectorAll('.dre7-title').forEach(buildMask);
    ensureMarquee();
    root.querySelectorAll('.dre5-ba').forEach((b) => baIO.observe(b));
    bootMagnetic(root);
    bootParallax();
  };

  let t = 0;
  new MutationObserver(() => {
    window.clearTimeout(t);
    t = window.setTimeout(boot, 80);
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
