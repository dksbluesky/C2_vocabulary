// 每次修改 index.html 後，請把這裡的 v1 改成 v2, v3... 以此類推
const CACHE_NAME = 'vocab-v2'; 

const ASSETS = [
  './',
  './index.html'
];

// 安裝時強制更新
self.addEventListener('install', (e) => {
  self.skipWaiting(); // 讓新的 Service Worker 立即接管
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// 清除舊版本的快取
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
