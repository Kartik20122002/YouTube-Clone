const static_cache = 'static_cache';
const dyanamic_cache = 'dyanamic_cache';

const assets = [
    
]

self.addEventListener('install', (event)=> {
      event.waitUntil(
      (async ()=>{
        cache = await caches.open(static_cache);
        await cache.addAll(assets);
        self.skipWaiting();
      })
      )
    
  })
  
  self.addEventListener('fetch', function(event) {
      event.respondWith(
           caches.match(event.request).then(cacheRes =>{
            return cacheRes || fetch(event.request).then((res)=>{
              return res;
            });
           }));
  });
  
  self.addEventListener('activate', function(event) {
      event.waitUntil(
          caches.keys()
            .then((keyList) => {
              return Promise.all(keyList.map((key) => {
                if (key !== static_cache) {
                  return caches.delete(key)
                }
              }))
            })
            .then(() => self.clients.claim())
        )
  });


