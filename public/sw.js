var CacheName = "App-cache";
var CachesFiles = [
  "/",
  "/public",
  "/public/metadata.json",
  "/public/model.json",
  "/public/weights.bin",
  "/public/index.html",
  "/public/homepage.html",
  "/public/list.html",
  "/public/profile.html",
  "/public/recipeForm.html",
  "/public/recipePage.html",
  "/public/search.html",
  "/public/Scan.html",
  "/public/css/style.css",
  "/public/css/login.css", 
  "/public/css/list.css",
  "/public/css/profile.css",
  "/public/css/recipeForm.css",
  "/public/css/recipePage.css",
  "/public/css/search.css",
  "/public/css/userRecipe.css",
  "/public/css/scan.css",
  "/public/js/main.js",
  "/public/js/login.js",
  "/public/js/list.js",
  "/public/js/profile.js",
  "/public/js/recipeForm.js",
  "/public/js/recipePage.js",
  "/public/js/search.js",
  "/public/js/userRecipe.js",
  "/public/js/homepage.js",
  "/public/images",
  "/public/images/food.jpg",
  "/public/icons",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CacheName).then(function (Cache) {
      return Cache.addAll(CachesFiles);
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
