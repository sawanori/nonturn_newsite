/**
 * Service Worker for 飲食店撮影PhotoStudio PWA
 * Version: 1.0.0
 */

const CACHE_NAME = 'foodphoto-v1.0.0';
const OFFLINE_URL = '/offline.html';

// キャッシュするリソース
const STATIC_CACHE_URLS = [
  '/',
  '/services/photo/foodphoto',
  '/services/photo/foodphoto/form',
  '/offline.html',
  '/manifest.json',
];

// 画像キャッシュ用の別キャッシュ
const IMAGE_CACHE_NAME = 'foodphoto-images-v1';
const IMAGE_CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7日間

// インストールイベント
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE_URLS);
    })
  );
  // すぐにアクティブにする
  self.skipWaiting();
});

// アクティベートイベント
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
  // すぐにクライアントを制御
  self.clients.claim();
});

// フェッチイベント
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 同一オリジンのリクエストのみ処理
  if (url.origin !== location.origin) {
    return;
  }

  // 画像のキャッシュ戦略
  if (request.destination === 'image' || /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(url.pathname)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // APIリクエストはキャッシュしない
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(JSON.stringify({ error: 'オフライン中です' }), {
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
    return;
  }

  // HTMLリクエストの処理（Network First戦略）
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 成功したレスポンスをキャッシュに保存
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(async () => {
          // オフライン時はキャッシュから取得
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // キャッシュもない場合はオフラインページを表示
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // その他のリソース（Cache First戦略）
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((response) => {
        // 成功したレスポンスをキャッシュに保存
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});

// 画像リクエストの処理
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  // キャッシュがあり、有効期限内の場合
  if (cachedResponse) {
    const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
    if (Date.now() - cachedDate.getTime() < IMAGE_CACHE_MAX_AGE) {
      return cachedResponse;
    }
  }

  try {
    // ネットワークから取得
    const networkResponse = await fetch(request);
    
    // 成功したレスポンスをキャッシュに保存
    if (networkResponse.status === 200) {
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-date', new Date().toISOString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers,
      });
      
      await cache.put(request, modifiedResponse);
    }
    
    return networkResponse;
  } catch (error) {
    // オフライン時はキャッシュから返す
    if (cachedResponse) {
      return cachedResponse;
    }
    // プレースホルダー画像を返す
    return new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
}

// バックグラウンド同期
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

// フォームデータの同期
async function syncForms() {
  // IndexedDBから保存されたフォームデータを取得して送信
  // 実装は必要に応じて追加
}

// プッシュ通知の処理
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : '新しいお知らせがあります',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification('飲食店撮影PhotoStudio', options)
  );
});

// 通知クリックの処理
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://foodphoto-pro.com/')
  );
});