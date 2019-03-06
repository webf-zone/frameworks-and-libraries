var deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js', {
      scope: '/'
    })
    .then(function () {
      console.log('ServiceWorker is registered');
    });
}

window.addEventListener('onbeforeinstallprompt', function (event) {
  console.log('install prompt cancelled..');
  event.preventDefault();

  deferredPrompt = event;
  return false;
})
