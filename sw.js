const cacheName = "fitc-v1";

self.addEventListener('install', () => {
	caches.open(cacheName)
		.then((cache) => {
			cache.addAll([
				'',
				'index.html',
				'style.css',
				'js/templater.js',
				'js/script.js',
				'data.json',
				'js/fetch.js'
			]);
		});
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		fetch(e.request)
			.catch(() => {
				return caches.match(e.request)
					.then(res => {
						return res;
					});
			})
	)
});