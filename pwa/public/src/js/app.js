if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js', {
      scope: '/'
    })
    .then(function () {
      console.log('ServiceWorker is registered');
    });
}
