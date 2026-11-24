# Publishing notes (drelnajar.online)

## First paint: dark canvas guard

Every page ships an inline `<style>html,body{background:#0a0805}</style>` in `<head>` BEFORE the
main.css reference. main.css is render-blocking; on a cold mobile load the browser would otherwise
paint its default WHITE canvas until the stylesheet arrives (the "white flash" complaint, Nov 24 2026).

History: `body{background:#0a0805}` has lived inside main.css since 08c7333, but a rule inside the
render-blocking bundle cannot cover the pre-CSS window - that is why the flash "came back" / never
fully went away on cold loads. The inline head style applies as soon as the HTML is parsed and is
the permanent mechanism. theme-color (#101416) only tints browser chrome; it does not paint the canvas.

`generate.js` enforces this: after writing dist it walks every deployed .html file and FAILS THE BUILD
if the inline background is missing or placed after the stylesheet reference. Files without
`<head>`/main.css (the Google site-verification token file) are skipped intentionally.

Do not remove the inline style, the BG_STYLE constant, or the guard. If the site's base background
color ever changes, update BG_STYLE (one place) and rebuild.

## Publish checklist (learned the hard way)

1. `node generate.js` -> recapture if strip/markup changed (`CAP_ROUTES=/ node capture.js`) ->
   `node generate.js` again, then confirm the first-paint guard line prints OK.
2. Sync dist into the repo root (repo == deployed site): `cp -a dist/. ~/drnagar/` - including the
   prerendered index.html pages; JS-only changes still need the prerendered HTML re-synced when
   strip markup changed, because the strip hydrates in place on first paint.
3. Verify no stacked injections (`grep -rc` key markers, expect 1 per page).
4. Push only the approved commits; verify `git ls-remote origin main`; delete token files.
5. Live-verify AR + EN, mobile + desktop, language toggle both ways, audio.
