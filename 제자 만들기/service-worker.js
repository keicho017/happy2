const CACHE_NAME = "johei-game-v1"; // 버전을 붙여 관리하면 편리합니다.
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  // 대표 이미지 몇 개를 추가하면 로딩이 빨라집니다.
  "./assets/happy/happy_1.png" 
];

// 설치 단계: 리소스 캐싱
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("캐시 저장 중...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 활성화 단계: 오래된 캐시 삭제 (업데이트 로직)
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("오래된 캐시 삭제:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 호출 단계: 캐시 우선, 없으면 네트워크에서 가져오기
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});