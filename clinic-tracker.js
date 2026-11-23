(()=>{
 'use strict';
 const script=document.currentScript;
 const endpoint=script?.dataset.endpoint;
 if(!endpoint || window.__clinicAggregateTracker || navigator.doNotTrack==='1' || navigator.globalPrivacyControl===true)return;
 let parsed;try{parsed=new URL(endpoint);}catch{return;}
 if(parsed.protocol!=='https:')return;
 window.__clinicAggregateTracker=true;
 const codes=new Set(['whatsapp_click','consultation_click','assessment_start']);
 const classify=()=>{
  let source='direct_unknown';
  const utm=new URLSearchParams(location.search).get('utm_source')?.toLowerCase();
  const tagged={facebook:'facebook',fb:'facebook',instagram:'instagram',ig:'instagram',google:'google'};
  if(tagged[utm]) source=tagged[utm];
  else if(document.referrer){try{const h=new URL(document.referrer).hostname.toLowerCase();const match=d=>h===d||h.endsWith('.'+d);source=match('facebook.com')||match('fb.com')?'facebook':match('instagram.com')?'instagram':match('google.com')?'google':h===location.hostname?'direct_unknown':'other';}catch{}}
  const ua=navigator.userAgent;
  const device=/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1)?'tablet':/Mobi|iPhone/i.test(ua)?'mobile':'desktop';
  return {source,device};
 };
 const dimensions=classify();
 const send=event=>{
  const p=event==='page_open'?{event,...dimensions}:{event};
  // No URL, link text, form values, click IDs or user identifier in this payload.
  fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p),credentials:'omit',mode:'cors',keepalive:true,referrerPolicy:'no-referrer'}).catch(()=>{});
 };
 send('page_open');
 let lastRoute=location.hash.startsWith('#/')?location.hash:'#/';
 const routeChanged=()=>{const route=location.hash.startsWith('#/')?location.hash:'#/';if(route!==lastRoute){lastRoute=route;send('page_open');}};
 window.addEventListener('hashchange',routeChanged);window.addEventListener('popstate',routeChanged);
 // The existing router uses pushState rather than hashchange. Preserve its behavior.
 if(window.history)for(const method of ['pushState','replaceState']){const original=window.history[method];window.history[method]=function(...args){const result=original.apply(this,args);routeChanged();return result;};}

 document.addEventListener('click',event=>{
  const node=event.target instanceof Element?event.target.closest('[data-clinic-event],a[href]'):null;
  let code=node?.getAttribute('data-clinic-event');
  if(!code&&node?.tagName==='A'){
   try{const link=new URL(node.getAttribute('href'),location.href);
    if(link.protocol==='https:'&&link.hostname==='wa.me')code='whatsapp_click';
    else if(link.origin===location.origin&&link.hash==='#/consultation')code='consultation_click';
    else if(link.origin===location.origin&&(link.hash==='#/assessment'||(link.hash==='#journeys'&&['ابدأ من حالتك','Start from your own case'].includes(node.textContent.trim()))))code='assessment_start';
   }catch{}
  }
  if(codes.has(code))send(code);
 },{capture:true,passive:true});
})();
