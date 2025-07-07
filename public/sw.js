const CACHE_NAME = 'nonturn-v1.0.0'
const STATIC_CACHE_NAME = 'nonturn-static-v1.0.0'
const DYNAMIC_CACHE_NAME = 'nonturn-dynamic-v1.0.0'
const IMAGE_CACHE_NAME = 'nonturn-images-v1.0.0'

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/portfolio',
  '/access',
  '/pricing',
  '/manifest.json',
  '/favicon.ico'
]

// Images and media to cache
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico']
const MEDIA_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mp3', '.wav']

// Network-first strategies for these paths
const NETWORK_FIRST_PATHS = [
  '/api/',
  '/contact'
]

// Security - Paths that should never be cached
const NEVER_CACHE_PATHS = [
  '/api/csrf',
  '/api/auth',
  '/api/contact',
  '/.env',
  '/admin',
  '/login',
  '/logout'
]

// Cache-first strategies for these paths
const CACHE_FIRST_PATHS = [
  '/images/',
  '/icons/',
  '/videos/',
  '/_next/static/'
]

// Maximum cache sizes
const MAX_CACHE_SIZE = {
  [STATIC_CACHE_NAME]: 50,
  [DYNAMIC_CACHE_NAME]: 100,
  [IMAGE_CACHE_NAME]: 200
}

// Utility functions
const isImageRequest = (url) => {
  return IMAGE_EXTENSIONS.some(ext => url.pathname.endsWith(ext))
}

const isMediaRequest = (url) => {
  return MEDIA_EXTENSIONS.some(ext => url.pathname.endsWith(ext))
}

const isNetworkFirst = (url) => {
  return NETWORK_FIRST_PATHS.some(path => url.pathname.startsWith(path))
}

const isCacheFirst = (url) => {
  return CACHE_FIRST_PATHS.some(path => url.pathname.startsWith(path))
}

const trimCache = async (cacheName, maxItems) => {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  
  if (keys.length > maxItems) {
    const itemsToDelete = keys.slice(0, keys.length - maxItems)
    await Promise.all(itemsToDelete.map(key => cache.delete(key)))
  }
}

const cleanupOldCaches = async () => {
  const cacheNames = await caches.keys()
  const oldCaches = cacheNames.filter(name => 
    name.startsWith('nonturn-') && 
    name !== CACHE_NAME && 
    name !== STATIC_CACHE_NAME && 
    name !== DYNAMIC_CACHE_NAME &&
    name !== IMAGE_CACHE_NAME
  )
  
  await Promise.all(oldCaches.map(name => caches.delete(name)))
}

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    (async () => {
      try {
        const staticCache = await caches.open(STATIC_CACHE_NAME)
        await staticCache.addAll(STATIC_ASSETS)
        console.log('[SW] Static assets cached successfully')
        
        // Skip waiting to activate immediately
        await self.skipWaiting()
      } catch (error) {
        console.error('[SW] Error caching static assets:', error)
      }
    })()
  )
})

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    (async () => {
      try {
        await cleanupOldCaches()
        await self.clients.claim()
        console.log('[SW] Service worker activated successfully')
      } catch (error) {
        console.error('[SW] Error during activation:', error)
      }
    })()
  )
})

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return
  
  const url = new URL(event.request.url)
  
  // Skip cross-origin requests (except for images)
  if (url.origin !== location.origin && !isImageRequest(url) && !isMediaRequest(url)) {
    return
  }
  
  event.respondWith(handleFetch(event.request))
})

const handleFetch = async (request) => {
  const url = new URL(request.url)
  
  try {
    // Security: Never cache sensitive paths
    if (NEVER_CACHE_PATHS.some(path => url.pathname.startsWith(path))) {
      return await fetch(request)
    }
    
    // Network-first strategy for dynamic content
    if (isNetworkFirst(url)) {
      return await networkFirst(request)
    }
    
    // Cache-first strategy for static assets
    if (isCacheFirst(url) || isImageRequest(url) || isMediaRequest(url)) {
      return await cacheFirst(request)
    }
    
    // Stale-while-revalidate for navigation requests
    if (request.mode === 'navigate') {
      return await staleWhileRevalidate(request)
    }
    
    // Default to cache-first for everything else
    return await cacheFirst(request)
    
  } catch (error) {
    console.error('[SW] Fetch error:', error)
    
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE_NAME)
      return await cache.match('/') || new Response('Offline')
    }
    
    return new Response('Network error', { status: 500 })
  }
}

const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Security: Don't cache responses with sensitive headers
      const contentType = networkResponse.headers.get('content-type')
      const cacheControl = networkResponse.headers.get('cache-control')
      
      if (!cacheControl?.includes('no-store') && 
          !cacheControl?.includes('no-cache') &&
          contentType && !contentType.includes('text/html')) {
        const cache = await caches.open(DYNAMIC_CACHE_NAME)
        cache.put(request, networkResponse.clone())
        await trimCache(DYNAMIC_CACHE_NAME, MAX_CACHE_SIZE[DYNAMIC_CACHE_NAME])
      }
    }
    
    return networkResponse
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

const cacheFirst = async (request) => {
  const url = new URL(request.url)
  const cacheName = isImageRequest(url) || isMediaRequest(url) ? IMAGE_CACHE_NAME : STATIC_CACHE_NAME
  
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
      
      if (cacheName === IMAGE_CACHE_NAME) {
        await trimCache(IMAGE_CACHE_NAME, MAX_CACHE_SIZE[IMAGE_CACHE_NAME])
      }
    }
    
    return networkResponse
  } catch (error) {
    // Return fallback for images
    if (isImageRequest(url)) {
      return new Response(
        `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#f3f4f6"/>
          <text x="100" y="100" text-anchor="middle" dy=".3em" fill="#6b7280">Image not available</text>
        </svg>`,
        { headers: { 'Content-Type': 'image/svg+xml' } }
      )
    }
    
    throw error
  }
}

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(STATIC_CACHE_NAME)
  const cachedResponse = await cache.match(request)
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => cachedResponse)
  
  return cachedResponse || await fetchPromise
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(handleContactFormSync())
  }
})

const handleContactFormSync = async () => {
  try {
    // Get queued form data from IndexedDB or similar
    // This would need to be implemented based on your form handling
    console.log('[SW] Handling background sync for contact form')
  } catch (error) {
    console.error('[SW] Background sync error:', error)
  }
}

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from NonTurn',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Website',
        icon: '/icons/action-explore.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/action-close.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('NonTurn.LLC', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Message handling for cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  } else if (event.data && event.data.type === 'UPDATE_CACHE') {
    event.waitUntil(updateCache())
  }
})

const updateCache = async () => {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME)
    await cache.addAll(STATIC_ASSETS)
    console.log('[SW] Cache updated successfully')
  } catch (error) {
    console.error('[SW] Cache update error:', error)
  }
}

// Periodic background sync (if supported)
if ('periodicSync' in self.registration) {
  self.addEventListener('periodicsync', event => {
    if (event.tag === 'content-sync') {
      event.waitUntil(handlePeriodicSync())
    }
  })
}

const handlePeriodicSync = async () => {
  try {
    // Sync portfolio updates, news, etc.
    console.log('[SW] Handling periodic background sync')
  } catch (error) {
    console.error('[SW] Periodic sync error:', error)
  }
}

// Handle client updates
const sendMessageToClient = async (message) => {
  const clients = await self.clients.matchAll()
  clients.forEach(client => {
    client.postMessage(message)
  })
}

// Performance monitoring
const logPerformance = (event, duration) => {
  if (duration > 1000) {
    console.warn(`[SW] Slow operation: ${event} took ${duration}ms`)
  }
}

console.log('[SW] Service worker script loaded')