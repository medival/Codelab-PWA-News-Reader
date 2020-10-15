let CACHE_NAME = "news-reader-pwa";
const urlsToCache = [
    "/",
    "/article.html",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/assets/css/all.css",
    "/assets/css/materialize.css",
    "/assets/css/materialize.min.css",
    "/assets/icon/favicon-16x16.png",
    "/assets/icon/favicon-32x32.png",
    "/assets/icon/android-chrome-192x192.png",
    "/assets/icon/android-chrome-512x512.png",
    "/assets/icon/android-icon-192x192.png",
    "/assets/icon/apple-touch-icon.png",
    "/assets/js/all.js",
    "/assets/js/nav.js",
    "/assets/js/api.js",
    "/assets/js/script.js",
    "/assets/js/jquery-2.1.1.min.js",
    "/assets/js/materialize.js",
    "/assets/js/materialize.min.js",
    "/assets/js/regist.js",
    "/assets/js/snarkdown.js",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/home.html",
    "/favicon.ico"
]

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener("fetch", event => {
    const baseUrl = "https://readerapi.codepolitan.com/";

    if(event.request.url.indexOf(baseUrl) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request)
                .then(response => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(response => {
                return response || fetch (event.request);
            })
        )
    }
})

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`ServiceWorker: cache : ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})