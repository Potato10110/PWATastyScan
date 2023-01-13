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

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CacheName).then(function (Caches) {
      return Caches.addAll(Assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", function (e) {
});
