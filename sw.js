self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    const url = new URL(e.request.url);

    if (e.request.method === 'GET' &&
            url.origin === location.origin &&
            !url.pathname.includes('.')) {
      url.pathname = '/index.html';
      return fetch(url.href);
    }

    return fetch(e.request);
  })());
});
