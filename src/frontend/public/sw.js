const CACHE_NAME = 'credit-bridge-v1';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;
const API_CACHE = `${CACHE_NAME}-api`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/fonts/SpaceGrotesk.woff2',
  '/assets/fonts/GeneralSans.woff2',
  '/assets/icons/icon-192.svg',
  '/assets/icons/icon-512.svg',
  '/assets/icons/maskable-192.svg',
  '/assets/icons/apple-touch-icon.svg',
  '/assets/images/placeholder.svg',
];

const STATIC_PATTERNS = [
  /\.js$/,
  /\.css$/,
  /\.woff2$/,
  /\.svg$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.webp$/,
];

const API_PATTERNS = [
  /\/api\//,
  /\/actor\//,
];

// Install: precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('credit-bridge-') && name !== STATIC_CACHE && name !== IMAGE_CACHE && name !== API_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Helper: check if URL matches patterns
function matchesPatterns(url, patterns) {
  return patterns.some((pattern) => pattern.test(url));
}

// Fetch: cache-first for static, network-first for API, stale-while-revalidate for images
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests for caching (except background sync handled separately)
  if (request.method !== 'GET') {
    return;
  }

  // API calls: network-first with cache fallback
  if (matchesPatterns(url.pathname, API_PATTERNS) || url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(API_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Images: stale-while-revalidate
  if (matchesPatterns(url.pathname, [/\.(png|jpg|jpeg|webp|gif|svg)$/])) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => cached);
          return cached || fetchPromise;
        });
      })
    );
    return;
  }

  // Static assets: cache-first with network fallback
  if (matchesPatterns(url.pathname, STATIC_PATTERNS) || PRECACHE_URLS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // Revalidate in background
          fetch(request).then((response) => {
            if (response.ok) {
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, response));
            }
          }).catch(() => {});
          return cached;
        }
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Navigation requests: network-first with offline fallback to index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            return caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Default: network with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Background Sync: queue pending transactions
self.addEventListener('sync', (event) => {
  if (event.tag === 'pending-transactions') {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SYNC_PENDING_TRANSACTIONS' });
        });
      })
    );
  }
});

// Push (placeholder for future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title || 'Credit Bridge', {
        body: data.body || 'You have a new notification',
        icon: '/assets/icons/icon-192.svg',
        badge: '/assets/icons/icon-192.svg',
        tag: data.tag || 'general',
        requireInteraction: false,
      })
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
