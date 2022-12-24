var CacheName = "App-cache";
var Assets = ["/", "/public", "/public/images", "/public/images/food.jpg"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CacheName).then(function (Caches) {
      return Caches.addAll(Assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
