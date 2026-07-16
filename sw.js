const CACHE_NAME = "management-analysis-static-v2";
const APP_SHELL = ["./index.html", "./manifest.webmanifest", "./icon.svg", "./apple-touch-icon.png"];
const STATIC_DESTINATIONS = new Set(["script", "style", "image", "font", "manifest"]);
self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", (event) => event.waitUntil(caches.keys().then((names) => Promise.all(names.filter((name) => (name.startsWith("management-analysis-static-") || name.startsWith("financial-analysis-")) && name !== CACHE_NAME).map((name) => caches.delete(name)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (request.mode === "navigate") { event.respondWith(fetch(request).catch(() => caches.match("./index.html"))); return; }
  if (!STATIC_DESTINATIONS.has(request.destination)) return;
  event.respondWith(caches.match(request).then((cached) => cached ?? fetch(request).then((response) => {
    if (response.ok && response.type === "basic") event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone())));
    return response;
  })));
});
