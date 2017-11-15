/**
 * Rough interface for the service worker
 * onFetch() - listen for requests for resources
 *  getFromPeers() - request contrib lib to get resource from peer
 *  
 */

/**
 * Set up resources such as offline-caches
 */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .match('/js/contrib.js')
      .then(function(response) {
        if (response === undefined) {
          console.log('SW: contrib.js library not found in cache. Fetching it...')
          return fetch('/js/contrib.js')
        }
        console.log('SW: contrib.js library in cache.')
        return response
      })
      .then(function(response) {
        if (response.ok) {
          caches.open('contrib-cache').then(function(cache) {
            cache.put('/js/contrib.js', response)
          })
        }
        // return response.clone(); // will it catch if I don't clone and there is no contrib.js file
      })
      .catch(function() {
        console.log('SW: Could not load contrib.js library.')
      })
  )
  console.log('SW: Service worker installed.')
})

/* self.addEventListener('activate', function(event) {
  console.log('SW: New service worker activated.')

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
}) */

self.addEventListener('fetch', function(event) {
  console.log('SW: Received fetch event for resource: ' + event.request.url)
})
