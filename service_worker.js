// 캐시 제목과 캐시할 파일 선언
const cacheName = "Today's sentence!"
const fileToCache = [
  "./", "./index.html", "./manifest.json", "./images/hello-pwa.png"
]

// 서비스 워커를 설치하고 캐시 파일을 저장
// The Window.self read-only property returns the window itself, as a WindowProxy.
self.addEventListener("install", event => {
  console.log("서비스 워커 설치!")
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log("파일을 캐시에 저장함!")
        return cache.addAll(fileToCache)
    })
  )
})

// 고유 번호는 할당받은 서비스 워커 작동
self.addEventListener("activate", event => {
  console.log("서비스 워커 동작 시작!")
})

// 데이터 요청을 받으면 네트워크 또는 캐시에서 찾아 반환
self.addEventListener("fetch", event => {
  event.respondWith(
    //The match() method of the Cache interface returns a Promise that resolves to the Response associated with the first matching request in the Cache object. If no match is found, the Promise resolves to undefined.
    caches.match(event.request)
      .then(response => {
        if (!response) {
          console.log("네트워크에서 데이터 요청!", event.request)
          return fetch(event.request)
        }
        console.log("캐시에서 데이터 요청!", event.request)
        return response
    }).catch(error => console.log(error))
  )
})