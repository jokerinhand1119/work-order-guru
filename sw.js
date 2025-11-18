// Service Worker for TOOLKIT PWA
const CACHE_NAME = 'toolkit-cache-v1';
const urlsToCache = [
  './',
  './TOOLKIT Mobile.html',
  './TOOLKIT Desktop.html',
  './manifest.json'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    console.log('[TOOLKIT] Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('[TOOLKIT] Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    console.log('[TOOLKIT] Service Worker activating...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[TOOLKIT] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                // Don't cache Firebase or external API requests
                if (event.request.url.includes('firebasedatabase.app') || 
                    event.request.url.includes('googleapis.com') ||
                    event.request.url.includes('nhtsa.gov')) {
                    return response;
                }
                
                // Clone the response before caching
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });
                return response;
            })
            .catch(function() {
                // If network fails, try cache
                return caches.match(event.request);
            })
    );
});
