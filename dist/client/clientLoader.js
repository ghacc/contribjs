// Issue: when should we load the service worker. For new visitors it may be better
// to not use the service worker at least until the page loads because we save two round
// trips for the sw itself and the download manager. That is, of course, unless there is high load at the server.
// Remember use clients.claim() to get control of the page during the first visit.

if ('serviceWorker' in navigator) {
  // Delay registration until after the page has loaded. We won't run the first time.
  window.addEventListener('load', function() {

    // get the download manager
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = '/dm.js';
    document.body.appendChild(el);

    // get the service-worker
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
