'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "8b84edd36fda76d4e84c629fce425f9b",
"/": "8b84edd36fda76d4e84c629fce425f9b",
"main.dart.js": "e7e38a8ee0bd560d0b96da5fefd7d794",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "3fb2c3ec4e72eb0ad9cfb484f4113aeb",
"assets/AssetManifest.json": "e05c74e925c6f00599c58c6abc15692a",
"assets/NOTICES": "93e3d2aa96ddb626eca033e9c1f8ab5a",
"assets/FontManifest.json": "810e0a27171b654dcc9a7d6766ea4e3c",
"assets/packages/weather_icons/lib/fonts/weathericons-regular-webfont.ttf": "4618f0de2a818e7ad3fe880e0b74d04a",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2aa350bd2aeab88b601a593f793734c0",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "2bca5ec802e40d3f4b60343e346cedde",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5a37ae808cf9f652198acde612b5328d",
"assets/packages/flutter_showcase/assets/flutter_original.png": "cf171b29e3b2c0cb9a12223f952da7c6",
"assets/packages/flutter_showcase/assets/flutter_white.png": "91cbceb6f4b8345f509ba4cde4bdcee5",
"assets/packages/flutter_showcase/assets/flutter.png": "d21f1eecaeaab081ba7efec1721c0712",
"assets/packages/flutter_showcase/assets/github.png": "3e54ed15b9cd877c5223f5ecf64579df",
"assets/packages/flutter_showcase/assets/flutter_black.png": "3e4d716d500f9d0b927f55c48379289a",
"assets/packages/flutter_showcase/assets/dart.png": "f3ae419dc11ddc054a8725e2cbab4939",
"assets/packages/example_timeline_tile/assets/hitchhiker.png": "ea3e096ee70dfb125609d653bfd3c3a5",
"assets/packages/example_timeline_tile/assets/hitchhiker_2.png": "01d6b8f813c49bd2ad2162ef2664d8ff",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/built_by_jhb_white.png": "25e8397fd1b94d31536c690015e1cbd1",
"assets/assets/app/4.png": "aa3cf30419e8edc10e3e66d77487f240",
"assets/assets/app/2.png": "a07971c8047a3715a8d363088b83b375",
"assets/assets/app/3.png": "05aca5003fde9dce929bddff64ecbe02",
"assets/assets/app/1.png": "f8e70bc591e07d8d342d03dfdce53995",
"assets/assets/app/0.png": "7ef2daf2a06e172bf73ca627092e3f60",
"assets/assets/football/stoppageTime.png": "3dd55a6632a7a8780a95c1c9f61261a1",
"assets/assets/football/goal.png": "52a95bb660b5423021d5e45cfa0a44f0",
"assets/assets/football/arsenal.png": "0627dad9fd85a851570322bb33c7a5e7",
"assets/assets/football/yellowCard.png": "ba3ca631ea82198f619b4721db969e21",
"assets/assets/football/barcelona.png": "ab4f2e0c1d8629c5fcd9e3b832663471",
"assets/assets/football/redCard.png": "b04ecc0b34639075cc40e1ef2147ba51",
"assets/assets/football/foul.png": "cb1146e1750cc83e6c71c12ff0a6d09b",
"assets/assets/football/injury.png": "599f4d3a91087bf3882f115e808e965b",
"assets/assets/football/offside.png": "9771ff04237a5d25b1621e0c6fa7c1d0",
"assets/assets/built_by_jhb_black.png": "2fcd475703004dbb6080705cb96428de",
"assets/assets/delivery/horizontal/4.png": "edc602ccbe6658789513f2cd11be2007",
"assets/assets/delivery/horizontal/5.png": "e0539de3390225a486b2730441d01932",
"assets/assets/delivery/horizontal/2.png": "58a083b6803216a68a49e390bae84fb9",
"assets/assets/delivery/horizontal/3.png": "f05f7c48d488fc067fffac6c7d3a8246",
"assets/assets/delivery/horizontal/1.png": "ed1d4a8cc03b24c865095d4031e27444",
"assets/assets/delivery/horizontal/0.png": "8f2e53228ea45ed2a555010192629c2a",
"assets/assets/delivery/ready_to_pickup.png": "c0234ec1d9860d72dea048a0b25c5f41",
"assets/assets/delivery/order_confirmed.png": "4301bd6669eb8da4e307af7da9522697",
"assets/assets/delivery/order_processed.png": "f77120be6f8989878a038cd36076c0cf",
"assets/assets/delivery/order_placed.png": "86d5ac8126decee3db0698eaeee2d861"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
