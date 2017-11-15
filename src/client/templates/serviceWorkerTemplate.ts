interface ServiceWorkerConfig {
  useImmediately: boolean
}

export default (config: ServiceWorkerConfig) => {
  return (
    `self.addEventListener('fetch', function(event) {
      console.log('SW: Received fetch event for resourxe: ' + event.request.url)
    })
    `
  )
}


self.addEventListener('fetch', function(event) {
  console.log('SW: Received fetch event for resource: ' + event.request.url)
  /*event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }
    )
  );*/
});

// dm.js should always be downloaded directly from the server I guess

// self.addEventListener('install', function(event) {
//   // get the js file that will handle data transfer and webrtc/sockets connections
// })

// var downloadManager = new Blob([''])

self.addEventListener('activate', function(event) {
    console.log("New service worker activated!")

  let cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
})
/*
// https://jakearchibald.github.io/isserviceworkerready/
// Communicating with main worker
window.onmessage = function(event) {
    log("Got reply from serviceworker via window", event.data);
};
navigator.serviceWorker.onmessage = function(event) {
    log("Got reply from serviceworker via navigator.serviceWorker", event.data);
};
if (window.MessageChannel) {
    var messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = function(event) {
    log("Got reply from serviceworker via channel", event.data);
    };
}

// send message
navigator.serviceWorker.ready.then(function(reg) {
    try {
        reg.active.postMessage({
            text: "Hi!",
            port: messageChannel && messageChannel.port2
        }, [messageChannel && messageChannel.port2]);
    }
    catch (e) {
        // getting a cloning error in Firefox
        reg.active.postMessage({
            text: "Hi!"
        });
    }
});

// From service worker side
this.onmessage = function(event) {
  console.log("Got message in SW", event.data.text);

  if (event.source) {
    console.log("event.source present");
    event.source.postMessage("Woop!");
  }
  else if (self.clients) {
    console.log("Attempting postMessage via clients API");
    clients.matchAll().then(function(clients) {
      for (var client of clients) {
        client.postMessage("Whoop! (via client api)");
      }
    });
  }
  else if (event.data.port) {
    event.data.port.postMessage("Woop!");
  }
  else {
    console.log('No useful return channel');
  }
};

*/