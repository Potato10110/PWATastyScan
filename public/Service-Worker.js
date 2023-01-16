var CacheName = "App-cache";
var Assets = [
  "/",
  "/public",
  "./homepage.html",
  "./list.html",
  "./profile.html",
  "./recipeForm.html",
  "./recipePage.html",
  "./Scan.html",
  "./search.html",
  "./SearchResult.html",
  "./css/login.css",
  "./js/login.js",
  "./icons/manifest-icon-192.maskable.png",
];
/*This code will delete all the previous cache except the cache with the name
"App-cache" when the service worker is installed. It will then add all the assets in 
the "Assets" array to the new cache.  */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CacheName).then(function (Caches) {
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== CacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      });
      return Caches.addAll(Assets);
    })
  );
});

self.addEventListener("fetch", function (e) {});
