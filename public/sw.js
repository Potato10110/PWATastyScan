var CacheName = "App-cache";
var filesToCache = [
  "/",
  "/public",
  "/public/index.html",
  "/public/homepage.html",
  "/public/list.html",
  "/public/profile.html",
  "/public/recipeForm.html",
  "/public/recipePage.html",
  "/public/search.html",
  "/public/Scan.html",
  "/css/style.css",
  "/css/login.css",
  "/css/list.css",
  "/css/profile.css",
  "/css/recipeForm.css",
  "/css/recipePage.css",
  "/css/search.css",
  "/css/userRecipe.css",
  "/css/scan.css",
  "/js/main.js",
  "/js/login.js",
  "/js/list.js",
  "/js/profile.js",
  "/js/recipeForm.js",
  "/js/recipePage.js",
  "/js/search.js",
  "/js/userRecipe.js",
  "/js/homepage.js",
  "/images",
  "/images/food.jpg",
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
