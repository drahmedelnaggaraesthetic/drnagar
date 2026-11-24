;
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-router/dist/development/chunk-BV7QT456.mjs:
react-router/dist/development/index.mjs:
  (**
   * react-router v7.18.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/

/* portal index v2: staggered reveal + tap-to-expand preview rows */
(() => {
  const PREV = {
    "/face": { ar: "شد الوجه والرقبة والجفون ومحفزات الكولاجين، كل تقنية بآلية عملها ومرشحها المثالي.", en: "Facelift, eyelids and collagen biostimulators, every technique with how it works and who it suits." },
    "/body": { ar: "الفيزر رباعي الأبعاد وشد البطن، ومسارات ما بعد الولادة وما بعد التكميم.", en: "4D VASER and tummy tuck, plus post-pregnancy and post-sleeve pathways." },
    "/rhino": { ar: "تجميل الأنف التحفظي وتقنية البيزو، مع تقييم لتاريخك الجراحي.", en: "Preservation rhinoplasty and the piezo technique, with a surgical-history review." },
    "/library": { ar: "158 موضوعاً بالعربية مع أسماء التقنيات بالإنجليزية، ابحث في أي مرحلة.", en: "158 Arabic topics with English technique names, search any stage." },
    "/assessment": { ar: "ملفك الشخصي ومقياس الأمان في 4 خطوات، والبدائل المناسبة لحالتك.", en: "Your profile and safety score in 4 steps, with alternatives for your case." },
    "/consultation": { ar: "تقييم طبي مباشر بالفيديو بخصوصية تامة، وتوقيت مناسب للخليج وأوروبا.", en: "Private live video assessment, timed for the Gulf and Europe." },
    "/travel": { ar: "من التقييم الأول إلى خطة السفر والإقامة يوماً بيوم.", en: "From first assessment to a day-by-day travel and stay plan." },
    "/recovery": { ar: "متابعة التعافي بعد العملية بمؤشرات واضحة وتنبيهات مبكرة.", en: "Post-op recovery tracking with clear indicators and early alerts." }
  };
  const isAr = () => {
    const chip = document.querySelector(".dre-chips .dre-chip[aria-pressed='true']");
    return chip ? chip.textContent.trim() !== "EN" : true;
  };
  const enhance = (list) => {
    if (list.dataset.dreJl) return;
    list.dataset.dreJl = "1";
    const links = [...list.querySelectorAll("a")];
    links.forEach((a, i) => a.style.setProperty("--dre-jl-d", (i * 70) + "ms"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      links.forEach((a) => a.classList.add("dre-jl-in"));
    } else {
      list.classList.add("dre-jl-arm");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.querySelectorAll("a").forEach((a) => a.classList.add("dre-jl-in"));
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.1 });
      io.observe(list);
    }
    links.forEach((a) => a.addEventListener("click", (e) => {
      if (a.classList.contains("dre-jl-open")) return;
      let key;
      try { key = new URL(a.href, location.origin).pathname; } catch { return; }
      const prev = PREV[key];
      if (!prev) return;
      e.preventDefault();
      list.querySelectorAll(".dre-jl-open").forEach((o) => o.classList.remove("dre-jl-open"));
      if (!a.querySelector(".dre-jl-more")) {
        const more = document.createElement("span");
        more.className = "dre-jl-more";
        const p = document.createElement("p");
        const cta = document.createElement("span");
        cta.className = "dre-jl-cta";
        more.append(p, cta);
        a.append(more);
      }
      const ar = isAr();
      a.querySelector(".dre-jl-more p").textContent = ar ? prev.ar : prev.en;
      a.querySelector(".dre-jl-more .dre-jl-cta").textContent = ar ? "استكشف القسم ↗" : "EXPLORE ↗";
      a.classList.add("dre-jl-open");
    }));
  };
  const scan = () => { document.querySelectorAll(".dre7-journey-links").forEach(enhance); return document.querySelector(".dre7-journey-links"); };
  if (!scan()) {
    const mo = new MutationObserver(() => { if (scan()) mo.disconnect(); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } else {
    new MutationObserver(scan).observe(document.getElementById("root") || document.body, { childList: true, subtree: true });
  }
})();

/* recovery timeline: keep the active phase pill centered in the rail */
(() => {
  const arm = (rail) => {
    if (rail.dataset.dreRail) return;
    rail.dataset.dreRail = "1";
    const center = (chip) => chip && chip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    rail.addEventListener("click", (e) => {
      const chip = e.target.closest(".dre-chip");
      if (chip) setTimeout(() => center(chip), 60);
    });
    new MutationObserver(() => {
      const active = rail.querySelector('.dre-chip[aria-pressed="true"]');
      if (active) center(active);
    }).observe(rail, { attributes: true, subtree: true, attributeFilter: ["aria-pressed"] });
  };
  const scan = () => {
    const rail = document.querySelector(".dre-route-recovery .dre-instrument .dre-chips");
    if (rail) arm(rail);
  };
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  scan();
})();

/* Reference recovery tool: original layout and runtime isolated from legacy site CSS. */
(() => {
 if(customElements.get('dre-recovery-reference')) return;
 const markup = "<style>\n        html {\n            -webkit-text-size-adjust: 100%;\n            text-size-adjust: 100%;\n            background-color: #050507;\n            overflow-x: hidden;\n        }\n\n        body {\n            background-color: #050507;\n            color: #F8F8FA;\n            font-family: 'Cairo', 'Tajawal', system-ui, -apple-system, 'Segoe UI', Tahoma, Arial, sans-serif;\n            overflow-x: hidden;\n            -webkit-tap-highlight-color: transparent;\n            padding-bottom: env(safe-area-inset-bottom, 0px);\n        }\n\n        /* Ambient Desktop Backdrop Behind Locked 540px App Frame */\n        .ambient-backdrop {\n            background-image:\n                radial-gradient(circle at 50% 0%, rgba(200, 157, 124, 0.08) 0%, transparent 45%),\n                radial-gradient(circle at 50% 100%, rgba(20, 22, 32, 0.65) 0%, transparent 50%);\n        }\n\n        /* Pure White Handwritten Signature */\n        .signature-script {\n            font-family: 'Great Vibes', 'Alex Brush', cursive;\n            color: #FFFFFF;\n            letter-spacing: 0.02em;\n            line-height: 1.08;\n            text-shadow: 0 2px 18px rgba(255, 255, 255, 0.16);\n        }\n\n        /* Native-Feeling Horizontal Pill Scrollbars */\n        .pill-scroll {\n            -webkit-overflow-scrolling: touch;\n            scroll-snap-type: x proximity;\n            scrollbar-width: none;\n        }\n        .pill-scroll::-webkit-scrollbar {\n            display: none;\n        }\n\n        /* Smooth Stage Card Transition */\n        @keyframes stageReveal {\n            from {\n                opacity: 0;\n                transform: translateY(8px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n        .stage-animate {\n            animation: stageReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n        }\n\n        /* Dark Mode Native Date Input Styling */\n        input[type=\"date\"] {\n            color-scheme: dark;\n            -webkit-appearance: none;\n            appearance: none;\n        }\n        input[type=\"date\"]::-webkit-calendar-picker-indicator {\n            filter: invert(75%) sepia(25%) saturate(380%) hue-rotate(340deg) brightness(96%) contrast(90%);\n            cursor: pointer;\n            opacity: 0.9;\n        }\n    *, ::before, ::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/* ! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com */*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::after,::before{--tw-content:''}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:Cairo, Tajawal, system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0px}.inset-x-0{left:0px;right:0px}.bottom-0{bottom:0px}.bottom-5{bottom:1.25rem}.left-1\\/2{left:50%}.top-0{top:0px}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-50{z-index:50}.mx-auto{margin-left:auto;margin-right:auto}.-mt-20{margin-top:-5rem}.mb-1\\.5{margin-bottom:0.375rem}.mb-2{margin-bottom:0.5rem}.mb-2\\.5{margin-bottom:0.625rem}.mb-3{margin-bottom:0.75rem}.mb-3\\.5{margin-bottom:0.875rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mb-7{margin-bottom:1.75rem}.mt-0\\.5{margin-top:0.125rem}.mt-1{margin-top:0.25rem}.mt-1\\.5{margin-top:0.375rem}.mt-2{margin-top:0.5rem}.mt-3{margin-top:0.75rem}.mt-4{margin-top:1rem}.mt-5{margin-top:1.25rem}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.aspect-\\[4\\/4\\.2\\]{aspect-ratio:4/4.2}.h-1\\.5{height:0.375rem}.h-10{height:2.5rem}.h-12{height:3rem}.h-16{height:4rem}.h-2{height:0.5rem}.h-24{height:6rem}.h-3{height:0.75rem}.h-3\\.5{height:0.875rem}.h-3\\/5{height:60%}.h-4{height:1rem}.h-5{height:1.25rem}.h-7{height:1.75rem}.h-9{height:2.25rem}.h-\\[1\\.5px\\]{height:1.5px}.h-\\[1px\\]{height:1px}.h-full{height:100%}.h-8{height:2rem}.min-h-\\[44px\\]{min-height:44px}.min-h-\\[46px\\]{min-height:46px}.min-h-\\[48px\\]{min-height:48px}.min-h-\\[50px\\]{min-height:50px}.min-h-\\[60px\\]{min-height:60px}.min-h-screen{min-height:100vh}.min-h-\\[54px\\]{min-height:54px}.w-1\\.5{width:0.375rem}.w-10{width:2.5rem}.w-12{width:3rem}.w-16{width:4rem}.w-2{width:0.5rem}.w-24{width:6rem}.w-3{width:0.75rem}.w-3\\.5{width:0.875rem}.w-4{width:1rem}.w-40{width:10rem}.w-44{width:11rem}.w-5{width:1.25rem}.w-7{width:1.75rem}.w-9{width:2.25rem}.w-\\[90\\%\\]{width:90%}.w-full{width:100%}.w-8{width:2rem}.min-w-0{min-width:0px}.min-w-\\[178px\\]{min-width:178px}.max-w-\\[420px\\]{max-width:420px}.max-w-\\[480px\\]{max-width:480px}.max-w-\\[540px\\]{max-width:540px}.max-w-sm{max-width:24rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.shrink-0{flex-shrink:0}.-translate-x-1\\/2{--tw-translate-x:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-110{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;user-select:none}.snap-center{scroll-snap-align:center}.scroll-mt-4{scroll-margin-top:1rem}.grid-cols-2{grid-template-columns:repeat(2, minmax(0, 1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0\\.5{gap:0.125rem}.gap-1{gap:0.25rem}.gap-1\\.5{gap:0.375rem}.gap-2{gap:0.5rem}.gap-2\\.5{gap:0.625rem}.gap-3{gap:0.75rem}.space-y-1\\.5 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.375rem * var(--tw-space-y-reverse))}.space-y-2 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.5rem * var(--tw-space-y-reverse))}.space-y-2\\.5 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.625rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.625rem * var(--tw-space-y-reverse))}.space-y-3 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.75rem * var(--tw-space-y-reverse))}.space-y-3\\.5 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.875rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.875rem * var(--tw-space-y-reverse))}.space-y-4 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.scroll-smooth{scroll-behavior:smooth}.whitespace-nowrap{white-space:nowrap}.rounded-2xl{border-radius:1rem}.rounded-3xl{border-radius:1.5rem}.rounded-\\[1\\.75rem\\]{border-radius:1.75rem}.rounded-full{border-radius:9999px}.rounded-xl{border-radius:0.75rem}.rounded-lg{border-radius:0.5rem}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-dashed{border-style:dashed}.border-rose-400\\/25{border-color:rgb(251 113 133 / 0.25)}.border-rose-400\\/30{border-color:rgb(251 113 133 / 0.3)}.border-rosegold\\/25{border-color:rgb(200 157 124 / 0.25)}.border-rosegold\\/30{border-color:rgb(200 157 124 / 0.3)}.border-rosegold\\/35{border-color:rgb(200 157 124 / 0.35)}.border-rosegold\\/40{border-color:rgb(200 157 124 / 0.4)}.border-rosegold\\/45{border-color:rgb(200 157 124 / 0.45)}.border-rosegold\\/50{border-color:rgb(200 157 124 / 0.5)}.border-rosegold\\/55{border-color:rgb(200 157 124 / 0.55)}.border-rosegold\\/65{border-color:rgb(200 157 124 / 0.65)}.border-rosegold\\/70{border-color:rgb(200 157 124 / 0.7)}.border-white\\/10{border-color:rgb(255 255 255 / 0.1)}.border-white\\/15{border-color:rgb(255 255 255 / 0.15)}.border-white\\/\\[0\\.06\\]{border-color:rgb(255 255 255 / 0.06)}.border-white\\/\\[0\\.07\\]{border-color:rgb(255 255 255 / 0.07)}.border-white\\/\\[0\\.08\\]{border-color:rgb(255 255 255 / 0.08)}.border-amber-400\\/35{border-color:rgb(251 191 36 / 0.35)}.border-amber-500\\/15{border-color:rgb(245 158 11 / 0.15)}.border-rose-500\\/15{border-color:rgb(244 63 94 / 0.15)}.border-rosegold\\/80{border-color:rgb(200 157 124 / 0.8)}.border-rosegoldSoft{--tw-border-opacity:1;border-color:rgb(223 185 155 / var(--tw-border-opacity, 1))}.bg-black\\/80{background-color:rgb(0 0 0 / 0.8)}.bg-charcoal{--tw-bg-opacity:1;background-color:rgb(14 15 20 / var(--tw-bg-opacity, 1))}.bg-charcoal\\/80{background-color:rgb(14 15 20 / 0.8)}.bg-charcoalLight{--tw-bg-opacity:1;background-color:rgb(21 23 32 / var(--tw-bg-opacity, 1))}.bg-emerald-400{--tw-bg-opacity:1;background-color:rgb(52 211 153 / var(--tw-bg-opacity, 1))}.bg-pitch{--tw-bg-opacity:1;background-color:rgb(5 5 7 / var(--tw-bg-opacity, 1))}.bg-pitch\\/80{background-color:rgb(5 5 7 / 0.8)}.bg-rose-400{--tw-bg-opacity:1;background-color:rgb(251 113 133 / var(--tw-bg-opacity, 1))}.bg-rose-500\\/15{background-color:rgb(244 63 94 / 0.15)}.bg-rosegold{--tw-bg-opacity:1;background-color:rgb(200 157 124 / var(--tw-bg-opacity, 1))}.bg-rosegold\\/10{background-color:rgb(200 157 124 / 0.1)}.bg-rosegold\\/15{background-color:rgb(200 157 124 / 0.15)}.bg-rosegold\\/\\[0\\.08\\]{background-color:rgb(200 157 124 / 0.08)}.bg-rosegoldSoft{--tw-bg-opacity:1;background-color:rgb(223 185 155 / var(--tw-bg-opacity, 1))}.bg-amber-400{--tw-bg-opacity:1;background-color:rgb(251 191 36 / var(--tw-bg-opacity, 1))}.bg-amber-500\\/15{background-color:rgb(245 158 11 / 0.15)}.bg-pitch\\/20{background-color:rgb(5 5 7 / 0.2)}.bg-rosegold\\/20{background-color:rgb(200 157 124 / 0.2)}.bg-white\\/\\[0\\.07\\]{background-color:rgb(255 255 255 / 0.07)}.bg-gradient-to-b{background-image:linear-gradient(to bottom, var(--tw-gradient-stops))}.bg-gradient-to-l{background-image:linear-gradient(to left, var(--tw-gradient-stops))}.bg-gradient-to-t{background-image:linear-gradient(to top, var(--tw-gradient-stops))}.from-\\[\\#161014\\]{--tw-gradient-from:#161014 var(--tw-gradient-from-position);--tw-gradient-to:rgb(22 16 20 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-charcoal{--tw-gradient-from:#0E0F14 var(--tw-gradient-from-position);--tw-gradient-to:rgb(14 15 20 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-charcoalLight{--tw-gradient-from:#151720 var(--tw-gradient-from-position);--tw-gradient-to:rgb(21 23 32 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-emerald-400{--tw-gradient-from:#34d399 var(--tw-gradient-from-position);--tw-gradient-to:rgb(52 211 153 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-pitch\\/30{--tw-gradient-from:rgb(5 5 7 / 0.3) var(--tw-gradient-from-position);--tw-gradient-to:rgb(5 5 7 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-rosegold\\/\\[0\\.14\\]{--tw-gradient-from:rgb(200 157 124 / 0.14) var(--tw-gradient-from-position);--tw-gradient-to:rgb(200 157 124 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-rosegoldSoft{--tw-gradient-from:#DFB99B var(--tw-gradient-from-position);--tw-gradient-to:rgb(223 185 155 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-transparent{--tw-gradient-from:transparent var(--tw-gradient-from-position);--tw-gradient-to:rgb(0 0 0 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.via-charcoal{--tw-gradient-to:rgb(14 15 20 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #0E0F14 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-charcoal\\/80{--tw-gradient-to:rgb(14 15 20 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), rgb(14 15 20 / 0.8) var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-pitch{--tw-gradient-to:rgb(5 5 7 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #050507 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-rosegold{--tw-gradient-to:rgb(200 157 124 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #C89D7C var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-rosegold\\/80{--tw-gradient-to:rgb(200 157 124 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), rgb(200 157 124 / 0.8) var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-teal-400{--tw-gradient-to:rgb(45 212 191 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #2dd4bf var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-transparent{--tw-gradient-to:rgb(0 0 0 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), transparent var(--tw-gradient-via-position), var(--tw-gradient-to)}.to-charcoal{--tw-gradient-to:#0E0F14 var(--tw-gradient-to-position)}.to-pitch{--tw-gradient-to:#050507 var(--tw-gradient-to-position)}.to-rosegold{--tw-gradient-to:#C89D7C var(--tw-gradient-to-position)}.to-sky-400{--tw-gradient-to:#38bdf8 var(--tw-gradient-to-position)}.to-transparent{--tw-gradient-to:transparent var(--tw-gradient-to-position)}.object-cover{object-fit:cover}.object-top{object-position:top}.p-3{padding:0.75rem}.p-3\\.5{padding:0.875rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.px-0\\.5{padding-left:0.125rem;padding-right:0.125rem}.px-2{padding-left:0.5rem;padding-right:0.5rem}.px-2\\.5{padding-left:0.625rem;padding-right:0.625rem}.px-3{padding-left:0.75rem;padding-right:0.75rem}.px-3\\.5{padding-left:0.875rem;padding-right:0.875rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.py-0\\.5{padding-top:0.125rem;padding-bottom:0.125rem}.py-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-2\\.5{padding-top:0.625rem;padding-bottom:0.625rem}.py-3{padding-top:0.75rem;padding-bottom:0.75rem}.pb-1\\.5{padding-bottom:0.375rem}.pb-10{padding-bottom:2.5rem}.pb-2{padding-bottom:0.5rem}.pb-3{padding-bottom:0.75rem}.pb-4{padding-bottom:1rem}.pb-6{padding-bottom:1.5rem}.pr-1{padding-right:0.25rem}.pt-0\\.5{padding-top:0.125rem}.pt-1{padding-top:0.25rem}.pt-4{padding-top:1rem}.pt-6{padding-top:1.5rem}.text-center{text-align:center}.text-right{text-align:right}.font-display{font-family:Tajawal, Cairo, system-ui, -apple-system, sans-serif}.text-2xl{font-size:1.75rem;line-height:2rem}.text-4xl{font-size:2.624rem;line-height:2.5rem}.text-\\[10px\\]{font-size:11.66px}.text-\\[11px\\]{font-size:12.83px}.text-\\[2\\.65rem\\]{font-size:3.091rem}.text-lg{font-size:1.312rem;line-height:1.75rem}.text-sm{font-size:1.021rem;line-height:1.25rem}.text-xl{font-size:1.458rem;line-height:1.75rem}.text-xs{font-size:0.8748rem;line-height:1rem}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-medium{font-weight:500}.font-semibold{font-weight:600}.leading-relaxed{line-height:1.625}.leading-snug{line-height:1.375}.leading-tight{line-height:1.25}.tracking-wider{letter-spacing:0.05em}.text-crisp{--tw-text-opacity:1;color:rgb(248 248 250 / var(--tw-text-opacity, 1))}.text-crisp\\/90{color:rgb(248 248 250 / 0.9)}.text-pitch{--tw-text-opacity:1;color:rgb(5 5 7 / var(--tw-text-opacity, 1))}.text-rose-200{--tw-text-opacity:1;color:rgb(254 205 211 / var(--tw-text-opacity, 1))}.text-rose-300{--tw-text-opacity:1;color:rgb(253 164 175 / var(--tw-text-opacity, 1))}.text-rosegold{--tw-text-opacity:1;color:rgb(200 157 124 / var(--tw-text-opacity, 1))}.text-rosegold\\/75{color:rgb(200 157 124 / 0.75)}.text-rosegoldSoft{--tw-text-opacity:1;color:rgb(223 185 155 / var(--tw-text-opacity, 1))}.text-silver{--tw-text-opacity:1;color:rgb(161 161 170 / var(--tw-text-opacity, 1))}.text-silver\\/85{color:rgb(161 161 170 / 0.85)}.text-amber-300{--tw-text-opacity:1;color:rgb(252 211 77 / var(--tw-text-opacity, 1))}.text-pitch\\/80{color:rgb(5 5 7 / 0.8)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.opacity-90{opacity:0.9}.opacity-75{opacity:0.75}.shadow-card{--tw-shadow:0 16px 40px -14px rgba(0, 0, 0, 0.85);--tw-shadow-colored:0 16px 40px -14px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-roseglow{--tw-shadow:0 0 26px -6px rgba(200, 157, 124, 0.34);--tw-shadow-colored:0 0 26px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.transition-colors{transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.duration-300{transition-duration:300ms}.duration-500{transition-duration:500ms}.duration-200{transition-duration:200ms}.ease-out{transition-timing-function:cubic-bezier(0, 0, 0.2, 1)}.selection\\:bg-rosegold\\/30 *::selection{background-color:rgb(200 157 124 / 0.3)}.selection\\:text-crisp *::selection{--tw-text-opacity:1;color:rgb(248 248 250 / var(--tw-text-opacity, 1))}.selection\\:bg-rosegold\\/30::selection{background-color:rgb(200 157 124 / 0.3)}.selection\\:text-crisp::selection{--tw-text-opacity:1;color:rgb(248 248 250 / var(--tw-text-opacity, 1))}.hover\\:border-rosegold\\/40:hover{border-color:rgb(200 157 124 / 0.4)}.hover\\:border-rosegold\\/45:hover{border-color:rgb(200 157 124 / 0.45)}.hover\\:bg-charcoalLight:hover{--tw-bg-opacity:1;background-color:rgb(21 23 32 / var(--tw-bg-opacity, 1))}.hover\\:bg-rosegold\\/20:hover{background-color:rgb(200 157 124 / 0.2)}.hover\\:bg-rosegoldSoft:hover{--tw-bg-opacity:1;background-color:rgb(223 185 155 / var(--tw-bg-opacity, 1))}.hover\\:bg-white\\/\\[0\\.06\\]:hover{background-color:rgb(255 255 255 / 0.06)}.hover\\:text-crisp:hover{--tw-text-opacity:1;color:rgb(248 248 250 / var(--tw-text-opacity, 1))}.focus\\:border-rosegold:focus{--tw-border-opacity:1;border-color:rgb(200 157 124 / var(--tw-border-opacity, 1))}.focus\\:ring-1:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)}.focus\\:ring-rosegold\\/40:focus{--tw-ring-color:rgb(200 157 124 / 0.4)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-35:disabled{opacity:0.35}@media (min-width: 640px){.sm\\:items-center{align-items:center}.sm\\:border-x{border-left-width:1px;border-right-width:1px}.sm\\:border-white\\/\\[0\\.06\\]{border-color:rgb(255 255 255 / 0.06)}.sm\\:shadow-appframe{--tw-shadow:0 0 90px rgba(0, 0, 0, 0.95);--tw-shadow-colored:0 0 90px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}}*, ::before, ::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/* ! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com */*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::after,::before{--tw-content:''}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:Cairo, Tajawal, system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0px}.inset-x-0{left:0px;right:0px}.bottom-0{bottom:0px}.bottom-5{bottom:1.25rem}.left-1\\/2{left:50%}.top-0{top:0px}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-50{z-index:50}.mx-auto{margin-left:auto;margin-right:auto}.-mt-20{margin-top:-5rem}.mb-1\\.5{margin-bottom:0.375rem}.mb-2{margin-bottom:0.5rem}.mb-2\\.5{margin-bottom:0.625rem}.mb-3{margin-bottom:0.75rem}.mb-3\\.5{margin-bottom:0.875rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mb-7{margin-bottom:1.75rem}.mt-0\\.5{margin-top:0.125rem}.mt-1{margin-top:0.25rem}.mt-1\\.5{margin-top:0.375rem}.mt-2{margin-top:0.5rem}.mt-3{margin-top:0.75rem}.mt-4{margin-top:1rem}.mt-5{margin-top:1.25rem}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.aspect-\\[4\\/4\\.2\\]{aspect-ratio:4/4.2}.h-1\\.5{height:0.375rem}.h-10{height:2.5rem}.h-12{height:3rem}.h-16{height:4rem}.h-2{height:0.5rem}.h-24{height:6rem}.h-3{height:0.75rem}.h-3\\.5{height:0.875rem}.h-3\\/5{height:60%}.h-4{height:1rem}.h-5{height:1.25rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-9{height:2.25rem}.h-\\[1\\.5px\\]{height:1.5px}.h-\\[1px\\]{height:1px}.h-full{height:100%}.min-h-\\[46px\\]{min-height:46px}.min-h-\\[48px\\]{min-height:48px}.min-h-\\[50px\\]{min-height:50px}.min-h-\\[54px\\]{min-height:54px}.min-h-\\[60px\\]{min-height:60px}.min-h-screen{min-height:100vh}.w-1\\.5{width:0.375rem}.w-10{width:2.5rem}.w-12{width:3rem}.w-16{width:4rem}.w-2{width:0.5rem}.w-24{width:6rem}.w-3{width:0.75rem}.w-3\\.5{width:0.875rem}.w-4{width:1rem}.w-40{width:10rem}.w-44{width:11rem}.w-5{width:1.25rem}.w-7{width:1.75rem}.w-8{width:2rem}.w-9{width:2.25rem}.w-\\[90\\%\\]{width:90%}.w-full{width:100%}.min-w-0{min-width:0px}.min-w-\\[178px\\]{min-width:178px}.max-w-\\[420px\\]{max-width:420px}.max-w-\\[540px\\]{max-width:540px}.max-w-sm{max-width:24rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.shrink-0{flex-shrink:0}.-translate-x-1\\/2{--tw-translate-x:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-110{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;user-select:none}.snap-center{scroll-snap-align:center}.scroll-mt-4{scroll-margin-top:1rem}.grid-cols-2{grid-template-columns:repeat(2, minmax(0, 1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0\\.5{gap:0.125rem}.gap-1{gap:0.25rem}.gap-1\\.5{gap:0.375rem}.gap-2{gap:0.5rem}.gap-2\\.5{gap:0.625rem}.gap-3{gap:0.75rem}.space-y-1\\.5 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.375rem * var(--tw-space-y-reverse))}.space-y-2 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.5rem * var(--tw-space-y-reverse))}.space-y-2\\.5 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.625rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.625rem * var(--tw-space-y-reverse))}.space-y-3 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.75rem * var(--tw-space-y-reverse))}.space-y-3\\.5 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.875rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.875rem * var(--tw-space-y-reverse))}.space-y-4 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.scroll-smooth{scroll-behavior:smooth}.whitespace-nowrap{white-space:nowrap}.rounded-2xl{border-radius:1rem}.rounded-3xl{border-radius:1.5rem}.rounded-\\[1\\.75rem\\]{border-radius:1.75rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:0.5rem}.rounded-xl{border-radius:0.75rem}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-amber-400\\/35{border-color:rgb(251 191 36 / 0.35)}.border-amber-500\\/15{border-color:rgb(245 158 11 / 0.15)}.border-rose-400\\/25{border-color:rgb(251 113 133 / 0.25)}.border-rose-400\\/30{border-color:rgb(251 113 133 / 0.3)}.border-rose-500\\/15{border-color:rgb(244 63 94 / 0.15)}.border-rosegold\\/25{border-color:rgb(200 157 124 / 0.25)}.border-rosegold\\/30{border-color:rgb(200 157 124 / 0.3)}.border-rosegold\\/35{border-color:rgb(200 157 124 / 0.35)}.border-rosegold\\/40{border-color:rgb(200 157 124 / 0.4)}.border-rosegold\\/45{border-color:rgb(200 157 124 / 0.45)}.border-rosegold\\/50{border-color:rgb(200 157 124 / 0.5)}.border-rosegold\\/65{border-color:rgb(200 157 124 / 0.65)}.border-rosegold\\/70{border-color:rgb(200 157 124 / 0.7)}.border-rosegold\\/80{border-color:rgb(200 157 124 / 0.8)}.border-rosegoldSoft{--tw-border-opacity:1;border-color:rgb(223 185 155 / var(--tw-border-opacity, 1))}.border-white\\/10{border-color:rgb(255 255 255 / 0.1)}.border-white\\/15{border-color:rgb(255 255 255 / 0.15)}.border-white\\/\\[0\\.06\\]{border-color:rgb(255 255 255 / 0.06)}.border-white\\/\\[0\\.07\\]{border-color:rgb(255 255 255 / 0.07)}.border-white\\/\\[0\\.08\\]{border-color:rgb(255 255 255 / 0.08)}.bg-amber-400{--tw-bg-opacity:1;background-color:rgb(251 191 36 / var(--tw-bg-opacity, 1))}.bg-amber-500\\/15{background-color:rgb(245 158 11 / 0.15)}.bg-charcoal{--tw-bg-opacity:1;background-color:rgb(14 15 20 / var(--tw-bg-opacity, 1))}.bg-charcoal\\/80{background-color:rgb(14 15 20 / 0.8)}.bg-charcoalLight{--tw-bg-opacity:1;background-color:rgb(21 23 32 / var(--tw-bg-opacity, 1))}.bg-emerald-400{--tw-bg-opacity:1;background-color:rgb(52 211 153 / var(--tw-bg-opacity, 1))}.bg-pitch{--tw-bg-opacity:1;background-color:rgb(5 5 7 / var(--tw-bg-opacity, 1))}.bg-pitch\\/20{background-color:rgb(5 5 7 / 0.2)}.bg-pitch\\/80{background-color:rgb(5 5 7 / 0.8)}.bg-rose-400{--tw-bg-opacity:1;background-color:rgb(251 113 133 / var(--tw-bg-opacity, 1))}.bg-rose-500\\/15{background-color:rgb(244 63 94 / 0.15)}.bg-rosegold{--tw-bg-opacity:1;background-color:rgb(200 157 124 / var(--tw-bg-opacity, 1))}.bg-rosegold\\/10{background-color:rgb(200 157 124 / 0.1)}.bg-rosegold\\/15{background-color:rgb(200 157 124 / 0.15)}.bg-rosegold\\/20{background-color:rgb(200 157 124 / 0.2)}.bg-rosegold\\/\\[0\\.08\\]{background-color:rgb(200 157 124 / 0.08)}.bg-rosegoldSoft{--tw-bg-opacity:1;background-color:rgb(223 185 155 / var(--tw-bg-opacity, 1))}.bg-white\\/\\[0\\.07\\]{background-color:rgb(255 255 255 / 0.07)}.bg-gradient-to-b{background-image:linear-gradient(to bottom, var(--tw-gradient-stops))}.bg-gradient-to-l{background-image:linear-gradient(to left, var(--tw-gradient-stops))}.bg-gradient-to-t{background-image:linear-gradient(to top, var(--tw-gradient-stops))}.from-\\[\\#161014\\]{--tw-gradient-from:#161014 var(--tw-gradient-from-position);--tw-gradient-to:rgb(22 16 20 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-charcoal{--tw-gradient-from:#0E0F14 var(--tw-gradient-from-position);--tw-gradient-to:rgb(14 15 20 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-charcoalLight{--tw-gradient-from:#151720 var(--tw-gradient-from-position);--tw-gradient-to:rgb(21 23 32 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-emerald-400{--tw-gradient-from:#34d399 var(--tw-gradient-from-position);--tw-gradient-to:rgb(52 211 153 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-pitch\\/30{--tw-gradient-from:rgb(5 5 7 / 0.3) var(--tw-gradient-from-position);--tw-gradient-to:rgb(5 5 7 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-rosegold\\/\\[0\\.14\\]{--tw-gradient-from:rgb(200 157 124 / 0.14) var(--tw-gradient-from-position);--tw-gradient-to:rgb(200 157 124 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-rosegoldSoft{--tw-gradient-from:#DFB99B var(--tw-gradient-from-position);--tw-gradient-to:rgb(223 185 155 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.from-transparent{--tw-gradient-from:transparent var(--tw-gradient-from-position);--tw-gradient-to:rgb(0 0 0 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.via-charcoal{--tw-gradient-to:rgb(14 15 20 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #0E0F14 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-charcoal\\/80{--tw-gradient-to:rgb(14 15 20 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), rgb(14 15 20 / 0.8) var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-pitch{--tw-gradient-to:rgb(5 5 7 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #050507 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-rosegold{--tw-gradient-to:rgb(200 157 124 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #C89D7C var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-rosegold\\/80{--tw-gradient-to:rgb(200 157 124 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), rgb(200 157 124 / 0.8) var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-teal-400{--tw-gradient-to:rgb(45 212 191 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #2dd4bf var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-transparent{--tw-gradient-to:rgb(0 0 0 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), transparent var(--tw-gradient-via-position), var(--tw-gradient-to)}.to-charcoal{--tw-gradient-to:#0E0F14 var(--tw-gradient-to-position)}.to-pitch{--tw-gradient-to:#050507 var(--tw-gradient-to-position)}.to-rosegold{--tw-gradient-to:#C89D7C var(--tw-gradient-to-position)}.to-sky-400{--tw-gradient-to:#38bdf8 var(--tw-gradient-to-position)}.to-transparent{--tw-gradient-to:transparent var(--tw-gradient-to-position)}.object-cover{object-fit:cover}.object-top{object-position:top}.p-3{padding:0.75rem}.p-3\\.5{padding:0.875rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.px-0\\.5{padding-left:0.125rem;padding-right:0.125rem}.px-2{padding-left:0.5rem;padding-right:0.5rem}.px-2\\.5{padding-left:0.625rem;padding-right:0.625rem}.px-3{padding-left:0.75rem;padding-right:0.75rem}.px-3\\.5{padding-left:0.875rem;padding-right:0.875rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.py-0\\.5{padding-top:0.125rem;padding-bottom:0.125rem}.py-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-2\\.5{padding-top:0.625rem;padding-bottom:0.625rem}.py-3{padding-top:0.75rem;padding-bottom:0.75rem}.pb-1\\.5{padding-bottom:0.375rem}.pb-10{padding-bottom:2.5rem}.pb-2{padding-bottom:0.5rem}.pb-3{padding-bottom:0.75rem}.pb-4{padding-bottom:1rem}.pb-6{padding-bottom:1.5rem}.pr-1{padding-right:0.25rem}.pt-0\\.5{padding-top:0.125rem}.pt-1{padding-top:0.25rem}.pt-4{padding-top:1rem}.pt-6{padding-top:1.5rem}.text-center{text-align:center}.text-right{text-align:right}.font-display{font-family:Tajawal, Cairo, system-ui, -apple-system, sans-serif}.text-2xl{font-size:1.75rem;line-height:2rem}.text-4xl{font-size:2.624rem;line-height:2.5rem}.text-\\[10px\\]{font-size:11.66px}.text-\\[11px\\]{font-size:12.83px}.text-\\[2\\.65rem\\]{font-size:3.091rem}.text-lg{font-size:1.312rem;line-height:1.75rem}.text-sm{font-size:1.021rem;line-height:1.25rem}.text-xl{font-size:1.458rem;line-height:1.75rem}.text-xs{font-size:0.8748rem;line-height:1rem}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-medium{font-weight:500}.font-semibold{font-weight:600}.leading-relaxed{line-height:1.625}.leading-snug{line-height:1.375}.leading-tight{line-height:1.25}.tracking-wider{letter-spacing:0.05em}.text-amber-300{--tw-text-opacity:1;color:rgb(252 211 77 / var(--tw-text-opacity, 1))}.text-crisp{--tw-text-opacity:1;color:rgb(248 248 250 / var(--tw-text-opacity, 1))}.text-crisp\\/90{color:rgb(248 248 250 / 0.9)}.text-pitch{--tw-text-opacity:1;color:rgb(5 5 7 / var(--tw-text-opacity, 1))}.text-pitch\\/80{color:rgb(5 5 7 / 0.8)}.text-rose-200{--tw-text-opacity:1;color:rgb(254 205 211 / var(--tw-text-opacity, 1))}.text-rose-300{--tw-text-opacity:1;color:rgb(253 164 175 / var(--tw-text-opacity, 1))}.text-rosegold{--tw-text-opacity:1;color:rgb(200 157 124 / var(--tw-text-opacity, 1))}.text-rosegold\\/75{color:rgb(200 157 124 / 0.75)}.text-rosegoldSoft{--tw-text-opacity:1;color:rgb(223 185 155 / var(--tw-text-opacity, 1))}.text-silver{--tw-text-opacity:1;color:rgb(161 161 170 / var(--tw-text-opacity, 1))}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.opacity-75{opacity:0.75}.opacity-90{opacity:0.9}.shadow-card{--tw-shadow:0 16px 40px -14px rgba(0, 0, 0, 0.85);--tw-shadow-colored:0 16px 40px -14px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-roseglow{--tw-shadow:0 0 26px -6px rgba(200, 157, 124, 0.34);--tw-shadow-colored:0 0 26px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.transition-colors{transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.duration-200{transition-duration:200ms}.duration-300{transition-duration:300ms}.duration-500{transition-duration:500ms}.ease-out{transition-timing-function:cubic-bezier(0, 0, 0.2, 1)}.selection\\:bg-rosegold\\/30 *::selection{background-color:rgb(200 157 124 / 0.3)}.selection\\:text-crisp *::selection{--tw-text-opacity:1;color:rgb(248 248 250 / var(--tw-text-opacity, 1))}.selection\\:bg-rosegold\\/30::selection{background-color:rgb(200 157 124 / 0.3)}.selection\\:text-crisp::selection{--tw-text-opacity:1;color:rgb(248 248 250 / var(--tw-text-opacity, 1))}.hover\\:border-rosegold\\/40:hover{border-color:rgb(200 157 124 / 0.4)}.hover\\:border-rosegold\\/45:hover{border-color:rgb(200 157 124 / 0.45)}.hover\\:bg-charcoalLight:hover{--tw-bg-opacity:1;background-color:rgb(21 23 32 / var(--tw-bg-opacity, 1))}.hover\\:bg-rosegold\\/20:hover{background-color:rgb(200 157 124 / 0.2)}.hover\\:bg-rosegoldSoft:hover{--tw-bg-opacity:1;background-color:rgb(223 185 155 / var(--tw-bg-opacity, 1))}.hover\\:bg-white\\/\\[0\\.06\\]:hover{background-color:rgb(255 255 255 / 0.06)}.hover\\:text-crisp:hover{--tw-text-opacity:1;color:rgb(248 248 250 / var(--tw-text-opacity, 1))}.focus\\:border-rosegold:focus{--tw-border-opacity:1;border-color:rgb(200 157 124 / var(--tw-border-opacity, 1))}.focus\\:ring-1:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)}.focus\\:ring-rosegold\\/40:focus{--tw-ring-color:rgb(200 157 124 / 0.4)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-35:disabled{opacity:0.35}@media (min-width: 640px){.sm\\:border-x{border-left-width:1px;border-right-width:1px}.sm\\:border-white\\/\\[0\\.06\\]{border-color:rgb(255 255 255 / 0.06)}.sm\\:shadow-appframe{--tw-shadow:0 0 90px rgba(0, 0, 0, 0.95);--tw-shadow-colored:0 0 90px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}}\n:host{display:block;background:#050507;color:#f8f8fa;font-family:Cairo,Tajawal,system-ui,sans-serif;font-size:18.66px;font-weight:400;line-height:1.5;letter-spacing:normal;text-align:start;-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-font-smoothing:antialiased} .reference-frame{padding:16px;max-width:540px;margin:0 auto} *,*::before,*::after{box-sizing:border-box} @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}.bg-emerald-500\\/15{background-color:rgb(16 185 129 / .15)}.text-emerald-300{color:#6ee7b7}.border-emerald-400\\/35{border-color:rgb(52 211 153 / .35)}.border-emerald-500\\/15{border-color:rgb(16 185 129 / .15)}.border-rosegold\\/85{border-color:rgb(200 157 124 / .85)}.col-span-2{grid-column:span 2 / span 2}.text-silver\\/80{color:rgb(161 161 170 / .8)}</style><div class=\"reference-frame\" dir=\"rtl\"><section aria-label=\"اختيار الإجراء\" class=\"mb-6\">\n<div class=\"flex items-center justify-between gap-2 mb-2.5 px-0.5\">\n<h2 class=\"text-xs font-bold text-rosegoldSoft flex items-center gap-2\">\n<span class=\"w-5 h-5 rounded-full bg-rosegold/15 border border-rosegold/40 text-rosegoldSoft text-[11px] flex items-center justify-center\">١</span>\n<span>اختر نوع الإجراء (٨ إجراءات)</span>\n</h2>\n<span class=\"text-[11px] text-silver flex items-center gap-1\">\n<span>اسحب للتنقل</span>\n<svg class=\"w-3 h-3 text-rosegold\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M15 19l-7-7 7-7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</span>\n</div>\n<!-- Native Horizontal Pill Strip -->\n<div class=\"pill-scroll flex items-stretch gap-2.5 overflow-x-auto pb-1.5 pt-0.5\" id=\"procedure-selector\" role=\"tablist\"><button aria-selected=\"true\" class=\"shrink-0 snap-center min-h-[54px] min-w-[178px] text-right px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer bg-gradient-to-l from-charcoalLight via-charcoal to-pitch border-rosegold/80 text-crisp shadow-roseglow\" role=\"tab\" type=\"button\">\n<div class=\"min-w-0\">\n<div class=\"font-bold text-xs whitespace-nowrap text-crisp\">نحت القوام بالفيزر</div>\n<div class=\"text-[10px] opacity-75 mt-0.5 whitespace-nowrap\" dir=\"ltr\">4D VASER</div>\n</div>\n<div class=\"w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-rosegold/20 text-rosegoldSoft border border-rosegold/45\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</button><button aria-selected=\"false\" class=\"shrink-0 snap-center min-h-[54px] min-w-[178px] text-right px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer bg-charcoal hover:bg-charcoalLight border-white/[0.08] text-silver hover:text-crisp\" role=\"tab\" type=\"button\">\n<div class=\"min-w-0\">\n<div class=\"font-bold text-xs whitespace-nowrap\">شد البطن</div>\n<div class=\"text-[10px] opacity-75 mt-0.5 whitespace-nowrap\" dir=\"ltr\">Abdominoplasty</div>\n</div>\n<div class=\"w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-pitch text-silver border border-white/[0.07]\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</button><button aria-selected=\"false\" class=\"shrink-0 snap-center min-h-[54px] min-w-[178px] text-right px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer bg-charcoal hover:bg-charcoalLight border-white/[0.08] text-silver hover:text-crisp\" role=\"tab\" type=\"button\">\n<div class=\"min-w-0\">\n<div class=\"font-bold text-xs whitespace-nowrap\">شد البطن مع نحت القوام</div>\n<div class=\"text-[10px] opacity-75 mt-0.5 whitespace-nowrap\" dir=\"ltr\">Combined Procedure</div>\n</div>\n<div class=\"w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-pitch text-silver border border-white/[0.07]\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</button><button aria-selected=\"false\" class=\"shrink-0 snap-center min-h-[54px] min-w-[178px] text-right px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer bg-charcoal hover:bg-charcoalLight border-white/[0.08] text-silver hover:text-crisp\" role=\"tab\" type=\"button\">\n<div class=\"min-w-0\">\n<div class=\"font-bold text-xs whitespace-nowrap\">علاج التثدي</div>\n<div class=\"text-[10px] opacity-75 mt-0.5 whitespace-nowrap\" dir=\"ltr\">Gynecomastia</div>\n</div>\n<div class=\"w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-pitch text-silver border border-white/[0.07]\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</button><button aria-selected=\"false\" class=\"shrink-0 snap-center min-h-[54px] min-w-[178px] text-right px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer bg-charcoal hover:bg-charcoalLight border-white/[0.08] text-silver hover:text-crisp\" role=\"tab\" type=\"button\">\n<div class=\"min-w-0\">\n<div class=\"font-bold text-xs whitespace-nowrap\">حقن الدهون الذاتية</div>\n<div class=\"text-[10px] opacity-75 mt-0.5 whitespace-nowrap\" dir=\"ltr\">Fat Grafting</div>\n</div>\n<div class=\"w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-pitch text-silver border border-white/[0.07]\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M12 3.75c-2.8 4.2-6 7.5-6 11a6 6 0 1012 0c0-3.5-3.2-6.8-6-11z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</button><button aria-selected=\"false\" class=\"shrink-0 snap-center min-h-[54px] min-w-[178px] text-right px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer bg-charcoal hover:bg-charcoalLight border-white/[0.08] text-silver hover:text-crisp\" role=\"tab\" type=\"button\">\n<div class=\"min-w-0\">\n<div class=\"font-bold text-xs whitespace-nowrap\">شد الذراعين أو الفخذين</div>\n<div class=\"text-[10px] opacity-75 mt-0.5 whitespace-nowrap\" dir=\"ltr\">Arm / Thigh Lift</div>\n</div>\n<div class=\"w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-pitch text-silver border border-white/[0.07]\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</button><button aria-selected=\"false\" class=\"shrink-0 snap-center min-h-[54px] min-w-[178px] text-right px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer bg-charcoal hover:bg-charcoalLight border-white/[0.08] text-silver hover:text-crisp\" role=\"tab\" type=\"button\">\n<div class=\"min-w-0\">\n<div class=\"font-bold text-xs whitespace-nowrap\">تجميل الأنف</div>\n<div class=\"text-[10px] opacity-75 mt-0.5 whitespace-nowrap\" dir=\"ltr\">Rhinoplasty</div>\n</div>\n<div class=\"w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-pitch text-silver border border-white/[0.07]\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M12 3v18m0-18c-2 4.5-4.5 7.5-6 10.5 1.8 1.2 4 1.5 6 1.5s4.2-.3 6-1.5c-1.5-3-4-6-6-10.5z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</button><button aria-selected=\"false\" class=\"shrink-0 snap-center min-h-[54px] min-w-[178px] text-right px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer bg-charcoal hover:bg-charcoalLight border-white/[0.08] text-silver hover:text-crisp\" role=\"tab\" type=\"button\">\n<div class=\"min-w-0\">\n<div class=\"font-bold text-xs whitespace-nowrap\">شد الوجه والجفون</div>\n<div class=\"text-[10px] opacity-75 mt-0.5 whitespace-nowrap\" dir=\"ltr\">Facelift &amp; Eyelids</div>\n</div>\n<div class=\"w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-pitch text-silver border border-white/[0.07]\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm4.875 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</button></div>\n<!-- Selected Procedure Micro-Hint -->\n<div class=\"mt-2 px-3 py-2 rounded-xl bg-charcoal/80 border border-white/[0.06] flex items-center gap-2\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rosegold shrink-0\"></span>\n<span class=\"text-[11px] text-silver leading-snug\" id=\"procedure-meta-hint\">عودة سريعة نسبياً للعمل • انكماش تدريجي للجلد خلال ٣ – ٦ أشهر</span>\n</div>\n<div id=\"rhino-skin-field\" hidden style=\"margin-top:14px;padding:14px 16px;border:1px solid rgba(200,157,124,.32);border-radius:18px;background:#0e0f14;color:#F8F8FA\"><label for=\"rhino-skin-select\" style=\"display:block;font-size:13px;line-height:1.8;font-weight:600;margin-bottom:9px\">سُمك الجلد لتوقيت النتيجة النهائية للأنف</label><select id=\"rhino-skin-select\" style=\"display:block;width:100%;min-height:46px;padding:10px 12px;border:1px solid rgba(200,157,124,.45);border-radius:12px;background:#050507;color:#F8F8FA;font:inherit;font-size:14px;line-height:1.6;color-scheme:dark\"><option value=\"thin\">رقيق، يستقر مبكراً</option><option value=\"medium\" selected>متوسط، تحسن تدريجي</option><option value=\"thick\">سميك، نحو عام</option></select></div></section><section aria-label=\"حاسبة مواعيد التعافي\" class=\"mb-6\">\n<div class=\"bg-charcoal border border-white/[0.08] rounded-3xl p-4 shadow-card\">\n<div class=\"flex items-start gap-3 mb-3.5\">\n<div class=\"w-10 h-10 rounded-2xl bg-pitch border border-rosegold/30 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\">\n<path d=\"M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n</div>\n<div class=\"flex-1 min-w-0\">\n<div class=\"flex items-center gap-2\">\n<h2 class=\"text-sm font-bold text-crisp\">حاسبة مواعيد التعافي</h2>\n<span class=\"text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rosegold/15 text-rosegoldSoft border border-rosegold/25\">اختياري</span>\n</div>\n<p class=\"text-[11px] text-silver mt-0.5 leading-relaxed\">\n                            أدخل تاريخ العملية لحساب مواعيدك المتوقعة وتمييز مرحلتك الحالية تلقائياً.\n                        </p>\n</div>\n</div>\n<!-- Touch-Friendly Date Controls -->\n<div class=\"space-y-2\">\n<label class=\"block text-[11px] text-silver pr-1\" for=\"surgery-date-input\">تاريخ العملية</label>\n<div class=\"flex items-center gap-2\">\n<input class=\"flex-1 min-h-[46px] bg-pitch border border-rosegold/35 focus:border-rosegold focus:ring-1 focus:ring-rosegold/40 rounded-2xl px-3.5 py-2 text-xs font-semibold text-crisp outline-none transition-all\" id=\"surgery-date-input\" type=\"date\"/>\n<button class=\"min-h-[46px] px-4 rounded-2xl bg-charcoalLight hover:bg-rosegold/20 border border-rosegold/35 text-xs font-bold text-crisp transition-colors cursor-pointer shrink-0\" id=\"btn-date-today\" type=\"button\">\n                            اليوم\n                        </button>\n<button class=\"hidden min-h-[46px] px-3.5 rounded-2xl bg-pitch hover:bg-white/[0.06] border border-white/15 text-xs text-silver hover:text-crisp transition-colors cursor-pointer shrink-0\" id=\"btn-date-clear\" type=\"button\">\n                            مسح\n                        </button>\n</div>\n</div>\n<!-- Dynamic Calculator Output -->\n<div class=\"hidden mt-4 pt-4 border-t border-white/[0.07] space-y-3\" id=\"calculator-output\">\n<div class=\"p-3.5 rounded-2xl bg-gradient-to-l from-charcoalLight via-pitch to-pitch border border-rosegold/35 flex flex-col gap-2.5\" id=\"calculator-status-card\">\n<!-- Rendered via JS -->\n</div>\n<!-- 5 Calculated Milestone Dates (2-Col Mobile Grid with 5th spanning full width) -->\n<div class=\"grid grid-cols-2 gap-2\" id=\"calculator-milestones\">\n<!-- Rendered via JS -->\n</div>\n</div>\n</div>\n</section><section aria-label=\"ملخص العودة للحياة اليومية\" class=\"mb-6\">\n<div class=\"bg-charcoal border border-white/[0.08] rounded-3xl p-4 shadow-card\">\n<div class=\"mb-3.5 pb-3 border-b border-white/[0.07]\">\n<h2 class=\"text-sm font-extrabold text-crisp font-display\">ملخص العودة للحياة اليومية</h2>\n<p class=\"text-[11px] text-silver mt-0.5\">\n                        الإجراء المختار: <span class=\"text-rosegoldSoft font-bold\" id=\"matrix-proc-label\">نحت القوام بالفيزر (4D VASER)</span>\n</p>\n</div>\n<div class=\"grid grid-cols-2 gap-2.5\" id=\"return-matrix-grid\">\n<div class=\"p-3 rounded-2xl bg-pitch border border-white/[0.07] flex flex-col justify-between gap-2\">\n<div class=\"flex items-center justify-between gap-1.5\">\n<span class=\"text-[11px] font-medium text-silver\">الاستحمام</span>\n<div class=\"w-7 h-7 rounded-lg bg-charcoal border border-rosegold/25 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M12 3.75c-2.8 4.2-6 7.5-6 11a6 6 0 1012 0c0-3.5-3.2-6.8-6-11z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</div>\n<div class=\"text-xs font-extrabold text-rosegoldSoft leading-snug\">٤٨ – ٧٢ ساعة</div>\n</div>\n<div class=\"p-3 rounded-2xl bg-pitch border border-white/[0.07] flex flex-col justify-between gap-2\">\n<div class=\"flex items-center justify-between gap-1.5\">\n<span class=\"text-[11px] font-medium text-silver\">القيادة</span>\n<div class=\"w-7 h-7 rounded-lg bg-charcoal border border-rosegold/25 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</div>\n<div class=\"text-xs font-extrabold text-rosegoldSoft leading-snug\">٥ – ٧ أيام</div>\n</div>\n<div class=\"p-3 rounded-2xl bg-pitch border border-white/[0.07] flex flex-col justify-between gap-2\">\n<div class=\"flex items-center justify-between gap-1.5\">\n<span class=\"text-[11px] font-medium text-silver\">العمل المكتبي</span>\n<div class=\"w-7 h-7 rounded-lg bg-charcoal border border-rosegold/25 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</div>\n<div class=\"text-xs font-extrabold text-rosegoldSoft leading-snug\">٥ – ٧ أيام</div>\n</div>\n<div class=\"p-3 rounded-2xl bg-pitch border border-white/[0.07] flex flex-col justify-between gap-2\">\n<div class=\"flex items-center justify-between gap-1.5\">\n<span class=\"text-[11px] font-medium text-silver\">الكارديو والمشي</span>\n<div class=\"w-7 h-7 rounded-lg bg-charcoal border border-rosegold/25 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</div>\n<div class=\"text-xs font-extrabold text-rosegoldSoft leading-snug\">مشي فوراً • كارديو ٢ – ٣ أسبوع</div>\n</div>\n<div class=\"p-3 rounded-2xl bg-pitch border border-white/[0.07] flex flex-col justify-between gap-2\">\n<div class=\"flex items-center justify-between gap-1.5\">\n<span class=\"text-[11px] font-medium text-silver\">الجيم الكامل</span>\n<div class=\"w-7 h-7 rounded-lg bg-charcoal border border-rosegold/25 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</div>\n<div class=\"text-xs font-extrabold text-rosegoldSoft leading-snug\">٤ – ٦ أسابيع</div>\n</div>\n<div class=\"p-3 rounded-2xl bg-pitch border border-white/[0.07] flex flex-col justify-between gap-2\">\n<div class=\"flex items-center justify-between gap-1.5\">\n<span class=\"text-[11px] font-medium text-silver\">مدة المشد الطبي</span>\n<div class=\"w-7 h-7 rounded-lg bg-charcoal border border-rosegold/25 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\"><path d=\"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</div>\n</div>\n<div class=\"text-xs font-extrabold text-rosegoldSoft leading-snug\">٦ أسابيع</div>\n</div>\n</div>\n</div>\n</section><section aria-label=\"الخط الزمني للتعافي\" class=\"mb-4 scroll-mt-4\" id=\"timeline-section\">\n<div class=\"flex items-center justify-between gap-2 mb-2.5 px-0.5\">\n<h2 class=\"text-xs font-bold text-rosegoldSoft flex items-center gap-2\">\n<span class=\"w-5 h-5 rounded-full bg-rosegold/15 border border-rosegold/40 text-rosegoldSoft text-[11px] flex items-center justify-center\">٢</span>\n<span>الخط الزمني (٧ مراحل)</span>\n</h2>\n<span class=\"text-[11px] font-semibold text-silver\" id=\"stage-progress-label\">المرحلة ١ من ٧</span>\n</div>\n<!-- Horizontal Scrollable Stage Pills -->\n<div class=\"pill-scroll flex items-center gap-2 overflow-x-auto pb-2 pt-0.5\" id=\"timeline-tabs\"><button class=\"shrink-0 snap-center min-h-[50px] px-3.5 py-2.5 rounded-2xl border text-right transition-all duration-200 flex items-center gap-2 cursor-pointer bg-rosegold text-pitch border-rosegoldSoft shadow-roseglow\" data-stage-idx=\"0\" type=\"button\">\n<span class=\"w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold shrink-0 bg-pitch/20 text-pitch\">١</span>\n<div class=\"leading-tight\">\n<div class=\"text-xs font-bold whitespace-nowrap\">الأيام الأولى</div>\n<div class=\"text-[10px] whitespace-nowrap mt-0.5 text-pitch/80 font-semibold\">١ – ٣ أيام</div>\n</div>\n</button><button class=\"shrink-0 snap-center min-h-[50px] px-3.5 py-2.5 rounded-2xl border text-right transition-all duration-200 flex items-center gap-2 cursor-pointer bg-charcoal/80 text-silver border-white/[0.08] hover:text-crisp\" data-stage-idx=\"1\" type=\"button\">\n<span class=\"w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold shrink-0 bg-white/[0.07] text-silver\">٢</span>\n<div class=\"leading-tight\">\n<div class=\"text-xs font-bold whitespace-nowrap\">الأسبوع الأول</div>\n<div class=\"text-[10px] whitespace-nowrap mt-0.5 opacity-75\">٤ – ٧ أيام</div>\n</div>\n</button><button class=\"shrink-0 snap-center min-h-[50px] px-3.5 py-2.5 rounded-2xl border text-right transition-all duration-200 flex items-center gap-2 cursor-pointer bg-charcoal/80 text-silver border-white/[0.08] hover:text-crisp\" data-stage-idx=\"2\" type=\"button\">\n<span class=\"w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold shrink-0 bg-white/[0.07] text-silver\">٣</span>\n<div class=\"leading-tight\">\n<div class=\"text-xs font-bold whitespace-nowrap\">الأسبوع الثاني</div>\n<div class=\"text-[10px] whitespace-nowrap mt-0.5 opacity-75\">٨ – ١٤ يوم</div>\n</div>\n</button><button class=\"shrink-0 snap-center min-h-[50px] px-3.5 py-2.5 rounded-2xl border text-right transition-all duration-200 flex items-center gap-2 cursor-pointer bg-charcoal/80 text-silver border-white/[0.08] hover:text-crisp\" data-stage-idx=\"3\" type=\"button\">\n<span class=\"w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold shrink-0 bg-white/[0.07] text-silver\">٤</span>\n<div class=\"leading-tight\">\n<div class=\"text-xs font-bold whitespace-nowrap\">الأسبوع ٣ – ٤</div>\n<div class=\"text-[10px] whitespace-nowrap mt-0.5 opacity-75\">الأسبوع ٣ – ٤</div>\n</div>\n</button><button class=\"shrink-0 snap-center min-h-[50px] px-3.5 py-2.5 rounded-2xl border text-right transition-all duration-200 flex items-center gap-2 cursor-pointer bg-charcoal/80 text-silver border-white/[0.08] hover:text-crisp\" data-stage-idx=\"4\" type=\"button\">\n<span class=\"w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold shrink-0 bg-white/[0.07] text-silver\">٥</span>\n<div class=\"leading-tight\">\n<div class=\"text-xs font-bold whitespace-nowrap\">الشهر الثاني</div>\n<div class=\"text-[10px] whitespace-nowrap mt-0.5 opacity-75\">الأسبوع ٥ – ٨</div>\n</div>\n</button><button class=\"shrink-0 snap-center min-h-[50px] px-3.5 py-2.5 rounded-2xl border text-right transition-all duration-200 flex items-center gap-2 cursor-pointer bg-charcoal/80 text-silver border-white/[0.08] hover:text-crisp\" data-stage-idx=\"5\" type=\"button\">\n<span class=\"w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold shrink-0 bg-white/[0.07] text-silver\">٦</span>\n<div class=\"leading-tight\">\n<div class=\"text-xs font-bold whitespace-nowrap\">الشهر الثالث</div>\n<div class=\"text-[10px] whitespace-nowrap mt-0.5 opacity-75\">الأسبوع ٩ – ١٢</div>\n</div>\n</button><button class=\"shrink-0 snap-center min-h-[50px] px-3.5 py-2.5 rounded-2xl border text-right transition-all duration-200 flex items-center gap-2 cursor-pointer bg-charcoal/80 text-silver border-white/[0.08] hover:text-crisp\" data-stage-idx=\"6\" type=\"button\">\n<span class=\"w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold shrink-0 bg-white/[0.07] text-silver\">٧</span>\n<div class=\"leading-tight\">\n<div class=\"text-xs font-bold whitespace-nowrap\">النتيجة النهائية</div>\n<div class=\"text-[10px] whitespace-nowrap mt-0.5 opacity-75\">٣ – ٦ أشهر</div>\n</div>\n</button></div>\n<!-- Dual Progress Meters: Expected Swelling % & Comfort/Readiness % -->\n<div class=\"mt-2 bg-charcoal border border-white/[0.08] rounded-2xl p-4 shadow-card space-y-3.5\">\n<!-- Swelling Meter -->\n<div>\n<div class=\"flex items-center justify-between text-xs mb-1.5\">\n<span class=\"text-silver font-medium flex items-center gap-2\">\n<span class=\"dre-live-led w-2 h-2 rounded-full bg-rosegoldSoft\"></span>\n                            مستوى التورم المتوقع\n                        </span>\n<span class=\"font-extrabold text-rosegoldSoft\" id=\"swelling-level-text\">٩٢٪</span>\n</div>\n<div class=\"w-full h-2 bg-pitch rounded-full overflow-hidden border border-white/[0.06]\">\n<div class=\"h-full rounded-full bg-gradient-to-l from-rosegoldSoft to-rosegold transition-all duration-500 ease-out\" id=\"swelling-level-bar\" style=\"width: 92%;\"></div>\n</div>\n</div>\n<!-- Comfort & Readiness Meter -->\n<div>\n<div class=\"flex items-center justify-between text-xs mb-1.5\">\n<span class=\"text-silver font-medium flex items-center gap-2\">\n<span class=\"dre-live-led w-2 h-2 rounded-full bg-emerald-400\"></span>\n                            نسبة الجاهزية والراحة\n                        </span>\n<span class=\"font-extrabold text-crisp\" id=\"readiness-level-text\">٢٥٪</span>\n</div>\n<div class=\"w-full h-2 bg-pitch rounded-full overflow-hidden border border-white/[0.06]\">\n<div class=\"h-full rounded-full bg-gradient-to-l from-emerald-400 via-teal-400 to-sky-400 transition-all duration-500 ease-out\" id=\"readiness-level-bar\" style=\"width: 25%;\"></div>\n</div>\n</div>\n</div>\n</section><main class=\"space-y-4 mb-7 stage-animate\" id=\"stage-detail-panel\">\n<!-- Stage Title Banner -->\n<div class=\"bg-gradient-to-l from-charcoalLight via-charcoal to-pitch border border-rosegold/30 rounded-3xl p-4 shadow-card\">\n<div class=\"flex flex-wrap items-center gap-2 mb-2\">\n<span class=\"inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-rosegold/15 text-rosegoldSoft border border-rosegold/30\" id=\"stage-header-badge\">المرحلة ١ • ١ – ٣ أيام • نحت القوام بالفيزر</span>\n<span class=\"hidden inline-flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-rosegold text-pitch\" id=\"stage-my-stage-badge\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-pitch animate-pulse\"></span>\n                        مرحلتك الحالية\n                    </span>\n</div>\n<h3 class=\"text-lg font-extrabold text-crisp font-display\" id=\"stage-header-title\">الأيام الأولى</h3>\n<p class=\"text-xs text-silver mt-1 leading-relaxed\" id=\"stage-header-summary\">تصريف سوائل الحقن الأولي والمشي الهادئ داخل المنزل لتنشيط الدورة الدموية.</p>\n</div>\n<!-- Card A: What's Normal -->\n<article class=\"bg-charcoal border border-white/[0.08] rounded-3xl p-4 shadow-card\">\n<div class=\"flex items-center gap-3 mb-3.5 pb-3 border-b border-white/[0.07]\">\n<div class=\"w-9 h-9 rounded-xl bg-pitch border border-rosegold/30 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" viewbox=\"0 0 24 24\">\n<path d=\"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n</div>\n<div>\n<h4 class=\"font-bold text-sm text-crisp\">ما هو طبيعي في هذه المرحلة</h4>\n<p class=\"text-[11px] text-silver\">أعراض وتغيرات متوقعة خلال الشفاء الطبيعي</p>\n</div>\n</div>\n<ul class=\"space-y-2.5 text-xs text-crisp/90 leading-relaxed\" id=\"stage-normal-list\">\n<li class=\"flex items-start gap-2.5\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rosegoldSoft shrink-0 mt-2\"></span>\n<span>خروج سائل وردي خفيف من الفتحات الدقيقة أول ٢٤ – ٤٨ ساعة وهو أمر طبيعي تماماً.</span>\n</li>\n<li class=\"flex items-start gap-2.5\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rosegoldSoft shrink-0 mt-2\"></span>\n<span>ألم عضلي يشبه تمريناً شاقاً مع تورم وكدمات مبدئية تهدأ بالمسكنات الموصوفة.</span>\n</li>\n<li class=\"flex items-start gap-2.5\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rosegoldSoft shrink-0 mt-2\"></span>\n<span>تنميل سطحي مؤقت في الجلد يختفي تدريجياً خلال الأسابيع القادمة.</span>\n</li>\n</ul>\n</article>\n<!-- Card B: Activity & Exercise Status (5 Required Rows) -->\n<article class=\"bg-charcoal border border-white/[0.08] rounded-3xl p-4 shadow-card\">\n<div class=\"flex items-center gap-3 mb-3.5 pb-3 border-b border-white/[0.07]\">\n<div class=\"w-9 h-9 rounded-xl bg-pitch border border-rosegold/30 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" viewbox=\"0 0 24 24\">\n<path d=\"M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n</div>\n<div>\n<h4 class=\"font-bold text-sm text-crisp\">وضع الحركة والعمل والرياضة</h4>\n<p class=\"text-[11px] text-silver\">حالة كل نشاط: راحة / جزئي / متاح</p>\n</div>\n</div>\n<div class=\"space-y-2\" id=\"stage-activity-list\">\n<div class=\"p-3 rounded-2xl bg-pitch border border-amber-500/15 flex items-start justify-between gap-2.5\">\n<div class=\"flex items-start gap-2 min-w-0\">\n<span class=\"w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5\"></span>\n<div class=\"min-w-0\">\n<div class=\"text-xs font-bold text-crisp\">الحركة اليومية</div>\n<div class=\"text-[11px] text-silver mt-0.5 leading-relaxed\">مشي هادئ داخل المنزل ٥ دقائق كل ساعتين بقامة مستقيمة</div>\n</div>\n</div>\n<span class=\"shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border bg-amber-500/15 text-amber-300 border-amber-400/35\">جزئي</span>\n</div>\n<div class=\"p-3 rounded-2xl bg-pitch border border-rose-500/15 flex items-start justify-between gap-2.5\">\n<div class=\"flex items-start gap-2 min-w-0\">\n<span class=\"w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5\"></span>\n<div class=\"min-w-0\">\n<div class=\"text-xs font-bold text-crisp\">العمل المكتبي</div>\n<div class=\"text-[11px] text-silver mt-0.5 leading-relaxed\">راحة منزلية لتصريف السوائل وتخفيف التورم</div>\n</div>\n</div>\n<span class=\"shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border bg-rose-500/15 text-rose-300 border-rose-400/30\">راحة</span>\n</div>\n<div class=\"p-3 rounded-2xl bg-pitch border border-rose-500/15 flex items-start justify-between gap-2.5\">\n<div class=\"flex items-start gap-2 min-w-0\">\n<span class=\"w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5\"></span>\n<div class=\"min-w-0\">\n<div class=\"text-xs font-bold text-crisp\">القيادة</div>\n<div class=\"text-[11px] text-silver mt-0.5 leading-relaxed\">مؤجلة لحين إيقاف المسكنات المهدئة</div>\n</div>\n</div>\n<span class=\"shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border bg-rose-500/15 text-rose-300 border-rose-400/30\">راحة</span>\n</div>\n<div class=\"p-3 rounded-2xl bg-pitch border border-rose-500/15 flex items-start justify-between gap-2.5\">\n<div class=\"flex items-start gap-2 min-w-0\">\n<span class=\"w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5\"></span>\n<div class=\"min-w-0\">\n<div class=\"text-xs font-bold text-crisp\">الكارديو</div>\n<div class=\"text-[11px] text-silver mt-0.5 leading-relaxed\">ممنوع في الأيام الأولى</div>\n</div>\n</div>\n<span class=\"shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border bg-rose-500/15 text-rose-300 border-rose-400/30\">راحة</span>\n</div>\n<div class=\"p-3 rounded-2xl bg-pitch border border-rose-500/15 flex items-start justify-between gap-2.5\">\n<div class=\"flex items-start gap-2 min-w-0\">\n<span class=\"w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5\"></span>\n<div class=\"min-w-0\">\n<div class=\"text-xs font-bold text-crisp\">الجيم</div>\n<div class=\"text-[11px] text-silver mt-0.5 leading-relaxed\">ممنوع حمل الأوزان تماماً</div>\n</div>\n</div>\n<span class=\"shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border bg-rose-500/15 text-rose-300 border-rose-400/30\">راحة</span>\n</div>\n</div>\n</article>\n<!-- Card C: Garment / Splint & Care Protocol -->\n<article class=\"bg-charcoal border border-white/[0.08] rounded-3xl p-4 shadow-card\">\n<div class=\"flex items-center gap-3 mb-3.5 pb-3 border-b border-white/[0.07]\">\n<div class=\"w-9 h-9 rounded-xl bg-pitch border border-rosegold/30 flex items-center justify-center text-rosegoldSoft shrink-0\">\n<svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" viewbox=\"0 0 24 24\">\n<path d=\"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n</div>\n<div>\n<h4 class=\"font-bold text-sm text-crisp\">بروتوكول المشد / الجبيرة والعناية</h4>\n<p class=\"text-[11px] text-silver\">إرشادات مخصصة لدعم التئام الأنسجة</p>\n</div>\n</div>\n<div class=\"space-y-2.5\">\n<div class=\"p-3.5 rounded-2xl bg-pitch border border-white/[0.07]\">\n<div class=\"flex flex-wrap items-center justify-between gap-2 mb-1.5\">\n<span class=\"text-xs font-bold text-rosegoldSoft\" id=\"protocol-primary-title\">المشد الطبي (الفاجا) والفوم</span>\n<span class=\"text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-charcoalLight text-crisp border border-rosegold/30\" id=\"protocol-primary-badge\">٢٤ ساعة يومياً</span>\n</div>\n<p class=\"text-xs text-silver leading-relaxed\" id=\"protocol-primary-desc\">دعم مستمر لتثبيت الأنسجة ومنع تجمع السوائل؛ يُخلع فقط للاستحمام السريع بعد الإذن.</p>\n</div>\n<div class=\"p-3.5 rounded-2xl bg-pitch border border-white/[0.07]\">\n<div class=\"flex flex-wrap items-center justify-between gap-2 mb-1.5\">\n<span class=\"text-xs font-bold text-rosegoldSoft\" id=\"protocol-secondary-title\">المساج الليمفاوي المتخصص</span>\n<span class=\"text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rosegold/15 text-rosegoldSoft border border-rosegold/30\" id=\"protocol-secondary-badge\">يبدأ اليوم ٣ – ٥</span>\n</div>\n<p class=\"text-xs text-silver leading-relaxed\" id=\"protocol-secondary-desc\">بدء أول جلسة تصريف ليمفاوي لطيف لتسريع خروج السوائل وتنعيم الجلد.</p>\n</div>\n</div>\n</article>\n<!-- Card D: Focused Medical Tip with Circular Portrait Avatar -->\n<article class=\"bg-gradient-to-l from-rosegold/[0.14] via-charcoal to-pitch border border-rosegold/40 rounded-3xl p-4 shadow-roseglow\">\n<div class=\"flex items-start gap-3\">\n<!-- Circular Portrait Avatar -->\n<div class=\"relative w-12 h-12 rounded-full overflow-hidden border-2 border-rosegold/65 bg-pitch shrink-0\">\n<img alt=\"صورة الطبيب\" class=\"doctor-portrait-img w-full h-full object-cover object-top scale-110\" data-portrait=\"tip\" src=\"data:image/jpeg;base64,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\"/>\n<div class=\"w-full h-full flex items-center justify-center bg-charcoalLight text-rosegoldSoft hidden\" data-portrait-fallback=\"tip\">\n<svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" viewbox=\"0 0 24 24\">\n<path d=\"M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n</div>\n</div>\n<div class=\"flex-1 min-w-0\">\n<div class=\"flex items-center justify-between gap-2\">\n<span class=\"text-[11px] font-bold text-rosegoldSoft\">نصيحة طبية لهذه المرحلة</span>\n<span class=\"signature-script text-xl opacity-90 select-none\" style=\"white-space:nowrap;flex-shrink:0\" dir=\"ltr\">Dr. Ahmed Elnajar</span>\n</div>\n<p class=\"text-xs text-crisp font-medium mt-1.5 leading-relaxed\" id=\"stage-clinical-pearl\">اشرب ٢.٥ إلى ٣ لترات من الماء يومياً وامشِ بهدوء كل ساعتين داخل البيت؛ هذه العادة تختصر التورم بشكل واضح.</p>\n</div>\n</div>\n</article>\n<!-- Prev / Next Stage Navigation Buttons -->\n<div class=\"grid grid-cols-2 gap-2.5 pt-1\">\n<button class=\"min-h-[48px] flex items-center justify-center gap-1.5 px-3 py-3 rounded-2xl bg-charcoal hover:bg-charcoalLight border border-white/10 hover:border-rosegold/40 text-xs font-bold text-crisp disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer\" disabled=\"\" id=\"btn-prev-stage\" type=\"button\">\n<svg class=\"w-4 h-4 text-rosegoldSoft shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.1\" viewbox=\"0 0 24 24\">\n<path d=\"M9 5l7 7-7 7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n<span>المرحلة السابقة</span>\n</button>\n<button class=\"min-h-[48px] flex items-center justify-center gap-1.5 px-3 py-3 rounded-2xl bg-rosegold hover:bg-rosegoldSoft text-pitch text-xs font-extrabold disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-roseglow\" id=\"btn-next-stage\" type=\"button\">\n<span>المرحلة التالية</span>\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.3\" viewbox=\"0 0 24 24\">\n<path d=\"M15 19l-7-7 7-7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n</button>\n</div>\n</main><section aria-label=\"علامات الأمان والمتابعة\" class=\"mb-6 space-y-4\">\n<!-- Calm Red Flags Card -->\n<div class=\"bg-gradient-to-b from-[#161014] via-charcoal to-pitch border border-rose-400/25 rounded-3xl p-4 shadow-card\">\n<div class=\"flex items-start gap-3 mb-3.5\">\n<div class=\"w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-400/30 flex items-center justify-center text-rose-300 shrink-0\">\n<svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewbox=\"0 0 24 24\">\n<path d=\"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n</div>\n<div>\n<h3 class=\"text-sm font-extrabold text-crisp font-display\">علامات الأمان — متى تتواصل معنا؟</h3>\n<p class=\"text-[11px] text-silver mt-0.5 leading-relaxed\">\n                            مسار التعافي يكون هادئاً في الغالب، لكن عند ملاحظة أي علامة مما يلي تواصل معنا فوراً للاطمئنان:\n                        </p>\n</div>\n</div>\n<!-- General Warning Signs -->\n<div class=\"space-y-2 text-xs text-crisp/90\">\n<div class=\"flex items-start gap-2 bg-pitch/80 border border-white/[0.06] rounded-2xl p-3\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5\"></span>\n<span>ارتفاع حرارة الجسم أعلى من <strong class=\"text-rose-200\" dir=\"ltr\">38.5°C</strong> دون استجابة للخافض.</span>\n</div>\n<div class=\"flex items-start gap-2 bg-pitch/80 border border-white/[0.06] rounded-2xl p-3\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5\"></span>\n<span>تورم مفاجئ وغير متماثل أو <strong class=\"text-rose-200\">ألم حاد متصاعد</strong> في جهة واحدة.</span>\n</div>\n<div class=\"flex items-start gap-2 bg-pitch/80 border border-white/[0.06] rounded-2xl p-3\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5\"></span>\n<span>احمرار متزايد وسخونة حول موضع الإجراء أو <strong class=\"text-rose-200\">إفرازات غير معتادة</strong> أو ضيق تنفس مفاجئ.</span>\n</div>\n</div>\n<!-- Procedure-Specific Warning Signs -->\n<div class=\"mt-3 p-3.5 rounded-2xl bg-rosegold/[0.08] border border-rosegold/30\">\n<div class=\"text-[11px] font-bold text-rosegoldSoft mb-1.5 flex items-center gap-1.5\">\n<svg class=\"w-3.5 h-3.5 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewbox=\"0 0 24 24\">\n<path d=\"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n<span>تنبيهات خاصة بإجراء <span id=\"safety-proc-name\">نحت القوام بالفيزر</span>:</span>\n</div>\n<ul class=\"space-y-1.5 text-xs text-crisp/90 leading-relaxed\" id=\"procedure-specific-flags\">\n<li class=\"flex items-start gap-2\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rosegoldSoft shrink-0 mt-2\"></span>\n<span>تورم وألم مفاجئ في ساق واحدة مع شد في عضلة السمانة.</span>\n</li>\n<li class=\"flex items-start gap-2\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rosegoldSoft shrink-0 mt-2\"></span>\n<span>خروج سوائل عكرة أو غزيرة بعد إغلاق فتحات النحت الدقيقة.</span>\n</li>\n<li class=\"flex items-start gap-2\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-rosegoldSoft shrink-0 mt-2\"></span>\n<span>دوخة مستمرة لا تتحسن مع شرب السوائل والراحة.</span>\n</li>\n</ul>\n</div>\n</div>\n<!-- WhatsApp Follow-Up Card with Circular Portrait Avatar -->\n<div class=\"bg-charcoal border border-rosegold/35 rounded-3xl p-5 shadow-card text-center\">\n<div class=\"relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-rosegold/70 bg-pitch mb-3 shadow-roseglow\">\n<img alt=\"صورة الطبيب\" class=\"doctor-portrait-img w-full h-full object-cover object-top scale-110\" data-portrait=\"wa\" src=\"data:image/jpeg;base64,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\"/>\n<div class=\"w-full h-full flex items-center justify-center bg-charcoalLight text-rosegoldSoft hidden\" data-portrait-fallback=\"wa\">\n<svg class=\"w-7 h-7\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" viewbox=\"0 0 24 24\">\n<path d=\"M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n</div>\n</div>\n<h4 class=\"font-bold text-sm text-crisp\">فريق المتابعة الطبية</h4>\n<p class=\"text-xs text-silver mt-1 leading-relaxed max-w-xs mx-auto\">\n                    لأي استفسار عن مرحلتك الحالية أو للاطمئنان على أي عرض، تواصل مباشرة برسالة جاهزة بنوع إجرائك وتاريخ العملية.\n                </p>\n<a class=\"mt-4 w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-rosegold hover:bg-rosegoldSoft text-pitch font-extrabold text-xs transition-colors shadow-roseglow\" href=\"https://wa.me/201210304060?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D8%B1%D8%AD%D9%84%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%81%D9%8A%20%D8%A8%D8%B9%D8%AF%20%D8%A5%D8%AC%D8%B1%D8%A7%D8%A1%3A%20%D9%86%D8%AD%D8%AA%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D9%85%20%D8%A8%D8%A7%D9%84%D9%81%D9%8A%D8%B2%D8%B1\" id=\"safety-wa-link\" rel=\"noopener noreferrer\" target=\"_blank\">\n<svg class=\"w-4 h-4 shrink-0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.1\" viewbox=\"0 0 24 24\">\n<path d=\"M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>\n<span>تواصل عبر واتساب الآن</span>\n</a>\n<div class=\"mt-2 text-[11px] text-silver tracking-wider\" dir=\"ltr\">01210304060</div>\n</div>\n</section></div><style>\n@keyframes dreLedBreathe {0%,100%{opacity:.4;box-shadow:0 0 2px currentColor}50%{opacity:1;box-shadow:0 0 10px currentColor}}\n.dre-live-led{animation:dreLedBreathe 2.2s ease-in-out infinite;color:#dfb99b}\n.dre-live-led.bg-emerald-400{color:#34d399}\n.dre-live-led.bg-amber-400{color:#fbbf24}\n.dre-live-led.bg-rose-400{color:#fb7185}\n#timeline-tabs button.bg-rosegold::after{content:\"\";display:block;width:6px;height:6px;flex-shrink:0;border-radius:50%;background:#34d399;color:#34d399;animation:dreLedBreathe 2.2s ease-in-out infinite}\n@media(prefers-reduced-motion:reduce){.dre-live-led,#timeline-tabs button.bg-rosegold::after{animation:none;opacity:1;box-shadow:0 0 5px currentColor}}\n</style>";
 function mount(root) {

        /**
         * 7 Detailed Recovery Stages
         */
        const STAGES_META = [
            { id: 0, shortLabel: 'الأيام الأولى',      rangeLabel: '١ – ٣ أيام',    dayRange: [0, 3] },
            { id: 1, shortLabel: 'الأسبوع الأول',       rangeLabel: '٤ – ٧ أيام',    dayRange: [4, 7] },
            { id: 2, shortLabel: 'الأسبوع الثاني',      rangeLabel: '٨ – ١٤ يوم',    dayRange: [8, 14] },
            { id: 3, shortLabel: 'الأسبوع ٣ – ٤',       rangeLabel: 'الأسبوع ٣ – ٤', dayRange: [15, 28] },
            { id: 4, shortLabel: 'الشهر الثاني',        rangeLabel: 'الأسبوع ٥ – ٨', dayRange: [29, 56] },
            { id: 5, shortLabel: 'الشهر الثالث',        rangeLabel: 'الأسبوع ٩ – ١٢', dayRange: [57, 90] },
            { id: 6, shortLabel: 'النتيجة النهائية',    rangeLabel: '٣ – ٦ أشهر',    dayRange: [91, 99999] }
        ];

        /**
         * Standardized 5 Activity Status Rows Builder
         * Status: 'rest' (راحة) | 'partial' (جزئي) | 'available' (متاح)
         */
        function makeActivityRows(dailyMove, deskWork, driving, cardio, gym) {
            return [
                { label: 'الحركة اليومية', status: dailyMove[0], note: dailyMove[1] },
                { label: 'العمل المكتبي',  status: deskWork[0],  note: deskWork[1] },
                { label: 'القيادة',        status: driving[0],   note: driving[1] },
                { label: 'الكارديو',       status: cardio[0],    note: cardio[1] },
                { label: 'الجيم',          status: gym[0],       note: gym[1] }
            ];
        }

        /**
         * Complete Clinical Recovery Protocols for All 8 Procedures
         */
        const PROCEDURES = {
            /* 1. 4D VASER */
            vaser: {
                id: 'vaser',
                title: 'نحت القوام بالفيزر',
                subtitle: '4D VASER',
                hint: 'عودة سريعة نسبياً للعمل • انكماش تدريجي للجلد خلال ٣ – ٦ أشهر',
                redFlags: [
                    'تورم وألم مفاجئ في ساق واحدة مع شد في عضلة السمانة.',
                    'خروج سوائل عكرة أو غزيرة بعد إغلاق فتحات النحت الدقيقة.',
                    'دوخة مستمرة لا تتحسن مع شرب السوائل والراحة.'
                ],
                milestones: [
                    { label: 'أول متابعة وبداية المساج', days: 4, note: '٣ – ٥ أيام' },
                    { label: 'العودة للعمل المكتبي', days: 6, note: '٥ – ٧ أيام' },
                    { label: 'القيادة الآمنة', days: 6, note: '٥ – ٧ أيام' },
                    { label: 'الكارديو الخفيف', days: 18, note: '٢ – ٣ أسابيع' },
                    { label: 'الجيم والأوزان الكاملة', days: 38, note: '٤ – ٦ أسابيع' }
                ],
                matrix: [
                    { title: 'الاستحمام', value: '٤٨ – ٧٢ ساعة', icon: 'drop' },
                    { title: 'القيادة', value: '٥ – ٧ أيام', icon: 'car' },
                    { title: 'العمل المكتبي', value: '٥ – ٧ أيام', icon: 'briefcase' },
                    { title: 'الكارديو والمشي', value: 'مشي فوراً • كارديو ٢ – ٣ أسبوع', icon: 'run' },
                    { title: 'الجيم الكامل', value: '٤ – ٦ أسابيع', icon: 'dumbbell' },
                    { title: 'مدة المشد الطبي', value: '٦ أسابيع', icon: 'shield' }
                ],
                stages: [
                    {
                        swelling: 92, readiness: 25,
                        summary: 'تصريف سوائل الحقن الأولي والمشي الهادئ داخل المنزل لتنشيط الدورة الدموية.',
                        normal: [
                            'خروج سائل وردي خفيف من الفتحات الدقيقة أول ٢٤ – ٤٨ ساعة وهو أمر طبيعي تماماً.',
                            'ألم عضلي يشبه تمريناً شاقاً مع تورم وكدمات مبدئية تهدأ بالمسكنات الموصوفة.',
                            'تنميل سطحي مؤقت في الجلد يختفي تدريجياً خلال الأسابيع القادمة.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي هادئ داخل المنزل ٥ دقائق كل ساعتين بقامة مستقيمة'],
                            ['rest', 'راحة منزلية لتصريف السوائل وتخفيف التورم'],
                            ['rest', 'مؤجلة لحين إيقاف المسكنات المهدئة'],
                            ['rest', 'ممنوع في الأيام الأولى'],
                            ['rest', 'ممنوع حمل الأوزان تماماً']
                        ),
                        protocolPrimary: ['المشد الطبي (الفاجا) والفوم', '٢٤ ساعة يومياً', 'دعم مستمر لتثبيت الأنسجة ومنع تجمع السوائل؛ يُخلع فقط للاستحمام السريع بعد الإذن.'],
                        protocolSecondary: ['المساج الليمفاوي المتخصص', 'يبدأ اليوم ٣ – ٥', 'بدء أول جلسة تصريف ليمفاوي لطيف لتسريع خروج السوائل وتنعيم الجلد.'],
                        pearl: 'اشرب ٢.٥ إلى ٣ لترات من الماء يومياً وامشِ بهدوء كل ساعتين داخل البيت؛ هذه العادة تختصر التورم بشكل واضح.'
                    },
                    {
                        swelling: 78, readiness: 48,
                        summary: 'إغلاق فتحات النحت وتراجع الألم مع بداية العودة للعمل المكتبي والقيادة.',
                        normal: [
                            'توقف خروج السوائل وإغلاق الفتحات الدقيقة مع تحول الكدمات للأصفر.',
                            'استمرار التورم مع بداية تيبس أو تكتلات سطحية مؤقتة تحت الجلد.',
                            'انخفاض واضح في الحاجة للمسكنات وتحسن جودة النوم.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية مريحة ومشي خارجي هادئ ١٥ دقيقة'],
                            ['available', 'العودة للعمل المكتبي بين اليوم ٥ و٧ مع فواصل حركة'],
                            ['partial', 'بعد إيقاف المسكنات القوية والقدرة على الالتفاف بأريحية'],
                            ['rest', 'مؤجل للأسبوع الثالث'],
                            ['rest', 'ممنوع حمل الأوزان الآن']
                        ),
                        protocolPrimary: ['المشد الطبي (المرحلة الأولى)', '٢٤ ساعة يومياً', 'فرد المشد بسلاسة دون أي ثنيات ضاغطة يحافظ على استواء سطح الجلد.'],
                        protocolSecondary: ['المساج الليمفاوي المنتظم', '٢ – ٣ جلسات أسبوعياً', 'التصريف اليدوي المتخصص يمنع التليفات ويساعد في إبراز تفاصيل النحت.'],
                        pearl: 'لا تعتمد على الميزان خلال الأسبوع الأول؛ السوائل المحتبسة طبيعياً قد ترفع الوزن مؤقتاً قبل تلاشيها.'
                    },
                    {
                        swelling: 62, readiness: 68,
                        summary: 'اختفاء معظم الكدمات، زيادة الليونة، وبداية ظهور الخطوط الأولى للنحت.',
                        normal: [
                            'تلاشي أغلب الكدمات السطحية وانحسار ملحوظ في التورم الحاد.',
                            'مناطق صلبة مؤقتة أو حكة خفيفة تحت الجلد؛ وهي مرحلة طبيعية لانكماش الجلد.',
                            'وضوح أولي في تحديد الخصر والأجناب مع تورم مسائي خفيف يهدأ صباحاً.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حياة يومية ومشي سريع منتظم دون عناء'],
                            ['available', 'عمل مكتبي كامل مع فواصل وقوف قصيرة'],
                            ['available', 'قيادة مريحة وآمنة بالكامل'],
                            ['partial', 'كارديو خفيف جداً نهاية الأسبوع الثاني حسب الراحة'],
                            ['rest', 'تأجيل الأوزان حتى إتمام الأسبوع الرابع']
                        ),
                        protocolPrimary: ['تعديل مقاس المشد الطبي', '٢٤ ساعة يومياً', 'تضييق المشد أو الانتقال لمقاس أصغر مع تراجع التورم يحافظ على جودة التشكيل.'],
                        protocolSecondary: ['المساج الليمفاوي + العناية بالفتحات', '٢ جلسة أسبوعياً', 'فك أي تيبس متبقٍ وبدء كريمات العناية بآثار الفتحات الدقيقة.'],
                        pearl: 'خفّض الملح والمخللات وارفع البروتين الصحي؛ الصوديوم الزائد يضاعف التورم المسائي مباشرة.'
                    },
                    {
                        swelling: 40, readiness: 82,
                        summary: 'بروز أوضح لتفاصيل الفيزر، بدء الكارديو المنتظم، وتخفيف المشد بنهاية الشهر.',
                        normal: [
                            'ليونة أفضل في الأنسجة المنحوتة وتراجع كبير في التورم العام.',
                            'تفاوت طفيف ومؤقت في التورم بين الصباح والمساء يقل تدريجياً.',
                            'هدوء آثار الفتحات الصغيرة واستعادة تدريجية للإحساس الجلدي.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كافة الأنشطة اليومية بسلاسة'],
                            ['available', 'الأعمال المكتبية والميدانية الخفيفة'],
                            ['available', 'قيادة وسفر بأريحية تامة'],
                            ['available', 'مشاية ودراجة ثابتة بشدة خفيفة إلى متوسطة'],
                            ['partial', 'بداية أوزان خفيفة (٥٠٪) في نهاية الأسبوع الرابع دون إجهاد مفرط']
                        ),
                        protocolPrimary: ['المشد الطبي (المرحلة الثانية)', '١٢ ساعة يومياً بعد الأسبوع ٤', 'ارتداء المشد نصف اليوم (نهاراً أو ليلاً) حتى إتمام الأسبوع السادس.'],
                        protocolSecondary: ['مساج عند الحاجة + سيليكون', 'جلسة أسبوعية', 'متابعة أي تيبس متبقٍ والالتزام بجل السيليكون لآثار الفتحات.'],
                        pearl: 'تورم خفيف بعد أول حصص الكارديو أمر متوقع؛ ارتدِ المشد بعد التمرين واشرب كمية كافية من الماء.'
                    },
                    {
                        swelling: 20, readiness: 94,
                        summary: 'إيقاف المشد غالباً والعودة المنظمة للأوزان الكاملة وتمارين المقاومة.',
                        normal: [
                            'انحسار أغلب التورم الظاهري مع استمرار انكماش الجلد بفضل الفيزر.',
                            'مرونة كاملة أثناء التمدد والحركة وتلاشي الإحساس بالشد الداخلي.',
                            'زوال معظم التنميل السطحي وعودة نعومة الجلد الطبيعية.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية كاملة ١٠٠٪'],
                            ['available', 'نشاط مهني كامل ١٠٠٪'],
                            ['available', 'دون أي قيود'],
                            ['available', 'كارديو عالي الشدة وسباحة'],
                            ['available', 'الأوزان الكاملة وتمارين البطن بالتدرج من الأسبوع ٥ – ٦']
                        ),
                        protocolPrimary: ['المشد الطبي', 'إيقاف بعد ٦ أسابيع', 'يمكن إيقاف المشد تماماً بعد الأسبوع السادس، أو ارتداؤه اختيارياً أثناء التمرين.'],
                        protocolSecondary: ['الرياضة وتنشيط العضلات', 'روتين مستدام', 'التركيز الآن على التمرين المنتظم والتغذية المتوازنة.'],
                        pearl: 'تمارين المقاومة الآن تبرز تفاصيل النحت رباعي الأبعاد بشكل مضاعف وتمنحك تناسقاً رياضياً واضحاً.'
                    },
                    {
                        swelling: 8, readiness: 100,
                        summary: 'نضوج كبير في تناسق القوام وانكماش الجلد مع زوال التورم المسائي.',
                        normal: [
                            'ثبات واضح في قياسات الجسم وتناغم كامل بين المناطق المنحوتة.',
                            'تحسن مستمر في مرونة الجلد وجودته مع بهتان آثار الفتحات الدقيقة.',
                            'عودة الإحساس الطبيعي للجلد بشكل شبه كامل.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'دون أي قيود'],
                            ['available', 'جميع أنواع الكارديو والسباحة'],
                            ['available', 'رفع أوزان وتمارين مقاومة كاملة']
                        ),
                        protocolPrimary: ['المشد الطبي', 'غير مطلوب', 'استقرت الأنسجة ولا توجد حاجة لأي مشدات طبية.'],
                        protocolSecondary: ['الحماية من الشمس والترطيب', 'عناية يومية', 'واقي الشمس على آثار الفتحات عند التعرض للشمس يمنع التصبغ.'],
                        pearl: 'حافظ على ثبات وزنك؛ الخلايا الدهنية المزالة لا تعود لكن الزيادة الكبيرة تؤثر على التناسق العام.'
                    },
                    {
                        swelling: 0, readiness: 100,
                        summary: 'اكتمال انكماش الجلد وزوال آخر بقايا التورم العميق لرؤية النتيجة النهائية المستقرة.',
                        normal: [
                            'استقرار نهائي في القوام بنعومة طبيعية وتحديد متناغم للخصر والعضلات.',
                            'زوال آخر نسبة طفيفة من التورم العميق وعودة الإحساس بالكامل.',
                            'اندماج آثار الفتحات الدقيقة مع لون الجلد الطبيعي تقريباً.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كافة التمارين الرياضية والأوزان']
                        ),
                        protocolPrimary: ['المتابعة الختامية', 'تقييم النتيجة المستقرة', 'تقييم نهائي للنتيجة ومقارنتها بمرحلة ما قبل الإجراء.'],
                        protocolSecondary: ['أسلوب حياة صحي', 'دائم', 'شرب الماء والرياضة المنتظمة يضمنان استدامة النتيجة لسنوات.'],
                        pearl: 'النتيجة النهائية المستقرة ثمرة دقة الإجراء والتزامك الكامل؛ استمتع بقوامك الجديد بثقة واستمرارية.'
                    }
                ]
            },

            /* 2. ABDOMINOPLASTY */
            abdominoplasty: {
                id: 'abdominoplasty',
                title: 'شد البطن',
                subtitle: 'Abdominoplasty',
                hint: 'حماية خط الجرح وإصلاح العضلات أولوية • استقرار النتيجة ٣ – ٦ أشهر',
                redFlags: [
                    'تورم وألم مفاجئ في ساق واحدة أو صعوبة مفاجئة في التنفس.',
                    'انفكاك في حافة خط الجرح أو تغير داكن مفاجئ في جلد أسفل البطن.',
                    'امتلاء مفاجئ وسريع للدرنقة بدم صريح أحمر فاتح.'
                ],
                milestones: [
                    { label: 'إزالة الدرنقة / أول متابعة', days: 7, note: '٥ – ١٠ أيام' },
                    { label: 'العودة للعمل المكتبي', days: 12, note: '١٠ – ١٤ يوماً' },
                    { label: 'القيادة واستقامة الظهر', days: 14, note: '٢ أسبوع' },
                    { label: 'الكارديو الخفيف', days: 35, note: '٤ – ٦ أسابيع' },
                    { label: 'الجيم وتمارين البطن الكاملة', days: 70, note: '٨ – ١٢ أسبوعاً' }
                ],
                matrix: [
                    { title: 'الاستحمام', value: 'بعد الإذن / الدرنقة', icon: 'drop' },
                    { title: 'القيادة', value: '٢ أسبوع', icon: 'car' },
                    { title: 'العمل المكتبي', value: '١٠ – ١٤ يوماً', icon: 'briefcase' },
                    { title: 'الكارديو والمشي', value: 'مشي منحني • كارديو ٤ – ٦ أسبوع', icon: 'run' },
                    { title: 'الجيم الكامل', value: '٨ – ١٢ أسبوعاً', icon: 'dumbbell' },
                    { title: 'مدة المشد الطبي', value: '٦ – ٨ أسابيع', icon: 'shield' }
                ],
                stages: [
                    {
                        swelling: 95, readiness: 15,
                        summary: 'حماية خط الجرح وغرز إصلاح العضلات مع المشي بوضعية منحنية خفيفة.',
                        normal: [
                            'المشي بوضعية منحنية قليلاً للأمام مقصود ومطلوب لتخفيف الشد عن خط الجرح.',
                            'شد واضح في جدار البطن عند النهوض أو السعال نتيجة تقريب العضلات.',
                            'النوم شبه جالس مع وسائد تحت الركبتين ومتابعة كمية الدرنقة يومياً إن وُجدت.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي قصير داخل البيت بوضعية منحنية كل ساعتين للوقاية من الجلطات'],
                            ['rest', 'الراحة التامة بالمنزل أولوية مطلقة'],
                            ['rest', 'ممنوعة لمدة أسبوعين تقريباً'],
                            ['rest', 'ممنوع تماماً'],
                            ['rest', 'ممنوع حمل أكثر من ٢ – ٣ كجم']
                        ),
                        protocolPrimary: ['مشد وحزام شد البطن الطبي', '٢٤ ساعة يومياً', 'دعم مستمر لجدار البطن يقلل التورم ويحمي الجرح دون ضغط يعيق التنفس.'],
                        protocolSecondary: ['وضعية النوم والعناية بالدرنقة', 'متابعة يومية', 'الحفاظ على جفاف الضمادات واستخدام الملينات الموصوفة لمنع أي ضغط على العضلات.'],
                        pearl: 'للنهوض بأمان، استدر على جانبك أولاً ثم استند بذراعيك بدلاً من الضغط المباشر على عضلات البطن.'
                    },
                    {
                        swelling: 82, readiness: 30,
                        summary: 'فحص خط الجرح وإزالة الدرنقة غالباً مع تراجع تدريجي في الانحناء والألم.',
                        normal: [
                            'تراجع السوائل وإزالة الدرنقة عادةً بين اليوم الخامس والعاشر في المتابعة.',
                            'انحسار الألم الحاد وبداية الاقتراب التدريجي من الوقوف الأكثر راحة.',
                            'بقاء التورم والتنميل المؤقت أسفل السرة وحول خط الجرح.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'زيادة المشي الهادئ داخل المنزل دون إجبار الظهر على الاستقامة'],
                            ['rest', 'مهام خفيفة عن بُعد بنهاية الأسبوع حسب مستوى الراحة'],
                            ['rest', 'مؤجلة حتى استقامة الظهر وإيقاف المسكنات القوية'],
                            ['rest', 'مؤجل للشهر الثاني'],
                            ['rest', 'ممنوع حمل الأوزان أو الأطفال']
                        ),
                        protocolPrimary: ['مشد شد البطن الطبي', '٢٤ ساعة يومياً', 'الاستحمام بماء فاتر بعد إذن الطبيب مع تجفيف خط الجرح بالتربيت اللطيف.'],
                        protocolSecondary: ['العناية بخط الجرح والسرة', 'غيار طبي منظم', 'عدم وضع مراهم تجميلية قبل التأكد من الإغلاق السطحي الكامل.'],
                        pearl: 'لا تجبر ظهرك على الاستقامة بالقوة؛ ستستقيم قامتك تلقائياً وبأريحية بمجرد استرخاء الأنسجة.'
                    },
                    {
                        swelling: 68, readiness: 55,
                        summary: 'الوقوف بقامة مستقيمة والعودة للعمل المكتبي والقيادة الآمنة.',
                        normal: [
                            'استقامة القامة بالكامل غالباً بنهاية الأسبوع الثاني مع مشي أكثر مرونة.',
                            'التئام الطبقة السطحية لخط الجرح والسرة مع وخز عابر لاستعادة الإحساس.',
                            'تورم واضح فوق خط الجرح مباشرة يزداد قليلاً مساءً ويهدأ مع الراحة.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية مريحة ومشي خارجي هادئ ١٥ – ٢٠ دقيقة'],
                            ['available', 'العودة للعمل المكتبي بين اليوم ١٠ – ١٤ مع فواصل حركة'],
                            ['available', 'بعد استقامة الظهر والقدرة على الضغط السريع على الفرامل'],
                            ['rest', 'مؤجل حتى إتمام الأسبوع الرابع – السادس'],
                            ['rest', 'ممنوع حمل أوزان فوق ٥ كجم أو إجهاد البطن']
                        ),
                        protocolPrimary: ['المشد الطبي الداعم', '٢٤ ساعة يومياً', 'الالتزام بالمشد أثناء الجلوس والعمل يدعم استواء البطن ويقلل تورم المساء.'],
                        protocolSecondary: ['بداية العناية بالأثر', 'عند الإغلاق ١٠٠٪', 'بعد تأكد الطبيب من الإغلاق الكامل يبدأ بروتوكول جل أو شرائح السيليكون.'],
                        pearl: 'قف وتمشّ لدقيقتين كل ساعة أثناء العمل المكتبي؛ الجلوس المتواصل يزيد تجمع السوائل فوق خط الجرح.'
                    },
                    {
                        swelling: 48, readiness: 72,
                        summary: 'ثبات الالتئام السطحي، راحة أكبر في النوم على الجانبين، ووضوح استواء البطن.',
                        normal: [
                            'انحسار ملموس في التورم العلوي مع وضوح استواء البطن وتحديد الخصر.',
                            'القدرة على النوم على الجانبين بأريحية أكبر ومرونة عالية يومياً.',
                            'ظهور اللون الوردي لخط الأثر وهي مرحلة طبيعية قبل البهتان التدريجي.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية كاملة ومشي سريع منتظم'],
                            ['available', 'العمل المكتبي والأعمال اليومية بالكامل'],
                            ['available', 'قيادة وسفر بشكل طبيعي'],
                            ['partial', 'بداية كارديو خفيف جداً بنهاية الأسبوع الرابع بعد الإذن'],
                            ['rest', 'ممنوع تمارين البطن والأوزان الثقيلة لحماية إصلاح العضلات']
                        ),
                        protocolPrimary: ['المشد الطبي', '٢٤ ساعة ثم تقليل للأسبوع ٥', 'الحفاظ على الدعم الضاغط لتقليل التورم فوق الأثر.'],
                        protocolSecondary: ['شرائح وجل السيليكون الطبي', 'يومياً بانتظام', 'الالتزام بالسيليكون مع تدليك لطيف يحسّن ملمس ولون الأثر بوضوح.'],
                        pearl: 'الغرز الداخلية لإصلاح العضلات تحتاج ٨ إلى ١٢ أسبوعاً لتصل لقوتها الكاملة؛ لا تستعجل تمارين البطن.'
                    },
                    {
                        swelling: 28, readiness: 86,
                        summary: 'الكارديو المتوسط والأوزان الخفيفة للأطراف مع إنهاء مرحلة المشد تدريجياً.',
                        normal: [
                            'استواء واضح وثبات جيد لجدار البطن مع تورم بسيط فقط بعد الأيام المجهدة.',
                            'تحسن تدريجي في الإحساس الجلدي أسفل السرة.',
                            'إمكانية السباحة بحرية بعد التأكد الكامل من التئام الجرح والسرة.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حياة يومية كاملة وجري خفيف'],
                            ['available', 'كافة الأعمال المكتبية والميدانية'],
                            ['available', 'دون أي قيود'],
                            ['available', 'كارديو متوسط الشدة (مشاية / دراجة / إيلبتيكال)'],
                            ['partial', 'أوزان خفيفة للأطراف فقط؛ وتأجيل تمارين البطن لما بعد الأسبوع ٨']
                        ),
                        protocolPrimary: ['المشد الطبي', '١٢ ساعة ثم إيقاف (أسبوع ٦ – ٨)', 'يُخفف المشد إلى ١٢ ساعة نهاراً ثم يُوقف وفق تقييم المتابعة.'],
                        protocolSecondary: ['السيليكون + الحماية من الشمس', 'روتين يومي', 'حماية خط الأثر من الشمس المباشرة ضرورية لمنع اسمرار اللون.'],
                        pearl: 'عند التمرن بأوزان خفيفة للأطراف، تنفّس بسلاسة وتجنب حبس النفس أو شد البطن بقوة أثناء الرفع.'
                    },
                    {
                        swelling: 12, readiness: 96,
                        summary: 'ثبات إصلاح العضلات والعودة المنظمة للجيم وتمارين البطن التدريجية.',
                        normal: [
                            'تلاشي التورم المسائي بنسبة كبيرة جداً واستقرار ملمس البطن.',
                            'جاهزية جدار البطن للعودة التدريجية لتمارين المقاومة والكور بعد التقييم.',
                            'بداية بهتان تدريجي في لون أثر الجرح.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'دون قيود'],
                            ['available', 'كارديو كامل بجميع شداته'],
                            ['available', 'الجيم والأوزان وتمارين البطن بالتدرج الآمن (أسبوع ٩ – ١٢)']
                        ),
                        protocolPrimary: ['المشد الطبي', 'تم إيقافه بالكامل', 'انتهت مرحلة المشد الطبي في أغلب الحالات.'],
                        protocolSecondary: ['استمرار السيليكون للأثر', 'حتى الشهر ٣ – ٦', 'مواصلة السيليكون تمنحك أنعم وأرفع نتيجة تجميلية لخط الأثر.'],
                        pearl: 'ابدأ تمارين الكور بالتدريج وأوقف أي حركة تسبب ألماً ساحباً في منتصف البطن.'
                    },
                    {
                        swelling: 0, readiness: 100,
                        summary: 'النتيجة النهائية المستقرة لشد البطن مع استمرار نضج الأثر حتى عام.',
                        normal: [
                            'زوال التورم المتبقي تماماً واستقرار شكل البطن المسطح والمشدود.',
                            'عودة أغلب الإحساس الجلدي الطبيعي مع ليونة كاملة في الأنسجة.',
                            'أثر الجرح يصبح أكثر نعومة وبهتاناً ويستمر تحسنه حتى ١٢ شهراً.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'جميع التمارين والأوزان وتمارين البطن']
                        ),
                        protocolPrimary: ['المتابعة الختامية', 'تقييم شامل', 'تقييم نهائي لشكل البطن وجودة الأثر.'],
                        protocolSecondary: ['استدامة النتيجة', 'نمط حياة صحي', 'استقرار الوزن وتقوية العضلات يحفظان نتيجتك لسنوات طويلة.'],
                        pearl: 'التوازن الغذائي والرياضة المنتظمة هما الضمان الحقيقي لثبات شد البطن على المدى الطويل.'
                    }
                ]
            },

            /* 3. COMBINED (ABDOMINOPLASTY + VASER) */
            combined: {
                id: 'combined',
                title: 'شد البطن مع نحت القوام',
                subtitle: 'Combined Procedure',
                hint: 'عناية مزدوجة للجرح والخصر ٣٦٠° • النتيجة المستقرة ٤ – ٦ أشهر',
                redFlags: [
                    'ضيق مفاجئ في التنفس أو تسارع غير معتاد في النبض أو دوخة شديدة متكررة.',
                    'تورم وألم مفاجئ في ساق واحدة.',
                    'انفكاك في حافة خط الجرح أو امتلاء سريع للدرنقة بدم صريح.'
                ],
                milestones: [
                    { label: 'الدرنقة وبداية مساج الظهر', days: 7, note: '٥ – ١٠ أيام' },
                    { label: 'العودة للعمل المكتبي', days: 13, note: '١٠ – ١٤ يوماً' },
                    { label: 'القيادة واستقامة الظهر', days: 14, note: '٢ أسبوع' },
                    { label: 'الكارديو الخفيف', days: 38, note: '٥ – ٦ أسابيع' },
                    { label: 'الجيم وتمارين البطن الكاملة', days: 75, note: '٨ – ١٢ أسبوعاً' }
                ],
                matrix: [
                    { title: 'الاستحمام', value: 'بعد الإذن / الدرنقة', icon: 'drop' },
                    { title: 'القيادة', value: '٢ أسبوع', icon: 'car' },
                    { title: 'العمل المكتبي', value: '١٠ – ١٤ يوماً', icon: 'briefcase' },
                    { title: 'الكارديو والمشي', value: 'مشي منحني • كارديو ٥ – ٦ أسبوع', icon: 'run' },
                    { title: 'الجيم الكامل', value: '٨ – ١٢ أسبوعاً', icon: 'dumbbell' },
                    { title: 'مدة المشد الطبي', value: '٦ – ٨ أسابيع', icon: 'shield' }
                ],
                stages: [
                    {
                        swelling: 96, readiness: 15,
                        summary: 'راحة ذكية وتغذية غنية بالبروتين لدعم تعافي البطن والخصر والظهر معاً.',
                        normal: [
                            'المشي بانحناء خفيف لحماية شد البطن، مع ألم عضلي في الظهر والأجناب نتيجة الفيزر.',
                            'خروج سوائل وردية خفيفة من فتحات النحت الخلفية أول ٤٨ ساعة، إضافة لمتابعة الدرنقة.',
                            'تورم وكدمات أوسع قليلاً من الإجراء المفرد وهو متوقع في النحت الشامل ٣٦٠°.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي قصير داخل البيت كل ساعتين بانحناء خفيف للوقاية من الجلطات'],
                            ['rest', 'التركيز الكامل على الراحة والتعافي'],
                            ['rest', 'ممنوعة لمدة أسبوعين تقريباً'],
                            ['rest', 'ممنوع تماماً'],
                            ['rest', 'ممنوع حمل أي أثقال']
                        ),
                        protocolPrimary: ['المشد الشامل ٣٦٠ درجة', '٢٤ ساعة يومياً', 'يجمع بين دعم جدار البطن والضغط المتوازن على الخصر والظهر.'],
                        protocolSecondary: ['السوائل والبروتين والدرنقة', 'رعاية أولية دقيقة', 'الإكثار من الماء والبروتين وتسجيل كمية الدرنقة يومياً قبل بدء أي مساج.'],
                        pearl: 'التغذية الغنية بالبروتين والحديد والسوائل هي الوقود الحقيقي لطاقتك والتئام الأنسجة في الإجراء المركب.'
                    },
                    {
                        swelling: 84, readiness: 28,
                        summary: 'إزالة الدرنقة غالباً وتراجع ألم الأجناب والظهر مع انحناء أخف.',
                        normal: [
                            'انخفاض السوائل وإزالة الدرنقة غالباً بين اليوم الخامس والعاشر.',
                            'تحسن تدريجي في ألم الأجناب والظهر وبداية تراجع الانحناء أثناء المشي.',
                            'تيبس بسيط في مناطق النحت يستجيب لاحقاً للمساج الليمفاوي اللطيف.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي هادئ متكرر داخل المنزل براحة أكبر'],
                            ['rest', 'مهام إلكترونية محدودة بنهاية الأسبوع حسب الطاقة'],
                            ['rest', 'مؤجلة لحين استقامة الظهر بالكامل'],
                            ['rest', 'ممنوع الآن'],
                            ['rest', 'ممنوع تماماً']
                        ),
                        protocolPrimary: ['المشد الشامل + فوم الأجناب', '٢٤ ساعة يومياً', 'استخدام فوم التشكيل للأجناب والظهر حسب الإرشاد لسلاسة الجلد.'],
                        protocolSecondary: ['مساج ليمفاوي لطيف للظهر والأجناب', 'بعيداً عن جرح البطن', 'تصريف ليمفاوي لمناطق النحت بإذن الطبيب مع الابتعاد التام عن خط جرح البطن.'],
                        pearl: 'الشعور ببعض الإرهاق في الأسبوع الأول طبيعي جداً؛ امنح جسمك فرصة حقيقية للترميم دون استعجال.'
                    },
                    {
                        swelling: 70, readiness: 52,
                        summary: 'الوقوف المستقيم، العودة للعمل المكتبي والقيادة، وبداية بروز الخصر.',
                        normal: [
                            'استقامة الظهر والمشي الطبيعي واختفاء معظم الكدمات السطحية.',
                            'فرق مشجع في محيط الخصر وانسيابية الظهر رغم بقاء التورم المسائي.',
                            'بدء التئام خط الجرح والسرة مع تنميل جزئي مؤقت.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية مريحة ومشي خارجي هادئ ١٥ – ٢٠ دقيقة'],
                            ['available', 'العمل المكتبي بين اليوم ١٠ – ١٤ مع فواصل حركة'],
                            ['available', 'بنهاية الأسبوع الثاني بعد استقامة الظهر وإيقاف المسكنات'],
                            ['rest', 'مؤجل للأسبوع الخامس – السادس'],
                            ['rest', 'ممنوع حمل أوزان فوق ٥ كجم']
                        ),
                        protocolPrimary: ['تضييق المشد الطبي', '٢٤ ساعة يومياً', 'تعديل مقاس المشد مع تراجع التورم يحافظ على نحت الخصر ودعم البطن.'],
                        protocolSecondary: ['مساج الأجناب + سيليكون البطن', '٢ جلسة أسبوعياً', 'مواصلة المساج للأجناب والظهر، وبدء السيليكون لجرح البطن عند إغلاقه ١٠٠٪.'],
                        pearl: 'تجنب الحكم على التماثل الدقيق بين الجانبين الآن؛ لكل جانب سرعة مختلفة قليلاً في تصريف السوائل.'
                    },
                    {
                        swelling: 50, readiness: 70,
                        summary: 'تليّن أنسجة النحت، التئام مستقر للجرح، وتحسن كبير في النوم والحركة.',
                        normal: [
                            'انحسار تيبس الأجناب والظهر وتناسق متزايد مع البطن المسطح.',
                            'تحسن كبير في النوم والقدرة على النوم على الجانبين بأريحية.',
                            'تورم خفيف يقتصر غالباً على المنطقة فوق الجرح مساءً.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية كاملة ومشي سريع منتظم'],
                            ['available', 'العمل المكتبي والحياة اليومية بالكامل'],
                            ['available', 'قيادة وسفر براحة تامة'],
                            ['rest', 'مؤجل لبداية الشهر الثاني (الأسبوع ٥ – ٦)'],
                            ['rest', 'ممنوع تمارين البطن والأوزان الثقيلة']
                        ),
                        protocolPrimary: ['المشد الطبي (المرحلة الثانية)', '٢٤ ساعة ثم تقليل للأسبوع ٥', 'دعم مستمر لثبات الخصر ٣٦٠° وتسطّح البطن.'],
                        protocolSecondary: ['السيليكون + مساج خفيف', 'روتين يومي', 'الالتزام بشرائح السيليكون لخط الجرح وتقليل جلسات المساج تدريجياً.'],
                        pearl: 'قاعدة الإجراء المركب: حتى لو شعرت مناطق النحت بالجاهزية، انتظر اكتمال فترة حماية عضلات البطن.'
                    },
                    {
                        swelling: 30, readiness: 84,
                        summary: 'العودة للكارديو المتوسط والأوزان الخفيفة للأطراف مع إنهاء المشد تدريجياً.',
                        normal: [
                            'انسيابية رائعة في القوام ٣٦٠° مع انكماش مستمر للجلد.',
                            'تراجع ملحوظ في التورم المسائي وتحسن مستمر في الإحساس الجلدي.',
                            'إمكانية السباحة بحرية بعد التأكد الكامل من التئام الجرح والفتحات.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'نشاط يومي كامل وجري خفيف'],
                            ['available', 'نشاط مهني كامل دون قيود'],
                            ['available', 'دون قيود'],
                            ['available', 'كارديو خفيف إلى متوسط من الأسبوع ٥ – ٦ دون شد البطن'],
                            ['partial', 'أوزان خفيفة للأطراف؛ وتأجيل تمارين البطن لما بعد الأسبوع ٨']
                        ),
                        protocolPrimary: ['المشد الطبي', '١٢ ساعة ثم إيقاف (أسبوع ٦ – ٨)', 'الاستغناء التدريجي عن المشد وفق تقييم المتابعة.'],
                        protocolSecondary: ['العناية بأثر الجرح', 'سيليكون + واقي شمس', 'مواصلة السيليكون يومياً وحماية الأثر من الشمس.'],
                        pearl: 'اصعد بشدة الكارديو تدريجياً أسبوعاً بعد أسبوع وراقب استجابة جسمك دون استعجال.'
                    },
                    {
                        swelling: 12, readiness: 96,
                        summary: 'ثبات عضلات البطن والعودة المنظمة للأوزان الكاملة وتمارين الكور.',
                        normal: [
                            'استقرار كبير جداً في تفاصيل الخصر والظهر والبطن المسطح.',
                            'اختفاء معظم التورم المتبقي وبداية بهتان واضح لأثر الجرح.',
                            'جاهزية العضلات لتمارين المقاومة الكاملة بعد فحص المتابعة.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كارديو كامل عالي الشدة'],
                            ['available', 'الجيم والأوزان وتمارين البطن بالتدرج (أسبوع ٩ – ١٢)']
                        ),
                        protocolPrimary: ['المشد الطبي', 'غير مطلوب', 'انتهت مرحلة المشد الطبي بالكامل.'],
                        protocolSecondary: ['السيليكون والتغذية الرياضية', 'مستمر', 'استمرار العناية بالأثر وتقوية العضلات بثبات.'],
                        pearl: 'تدرّج في تمارين البطن بذكاء؛ ابدأ بالثبات الخفيف ثم انتقل للتمارين الكاملة طالما لا يوجد شد مؤلم.'
                    },
                    {
                        swelling: 0, readiness: 100,
                        summary: 'النتيجة النهائية المستقرة للتناسق الكامل بين البطن والخصر والظهر.',
                        normal: [
                            'اكتمال انكماش الجلد وزوال آخر بقايا التورم العميق.',
                            'ملمس طبيعي وناعم للبطن والخصر مع ثبات النتيجة الجمالية.',
                            'تحسن مستمر في نعومة ولون أثر شد البطن حتى ١٢ شهراً.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'جميع الرياضات والأوزان وتمارين البطن']
                        ),
                        protocolPrimary: ['المتابعة الختامية', 'تقييم النتيجة', 'فحص نهائي للاطمئنان على ثبات الشكل وجودة الأثر.'],
                        protocolSecondary: ['الحفاظ على النتيجة', 'أسلوب حياة', 'الرياضة المنتظمة وتوازن الوزن يحافظان على هذه النتيجة لسنوات.'],
                        pearl: 'اجعل الحركة اليومية والترطيب جزءاً دائماً من روتينك للحفاظ على هذا التناسق المتكامل.'
                    }
                ]
            },

            /* 4. GYNECOMASTIA */
            gynecomastia: {
                id: 'gynecomastia',
                title: 'علاج التثدي',
                subtitle: 'Gynecomastia',
                hint: 'عودة سريعة للعمل المكتبي • استقرار الصدر خلال ٣ – ٦ أشهر',
                redFlags: [
                    'تورم سريع ومفاجئ في إحدى جهتي الصدر مع ألم ضاغط أو امتلاء حاد.',
                    'احمرار ساخن منتشر حول الهالة أو إفرازات غير طبيعية من فتحة الاستئصال.'
                ],
                milestones: [
                    { label: 'أول متابعة وفحص الصدر', days: 4, note: '٣ – ٥ أيام' },
                    { label: 'العودة للعمل المكتبي', days: 4, note: '٣ – ٥ أيام' },
                    { label: 'القيادة المريحة', days: 5, note: '٤ – ٥ أيام' },
                    { label: 'الكارديو الخفيف', days: 14, note: '٢ أسبوع' },
                    { label: 'تمارين الصدر والأوزان الكاملة', days: 35, note: '٤ – ٦ أسابيع' }
                ],
                matrix: [
                    { title: 'الاستحمام', value: '٤٨ ساعة', icon: 'drop' },
                    { title: 'القيادة', value: '٤ – ٥ أيام', icon: 'car' },
                    { title: 'العمل المكتبي', value: '٣ – ٥ أيام', icon: 'briefcase' },
                    { title: 'الكارديو والمشي', value: 'مشي فوراً • كارديو ٢ أسبوع', icon: 'run' },
                    { title: 'الجيم الكامل', value: '٤ – ٦ أسابيع', icon: 'dumbbell' },
                    { title: 'مدة المشد الطبي', value: '٤ – ٦ أسابيع', icon: 'shield' }
                ],
                stages: [
                    {
                        swelling: 88, readiness: 35,
                        summary: 'ضغط متوازن بمشد الصدر وتجنب رفع الذراعين لأعلى لحماية أنسجة الصدر.',
                        normal: [
                            'شد وضغط بالصدر يشبه ألم تمرين صدر شاق، مع تورم وكدمات خفيفة إلى متوسطة.',
                            'خروج سائل وردي بسيط من الفتحات الدقيقة أول ٢٤ – ٤٨ ساعة.',
                            'تنميل مؤقت حول الهالة مع النوم على الظهر مرفوع الرأس بوسادتين.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي خفيف داخل البيت مع تجنب رفع الذراعين فوق مستوى الكتف'],
                            ['rest', 'راحة منزلية أول ٣ أيام قبل العودة للمكتب'],
                            ['rest', 'مؤجلة أول ٣ – ٤ أيام لحماية حركة الذراعين'],
                            ['rest', 'ممنوع لتجنب ارتفاع النبض والتورم'],
                            ['rest', 'ممنوع تماماً حمل الأوزان أو دفع أشياء ثقيلة']
                        ),
                        protocolPrimary: ['مشد الصدر الطبي (Compression Vest)', '٢٤ ساعة يومياً', 'أساسي لمنع تجمع السوائل (Seroma) ومساعدة جلد الصدر على الالتصاق بالعضلة.'],
                        protocolSecondary: ['حركة الذراعين والنوم', 'حذر لطيف', 'تجنب مد الذراعين لأعلى أو النوم على البطن خلال الأسبوعين الأولين.'],
                        pearl: 'الالتزام الكامل بمشد الصدر في أول أسبوعين هو العامل الأهم لظهور صدر مسطح ومشدود دون تجمعات سوائل.'
                    },
                    {
                        swelling: 72, readiness: 58,
                        summary: 'عودة سريعة للعمل المكتبي والقيادة مع تراجع واضح للكدمات والألم.',
                        normal: [
                            'انحسار ملحوظ في الألم والقدرة على ارتداء الملابس اليومية فوق المشد بسهولة.',
                            'تلاشي الكدمات مع بقاء تورم بسيط أو صلابة خفيفة تحت الحلمة (التئام طبيعي).',
                            'هدوء تام في الفتحة الدقيقة أسفل الهالة.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية مريحة ومشي خارجي مع تجنب الشد المفاجئ بالذراعين'],
                            ['available', 'العودة للعمل المكتبي بين اليوم ٣ و٥ بأريحية تامة'],
                            ['available', 'من اليوم ٤ – ٥ عند تحريك المقود دون شد مؤلم'],
                            ['rest', 'مؤجل لنهاية الأسبوع الثاني'],
                            ['rest', 'ممنوع تمارين الصدر والذراعين تماماً']
                        ),
                        protocolPrimary: ['مشد الصدر الطبي', '٢٤ ساعة يومياً', 'يُخلع لدقائق فقط أثناء الاستحمام السريع بماء فاتر ثم يُعاد ارتداؤه فوراً.'],
                        protocolSecondary: ['فحص المتابعة الأول', 'الاطمئنان على الصدر', 'التأكد من عدم وجود سوائل وفحص التئام شق استئصال الغدة أسفل الهالة.'],
                        pearl: 'تجنب حمل الحقائب الثقيلة على الكتف أو القيام بحركات سحب مفاجئة خلال الأسبوع الأول.'
                    },
                    {
                        swelling: 55, readiness: 75,
                        summary: 'اختفاء الكدمات وبداية الكارديو الخفيف وتمارين الأرجل دون إجهاد الصدر.',
                        normal: [
                            'اختفاء أغلب الكدمات السطحية ووضوح تسطّح الصدر وتحديد العضلة.',
                            'عقد ليفية أو تيبس مؤقت أسفل الحلمة طبيعي تماماً ويلين تدريجياً.',
                            'تحسن كبير في حرية حركة الكتفين والذراعين.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كافة الأنشطة اليومية بسلاسة'],
                            ['available', 'كافة الأعمال المكتبية واليومية'],
                            ['available', 'قيادة كاملة بحرية'],
                            ['available', 'مشاية ودراجة ثابتة بدون اهتزاز عنيف للصدر'],
                            ['partial', 'تمارين الأرجل بأجهزة ثابتة فقط؛ تمارين الصدر مؤجلة للأسبوع الرابع']
                        ),
                        protocolPrimary: ['مشد الصدر الطبي', '٢٠ – ٢٤ ساعة يومياً', 'استمرار الضغط المتوازن لتسريع تليين الأنسجة ومنع أي ارتخاء.'],
                        protocolSecondary: ['مساج لطيف لمناطق التيبس', 'عند التوصية', 'تدليك لطيف لمناطق التيبس تحت الجلد يسرّع عودتها لليونتها الطبيعية.'],
                        pearl: 'وجود كتلة ليفية صغيرة صلبة مؤقتة تحت الحلمة في الأسبوع الثاني لا يعني بقاء غدة؛ هذا نسيج التئام طبيعي يلين تماماً.'
                    },
                    {
                        swelling: 35, readiness: 86,
                        summary: 'وضوح النتيجة وتخفيف ساعات المشد مع الاستعداد للعودة لأوزان الصدر.',
                        normal: [
                            'انحسار أغلب التورم وبداية تليّن النسيج تحت الحلمة بوضوح.',
                            'استعادة الإحساس الطبيعي في جلد الصدر والهالة تدريجياً.',
                            'ثقة عالية في ارتداء القمصان والتيشيرتات المحددة.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية كاملة ١٠٠٪'],
                            ['available', 'كافة الأعمال المكتبية والميدانية'],
                            ['available', 'دون قيود'],
                            ['available', 'كارديو كامل وسباحة'],
                            ['partial', 'بداية تمارين الصدر والكتف بأوزان خفيفة (٥٠٪) بنهاية الأسبوع الرابع']
                        ),
                        protocolPrimary: ['مشد الصدر الطبي', '١٢ ساعة يومياً بالأسبوع ٥', 'تثبيت انكماش جلد الصدر خلال الأسابيع الحاسمة.'],
                        protocolSecondary: ['جل السيليكون للأثر', 'يومياً', 'استخدام جل السيليكون على الأثر الدقيق أسفل الهالة لاندماجه الكامل.'],
                        pearl: 'عند العودة لتمارين الصدر، ابدأ بأوزان خفيفة وتكرارات هادئة وأوقف أي حركة تسبب شداً حاداً.'
                    },
                    {
                        swelling: 16, readiness: 96,
                        summary: 'إيقاف المشد والعودة للأوزان الكاملة مع بروز عضلات الصدر.',
                        normal: [
                            'استقرار ممتاز في تناسق جهتي الصدر وانكماش الجلد.',
                            'ليونة واضحة أسفل الحلمة وتلاشي التيبس بنسبة كبيرة.',
                            'حرية كاملة في جميع حركات الذراعين والصدر.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'دون قيود'],
                            ['available', 'جميع أنواع الكارديو والسباحة'],
                            ['available', 'تمارين الصدر والأوزان الكاملة بالتدرج من الأسبوع ٥ – ٦']
                        ),
                        protocolPrimary: ['مشد الصدر', 'إيقاف بعد ٤ – ٦ أسابيع', 'لا حاجة للمشد بعد الأسبوع السادس في أغلب الحالات.'],
                        protocolSecondary: ['الحماية من الشمس', 'مهم جداً', 'واقي شمس على الأثر الدقيق عند السباحة أو التعرض للشمس.'],
                        pearl: 'بناء عضلات الصدر بالتمارين المنتظمة الآن يبرز التحديد الرياضي للصدر ويعزز جمال النتيجة.'
                    },
                    {
                        swelling: 6, readiness: 100,
                        summary: 'نضوج الأنسجة واختفاء التيبس الداخلي واستقرار النتيجة.',
                        normal: [
                            'اختفاء شبه كامل لأي تورم متبقٍ أو تيبس عميق تحت الحلمة.',
                            'اندماج الأثر الدقيق مع حافة الهالة ليصبح غير مرئي تقريباً.',
                            'تماثل واستواء طبيعي جداً للصدر.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'أوزان كاملة وتمارين مقاومة عالية الشدة']
                        ),
                        protocolPrimary: ['المشد الطبي', 'غير مطلوب', 'انتهت كافة القيود الطبية.'],
                        protocolSecondary: ['روتين رياضي متوازن', 'مستمر', 'اللياقة وتثبيت الوزن يحافظان على شكل الصدر المشدود.'],
                        pearl: 'إن كانت لديك أي ملاحظة بسيطة في ملمس الجلد، فزيارة الشهر الثالث هي التوقيت المثالي للاطمئنان.'
                    },
                    {
                        swelling: 0, readiness: 100,
                        summary: 'النتيجة النهائية الثابتة والمستقرة لصدر مسطح ومتناسق.',
                        normal: [
                            'زوال كامل لأي تورم عميق وانكماش نهائي لجلد الصدر.',
                            'عودة الإحساس الطبيعي بالكامل واختفاء الأثر السطحي تقريباً.',
                            'نتيجة دائمة ومستقرة مع نمط حياة صحي.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كافة التمارين الرياضية دون استثناء']
                        ),
                        protocolPrimary: ['المتابعة الختامية', 'اكتمال الرحلة', 'تقييم نهائي للنتيجة المستقرة.'],
                        protocolSecondary: ['نمط حياة صحي', 'دائم', 'تجنب الهرمونات والمكملات غير الموثوقة للحفاظ على النتيجة.'],
                        pearl: 'انتهت رحلة التعافي بالكامل؛ تجنب أي منشطات رياضية غير طبية قد تؤثر على أنسجة الصدر مستقبلاً.'
                    }
                ]
            },

            /* 5. FAT GRAFTING */
            fat_grafting: {
                id: 'fat_grafting',
                title: 'حقن الدهون الذاتية',
                subtitle: 'Fat Grafting',
                hint: 'منع الضغط المباشر على المنطقة المحقونة أولوية • ثبات النتيجة ٣ – ٦ أشهر',
                redFlags: [
                    'ألم نابض متصاعد مع احمرار ساخن أو تغير غير طبيعي في لون الجلد بالمنطقة المحقونة.',
                    'ضيق مفاجئ في التنفس أو دوخة شديدة أو تورم مفاجئ في إحدى الساقين.'
                ],
                milestones: [
                    { label: 'أول متابعة وفحص مناطق الشفط', days: 5, note: '٤ – ٦ أيام' },
                    { label: 'العمل المكتبي (بوسادة مخصصة)', days: 10, note: '٧ – ١٤ يوماً' },
                    { label: 'القيادة القصيرة (بوسادة)', days: 12, note: '١٠ – ١٤ يوماً' },
                    { label: 'الجلوس الطبيعي والكارديو الخفيف', days: 28, note: '٤ أسابيع' },
                    { label: 'الجيم وتمارين المقاومة الكاملة', days: 45, note: '٦ – ٨ أسابيع' }
                ],
                matrix: [
                    { title: 'الاستحمام', value: '٤٨ ساعة', icon: 'drop' },
                    { title: 'القيادة', value: '١٠ – ١٤ يوماً (بوسادة)', icon: 'car' },
                    { title: 'العمل المكتبي', value: '٧ – ١٤ يوماً (بوسادة)', icon: 'briefcase' },
                    { title: 'الكارديو والمشي', value: 'مشي فوراً • كارديو ٤ أسابيع', icon: 'run' },
                    { title: 'الجيم الكامل', value: '٦ – ٨ أسابيع', icon: 'dumbbell' },
                    { title: 'المشد المفتوح والوسادة', value: '٤ – ٦ أسابيع', icon: 'shield' }
                ],
                stages: [
                    {
                        swelling: 92, readiness: 20,
                        summary: 'القاعدة الذهبية: منع أي ضغط مباشر على المنطقة المحقونة لضمان تغذية الخلايا الدهنية.',
                        normal: [
                            'امتلاء وتورم أكبر قليلاً من الحجم النهائي المتوقع (أمر مقصود وطبيعي).',
                            'ألم عضلي وخروج سوائل وردية خفيفة من مناطق الشفط أول ٤٨ ساعة.',
                            'النوم بوضعية تبعد أي ضغط تماماً عن المنطقة المحقونة.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي خفيف داخل البيت ٥ دقائق كل ساعتين دون جلوس مباشر على المنطقة المحقونة'],
                            ['rest', 'راحة منزلية ومنع الجلوس المباشر على المنطقة المحقونة'],
                            ['rest', 'ممنوعة لحماية الخلايا الدهنية المنقولة'],
                            ['rest', 'ممنوع تماماً لتجنب حرق الدهون المنقولة'],
                            ['rest', 'ممنوع تماماً']
                        ),
                        protocolPrimary: ['المشد المفتوح + منع الضغط', '٢٤ ساعة يومياً', 'ضاغط لمناطق الشفط فقط ومفرّغ أو ناعم تماماً فوق المنطقة المحقونة دون أي ضغط.'],
                        protocolSecondary: ['منع التدخين والتغذية الصحية', 'شرط أساسي للثبات', 'الامتناع التام عن التدخين والضغط لأن الخلايا الدهنية تبني شعيراتها الدموية الآن.'],
                        pearl: 'أول ٣ إلى ٤ أسابيع هي فترة تثبيت الخلايا الدهنية؛ أي ضغط مباشر أو تدخين يقلل من نسبة بقاء الدهون.'
                    },
                    {
                        swelling: 76, readiness: 42,
                        summary: 'استقرار أولي لمناطق الشفط وبداية اندماج الخلايا الدهنية بهدوء.',
                        normal: [
                            'انخفاض التورم الحاد في المنطقة المحقونة مع بقاء امتلاء وشد خفيف.',
                            'توقف سوائل مناطق الشفط وتحسن ملموس في الحركة المنزلية.',
                            'تحول الكدمات للأصفر وتراجع الحاجة للمسكنات.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'مشي خفيف داخل وخارج المنزل دون ضغط مباشر عند الراحة'],
                            ['partial', 'العمل عن بُعد واقفاً أو مستلقياً دون أي ضغط على المنطقة المحقونة'],
                            ['rest', 'مؤجلة للأسبوع الثاني مع وسادة مخصصة لفترات قصيرة'],
                            ['rest', 'مؤجل حتى إتمام الشهر الأول'],
                            ['rest', 'ممنوع تماماً']
                        ),
                        protocolPrimary: ['المشد المفرغ + وسادة تفريغ الضغط', '٢٤ ساعة يومياً', 'عند الحاجة للجلوس تُستخدم وسادة طبية (Off-loading Pillow) تنقل الوزن بعيداً عن الحقن.'],
                        protocolSecondary: ['المساج لمناطق الشفط فقط', 'ممنوع فوق منطقة الحقن', 'التصريف الليمفاوي لمناطق الشفط فقط، ويُمنع تماماً تدليك المنطقة المحقونة.'],
                        pearl: 'لا تتبع دايت قاسياً الآن؛ البروتين والدهون الصحية (كالأفوكادو والمكسرات وزيت الزيتون) تغذي الدهون المحقونة.'
                    },
                    {
                        swelling: 58, readiness: 65,
                        summary: 'العودة للعمل والقيادة بوسادة تفريغ الضغط وبداية وضوح التناسق الحقيقي.',
                        normal: [
                            'اختفاء معظم الكدمات وتراجع تورم السوائل؛ مما يعطي إحساساً بنقص طفيف طبيعي في الحجم مقارنة بالأسبوع الأول.',
                            'أغلب الخلايا الدهنية المستقرة بدأت تتصل بالدورة الدموية بنجاح.',
                            'تحسن كبير في مرونة مناطق الشفط وتراجع الشد.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية مريحة ومشي منتظم مع استمرار تجنب الضغط المباشر'],
                            ['available', 'بين اليوم ١٠ – ١٤ باستخدام وسادة تفريغ الضغط وفواصل وقوف'],
                            ['available', 'لفترات قصيرة باستخدام الوسادة المخصصة دون ضغط مباشر'],
                            ['rest', 'مؤجل للأسبوع الرابع للحفاظ على ثبات الدهون'],
                            ['rest', 'ممنوع الأوزان والتمارين الضاغطة']
                        ),
                        protocolPrimary: ['المشد المفرغ + الوسادة المخصصة', 'مستمر حتى الأسبوع ٤', 'استمرار حماية المنطقة المحقونة من الجلوس المباشر والملابس الضيقة.'],
                        protocolSecondary: ['السوائل وتجنب الحرارة العالية', 'روتين يومي', 'شرب الماء بانتظام وتجنب الساونا أو المياه شديدة السخونة.'],
                        pearl: 'انخفاض الحجم الطفيف مقارنة بالأسبوع الأول هو زوال لتورم الماء وليس ذوباناً للدهون؛ الحجم الحقيقي يستقر خلال ٣ أشهر.'
                    },
                    {
                        swelling: 38, readiness: 80,
                        summary: 'ثبات ممتاز للخلايا الدهنية وبداية الجلوس الطبيعي والكارديو الخفيف بنهاية الشهر.',
                        normal: [
                            'مرونة ونعومة طبيعية جداً في ملمس المنطقة المحقونة.',
                            'زوال معظم التورم المائي واستقرار النسبة الدائمة من الدهون (عادةً ٦٠ – ٧٥٪).',
                            'تناسق لافت بين مناطق الشفط المنحوتة والمنطقة الممتلئة.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية كاملة وبداية الجلوس الطبيعي التدريجي نهاية الأسبوع ٤'],
                            ['available', 'عمل مكتبي كامل بأريحية متزايدة'],
                            ['available', 'قيادة طبيعية ومريحة'],
                            ['partial', 'بداية كارديو خفيف جداً بالأسبوع الرابع دون حرق سعرات عنيف'],
                            ['rest', 'تأجيل الجيم والأوزان للأسبوع السادس']
                        ),
                        protocolPrimary: ['الانتقال للجلوس الطبيعي', 'بعد إتمام ٤ أسابيع', 'البدء بالجلوس المريح على أسطح ناعمة وتخفيف المشد إلى ١٢ ساعة يومياً.'],
                        protocolSecondary: ['ترطيب الجلد والعناية بالفتحات', 'يومياً', 'الترطيب المستمر يحافظ على مرونة الجلد ونعومته.'],
                        pearl: 'تجنب الكارديو المفرط أو فقدان الوزن السريع خلال أول شهرين حتى لا تفقد جزءاً من الدهون المستقرة حديثاً.'
                    },
                    {
                        swelling: 18, readiness: 94,
                        summary: 'الجلوس والنوم بحرية كاملة والعودة للجيم وتمارين المقاومة.',
                        normal: [
                            'الخلايا الدهنية الناجحة أصبحت جزءاً حياً ودائماً من أنسجة جسمك.',
                            'تناسق متكامل في الشكل والملمس مع اختفاء التورم الظاهري.',
                            'العودة الكاملة للجلوس والنوم في أي وضعية مريحة.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪ دون أي قيود'],
                            ['available', 'نشاط كامل ١٠٠٪'],
                            ['available', 'دون أي قيود'],
                            ['available', 'كارديو متوازن'],
                            ['available', 'الجيم وتمارين المقاومة وبناء العضلات من الأسبوع ٦ – ٨']
                        ),
                        protocolPrimary: ['المشد والوسادة', 'تم إيقافهما', 'لا حاجة للوسادة أو المشد الطبي بعد الأسبوع السادس.'],
                        protocolSecondary: ['تمارين المقاومة الذكية', 'لدعم الشكل', 'تمارين تقوية العضلات تمنح ارتفاعاً وثباتاً إضافياً للنتيجة.'],
                        pearl: 'التركيز على تمارين المقاومة المعتدلة بدلاً من الكارديو المجهد يمنح المنطقة المحقونة قواماً مشدوداً ومرتفعاً.'
                    },
                    {
                        swelling: 5, readiness: 100,
                        summary: 'استقرار شبه نهائي في الحجم والملمس وتكامل النتيجة الجمالية.',
                        normal: [
                            'ثبات واضح في الحجم والامتلاء بملمس طبيعي مطابق تماماً لأنسجة الجسم.',
                            'اختفاء آثار فتحات الحقن والشفط الدقيقة تقريباً.',
                            'تراجع أي تورم عميق متبقٍ في مناطق الشفط.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كافة التمارين الرياضية بحرية']
                        ),
                        protocolPrimary: ['المتابعة الدورية', 'تقييم الثبات', 'تقييم نسبة ثبات الدهون الذاتية في زيارة الشهر الثالث.'],
                        protocolSecondary: ['ثبات الوزن', 'أساسي', 'الدهون الذاتية تتأثر بتقلبات الوزن؛ الوزن المستقر يحفظ النتيجة تماماً.'],
                        pearl: 'الدهون الذاتية خلايا حية تتصرف مثل باقي دهون جسمك؛ استقرار وزنك هو سر استمرارية الشكل.'
                    },
                    {
                        swelling: 0, readiness: 100,
                        summary: 'النتيجة النهائية الثابتة والمستقرة بملمس وشكل طبيعي بالكامل.',
                        normal: [
                            'ثبات نهائي ١٠٠٪ في حجم وملمس وتناسق المنطقة المحقونة.',
                            'اكتمال انكماش الجلد في مناطق الشفط وتلاشي الآثار الدقيقة.',
                            'نتيجة طبيعية دائمة متناغمة مع باقي قوامك.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'جميع الرياضات دون قيود']
                        ),
                        protocolPrimary: ['المتابعة الختامية', 'اكتمال الرحلة', 'مقارنة النتيجة النهائية بصور ما قبل الإجراء.'],
                        protocolSecondary: ['نمط حياة متوازن', 'دائم', 'تجنب التذبذب الكبير في الوزن للحفاظ على التناسق الدائم.'],
                        pearl: 'استمتع بنتيجة طبيعية تماماً من أنسجة جسمك الذاتية؛ وحافظ على صحتك واستقرار وزنك.'
                    }
                ]
            },

            /* 6. ARM / THIGH LIFT */
            limb_lift: {
                id: 'limb_lift',
                title: 'شد الذراعين أو الفخذين',
                subtitle: 'Arm / Thigh Lift',
                hint: 'حماية خطوط الجرح ورفع الأطراف أولوية • نضج الأثر ٣ – ٦ أشهر',
                redFlags: [
                    'تنميل متزايد أو برودة أو تغير لون في أصابع اليدين أو القدمين (علامة ضيق المشد).',
                    'تورم حاد ومفاجئ في طرف واحد أو انفكاك في حافة خط الجرح.'
                ],
                milestones: [
                    { label: 'أول متابعة وفحص خط الجرح', days: 6, note: '٥ – ٧ أيام' },
                    { label: 'العودة للعمل المكتبي', days: 12, note: '١٠ – ١٤ يوماً' },
                    { label: 'القيادة الآمنة', days: 14, note: '٢ أسبوع' },
                    { label: 'الكارديو الخفيف', days: 32, note: '٤ – ٥ أسابيع' },
                    { label: 'الجيم والأوزان الكاملة', days: 56, note: '٦ – ٨ أسابيع' }
                ],
                matrix: [
                    { title: 'الاستحمام', value: '٤٨ – ٧٢ ساعة (بالإذن)', icon: 'drop' },
                    { title: 'القيادة', value: '٢ أسبوع', icon: 'car' },
                    { title: 'العمل المكتبي', value: '١٠ – ١٤ يوماً', icon: 'briefcase' },
                    { title: 'الكارديو والمشي', value: 'مشي هادئ • كارديو ٤ – ٥ أسبوع', icon: 'run' },
                    { title: 'الجيم الكامل', value: '٦ – ٨ أسابيع', icon: 'dumbbell' },
                    { title: 'مدة المشد الطبي', value: '٦ أسابيع', icon: 'shield' }
                ],
                stages: [
                    {
                        swelling: 92, readiness: 18,
                        summary: 'رفع الأطراف لتخفيف التورم وتجنب الحركات الواسعة التي تشد على خط الجرح.',
                        normal: [
                            'تورم وشد على الجانب الداخلي للذراع أو الفخذ، وقد يمتد تورم خفيف لليدين أو الكاحلين.',
                            'وضع الطرف على وسائد مرفوعة أثناء الراحة يخفف التورم والنبض فوراً.',
                            'حركة متأنية دون رفع الذراعين فوق الكتف أو فتح الساقين بزاوية واسعة.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي قصير وهادئ بخطوات صغيرة كل ساعتين مع رفع الطرف أثناء الجلوس'],
                            ['rest', 'الراحة بالمنزل ورفع الأطراف أولوية مطلقة'],
                            ['rest', 'ممنوعة لمدة أسبوعين لحماية خط الجرح'],
                            ['rest', 'ممنوع تماماً'],
                            ['rest', 'ممنوع حمل أي أوزان أو إجهاد الطرف المعالج']
                        ),
                        protocolPrimary: ['مشد الذراعين أو شورت الفخذين', '٢٤ ساعة يومياً', 'ضغط متجانس يقلل التورم ويدعم خطوط الجرح دون ضيق يسبب تنميل الأصابع.'],
                        protocolSecondary: ['رفع الأطراف وجفاف الجرح', 'عناية يومية', 'الحفاظ على جفاف الجرح تماماً (خاصة في ثنية الفخذ) ورفع الطرف على وسائد.'],
                        pearl: 'إراحة خط الجرح من الشد والقرفصاء في الأسبوعين الأولين تمنحك أثراً رفيعاً وأنيقاً.'
                    },
                    {
                        swelling: 78, readiness: 36,
                        summary: 'تراجع تورم اليدين أو الكاحلين، فحص الجرح، وتقليل الألم اليومي.',
                        normal: [
                            'تحسن كبير في تورم الأطراف البعيدة وبداية تلاشي الكدمات الأولية.',
                            'فحص خط الجرح في المتابعة وإزالة الدرنقة إن وُجدت.',
                            'استمرار شد خفيف وتنميل جزئي مؤقت بجوار خط الجرح.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي هادئ بخطوات متزنة وحركة لطيفة داخل المنزل'],
                            ['rest', 'مهام خفيفة عن بُعد بنهاية الأسبوع دون إجهاد الطرف'],
                            ['rest', 'مؤجلة للأسبوع الثاني'],
                            ['rest', 'مؤجل للشهر الثاني'],
                            ['rest', 'ممنوع حمل أكثر من ٢ كجم']
                        ),
                        protocolPrimary: ['المشد الطبي للأطراف', '٢٤ ساعة يومياً', 'التأكد من جفاف الجلد تماماً بعد الاستحمام المسموح قبل إعادة ارتداء المشد.'],
                        protocolSecondary: ['التهوية والجفاف في الثنيات', 'وقاية مهمة', 'الجفاف التام والغيار النظيف يمنعان أي تهيج سطحي في الثنيات.'],
                        pearl: 'ارتدِ ملابس واسعة بأزرار أمامية أو خصر مريح حتى لا تضطر لشد ذراعيك أو فخذيك أثناء التبديل.'
                    },
                    {
                        swelling: 60, readiness: 62,
                        summary: 'استعادة مدى حركة أفضل والعودة للعمل المكتبي والقيادة الآمنة.',
                        normal: [
                            'التئام الطبقة السطحية لخط الجرح وتراجع واضح في التورم والكدمات.',
                            'زيادة ملحوظة في حرية الحركة اليومية مع شد لطيف عند التمدد الكامل.',
                            'وضوح ملامح الذراعين المشدودين أو الفخذين المتناسقين دون ترهل.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية مريحة ومشي خارجي هادئ ١٥ – ٢٠ دقيقة'],
                            ['available', 'العمل المكتبي بين اليوم ١٠ – ١٤ مع فواصل راحة للطرف'],
                            ['available', 'حوالي الأسبوع الثاني عند الحركة السلسة دون شد مؤلم'],
                            ['rest', 'مؤجل حتى إتمام الشهر الأول'],
                            ['rest', 'ممنوع تمارين الطرف المعالج وحمل الأثقال']
                        ),
                        protocolPrimary: ['المشد الطبي', '٢٤ ساعة يومياً', 'استمرار الدعم الضاغط لتقليل التورم المسائي وتثبيت الأنسجة.'],
                        protocolSecondary: ['بداية السيليكون للأثر', 'بعد الإغلاق ١٠٠٪', 'بمجرد تأكد الطبيب من إغلاق الجرح الكامل، يبدأ روتين شرائح أو جل السيليكون.'],
                        pearl: 'جودة أثر شد الذراعين أو الفخذين تعتمد على تقليل التوتر الميكانيكي والالتزام بالسيليكون مبكراً.'
                    },
                    {
                        swelling: 40, readiness: 78,
                        summary: 'مرونة عالية في الحركة، السيليكون المنتظم، وتخفيف المشد بنهاية الشهر.',
                        normal: [
                            'مرونة عالية في حركة الكتفين أو الفخذين وتراجع التورم بنسبة كبيرة.',
                            'ظهور اللون الوردي الطبيعي على خط الأثر قبل مرحلة البهتان.',
                            'ليونة واضحة في الجلد وثقة كبيرة في ارتداء الملابس.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية كاملة ومشي سريع منتظم'],
                            ['available', 'كافة الأعمال اليومية والمكتبية'],
                            ['available', 'قيادة كاملة بحرية'],
                            ['partial', 'بداية كارديو خفيف بالأسبوع الرابع دون إجهاد مباشر للطرف'],
                            ['rest', 'تأجيل أوزان الذراعين أو تمارين الفخذين القوية للأسبوع ٦ – ٨']
                        ),
                        protocolPrimary: ['المشد الطبي', '١٢ ساعة يومياً بعد الأسبوع ٤', 'ارتداء المشد نصف اليوم حتى إتمام الأسبوع السادس.'],
                        protocolSecondary: ['شرائح السيليكون + واقي شمس', 'يومياً بانتظام', 'شرائح السيليكون تقلل سماكة الأثر وتسرّع تسطيحه وتجانس لونه.'],
                        pearl: 'تجنب تعريض خط الأثر للشمس المباشرة، واستخدم واقي شمس طبي عالي الحماية عند ارتداء ملابس مكشوفة.'
                    },
                    {
                        swelling: 18, readiness: 92,
                        summary: 'إيقاف المشد والعودة التدريجية للجيم والأوزان وتمارين المقاومة.',
                        normal: [
                            'تلاشي التورم المسائي تقريباً واستقرار الشكل المشدود.',
                            'استعادة كاملة لمدى الحركة الطبيعي دون أي شد مؤلم.',
                            'تحسن مستمر في الإحساس الجلدي حول خط الأثر.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية كاملة وجري خفيف'],
                            ['available', 'نشاط كامل ١٠٠٪'],
                            ['available', 'دون قيود'],
                            ['available', 'كارديو كامل وسباحة'],
                            ['available', 'العودة التدريجية للجيم والأوزان من الأسبوع ٦ – ٨']
                        ),
                        protocolPrimary: ['المشد الطبي', 'تم إيقافه بعد ٦ أسابيع', 'انتهت مرحلة المشد الطبي في أغلب الحالات.'],
                        protocolSecondary: ['عناية السيليكون مستمرة', 'أفضل استثمار للأثر', 'استمرار السيليكون خلال الشهر الثاني والثالث يفرق بوضوح في نعومة الأثر.'],
                        pearl: 'ابدأ بأوزان خفيفة وتدرّج ببطء لتقوية العضلات تحت الجلد المشدود دون إجهاد الأثر.'
                    },
                    {
                        swelling: 6, readiness: 100,
                        summary: 'نضوج واضح للأنسجة وبداية بهتان ملحوظ لخط الأثر.',
                        normal: [
                            'ثبات الشكل المتناسق والمشدود للذراعين أو الفخذين.',
                            'تحول لون الأثر تدريجياً نحو اللون الأفتح والأكثر نعومة.',
                            'زوال التورم المتبقي بالكامل تقريباً.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كافة التمارين والأوزان الكاملة']
                        ),
                        protocolPrimary: ['المتابعة الدورية', 'فحص الأثر', 'تقييم جودة الأثر ومناقشة أي عناية تجميلية إضافية عند الرغبة.'],
                        protocolSecondary: ['الوقاية من الشمس', 'مستمر', 'واقي الشمس يحافظ على بهتان الأثر وتجانسه مع الجلد.'],
                        pearl: 'شد العضلات بالرياضة المنتظمة يملأ الطرف بتناسق جميل ويدعم ثبات الجلد المشدود.'
                    },
                    {
                        swelling: 0, readiness: 100,
                        summary: 'النتيجة النهائية المستقرة مع استمرار تحسن الأثر حتى عام.',
                        normal: [
                            'استقرار كامل في شكل وملمس الذراعين أو الفخذين.',
                            'نعومة وبهتان واضح في خط الأثر المخفي في الجانب الداخلي حتى ١٢ شهراً.',
                            'حرية كاملة في الحركة والرياضة والملابس.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'جميع الرياضات دون أي قيود']
                        ),
                        protocolPrimary: ['المتابعة الختامية', 'اكتمال الرحلة', 'التقييم النهائي للنتيجة.'],
                        protocolSecondary: ['استدامة النتيجة', 'أسلوب حياة', 'الحفاظ على وزن ثابت وترطيب الجلد يضمنان بقاء النتيجة مشدودة لسنوات.'],
                        pearl: 'تجنب التغيرات السريعة والكبيرة في الوزن حتى يحافظ الجلد المشدود على مرونته وثباته الدائم.'
                    }
                ]
            },

            /* 7. RHINOPLASTY */
            rhinoplasty: {
                id: 'rhinoplasty',
                title: 'تجميل الأنف',
                subtitle: 'Rhinoplasty',
                hint: 'إزالة الجبيرة خلال أسبوع • تراجع التورم الدقيق خلال ٦ – ١٢ شهراً',
                redFlags: [
                    'نزيف أنفي متواصل لا يتوقف بالجلوس مرفوع الرأس والكمادات الباردة اللطيفة.',
                    'صعوبة شديدة ومفاجئة في التنفس أو ألم نابض حاد أو أي تغير في الرؤية.'
                ],
                milestones: [
                    { label: 'إزالة الجبيرة والدعامات', days: 7, note: '٥ – ٧ أيام' },
                    { label: 'القيادة الآمنة', days: 5, note: '٤ – ٥ أيام' },
                    { label: 'العودة للعمل المكتبي', days: 8, note: '٧ – ١٠ أيام' },
                    { label: 'الكارديو الخفيف', days: 21, note: '٣ أسابيع' },
                    { label: 'الجيم والنظارات الخفيفة', days: 42, note: '٦ أسابيع' }
                ],
                matrix: [
                    { title: 'الاستحمام', value: '٢٤ ساعة (دون بلل الجبيرة)', icon: 'drop' },
                    { title: 'القيادة', value: '٤ – ٥ أيام', icon: 'car' },
                    { title: 'العمل المكتبي', value: '٧ – ١٠ أيام', icon: 'briefcase' },
                    { title: 'الكارديو والمشي', value: 'مشي فوراً • كارديو ٣ أسابيع', icon: 'run' },
                    { title: 'الجيم الكامل', value: '٤ – ٦ أسابيع', icon: 'dumbbell' },
                    { title: 'الجبيرة واللاصق', value: '٧ أيام جبيرة + لاصق', icon: 'shield' }
                ],
                stages: [
                    {
                        swelling: 95, readiness: 30,
                        summary: 'ذروة التورم حول العينين والاحتقان الأنفي، مع أهمية الكمادات الباردة ورفع الرأس.',
                        normal: [
                            'احتقان أنفي يشبه نزلة برد قوية وتنفس مؤقت من الفم مع إفرازات وردية خفيفة على الشاش.',
                            'تورم وكدمات حول العينين تبلغ ذروتها اليوم ٢ – ٣ ثم تتراجع تدريجياً.',
                            'النوم على الظهر مع رفع الرأس بوسادتين على الأقل لتقليل التورم.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي خفيف داخل البيت دون انحناء للرأس للأمام'],
                            ['rest', 'راحة منزلية ورفع الرأس أول ٣ – ٥ أيام'],
                            ['rest', 'مؤجلة لحين تراجع تورم العينين وإيقاف المسكنات'],
                            ['rest', 'ممنوع لتجنب ارتفاع ضغط الدم والنزيف'],
                            ['rest', 'ممنوع تماماً حمل الأوزان أو الانحناء']
                        ),
                        protocolPrimary: ['الجبيرة الأنفية الخارجية والدعامات', 'جافة تماماً ٧ أيام', 'الحفاظ على الجبيرة جافة تماماً؛ يُغسل الوجه بالمسح اللطيف دون بلل أو ضغط.'],
                        protocolSecondary: ['المحلول الملحي والكمادات الباردة', 'بانتظام يومي', 'كمادات باردة لطيفة على الخدين (ليس فوق الجبيرة)، وبخاخ محلول ملحي دون استنشاق عنيف.'],
                        pearl: 'لا تنفخ أنفك نهائياً، وإذا احتجت للعطس فاعطس وفمك مفتوح تماماً لحماية الأنف من أي ضغط مفاجئ.'
                    },
                    {
                        swelling: 76, readiness: 55,
                        summary: 'لحظة إزالة الجبيرة والدعامات الداخلية واستعادة التنفس التدريجي.',
                        normal: [
                            'إزالة الجبيرة الخارجية والدعامات الداخلية بين اليوم الخامس والسابع بسلاسة.',
                            'يكون الأنف متورماً ومرتفعاً قليلاً عند رفع الجبيرة؛ وهو تورم مبدئي طبيعي يهدأ تدريجياً.',
                            'تحول كدمات تحت العين للأصفر واختفاء أغلبها بنهاية الأسبوع الأول.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية مريحة ومشي خارجي هادئ مع تجنب الشمس المباشرة'],
                            ['available', 'العودة للعمل المكتبي بعد إزالة الجبيرة (اليوم ٧ – ١٠)'],
                            ['available', 'من اليوم ٤ – ٥ بعد صفاء الرؤية وإيقاف المسكنات المهدئة'],
                            ['rest', 'مؤجل للأسبوع الثالث'],
                            ['rest', 'ممنوع رفع الأوزان أو إمالة الرأس للأسفل']
                        ),
                        protocolPrimary: ['اللاصق الطبي الأنفي (Taping)', 'حسب توصية الطبيب', 'لاصق طبي لطيف لدعم الأنف وتقليل التورم خاصة ليلاً أو للجلد السميك.'],
                        protocolSecondary: ['منع النظارات + المحلول الملحي', 'تجنب الضغط على الجسر', 'ممنوع ارتداء النظارات مباشرة على جسر الأنف ٤ – ٦ أسابيع؛ مع غسيل ملحي لطيف يومياً.'],
                        pearl: 'استخدم العدسات اللاصقة أو شريط تعليق للنظارة؛ وزن النظارة المباشر على جسر الأنف قد يترك أثراً غير مرغوب.'
                    },
                    {
                        swelling: 56, readiness: 76,
                        summary: 'اختفاء الكدمات والعودة الواثقة للحياة الاجتماعية والعمل.',
                        normal: [
                            'اختفاء الكدمات تماماً وعودة مظهر الوجه طبيعياً أمام الآخرين.',
                            'تراجع تورم جسر الأنف، بينما تبقى الأرنبة متورمة وصلبة قليلاً وهو طبيعي تماماً.',
                            'انسيابية أفضل بكثير في التنفس الأنفي مع هدوء القشور الداخلية.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كافة الأنشطة اليومية والاجتماعية بثقة'],
                            ['available', 'العمل المكتبي والاجتماعات بثقة تامة'],
                            ['available', 'قيادة كاملة وآمنة'],
                            ['rest', 'مؤجل للأسبوع الثالث'],
                            ['rest', 'تأجيل الأوزان والرياضات الاحتكاكية']
                        ),
                        protocolPrimary: ['اللاصق الليلي وحماية الأنف', 'حماية مستمرة', 'الاستمرار في إبعاد النظارات والحذر أثناء النوم أو التعامل مع الأطفال.'],
                        protocolSecondary: ['واقي الشمس والترطيب', 'عناية يومية', 'واقي شمس يومي على الأنف لحمايته من التصبغ وتجنب التورم الحراري.'],
                        pearl: 'قد يبدو الأنف أكثر تورماً قليلاً في الصباح ثم يهدأ خلال اليوم؛ هذا التذبذب طبيعي جداً خلال الشهر الأول.'
                    },
                    {
                        swelling: 38, readiness: 86,
                        summary: 'وضوح الخطوط الجمالية للأنف، بداية الكارديو الخفيف، وتراجع التورم الظاهري.',
                        normal: [
                            'زوال قرابة ٦٥ – ٧٠٪ من التورم الظاهري وبروز تناسق الأنف مع الملامح.',
                            'بقاء تورم دقيق وتنميل بسيط في أرنبة الأنف لأنها آخر منطقة يتراجع منها التورم.',
                            'استقرار جيد في البنية الداخلية وسلاسة أكبر في التنفس.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية كاملة دون قيود'],
                            ['available', 'كافة الأعمال اليومية والمكتبية'],
                            ['available', 'دون قيود'],
                            ['available', 'كارديو خفيف (مشاية / دراجة) من الأسبوع الثالث دون إجهاد حاد'],
                            ['partial', 'بداية أوزان خفيفة نهاية الأسبوع الرابع مع منع الرياضات الاحتكاكية']
                        ),
                        protocolPrimary: ['تجنب النظارات الثقيلة', 'حتى إتمام ٦ أسابيع', 'الاستمرار في حماية جسر الأنف حتى يكتمل ثبات العظام.'],
                        protocolSecondary: ['تجنب الساونا والحرارة العالية', 'لتخفيف تورم الأرنبة', 'البخار والحرارة المباشرة يزيدان تورم الأرنبة؛ حافظ على واقي الشمس.'],
                        pearl: 'الصبر سر تجميل الأنف؛ شكل الأنف يزداد دقة وتناغماً مع كل شهر يمر فلا تحكم عليه بحكم نهائي مبكراً.'
                    },
                    {
                        swelling: 22, readiness: 96,
                        summary: 'العودة للنظارات الخفيفة والجيم والسباحة مع ليونة متزايدة في الأرنبة.',
                        normal: [
                            'انحسار واضح في تورم جانبي الأنف وتحديد أجمل لجسر الأنف.',
                            'بداية تراجع صلابة الأرنبة وعودة الإحساس الطبيعي تدريجياً.',
                            'ثبات جيد جداً في البنية العظمية والغضروفية للأنف.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'نشاط كامل ١٠٠٪'],
                            ['available', 'دون قيود'],
                            ['available', 'كارديو كامل وسباحة (مع تجنب الغوص والاصطدام)'],
                            ['available', 'الجيم والأوزان الكاملة بعد الأسبوع ٦ (وتأجيل الرياضات الاحتكاكية للشهر ٣)']
                        ),
                        protocolPrimary: ['النظارات الطبية والشمسية', 'الخفيفة بعد ٦ أسابيع', 'يمكن ارتداء النظارات الخفيفة المريحة بشكل طبيعي بعد التقييم.'],
                        protocolSecondary: ['المتابعة الدورية', 'تقييم التورم', 'متابعة تراجع تورم الأرنبة والاطمئنان على سلاسة التنفس.'],
                        pearl: 'أجّل الرياضات التي تحمل احتمال اصطدام بالوجه أو الكرة حتى إتمام ٣ أشهر لحماية عظام الأنف.'
                    },
                    {
                        swelling: 12, readiness: 100,
                        summary: 'ظهور ٨٥ – ٩٠٪ من الشكل النهائي مع دقة وتناغم أكبر في الأرنبة.',
                        normal: [
                            'انحسار معظم التورم الملحوظ وبروز التفاصيل الدقيقة لجسر وأرنبة الأنف.',
                            'انسيابية ممتازة في التنفس واستقرار الشكل عند الابتسام والحركة.',
                            'اختفاء أثر الشق الصغير أسفل الأنف (في التجميل المفتوح) تقريباً.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كافة التمارين الرياضية بشكل طبيعي']
                        ),
                        protocolPrimary: ['الحماية الروتينية', 'طبيعي بالكامل', 'لا توجد قيود يومية، فقط العناية اللطيفة المعتادة.'],
                        protocolSecondary: ['واقي الشمس', 'روتين دائم', 'يحافظ على صفاء الجلد حول الأنف وأثر الشق الدقيق.'],
                        pearl: 'تبدأ الآن في رؤية التناغم الحقيقي بين الأنف وملامح الوجه، بينما تستمر التفاصيل الدقيقة في التحسن بهدوء.'
                    },
                    {
                        swelling: 4, readiness: 100,
                        summary: 'استقرار النتيجة الجمالية والوظيفية للأنف (ويكتمل النضج الدقيق للجلد السميك حتى عام).',
                        normal: [
                            'تلاشي التورم الدقيق في أرنبة الأنف وعودة ليونتها وإحساسها بالكامل.',
                            'ثبات نهائي في البنية العظمية والغضروفية وزاوية الأنف.',
                            'نتيجة طبيعية متناغمة تبرز جمال ملامحك دون مبالغة.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'جميع الرياضات دون قيود']
                        ),
                        protocolPrimary: ['المتابعة الختامية', 'تقييم النتيجة', 'مقارنة الصور النهائية للاطمئنان على تمام التناسق والتنفس.'],
                        protocolSecondary: ['عناية يومية طبيعية', 'دائمة', 'استمتع بنتيجة طبيعية ثابتة وتنفس مريح.'],
                        pearl: 'في حالات الجلد السميك، قد يستمر التحديد الدقيق لأرنبة الأنف في التحسن اللطيف حتى إتمام ١٢ شهراً.'
                    }
                ]
            },

            /* 8. FACELIFT & EYELIDS */
            facelift: {
                id: 'facelift',
                title: 'شد الوجه والجفون',
                subtitle: 'Facelift & Eyelids',
                hint: 'ظهور اجتماعي مريح خلال ٢ – ٣ أسابيع • نضوج النتيجة ٣ – ٦ أشهر',
                redFlags: [
                    'تورم سريع ومفاجئ في أحد الخدين مع ألم ضاغط أو شد غير معتاد في جهة واحدة.',
                    'أي تغير مفاجئ في الرؤية أو ألم حاد داخل العين أو صعوبة غير معتادة في حركة الجفن.'
                ],
                milestones: [
                    { label: 'فك غرز الجفون والأذنين', days: 7, note: '٥ – ١٠ أيام' },
                    { label: 'القيادة المريحة', days: 10, note: '٧ – ١٠ أيام' },
                    { label: 'العمل والظهور الاجتماعي', days: 14, note: '١٠ – ١٤ يوماً' },
                    { label: 'الكارديو الخفيف', days: 24, note: '٣ – ٤ أسابيع' },
                    { label: 'الجيم والمجهود الكامل', days: 42, note: '٥ – ٦ أسابيع' }
                ],
                matrix: [
                    { title: 'الاستحمام', value: '٤٨ ساعة (بلطف)', icon: 'drop' },
                    { title: 'القيادة', value: '٧ – ١٠ أيام', icon: 'car' },
                    { title: 'العمل المكتبي', value: '١٠ – ١٤ يوماً', icon: 'briefcase' },
                    { title: 'الكارديو والمشي', value: 'مشي هادئ • كارديو ٣ – ٤ أسبوع', icon: 'run' },
                    { title: 'الجيم الكامل', value: '٥ – ٦ أسابيع', icon: 'dumbbell' },
                    { title: 'مشد الوجه والذقن', value: '٢ – ٣ أسابيع', icon: 'shield' }
                ],
                stages: [
                    {
                        swelling: 94, readiness: 22,
                        summary: 'رفع الرأس والكمادات الباردة والهدوء التام لحماية الأنسجة الدقيقة للوجه والجفون.',
                        normal: [
                            'تورم ملحوظ وكدمات حول العينين والخدين والذقن (ذروتها اليوم ٢ – ٣ ثم تتراجع).',
                            'شد في الرقبة والخدين وتنميل مؤقت حول الأذنين أو الجفون مع دمع خفيف.',
                            'النوم على الظهر فقط مع رفع الرأس بوسادتين وتجنب الالتفات السريع للرقبة.'
                        ],
                        activities: makeActivityRows(
                            ['partial', 'مشي هادئ داخل المنزل مع إبقاء الرأس مرفوعاً وتجنب الانحناء'],
                            ['rest', 'راحة هادئة وتقليل إجهاد العين أمام الشاشات'],
                            ['rest', 'ممنوعة أول أسبوع بسبب تورم الجفون وحركة الرقبة'],
                            ['rest', 'ممنوع تماماً لعدم رفع ضغط الدم في الوجه'],
                            ['rest', 'ممنوع الانحناء للأمام أو حمل أي أوزان']
                        ),
                        protocolPrimary: ['رفع الرأس + مشد الوجه الطبي', '٢٤ ساعة أول أيام حسب الإرشاد', 'دعم لطيف للخدين والرقبة يقلل التورم دون ضغط مؤلم على الأذنين.'],
                        protocolSecondary: ['كمادات باردة + قطرات العين', 'عناية منتظمة', 'كمادات باردة لطيفة أول ٤٨ ساعة مع استخدام قطرات الترطيب والمرهم بانتظام.'],
                        pearl: 'تجنب إمالة الرأس للأسفل أثناء استخدام الهاتف؛ بقاء الرأس مرفوعاً يسرّع اختفاء تورم الوجه.'
                    },
                    {
                        swelling: 74, readiness: 46,
                        summary: 'فك الغرز الدقيقة حول الجفون والأذنين وتراجع سريع للكدمات.',
                        normal: [
                            'إزالة غرز الجفون (اليوم ٥ – ٧) وغرز الوجه والأذنين (اليوم ٧ – ١٠) بسلاسة.',
                            'انحسار كبير في التورم الحاد وتحول الكدمات للأصفر الفاتح.',
                            'تحسن راحة العينين وبداية ظهور نضارة ومشدودية خط الفك والرقبة.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'مشي خارجي هادئ مع نظارة شمسية وقبعة للحماية'],
                            ['partial', 'مهام خفيفة عن بُعد من اليوم ٧ دون إجهاد طويل للعين'],
                            ['partial', 'بين اليوم ٧ و١٠ عند صفاء الرؤية وسلاسة التفات الرقبة'],
                            ['rest', 'مؤجل للأسبوع الثالث – الرابع'],
                            ['rest', 'ممنوع الأوزان والانحناء']
                        ),
                        protocolPrimary: ['مشد الوجه الطبي', 'أثناء النوم والمنزل', 'الاستمرار في ارتدائه ليلاً أو بالمنزل خلال الأسبوع الثاني لدعم خط الفك.'],
                        protocolSecondary: ['نظافة الجرح وغسل الشعر', 'بمنتهى اللطف', 'غسل الشعر بماء فاتر وشامبو لطيف مع تجنب مجفف الشعر الساخن حول الأذنين.'],
                        pearl: 'لا تستخدمي المكياج فوق خطوط الجرح قبل فك الغرز وإذن الطبيب؛ وبعد الإذن يمكن استخدام مستحضرات لطيفة.'
                    },
                    {
                        swelling: 50, readiness: 72,
                        summary: 'العودة الواثقة للعمل والحياة الاجتماعية بمظهر منتعش وطبيعي.',
                        normal: [
                            'اختفاء أغلب الكدمات وقدرة ممتازة على الظهور الاجتماعي المريح بنهاية الأسبوع الثاني.',
                            'بقاء تورم خفيف وشد بسيط في الرقبة أو تنميل جزئي أمام الأذن يزول تدريجياً.',
                            'وضوح شباب الجفون وتحديد خط الفك والرقبة بمظهر طبيعي تماماً.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حركة يومية كاملة وظهور اجتماعي مريح'],
                            ['available', 'العودة الكاملة للعمل المكتبي بين اليوم ١٠ – ١٤'],
                            ['available', 'قيادة مريحة وآمنة بالكامل'],
                            ['rest', 'مؤجل للأسبوع الثالث – الرابع'],
                            ['rest', 'تأجيل الأوزان واليوغا المقلوبة للأسبوع ٥ – ٦']
                        ),
                        protocolPrimary: ['مشد الوجه الطبي', 'ليلاً فقط أو يتم إيقافه', 'يُنهى استخدام المشد غالباً بين الأسبوع الثاني والثالث حسب تقييم التورم.'],
                        protocolSecondary: ['جل السيليكون + واقي الشمس + نظارة', 'أساسي يومياً', 'بدء جل السيليكون على آثار الجفون وما حول الأذن مع واقي شمس SPF 50.'],
                        pearl: 'أجّل صبغ الشعر أو جلسات البخار الساخنة للوجه حتى إتمام ٤ أسابيع لضمان تمام التئام الخطوط.'
                    },
                    {
                        swelling: 30, readiness: 86,
                        summary: 'تراجع التورم الدقيق، نعومة التعبير، وبداية الكارديو الخفيف.',
                        normal: [
                            'انحسار قرابة ٧٥ – ٨٠٪ من التورم وظهور ملامح الوجه بنضارة وراحة طبيعية.',
                            'ليونة أكبر في الرقبة والخدين مع استمرار تحسن الإحساس حول الأذنين.',
                            'هدوء خطوط الأثر المخفية في ثنية الجفن وحول الأذن وخط الشعر.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'حياة يومية كاملة دون قيود'],
                            ['available', 'كافة الأعمال والأنشطة الاجتماعية'],
                            ['available', 'دون قيود'],
                            ['available', 'كارديو خفيف إلى متوسط من الأسبوع ٣ – ٤ دون إجهاد حاد'],
                            ['rest', 'تأجيل الأوزان الثقيلة والانحناء المقلوب للأسبوع ٥ – ٦']
                        ),
                        protocolPrimary: ['العدسات اللاصقة والمكياج', 'عودة مريحة', 'العودة للعدسات اللاصقة والمكياج اللطيف وصبغ الشعر بنهاية الأسبوع الرابع.'],
                        protocolSecondary: ['السيليكون والحماية من الشمس', 'يومياً', 'الالتزام بالسيليكون وواقي الشمس يسرّع بهتان الأثر تماماً.'],
                        pearl: 'تجنب التدخين والتعرض الطويل للشمس المباشرة؛ فهما العاملان الأبرز في جودة الكولاجين ونضارة البشرة.'
                    },
                    {
                        swelling: 14, readiness: 96,
                        summary: 'ليونة كاملة للوجه والرقبة والعودة الكاملة للجيم والسباحة.',
                        normal: [
                            'زوال أغلب الشد الداخلي واستعادة كاملة لمرونة تعبيرات الوجه الطبيعية.',
                            'اندماج شبه كامل لخطوط الجفون وتراجع احمرار آثار ما حول الأذن.',
                            'تلاشي التورم المسائي الطفيف في الرقبة وأسفل الخدين.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'نشاط كامل ١٠٠٪'],
                            ['available', 'دون قيود'],
                            ['available', 'كارديو كامل وسباحة'],
                            ['available', 'الجيم والأوزان الكاملة وجميع التمارين من الأسبوع ٥ – ٦']
                        ),
                        protocolPrimary: ['روتين البشرة الطبي', 'عودة تدريجية', 'يمكن العودة لروتين العناية بالبشرة الفعّال بعد استشارة الطبيب.'],
                        protocolSecondary: ['ترطيب وواقي شمس', 'دائم', 'حماية مستمرة للبشرة للحفاظ على نتائج الشد.'],
                        pearl: 'في هذه المرحلة يلاحظ من حولك نضارة وراحة في ملامحك دون أن يدركوا أنك خضعت لإجراء جراحي.'
                    },
                    {
                        swelling: 4, readiness: 100,
                        summary: 'نضوج الأنسجة العميقة وثبات النتيجة الشابة والطبيعية للوجه والجفون.',
                        normal: [
                            'اختفاء التورم الدقيق تقريباً ووضوح نهائي لخط الفك والرقبة ومحيط العينين.',
                            'عودة الإحساس الطبيعي حول الأذنين بنسبة كبيرة جداً.',
                            'بهتان واضح للآثار المخفية داخل الثنيات الطبيعية.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كافة الأنشطة والرياضات دون قيود']
                        ),
                        protocolPrimary: ['المتابعة الدورية', 'تقييم النضوج', 'زيارة اطمئنان على جودة التئام الآثار ونضارة البشرة.'],
                        protocolSecondary: ['عناية جلدية وقائية', 'مستمرة', 'الترطيب وواقي الشمس ونمط النوم الصحي تحافظ على النتيجة لسنوات.'],
                        pearl: 'يمكن مناقشة جلسات العناية بالبشرة التكميلية بعد الشهر الثالث لتعزيز إشراقة الجلد وجودته.'
                    },
                    {
                        swelling: 0, readiness: 100,
                        summary: 'النتيجة النهائية المستقرة لشد الوجه والجفون بنضارة طبيعية وهادئة.',
                        normal: [
                            'اكتمال استقرار الأنسجة العميقة بمرونة وحركة طبيعية ١٠٠٪.',
                            'اختفاء شبه كامل لآثار الجفون ومحيط الأذن داخل الثنيات الطبيعية.',
                            'عودة الإحساس الطبيعي بالكامل وثبات المظهر الشاب والمتجدد.'
                        ],
                        activities: makeActivityRows(
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'كامل ١٠٠٪'],
                            ['available', 'جميع الرياضات والأنشطة دون استثناء']
                        ),
                        protocolPrimary: ['المتابعة الختامية', 'اكتمال الرحلة', 'مقارنة النتيجة النهائية وتوثيق استقرار الشكل.'],
                        protocolSecondary: ['الوقاية من الشمس والكولاجين', 'روتين دائم', 'واقي الشمس والترطيب والابتعاد عن التدخين أسرار استمرار شباب النتيجة.'],
                        pearl: 'أنت الآن في أبهى مراحل النتيجة المستقرة؛ حافظ على حماية بشرتك من الشمس لتدوم هذه النضارة لسنوات.'
                    }
                ]
            }
        };

        const PROCEDURE_KEYS = [
            'vaser',
            'abdominoplasty',
            'combined',
            'gynecomastia',
            'fat_grafting',
            'limb_lift',
            'rhinoplasty',
            'facelift'
        ];

        // ================= APPLICATION STATE =================
        const appState = {
            procedureId: 'vaser',
            stageIndex: 0,
            surgeryDate: null,
            matchedStageIdx: null,
            pendingEmbeddedDataUrl: ''
        };

        // ================= UTILITIES =================
        function toArabicDigits(value) {
            const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            return String(value).replace(/\d/g, d => digits[d]);
        }

        function formatArabicDate(dateObj) {
            try {
                return new Intl.DateTimeFormat(document.documentElement.lang==='en'?'en-GB':'ar-EG', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }).format(dateObj);
            } catch (e) {
                return dateObj.toISOString().split('T')[0];
            }
        }

        function getTodayISO() {
            const d = new Date();
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }

        function showToast(msg) {
            const box = root.getElementById('toast-box');
            if (!box) return;
            box.textContent = msg;
            box.classList.remove('hidden');
            clearTimeout(showToast._timer);
            showToast._timer = setTimeout(() => box.classList.add('hidden'), 3600);
        }

        function getActivityBadgeConfig(status) {
            if (status === 'available') {
                return {
                    text: 'متاح',
                    dot: 'bg-emerald-400',
                    pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/35',
                    border: 'border-emerald-500/15'
                };
            }
            if (status === 'partial') {
                return {
                    text: 'جزئي',
                    dot: 'bg-amber-400',
                    pill: 'bg-amber-500/15 text-amber-300 border-amber-400/35',
                    border: 'border-amber-500/15'
                };
            }
            return {
                text: 'راحة',
                dot: 'bg-rose-400',
                pill: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
                border: 'border-rose-500/15'
            };
        }

        function getSvgIcon(type) {
            const icons = {
                vaser: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>',
                abdominoplasty: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
                combined: '<path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"/>',
                gynecomastia: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>',
                fat_grafting: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3.75c-2.8 4.2-6 7.5-6 11a6 6 0 1012 0c0-3.5-3.2-6.8-6-11z"/>',
                limb_lift: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
                rhinoplasty: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m0-18c-2 4.5-4.5 7.5-6 10.5 1.8 1.2 4 1.5 6 1.5s4.2-.3 6-1.5c-1.5-3-4-6-6-10.5z"/>',
                facelift: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm4.875 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z"/>',
                drop: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3.75c-2.8 4.2-6 7.5-6 11a6 6 0 1012 0c0-3.5-3.2-6.8-6-11z"/>',
                car: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>',
                briefcase: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"/>',
                run: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
                dumbbell: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>',
                shield: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>'
            };
            return `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">${icons[type] || icons.shield}</svg>`;
        }

                function renderProcedureSelector() {
            const container = root.getElementById('procedure-selector');
            container.innerHTML = '';

            PROCEDURE_KEYS.forEach(key => {
                const proc = PROCEDURES[key];
                const active = appState.procedureId === key;

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.setAttribute('role', 'tab');
                btn.setAttribute('aria-selected', active ? 'true' : 'false');
                btn.className = [
                    'shrink-0 snap-center min-h-[54px] min-w-[178px] text-right px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer',
                    active
                        ? 'bg-gradient-to-l from-charcoalLight via-charcoal to-pitch border-rosegold/80 text-crisp shadow-roseglow'
                        : 'bg-charcoal hover:bg-charcoalLight border-white/[0.08] text-silver hover:text-crisp'
                ].join(' ');

                btn.innerHTML = `
                    <div class="min-w-0">
                        <div class="font-bold text-xs whitespace-nowrap ${active ? 'text-crisp' : ''}">${proc.title}</div>
                        <div class="text-[10px] opacity-75 mt-0.5 whitespace-nowrap" dir="ltr">${proc.subtitle}</div>
                    </div>
                    <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-rosegold/20 text-rosegoldSoft border border-rosegold/45' : 'bg-pitch text-silver border border-white/[0.07]'}">
                        ${getSvgIcon(key)}
                    </div>
                `;

                btn.addEventListener('click', () => {
                    if (appState.procedureId === key) return;
                    appState.procedureId = key;
                    renderAll(false);
                    requestAnimationFrame(() => { const active = root.querySelector('#procedure-selector button[aria-selected="true"]'); if (active) active.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' }); });
                });

                container.appendChild(btn);
            });

            root.getElementById('procedure-meta-hint').textContent = PROCEDURES[appState.procedureId].hint;
        }

        function renderReturnMatrix() {
            const proc = PROCEDURES[appState.procedureId];
            root.getElementById('matrix-proc-label').textContent = `${proc.title} (${proc.subtitle})`;

            root.getElementById('return-matrix-grid').innerHTML = proc.matrix.map(item => `
                <div class="p-3 rounded-2xl bg-pitch border border-white/[0.07] flex flex-col justify-between gap-2">
                    <div class="flex items-center justify-between gap-1.5">
                        <span class="text-[11px] font-medium text-silver">${item.title}</span>
                        <div class="w-7 h-7 rounded-lg bg-charcoal border border-rosegold/25 flex items-center justify-center text-rosegoldSoft shrink-0">
                            ${getSvgIcon(item.icon)}
                        </div>
                    </div>
                    <div class="text-xs font-extrabold text-rosegoldSoft leading-snug">${item.value}</div>
                </div>
            `).join('');
        }

        const skinFinalMeta = () => {
            const skin = root.host.dataset.skin;
            const complete = !appState.surgeryDate || new Date() >= new Date(appState.surgeryDate.getFullYear(), appState.surgeryDate.getMonth() + (skin === "thin" ? 9 : 12), appState.surgeryDate.getDate());
            return {...STAGES_META[6],shortLabel:complete ? "النتيجة النهائية" : "استمرار نضج النتيجة",rangeLabel:skin === "thin" ? "٦ – ٩ أشهر" : "نحو ١٢ شهراً",complete};
        };
        root.host.refreshSkin = () => {if(appState.surgeryDate)updateCalculator(false);else{renderTimelineTabs();renderStageDetails();}};
        function renderTimelineTabs() {
            const container = root.getElementById('timeline-tabs');
            container.innerHTML = '';

            STAGES_META.forEach((baseMeta, idx) => {
                const meta = appState.procedureId === "rhinoplasty" && idx === 6 ? skinFinalMeta() : baseMeta;
                const isSelected = idx === appState.stageIndex;
                const isPast = idx < appState.stageIndex;
                const isCurrentPatientStage = appState.matchedStageIdx === idx;

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.dataset.stageIdx = idx;
                btn.className = [
                    'shrink-0 snap-center min-h-[50px] px-3.5 py-2.5 rounded-2xl border text-right transition-all duration-200 flex items-center gap-2 cursor-pointer',
                    isSelected
                        ? 'bg-rosegold text-pitch border-rosegoldSoft shadow-roseglow'
                        : isCurrentPatientStage
                            ? 'bg-charcoalLight text-crisp border-rosegold/85'
                            : isPast
                                ? 'bg-charcoal text-crisp border-rosegold/30'
                                : 'bg-charcoal/80 text-silver border-white/[0.08] hover:text-crisp'
                ].join(' ');

                const numPill = `<span class="w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold shrink-0 ${isSelected ? 'bg-pitch/20 text-pitch' : isPast ? 'bg-rosegold/20 text-rosegoldSoft' : 'bg-white/[0.07] text-silver'}">${toArabicDigits(idx + 1)}</span>`;
                const myStagePill = isCurrentPatientStage
                    ? `<span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${isSelected ? 'bg-pitch text-rosegoldSoft' : 'bg-rosegold text-pitch'}">مرحلتك الحالية</span>`
                    : '';

                btn.innerHTML = `
                    ${numPill}
                    <div class="leading-tight">
                        <div class="text-xs font-bold whitespace-nowrap">${meta.shortLabel}</div>
                        <div class="text-[10px] whitespace-nowrap mt-0.5 ${isSelected ? 'text-pitch/80 font-semibold' : 'opacity-75'}">${meta.rangeLabel}</div>
                    </div>
                    ${myStagePill}
                `;

                btn.addEventListener('click', () => {
                    appState.stageIndex = idx;
                    renderTimelineTabs();
                    renderStageDetails();
                    requestAnimationFrame(() => { const active = root.querySelector('#timeline-tabs button[data-stage-idx="' + appState.stageIndex + '"]'); if (active) active.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' }); });
                });

                container.appendChild(btn);
            });

            root.getElementById('stage-progress-label').textContent = `المرحلة ${toArabicDigits(appState.stageIndex + 1)} من ${toArabicDigits(STAGES_META.length)}`;
        }

        function renderStageDetails() {
            const proc = PROCEDURES[appState.procedureId];
            const isRhinoFinal = appState.procedureId === "rhinoplasty" && appState.stageIndex === 6;
            const meta = isRhinoFinal ? skinFinalMeta() : STAGES_META[appState.stageIndex];
            const stage = isRhinoFinal ? {...proc.stages[6],swelling:meta.complete && root.host.dataset.skin === "thick" ? 0 : proc.stages[6].swelling,summary:!meta.complete ? "ما زالت التفاصيل الدقيقة تتحسن. توقيت النتيجة النهائية يتبع سُمك الجلد والتقييم الطبي." :root.host.dataset.skin === "thick" ? "اكتمال النتيجة النهائية للجلد السميك نحو عام." : root.host.dataset.skin === "thin" ? "الجلد الرقيق يستقر مبكراً، مع اكتمال النضج في المرحلة النهائية." : "الجلد المتوسط يتحسن تدريجياً حتى اكتمال النضج في المرحلة النهائية."} : proc.stages[appState.stageIndex];

            if (isRhinoFinal && !meta.complete) {
                stage.normal = ["يستمر تراجع التورم الدقيق وتحسن ليونة الأرنبة تدريجياً.","الجلد الرقيق يستقر مبكراً، والجلد المتوسط يتحسن تدريجياً، والجلد السميك يصل للنتيجة النهائية نحو عام.","يُراجع اكتمال النتيجة في المتابعة الطبية، وليس بمرور اليوم التسعين وحده."];
                stage.protocolPrimary = ["المتابعة الدورية","استمرار النضج","مراجعة الصور وتغيرات التورم والتنفس مع الطبيب."];
                stage.protocolSecondary = ["العناية اليومية","حسب توجيه الطبيب","استمر في خطة العناية والمتابعة المخصصة لحالتك."];
                stage.pearl = "توقيت النتيجة النهائية يختلف حسب سُمك الجلد، ولا يعني الانتقال إلى هذه المرحلة اكتمال التعافي.";
            }
            const panel = root.getElementById('stage-detail-panel');
            panel.classList.remove('stage-animate');
            void panel.offsetWidth;
            panel.classList.add('stage-animate');

            // Update Progress Bars
            root.getElementById('swelling-level-text').textContent = `${toArabicDigits(stage.swelling)}٪`;
            root.getElementById('swelling-level-bar').style.width = `${Math.max(stage.swelling, 2)}%`;

            root.getElementById('readiness-level-text').textContent = `${toArabicDigits(stage.readiness)}٪`;
            root.getElementById('readiness-level-bar').style.width = `${stage.readiness}%`;

            // Stage Banner
            root.getElementById('stage-header-badge').textContent = `المرحلة ${toArabicDigits(appState.stageIndex + 1)} • ${meta.rangeLabel} • ${proc.title}`;
            root.getElementById('stage-header-title').textContent = meta.shortLabel;
            root.getElementById('stage-header-summary').textContent = stage.summary;

            const myBadge = root.getElementById('stage-my-stage-badge');
            if (appState.matchedStageIdx === appState.stageIndex) {
                myBadge.classList.remove('hidden');
            } else {
                myBadge.classList.add('hidden');
            }

            // What's Normal
            root.getElementById('stage-normal-list').innerHTML = stage.normal.map(text => `
                <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-rosegoldSoft shrink-0 mt-2"></span>
                    <span>${text}</span>
                </li>
            `).join('');

            // 5 Activity Status Rows
            root.getElementById('stage-activity-list').innerHTML = stage.activities.map(row => {
                const cfg = getActivityBadgeConfig(row.status);
                return `
                    <div class="p-3 rounded-2xl bg-pitch border ${row.status === "available" ? "border-white/10" : cfg.border} flex items-start justify-between gap-2.5">
                        <div class="flex items-start gap-2 min-w-0">
                            <span class="w-2 h-2 rounded-full ${row.status === "available" ? "bg-white/20" : cfg.dot} shrink-0 mt-1.5"></span>
                            <div class="min-w-0">
                                <div class="text-xs font-bold text-crisp">${row.label}</div>
                                <div class="text-[11px] text-silver mt-0.5 leading-relaxed">${row.note}</div>
                            </div>
                        </div>
                        <span class="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border ${row.status === "available" ? "bg-white/5 text-emerald-300 border-white/10" : cfg.pill}">${cfg.text}</span>
                    </div>
                `;
            }).join('');

            // Protocol Details
            root.getElementById('protocol-primary-title').textContent = stage.protocolPrimary[0];
            root.getElementById('protocol-primary-badge').textContent = stage.protocolPrimary[1];
            root.getElementById('protocol-primary-desc').textContent = stage.protocolPrimary[2];

            root.getElementById('protocol-secondary-title').textContent = stage.protocolSecondary[0];
            root.getElementById('protocol-secondary-badge').textContent = stage.protocolSecondary[1];
            root.getElementById('protocol-secondary-desc').textContent = stage.protocolSecondary[2];

            // Medical Tip
            root.getElementById('stage-clinical-pearl').textContent = stage.pearl;

            // Prev / Next Controls
            root.getElementById('btn-prev-stage').disabled = appState.stageIndex === 0;
            root.getElementById('btn-next-stage').disabled = appState.stageIndex === STAGES_META.length - 1;
        }

        function renderSafetyAndWhatsApp() {
            const proc = PROCEDURES[appState.procedureId];
            root.getElementById('safety-proc-name').textContent = proc.title;

            root.getElementById('procedure-specific-flags').innerHTML = proc.redFlags.map(item => `
                <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-rosegoldSoft shrink-0 mt-2"></span>
                    <span>${item}</span>
                </li>
            `).join('');

            let message = `السلام عليكم، أود الاستفسار بخصوص رحلة التعافي بعد إجراء: ${proc.title}`;
            if (appState.surgeryDate) {
                message += ` (تاريخ العملية: ${formatArabicDate(appState.surgeryDate)})`;
            }
            const waUrl = `https://wa.me/201210304060?text=${encodeURIComponent(message)}`;


            root.getElementById('safety-wa-link').href = waUrl;
        }

        // ================= SMART DATE CALCULATOR =================
        function updateCalculator(autoJumpToStage = false) {
            const outputBox = root.getElementById('calculator-output');
            const clearBtn = root.getElementById('btn-date-clear');

            if (!appState.surgeryDate) {
                appState.matchedStageIdx = null;
                outputBox.classList.add('hidden');
                clearBtn.classList.add('hidden');
                renderTimelineTabs();
                renderStageDetails();
                renderSafetyAndWhatsApp();
                return;
            }

            outputBox.classList.remove('hidden');
            clearBtn.classList.remove('hidden');

            const proc = PROCEDURES[appState.procedureId];
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const opDate = new Date(appState.surgeryDate);
            opDate.setHours(0, 0, 0, 0);

            const diffDays = Math.round((today.getTime() - opDate.getTime()) / (1000 * 60 * 60 * 24));
            const statusCard = root.getElementById('calculator-status-card');

            if (diffDays < 0) {
                appState.matchedStageIdx = null;
                const remaining = Math.abs(diffDays);
                const dayWord = remaining === 1 ? 'يوم' : (remaining <= 10 ? 'أيام' : 'يوماً');

                statusCard.innerHTML = `
                    <div>
                        <div class="text-[11px] text-rosegoldSoft font-bold">العد التنازلي لموعد الإجراء</div>
                        <div class="text-xs font-extrabold text-crisp mt-0.5">
                            متبقي ${toArabicDigits(remaining)} ${dayWord} على الموعد (${formatArabicDate(opDate)})
                        </div>
                    </div>
                `;
            } else {
                let idx = STAGES_META.findIndex(s => diffDays >= s.dayRange[0] && diffDays <= s.dayRange[1]);
                if (idx === -1) idx = STAGES_META.length - 1;
                appState.matchedStageIdx = idx;

                const matchedMeta = appState.procedureId === "rhinoplasty" && idx === 6 ? skinFinalMeta() : STAGES_META[idx];
                const weeks = Math.floor(diffDays / 7);
                const remDays = diffDays % 7;
                const elapsedText = diffDays === 0
                    ? 'اليوم هو يوم الإجراء — ألف سلامة!'
                    : weeks === 0
                        ? `مرّ ${toArabicDigits(diffDays)} ${diffDays === 1 ? 'يوم' : 'أيام'} • ${matchedMeta.shortLabel}`
                        : `مرّ ${toArabicDigits(diffDays)} يوماً (${toArabicDigits(weeks)} ${weeks === 1 ? 'أسبوع' : (weeks <= 10 ? 'أسابيع' : 'أسبوعاً')}${remDays > 0 ? ` و${toArabicDigits(remDays)} ${remDays === 1 ? 'يوم' : 'أيام'}` : ''}) • ${matchedMeta.shortLabel}`;

                statusCard.innerHTML = `
                    <div>
                        <div class="text-[11px] text-rosegoldSoft font-bold flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full bg-rosegold animate-pulse"></span>
                            مرحلتك الحالية على الخط الزمني
                        </div>
                        <div class="text-xs font-extrabold text-crisp mt-0.5 leading-snug">${elapsedText}</div>
                    </div>
                    <button type="button" id="btn-jump-my-stage"
                            class="w-full min-h-[42px] px-4 py-2 rounded-xl bg-rosegold hover:bg-rosegoldSoft text-pitch font-extrabold text-xs transition-colors cursor-pointer">
                        الانتقال لمرحلتي على الخط الزمني
                    </button>
                `;

                const jumpBtn = root.getElementById('btn-jump-my-stage');
                if (jumpBtn) {
                    jumpBtn.addEventListener('click', () => {
                        appState.stageIndex = idx;
                        renderTimelineTabs();
                        renderStageDetails();
                        scrollActiveStageIntoView();
                        root.getElementById('timeline-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                }

                if (autoJumpToStage) {
                    appState.stageIndex = idx;
                }
            }

            // 5 Milestone Dates Grid (last card spans 2 columns cleanly)
            root.getElementById('calculator-milestones').innerHTML = proc.milestones.map((m, i) => {
                const targetDate = new Date(opDate);
                targetDate.setDate(targetDate.getDate() + m.days);
                const isReached = diffDays >= m.days;
                const spanClass = i === proc.milestones.length - 1 ? 'col-span-2' : '';

                return `
                    <div class="${spanClass} p-3 rounded-2xl bg-pitch border ${isReached ? 'border-emerald-400/35' : 'border-white/[0.08]'} flex flex-col justify-between gap-1">
                        <div class="flex items-center justify-between gap-1.5">
                            <span class="text-[11px] font-semibold text-silver leading-snug">${m.label}</span>
                            ${isReached ? '<span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>' : ''}
                        </div>
                        <div class="text-xs font-extrabold ${isReached ? 'text-emerald-300' : 'text-rosegoldSoft'}">${formatArabicDate(targetDate)}</div>
                        <div class="text-[10px] text-silver/80">تقريباً بعد ${m.note}</div>
                    </div>
                `;
            }).join('');

            renderTimelineTabs();
            renderStageDetails();
            renderSafetyAndWhatsApp();

            if (autoJumpToStage && appState.matchedStageIdx !== null) {
                scrollActiveStageIntoView();
                root.getElementById('timeline-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        function scrollActiveStageIntoView() {
            const pill = root.querySelector(`#timeline-tabs button[data-stage-idx="${appState.stageIndex}"]`);
            if (pill) {
                pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }

        function renderAll(autoJump = false) {
            root.getElementById('rhino-skin-field').hidden = appState.procedureId !== 'rhinoplasty';
            renderProcedureSelector();
            renderReturnMatrix();
            renderSafetyAndWhatsApp();
            if (appState.surgeryDate) {
                updateCalculator(autoJump);
            } else {
                renderTimelineTabs();
                renderStageDetails();
            }
        }

        // ================= INITIALIZATION =================
        function initRecoveryApp() {
            try {


                const skinSelect = root.getElementById('rhino-skin-select');
                root.host.dataset.skin = skinSelect.value;
                skinSelect.addEventListener('change', () => {
                    root.host.dataset.skin = skinSelect.value;
                    root.host.refreshSkin();
                });
                const dateInput = root.getElementById('surgery-date-input');
                const todayBtn = root.getElementById('btn-date-today');
                const clearBtn = root.getElementById('btn-date-clear');

                dateInput.addEventListener('change', (e) => {
                    const val = e.target.value;
                    if (!val) {
                        appState.surgeryDate = null;
                        updateCalculator(false);
                        return;
                    }
                    const [y, m, d] = val.split('-').map(Number);
                    appState.surgeryDate = new Date(y, m - 1, d);
                    updateCalculator(true);
                });

                todayBtn.addEventListener('click', () => {
                    const iso = getTodayISO();
                    dateInput.value = iso;
                    const [y, m, d] = iso.split('-').map(Number);
                    appState.surgeryDate = new Date(y, m - 1, d);
                    updateCalculator(true);
                });

                clearBtn.addEventListener('click', () => {
                    dateInput.value = '';
                    appState.surgeryDate = null;
                    updateCalculator(false);
                });

                root.getElementById('btn-prev-stage').addEventListener('click', () => {
                    if (appState.stageIndex > 0) {
                        appState.stageIndex--;
                        renderTimelineTabs();
                        renderStageDetails();
                        scrollActiveStageIntoView();
                    }
                });

                root.getElementById('btn-next-stage').addEventListener('click', () => {
                    if (appState.stageIndex < STAGES_META.length - 1) {
                        appState.stageIndex++;
                        renderTimelineTabs();
                        renderStageDetails();
                        scrollActiveStageIntoView();
                    }
                });

                renderAll(false);
            } catch (err) {
                console.error('Initialization error:', err);
            }
        }

        initRecoveryApp();

 }
 customElements.define('dre-recovery-reference', class extends HTMLElement {
  connectedCallback(){if(this.shadowRoot)return;const root=this.attachShadow({mode:'open'});root.innerHTML=markup;mount(root);}
 });
})();
/* Range fill uses the same center-to-center travel area as the native thumb. */
(() => {
 let pending=false;
 const update=e=>{
  if(!(e instanceof HTMLInputElement)||e.type!=='range'||!e.closest('.dre-instrument'))return;
  const min=Number(e.min||0),max=Number(e.max||100),p=max>min?Math.max(0,Math.min(1,(Number(e.value)-min)/(max-min))):0;
  const width=e.getBoundingClientRect().width;if(!width)return;
  const rtl=getComputedStyle(e).direction==='rtl',x=7+p*Math.max(0,width-14);
  const fill=`linear-gradient(to ${rtl?'left':'right'},#dfb99b 0px,#c89d7c ${x}px,#050507 ${x}px,#050507 100%)`;
  if(e.style.getPropertyValue('--range-fill')!==fill)e.style.setProperty('--range-fill',fill);
  const pct=(p*100)+'%';if(e.style.getPropertyValue('--range-progress')!==pct)e.style.setProperty('--range-progress',pct);
 };
 const scan=()=>{pending=false;document.querySelectorAll('.dre-instrument input[type=range]').forEach(update);};
 const queue=()=>{if(!pending){pending=true;requestAnimationFrame(scan);}};
 for(const type of ['input','change'])document.addEventListener(type,e=>{update(e.target);queue();},true);
 new MutationObserver(queue).observe(document.getElementById('root')||document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['value','style','dir','min','max']});
 const resize=new ResizeObserver(queue);resize.observe(document.documentElement);window.addEventListener('resize',queue,{passive:true});queue();
})();

/* Availability lights indicate an implemented portal destination, never staff presence. */
(() => {
 const routes=new Set(['/','/facelift','/face','/body','/rhino','/library','/assessment','/consultation','/travel','/recovery']);
 const scan=()=>{
  document.querySelectorAll('.dre7-journey-links a,.dre-navigation nav a,.dre-desktop-nav a').forEach(a=>{
   const u=new URL(a.href,location.href),route=u.hash.startsWith('#/')?u.hash.slice(1).split('?')[0]:u.pathname;
   const yes=u.origin===location.origin&&routes.has(route)&&a.getAttribute('aria-disabled')!=='true';
   if(yes&&a.dataset.sectionAvailable!=='true'){a.dataset.sectionAvailable='true';}if(yes){const title=document.documentElement.lang.startsWith('ar')?'القسم متاح للتصفح':'Section available to explore';if(a.title!==title)a.title=title;}
  });
  document.querySelectorAll('.dre7-journey').forEach(e=>{const h=e.querySelector('h3');if(h&&h.dataset.sectionAvailable!=='true'&&e.querySelector('a[data-section-available="true"]'))h.dataset.sectionAvailable='true';});
 };
 new MutationObserver(scan).observe(document.getElementById('root')||document.body,{childList:true,subtree:true});new MutationObserver(scan).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});scan();
})();


/* Recovery education: original slides stay in their supplied sequence. */
(() => {
 const groups=[{"ar": "الوجه والرقبة", "en": "Face & Neck", "items": [{"id": 2, "ar": "الجانب الخفي لتعافي النانو-فات", "en": "The Yellow Phase", "thumb": "carousel-02/slide-01-cover.webp", "slides": ["carousel-02/slide-01.webp", "carousel-02/slide-02.webp", "carousel-02/slide-03.webp", "carousel-02/slide-04.webp", "carousel-02/slide-05.webp"]}, {"id": 5, "ar": "ما لا تتوقعينه بعد حقن البوتوكس", "en": "Transient Asymmetry", "thumb": "carousel-05/slide-01-cover.webp", "slides": ["carousel-05/slide-01.webp", "carousel-05/slide-02.webp", "carousel-05/slide-03.webp", "carousel-05/slide-04.webp", "carousel-05/slide-05.webp", "carousel-05/slide-06.webp"]}, {"id": 12, "ar": "الفارق بين الحشو السطحي وبناء الكولاجين العميق", "en": "Neck Restructuring", "thumb": "carousel-12/slide-01-cover.webp", "slides": ["carousel-12/slide-01.webp", "carousel-12/slide-02.webp", "carousel-12/slide-03.webp", "carousel-12/slide-04.webp", "carousel-12/slide-05.webp", "carousel-12/slide-06.webp", "carousel-12/slide-07.webp", "carousel-12/slide-08.webp", "carousel-12/slide-09.webp", "carousel-12/slide-10.webp"]}, {"id": 20, "ar": "كيف نعالج الابتسامة اللثوية دون المساس بحيوية الشفة العلوية؟", "en": "Micro-Myomodulation", "thumb": "carousel-20/slide-01-cover.webp", "slides": ["carousel-20/slide-01.webp", "carousel-20/slide-02.webp", "carousel-20/slide-03.webp", "carousel-20/slide-04.webp", "carousel-20/slide-05.webp", "carousel-20/slide-06.webp", "carousel-20/slide-07.webp", "carousel-20/slide-08.webp", "carousel-20/slide-09.webp"]}]}, {"ar": "الصدر", "en": "Chest", "items": [{"id": 3, "ar": "التشنج العضلي الدفاعي المؤقت لإمساك حشوة السيليكون في الأعلى كاستجابة طبيعية", "en": "MUSCLE SPASM", "thumb": "carousel-03/slide-01-cover.webp", "slides": ["carousel-03/slide-01.webp", "carousel-03/slide-02.webp", "carousel-03/slide-03.webp", "carousel-03/slide-04.webp", "carousel-03/slide-05.webp", "carousel-03/slide-06.webp", "carousel-03/slide-07.webp"]}, {"id": 11, "ar": "هبوط الحشوة", "en": "Implant Bottoming Out", "thumb": "carousel-11/slide-01-cover.webp", "slides": ["carousel-11/slide-01.webp", "carousel-11/slide-02.webp", "carousel-11/slide-03.webp", "carousel-11/slide-04.webp", "carousel-11/slide-05.webp", "carousel-11/slide-06.webp", "carousel-11/slide-07.webp", "carousel-11/slide-08.webp", "carousel-11/slide-09.webp", "carousel-11/slide-10.webp"]}, {"id": 23, "ar": "تشوه التثدي العكسي (الحفرة الغائرة): عندما يدمر الشفط العشوائي هيبة الصدر الذكوري", "en": null, "thumb": "carousel-23/slide-01-cover.webp", "slides": ["carousel-23/slide-01.webp", "carousel-23/slide-02.webp", "carousel-23/slide-03.webp", "carousel-23/slide-04.webp", "carousel-23/slide-05.webp", "carousel-23/slide-06.webp", "carousel-23/slide-07.webp"]}]}, {"ar": "شد البطن ونحت الجسم", "en": "Tummy & Body", "items": [{"id": 8, "ar": "السلامة الحرارية", "en": "Thermal Safety", "thumb": "carousel-08/slide-01-cover.webp", "slides": ["carousel-08/slide-01.webp", "carousel-08/slide-02.webp", "carousel-08/slide-03.webp", "carousel-08/slide-04.webp", "carousel-08/slide-05.webp", "carousel-08/slide-06.webp", "carousel-08/slide-07.webp"]}, {"id": 10, "ar": "المساج الخشبي العنيف", "en": "Aggressive Wood Therapy", "thumb": "carousel-10/slide-01-cover.webp", "slides": ["carousel-10/slide-01.webp", "carousel-10/slide-02.webp", "carousel-10/slide-03.webp", "carousel-10/slide-04.webp", "carousel-10/slide-05.webp", "carousel-10/slide-06.webp"]}, {"id": 13, "ar": "جسدك لا يقبل القوالب التجميلية الجاهزة والمكررة", "en": "Bespoke Aesthetics", "thumb": "carousel-13/slide-01-cover.webp", "slides": ["carousel-13/slide-01.webp", "carousel-13/slide-02.webp", "carousel-13/slide-03.webp", "carousel-13/slide-04.webp", "carousel-13/slide-05.webp", "carousel-13/slide-06.webp", "carousel-13/slide-07.webp"]}, {"id": 16, "ar": "الوقوف المستقيم المبكر يضع إجهاداً شديداً على جرح شد البطن", "en": "Mechanical Overload", "thumb": "carousel-16/slide-01-cover.webp", "slides": ["carousel-16/slide-01.webp", "carousel-16/slide-02.webp", "carousel-16/slide-03.webp", "carousel-16/slide-04.webp", "carousel-16/slide-05.webp"]}, {"id": 21, "ar": "امتى أرجع الجيم بعد عملية شد البطن؟", "en": "The Internal Corset", "thumb": "carousel-21/slide-01-cover.webp", "slides": ["carousel-21/slide-01.webp", "carousel-21/slide-02.webp", "carousel-21/slide-03.webp", "carousel-21/slide-04.webp", "carousel-21/slide-05.webp", "carousel-21/slide-06.webp"]}]}, {"ar": "الدهون والـBBL", "en": "Fat Transfer & BBL", "items": [{"id": 15, "ar": "الحجم المبالغ فيه بعد الحقن مباشرة ليس نتيجة نهائية بل رد فعل طبيعي للأنسجة", "en": "The Temporary Illusion", "thumb": "carousel-15/slide-01-cover.webp", "slides": ["carousel-15/slide-01.webp", "carousel-15/slide-02.webp", "carousel-15/slide-03.webp", "carousel-15/slide-04.webp", "carousel-15/slide-05.webp"]}, {"id": 22, "ar": "حقن الدهون الذاتية: الهندسة الطبية لضمان سلامة الأنسجة العميقة", "en": "Ultrasound-Guided Transfer", "thumb": "carousel-22/slide-01-cover.webp", "slides": ["carousel-22/slide-01.webp", "carousel-22/slide-02.webp", "carousel-22/slide-03.webp", "carousel-22/slide-04.webp", "carousel-22/slide-05.webp", "carousel-22/slide-06.webp", "carousel-22/slide-07.webp", "carousel-22/slide-08.webp", "carousel-22/slide-09.webp"]}]}, {"ar": "الندبات والبشرة", "en": "Scars & Skin", "items": [{"id": 6, "ar": "ما لم يخبرك به أحد عن تقطيع الألياف", "en": "Subcision Reality", "thumb": "carousel-06/slide-01-cover.webp", "slides": ["carousel-06/slide-01.webp", "carousel-06/slide-02.webp", "carousel-06/slide-03.webp", "carousel-06/slide-04.webp", "carousel-06/slide-05.webp"]}, {"id": 9, "ar": "التوقيت الذهبي", "en": "The Golden Laser Window", "thumb": "carousel-09/slide-01-cover.webp", "slides": ["carousel-09/slide-01.webp", "carousel-09/slide-02.webp", "carousel-09/slide-03.webp", "carousel-09/slide-04.webp", "carousel-09/slide-05.webp", "carousel-09/slide-06.webp", "carousel-09/slide-07.webp"]}, {"id": 14, "ar": "شفط الظهر العنيف والمشدات القاسية السبب المخفي للحروق والتليفات الدائمة", "en": "Friction Burns & Fibrosis", "thumb": "carousel-14/slide-01-cover.webp", "slides": ["carousel-14/slide-01.webp", "carousel-14/slide-02.webp", "carousel-14/slide-03.webp", "carousel-14/slide-04.webp", "carousel-14/slide-05.webp", "carousel-14/slide-06.webp", "carousel-14/slide-07.webp"]}, {"id": 18, "ar": "تصبغ الجروح", "en": "Pigment Prevention", "thumb": "carousel-18/slide-01-cover.webp", "slides": ["carousel-18/slide-01.webp", "carousel-18/slide-02.webp", "carousel-18/slide-03.webp", "carousel-18/slide-04.webp", "carousel-18/slide-05.webp", "carousel-18/slide-06.webp"]}]}];
 const digits=(v,ar)=>ar?String(v).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]):String(v);
 const node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 const asset=p=>new URL('/assets/recovery-guides/'+p,document.baseURI).href;
 class RecoveryGuides extends HTMLElement {
  connectedCallback(){
   if(this.firstChild)return;
   this.ar=this.getAttribute('lang')!=='en';const ar=this.ar;
   const section=node('section','dre-guides');section.id='recovery-education';
   const head=node('header','dre-guides-head');head.append(node('span','dre-kicker',ar?'مكتبة التعافي المصوّرة':'THE RECOVERY EDITIONS'),node('h2','dre-h2',ar?'دليلك المصوّر، خطوة بخطوة':'Your illustrated guide, step by step'),node('p','dre-sub',ar?'موضوعات مصوّرة مرتبطة بهذا القسم. اختر الغلاف، ثم اسحب بين الشرائح.':'Original Arabic educational slides. Open a cover, then swipe through the slides. English slide translations are not yet available.'));section.append(head);
   const allowed=new Set((this.getAttribute('groups')||'1,2,3,4,5').split(','));
   groups.filter((g,i)=>allowed.has(String(i+1))).forEach(g=>{
    const group=node('section','dre-guide-group');const gh=node('div','dre-guide-group-head');
    gh.append(node('h3','',ar?g.ar:g.en),node('span','',digits(g.items.length,ar)+(ar?' موضوعات':' topics')));group.append(gh);
    const rail=node('div','dre-guide-rail');rail.setAttribute('aria-label',ar?g.ar:g.en);
    g.items.forEach(c=>{
     const b=node('button','dre-guide-cover');b.type='button';b.dataset.carousel=c.id;b.setAttribute('aria-haspopup','dialog');
     b.setAttribute('aria-label',(ar?'افتح: ':'Open: ')+(ar?c.ar:(c.en||window.dreTranslateClinicCopy(c.ar,'en'))));
     const media=node('div','dre-guide-cover-image');const img=node('img');img.src=asset(c.thumb);img.alt='';img.loading='lazy';img.width=360;img.height=483;
     media.append(img,node('span','dre-guide-count',digits(c.slides.length,ar)+(ar?' شرائح':' slides')),node('span','dre-guide-open','↗'));b.append(media);
     const label=node('span','dre-guide-cover-label');label.append(node('strong','',ar?c.ar:(c.en||window.dreTranslateClinicCopy(c.ar,'en'))));if(ar&&c.en)label.append(node('small','',c.en));b.append(label);
     b.addEventListener('click',()=>this.open(c));rail.append(b);
    });group.append(rail);section.append(group);
   });
   section.append(node('p','dre-guide-note',ar?'مواد تعليمية مصوّرة، لا تغني عن تقييم الطبيب.':'Original educational slides are in Arabic. English labels do not translate text within the images. These materials do not replace a medical assessment.'));
   this.append(section);
  }
  open(c){
   if(this.dialog)this.dialog.close();const ar=this.ar;
   const d=node('dialog','dre-guide-viewer');d.dir=ar?'rtl':'ltr';d.setAttribute('aria-label',ar?c.ar:(c.en||window.dreTranslateClinicCopy(c.ar,'en')));
   const header=node('header','dre-guide-viewer-head');const title=node('div','dre-guide-viewer-title');title.append(node('small','',ar?'مكتبة التعافي':'RECOVERY EDITIONS'),node('strong','',ar?c.ar:(c.en||window.dreTranslateClinicCopy(c.ar,'en'))));
   const close=node('button','dre-guide-close','×');close.type='button';close.setAttribute('aria-label',ar?'إغلاق العرض':'Close viewer');close.addEventListener('click',()=>d.close());header.append(title,close);
   const viewport=node('div','dre-guide-viewport');viewport.dir='ltr';viewport.tabIndex=0;viewport.setAttribute('aria-label',ar?'اسحب للتنقل بين الشرائح':'Swipe to change slides');
   const frames=c.slides.map((src,i)=>{const frame=node('div','dre-guide-slide');frame.setAttribute('role','group');frame.setAttribute('aria-label',(ar?'شريحة ':'Slide ')+digits(i+1,ar));const img=node('img');img.alt=(ar?'الشريحة ':'Slide ')+digits(i+1,ar);img.draggable=false;img.decoding='async';frame.append(img);viewport.append(frame);return {frame,img,src};});
   const footer=node('footer','dre-guide-viewer-foot');const prev=node('button','',ar?'→ السابق':'← Previous');const next=node('button','',ar?'التالي ←':'Next →');prev.type=next.type='button';const counter=node('span','dre-guide-position');counter.setAttribute('aria-live','polite');counter.setAttribute('aria-atomic','true');footer.append(prev,counter,next);
   const progress=node('div','dre-guide-progress');const fill=node('span');progress.append(fill);
   const hint=node('div','dre-guide-hint',ar?'اسحب يميناً أو يساراً · يمكنك تكبير الصورة بإصبعين':'Swipe left or right · Pinch to zoom');
   d.append(header,viewport,progress,footer,hint);document.body.append(d);this.dialog=d;let current=0,raf=0;
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
   const update=()=>{const width=viewport.clientWidth;if(width)current=Math.max(0,Math.min(frames.length-1,Math.round(viewport.scrollLeft/width)));
    frames.forEach((f,i)=>{if(Math.abs(i-current)<=2&&!f.img.getAttribute('src'))f.img.src=asset(f.src);});
    counter.textContent=ar?('الشريحة '+digits(current+1,ar)+' من '+digits(frames.length,ar)):('Slide '+(current+1)+' of '+frames.length);prev.disabled=current===0;next.disabled=current===frames.length-1;fill.style.width=((current+1)/frames.length*100)+'%';
   };
   const move=i=>viewport.scrollTo({left:Math.max(0,Math.min(frames.length-1,i))*viewport.clientWidth,behavior:reduced?'instant':'smooth'});
   prev.addEventListener('click',()=>move(current-1));next.addEventListener('click',()=>move(current+1));
   viewport.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(update);},{passive:true});
   d.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(current+((e.key==='ArrowLeft')===ar?1:-1));}});
   const resize=()=>{viewport.scrollTo({left:current*viewport.clientWidth,behavior:'instant'});update();};window.addEventListener('resize',resize);
   const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
   d.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;window.removeEventListener('resize',resize);cancelAnimationFrame(raf);d.remove();if(this.dialog===d)this.dialog=null;},{once:true});
   d.showModal();update();
  }
  disconnectedCallback(){if(this.dialog)this.dialog.close();}
 }
 if(!customElements.get('dre-recovery-guides'))customElements.define('dre-recovery-guides',RecoveryGuides);
})();

/* Localize displayed tool numerals without changing input values or React node structure. */
(() => {
 const originals=new WeakMap();let pending=false;
 const localize=s=>s.replace(/[A-Za-z]+[A-Za-z0-9+_.:/-]*|\b\d+[A-Za-z][A-Za-z0-9+_.:/-]*/g,m=>m.replace(/[0-9]/g,d=>String.fromCharCode(0xE000+Number(d)))).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]).replace(/[\uE000-\uE009]/g,d=>String(d.charCodeAt(0)-0xE000));
 const scan=()=>{pending=false;const ar=document.documentElement.lang!=='en';document.querySelectorAll('.dre-instrument').forEach(root=>{const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(n.parentElement.closest('script,style,textarea'))continue;let r=originals.get(n);if(!r||n.data!==r.last)r={original:n.data,last:n.data};const next=ar?localize(r.original):r.original;if(n.data!==next)n.data=next;r.last=next;originals.set(n,r);}});};
 new MutationObserver(()=>{if(!pending){pending=true;requestAnimationFrame(scan);}}).observe(document.getElementById('root')||document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['dir','lang']});scan();
})();
/* Quiet content indicators, not claims of staff presence or medical readiness. */
(() => {
 let queued=false;
 const mark=()=>{queued=false;
  const selectors='.dre-root h2,.dre-root .dre-guide-group-head h3,.dre-root .dre-tabbar .dre-tab,.dre-root .dre-masthead summary';
  document.querySelectorAll(selectors).forEach(e=>{
   if(e.closest('.dre-instrument')&&e.matches('h2'))return;
   if(e.matches('button')&&e.disabled)return;
   if(e.tagName==='SUMMARY'&&!e.parentElement.querySelector('a[data-section-available="true"]'))return;
   if(e.dataset.contentIndicator!=='true')e.dataset.contentIndicator='true';
  });
  const cta=document.querySelector('.dre-brandcta');
  if(cta&&new URL(cta.href,location.href).pathname==='/consultation'&&cta.dataset.contentIndicator!=='true')cta.dataset.contentIndicator='true';
 };
 new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(mark);}}).observe(document.getElementById('root')||document.body,{childList:true,subtree:true});mark();
})();
/* Reading-state contact control: compact until the reader returns to the top. */
(() => {
 let queued=false;
 const update=()=>{
  queued=false;
  const fab=document.querySelector('.dre-wafab');if(!fab)return;
  const nearContact=[...document.querySelectorAll('.dre5-contact,.dre-consultation .dre-btn-wa')].some(e=>{const r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;});
  const active=document.activeElement;const keyboard=active&&/^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName);
  const modal=!!document.querySelector('dialog[open],[aria-modal="true"],.dre-lightbox,.dre-image-modal,.dre-navigation[open]');
  fab.classList.toggle('reading-icon',scrollY>120);
  fab.classList.toggle('context-hidden',keyboard||modal||nearContact);

 };
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});addEventListener('focusin',schedule);addEventListener('focusout',()=>setTimeout(schedule,100));visualViewport?.addEventListener('resize',schedule);
 let slow=0;new MutationObserver(()=>{if(slow)return;slow=setTimeout(()=>{slow=0;schedule()},350)}).observe(document.getElementById('root'),{childList:true,subtree:true,attributes:true,attributeFilter:['open']});schedule();
})();

// Keyboard movement follows the phone grid, and the reading direction on wider screens.
function phoneTabGridKeys(event) {
  const tabs = Array.from(event.currentTarget.querySelectorAll('[role="tab"]'));
  const index = tabs.indexOf(event.target);
  if (index < 0) return;
  const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
  const grid = getComputedStyle(event.currentTarget).display === 'grid';
  let next = index;
  if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = tabs.length - 1;
  else if (event.key === 'ArrowRight') next += rtl ? -1 : 1;
  else if (event.key === 'ArrowLeft') next += rtl ? 1 : -1;
  else if (grid && event.key === 'ArrowDown') next += getComputedStyle(event.currentTarget).gridTemplateColumns.split(' ').length;
  else if (grid && event.key === 'ArrowUp') next -= getComputedStyle(event.currentTarget).gridTemplateColumns.split(' ').length;
  else return;
  event.preventDefault();
  next = (next + tabs.length) % tabs.length;
  tabs[next].focus();
  tabs[next].click();
}

// Preserve the reading direction of untranslated passages without changing their words.
(() => {
 const mark = () => {
  document.querySelectorAll('.dre-route:not(.dre-route-library) :is(h1,h2,h3,p,label,summary,.dre-h1,.dre-h2,.dre-h3,.dre-sub,.dre-small,.dre-field-lbl,.dre-opt-title,.dre-opt-desc,.dre-tab)').forEach(e => {
   if(e.closest('dre-recovery-reference') || e.querySelector('input,textarea,select')) return;
   const text=e.textContent||'';
   if(/[\u0600-\u06ff]/.test(text)){ if(e.getAttribute('dir')!=='rtl')e.setAttribute('dir','rtl'); e.classList.add('dre-bidi-passage'); }
   else if(/[A-Za-z]/.test(text)){if(e.getAttribute('dir')!=='ltr')e.setAttribute('dir','ltr');e.classList.remove('dre-bidi-passage');}
  });
 };
 let queued=false;const scan=()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;mark();});}};
 new MutationObserver(scan).observe(document.getElementById('root'),{childList:true,subtree:true,characterData:true});scan();
})();

(() => {
 const records=new WeakMap(),watched=new WeakSet();let queued=false;
 const process=(root,lang)=>{
  const update=(node,key)=>{const current=key?node.getAttribute(key):node.data;if(!current)return;let map=records.get(node);if(!map){map={};records.set(node,map);}let r=map[key||'text'];if(!r||current!==r.last)r={original:current,last:current};let next=window.dreTranslateClinicCopy(r.original,lang);if(current!==next){if(key)node.setAttribute(key,next);else node.data=next;}r.last=next;map[key||'text']=r;};
  let walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;while(n=walker.nextNode())if(!n.parentElement.closest('script,style,textarea'))update(n,null);
  root.querySelectorAll('*').forEach(e=>{for(const k of ['title','placeholder','aria-label','alt'])if(e.hasAttribute(k))update(e,k);});
 };
 const scan=()=>{queued=false;const lang=document.documentElement.lang;document.querySelectorAll('dre-recovery-reference').forEach(e=>{const root=e.shadowRoot;if(!root)return;if(!watched.has(root)){watched.add(root);new MutationObserver(queue).observe(root,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','placeholder','aria-label','alt']});}process(root,lang);root.host.setAttribute('lang',lang);const shell=root.querySelector('#app')||root.querySelector('main')||root.querySelector('.app');if(shell)shell.dir=lang==='en'?'ltr':'rtl';});};
 function queue(){if(!queued){queued=true;requestAnimationFrame(scan);}}
 new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['lang']});queue();
})();

/* Warm educational plates only while their carousel is mounted. */
(() => {
 const plates=['XR36YW2X','EGJVQ6VC','4QQHBH5X','ZLWKNQWL','TIRZ4HI3','FLOLJUTR','I27ZNCHR','KYX3IO2Q','O3ILYMRB','3OKKLIJI','74XCYRBK'];
 let index=0,busy=false,queued=false;
 const step=()=>{busy=false;if(index>=plates.length||!document.querySelector('.dre-edcar'))return;busy=true;const im=new Image();im.decoding='async';im.onload=im.onerror=()=>{index++;step()};im.src='/assets/'+plates[index]+'.webp'};
 const check=()=>{if(busy||queued||index>=plates.length||!document.querySelector('.dre-edcar'))return;queued=true;const run=()=>{queued=false;step()};if('requestIdleCallback' in window)requestIdleCallback(run,{timeout:1500});else setTimeout(run,100)};
 new MutationObserver(check).observe(document.body,{subtree:true,childList:true});check();
})();

/* Facelift studio is fetched only for its route. No visitor choices leave the page. */
(()=>{let loaded=false;const check=()=>{const route=location.hash?location.hash.slice(1):location.pathname.replace(/^\/en(?=\/)/,'').replace(/\/$/,'');if(route==='/facelift'&&!loaded){loaded=true;const s=document.createElement('script');s.src='/facelift-studio.js?v=20261124v11';s.onerror=()=>{loaded=false;s.remove()};document.body.append(s)}};for(const method of ['pushState','replaceState']){const original=history[method];history[method]=function(...args){const result=original.apply(this,args);check();return result}}addEventListener('hashchange',check);addEventListener('popstate',check);check()})();
