var CacheName = "App-cache";
var Assets = [
  "/",
  "/public",
  "/public/index.html",
  "css/login.css",
  "js/login.js",
];

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

