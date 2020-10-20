let CACHE_NAME = 'firstpwa-v4';
var urlsToCache = [
	'/',
	'/article.html',
	'/icon.png',
	'/index.html',
	'/manifest.json',
	'/nav.html',
	'/font/material-icons.woff2',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/contact.html',
	'/css/materialize.css',
	'/css/materialize.min.css',
	'/js/api.js',
	'/js/db.js',
	'/js/idb.js',
	'/js/materialize.min.js',
	'/js/regist.js',
	'/js/script.js',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys()
		.then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', (event) => {
	// event.respondWith(
	// 	caches.match(event.request, {cacheName:CACHE_NAME})
	// 	.then((response) => {
	// 		if(response){
	// 			console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
	// 			return response;
	// 		}
			
	// 		console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
	// 		return fetch(event.request);
	// 	})
	// );

	const baseUrl = "https://readerapi.codepolitan.com/";

	if (event.request.url.indexOf(baseUrl) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then((cache) => {
				return fetch(event.request).then((response) => {
					cache.put(event.request.url, response.clone());
				})
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request, { ignoreSearch: true }).then(function(response) {
				return response || fetch (event.request);
			})
		)
	}
});

