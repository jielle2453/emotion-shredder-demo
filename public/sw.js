const CACHE_VERSION = "emotion-shredder-v2";
const APP_SCOPE = new URL(self.registration.scope);
const APP_ENTRY_URL = new URL(APP_SCOPE.pathname || "/", location.origin).toString();

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      cache.add(new Request(APP_ENTRY_URL, { cache: "reload" })),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key === CACHE_VERSION ? undefined : caches.delete(key)))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== location.origin) return;

  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(
      fetch(request, { cache: "reload" })
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(APP_ENTRY_URL, clone));
          return response;
        })
        .catch(() => caches.match(APP_ENTRY_URL)),
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match(APP_ENTRY_URL))),
  );
});
