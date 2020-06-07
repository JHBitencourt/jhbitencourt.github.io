'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "8b84edd36fda76d4e84c629fce425f9b",
"/": "8b84edd36fda76d4e84c629fce425f9b",
"main.dart.js": "53c320ffb84ccb92896546b0b34c0797",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "3fb2c3ec4e72eb0ad9cfb484f4113aeb",
"assets/LICENSE": "4a6db6a47272281480d2a70768e3f7d5",
"assets/AssetManifest.json": "febd1778b4709790593c60c0a0afeed7",
"assets/FontManifest.json": "7514c0901fb7a3ea9dbebcd44973321f",
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
"assets/assets/football/stoppageTime.png": "3dd55a6632a7a8780a95c1c9f61261a1",
"assets/assets/football/goal.png": "52a95bb660b5423021d5e45cfa0a44f0",
"assets/assets/football/arsenal.png": "0627dad9fd85a851570322bb33c7a5e7",
"assets/assets/football/yellowCard.png": "ba3ca631ea82198f619b4721db969e21",
"assets/assets/football/barcelona.png": "ab4f2e0c1d8629c5fcd9e3b832663471",
"assets/assets/football/redCard.png": "b04ecc0b34639075cc40e1ef2147ba51",
"assets/assets/football/foul.png": "cb1146e1750cc83e6c71c12ff0a6d09b",
"assets/assets/football/injury.png": "599f4d3a91087bf3882f115e808e965b",
"assets/assets/football/offside.png": "9771ff04237a5d25b1621e0c6fa7c1d0",
"assets/assets/delivery/ready_to_pickup.png": "c0234ec1d9860d72dea048a0b25c5f41",
"assets/assets/delivery/order_confirmed.png": "4301bd6669eb8da4e307af7da9522697",
"assets/assets/delivery/order_processed.png": "f77120be6f8989878a038cd36076c0cf",
"assets/assets/delivery/order_placed.png": "86d5ac8126decee3db0698eaeee2d861"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
