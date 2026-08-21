const CACHE='portacion-mj-v15';
const STATIC_ASSETS=[
 './manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./favicon.png',
 './visual-cartucho.png','./visual-empunadura-01.png','./visual-empunadura-02.png','./visual-empunadura-03.png',
 './visual-empunadura-04.png','./visual-empunadura-05.png','./visual-empunadura-06.png','./visual-empunadura-07.png','./visual-empunadura-08.png'
];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC_ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;
 if(r.mode==='navigate'||r.destination==='document'){
   e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));
   return;
 }
 e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(res=>{if(r.method==='GET'&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res})));
});
