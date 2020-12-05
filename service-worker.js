const CACHE_NAME = "test.tuinformaticoencasa::v10.05";
var FILES_TO_CACHE = [
  './',
  './iconos/apple-180x180.png',
  './iconos/maskable_icon.png',
  './iconos/opengraph.png',
  './img/comotuquieras.jpg',
  './favicon.ico',
  './index.css',
  './index.html',
  './index.js'
];

/* El evento install se usa para almacenar en caché todo lo que necesita para que tu aplicación se ejecute.
*/
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  )
});

/* El objetivo principal del evento activate es configurar el comportamiento del service worker, limpiar los recursos que quedan de las ejecuciones anteriores (por ejemplo, cachés antiguas) y preparar al service worker para manejar las solicitudes de red.
*/
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  )
});

/* El evento fetch permite que el service worker intercepte cualquier solicitud de red y maneje las solicitudes. Al ser una web estática siempre coge el recurso de la cache.
*/
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  event.respondWith(
    caches.open(CACHE_NAME).then((cached) => {
      return cached.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        });
    })
  );

});