const static_cache = 'static_cache';
const dyanamic_cache = 'dyanamic_cache';

const assets = [
    'LoginPage.ejs',
    'HomePage.ejs',
    'css/LoginPage.css',
    'css/HomePage.css',
    'partials/nav.ejs',
    'partials/sidebar.ejs',
    'partials/bottommenu.ejs',
    'partials/css/nav.css',
    'partials/css/sidebar.css',
    'partials/css/bottommenu.css',
    'partials/js/nav.js',
    'js/htmx.js',
    'images/Icons/192x192.png',
    'images/btn_google_signin_dark_normal_web@2x.png',
    'images/like.png',
    'images/dislike.png',
    'images/disliked.png',
    'images/liked.png',
    'images/home.png',
    'images/user.png',
    'images/menu.png',
    'images/notification.png',
    'images/subscriptionsicon.png',
    'images/Youtube-Logo.svg',
    'images/voice-search.png',
    'manifest.json',
]

self.addEventListener('install', function(event) {
      event.waitUntil(
      caches.open(static_cache)
      .then((cache) =>{
        cache.addAll(assets);
      })
      .then(self.skipWaiting())
      );
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


