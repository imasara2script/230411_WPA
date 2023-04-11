self.addEventListener("install", event => {
  // キャッシュするファイルを指定する
  const filesToCache = [
    "/",
    "/index.html",
    "/icon.png"
  ];
  // キャッシュ名を指定する
  const cacheName = "wpa-sample-cache";
  // キャッシュにファイルを保存する
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  // キャッシュ名を指定する
  const cacheName = "wpa-sample-cache";
  // リクエストに対応するキャッシュがあればそれを返す
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
