

const CACHE_NAME = 'maintenance-app-cache-v1';
const urlsToCache = [
'index.html',
'pending-activity.html',
'breakdown.html',
'weekly-activity.html',
'monthly-activity.html',
'quarterly-activity.html',
'half-yearly.html',
'yearly.html',
'assign-task.html',
'spares-availability.html',
'procure-spares.html',
'manifest.json',
'icons/icon-192.png',
'icons/icon-512.png'
];

// Install service worker
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => {
return cache.addAll(urlsToCache);
})
);
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => response || fetch(event.request))
);
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(keyList =>
Promise.all(
keyList.map(key => {
if (key !== CACHE_NAME) return caches.delete(key);
})
)
)
);
});