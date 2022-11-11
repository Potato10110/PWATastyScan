var CacheName = "App-cache";
var filesToCache = [
  "/",
  "/index.html",
  "/homepage.html",
  "/css/style.css",
  "/css/login.css",
  "/js/main.js",
  "/js/login.js",
  "/images",
  "/icons",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CacheName).then(function (cache) {
      return cache.addAll(filesToCache);
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
