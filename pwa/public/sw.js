self.addEventListener('install', function (event) {
  console.log('ServiceWorker is installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('ServiceWorker is activated', event);

  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  console.log('ServiceWorker is fetching', event);

  event.respondWith(fetch(event.request));
});
