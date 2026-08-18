const CACHE='portacion-mj-v7';
const STATIC_ASSETS=[
  './manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./favicon.png',
  './guia-empuñadura.png','./guia-cartucho.png'
];
self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC_ASSETS)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const r=event.request;
  if(r.mode==='navigate'||r.destination==='document'){
    event.respondWith(
      fetch(r,{cache:'no-store'})
        .then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return res})
        .catch(()=>caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(res=>{
    if(r.method==='GET'&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy))}
    return res;
  })));
});