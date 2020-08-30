var cacheName = "GBA_PWA";
var filesToCache = [
    './',
    './index.html',
    './launcher.html',
    './user_css/main.css',
    './user_scripts/AudioGlueCode.js',
    './user_scripts/base64.js',
    './user_scripts/CoreGlueCode.js',
    './user_scripts/GfxGlueCode.js',
    './user_scripts/GUIGlueCode.js',
    './user_scripts/JoyPadGlueCode.js',
    './user_scripts/ROMLoadGlueCode.js',
    './user_scripts/SavesGlueCode.js',
    './user_scripts/WorkerGfxGlueCode.js',
    './user_scripts/WorkerGlueCode.js',
    './user_scripts/XAudioJS/resampler.js',
    './user_scripts/XAudioJS/swfobject.js',
    './user_scripts/XAudioJS/XAudioServer.js',
    './user_scripts/XAudioJS/XAudioJS.swf',
    './user_scripts/XAudioJS/XAudioJS.as',
    './IodineGBA/includes/TypedArrayShim.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(cacheName).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});