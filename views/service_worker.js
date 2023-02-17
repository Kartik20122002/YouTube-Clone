const static_cache = 'static_cache';
const dyanamic_cache = 'dyanamic_cache';

self.addEventListener('install', (event)=> {
      event.waitUntil(
      (async ()=>{
        self.skipWaiting();
      })
      )
    
  })
  
  self.addEventListener('activate', function(event) {
      event.waitUntil(
        self.clients.claim()
        )
  });


