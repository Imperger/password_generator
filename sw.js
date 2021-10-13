self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    const url = new URL(e.request.url);
    if (e.request.method === 'GET' &&
            url.origin === location.origin &&
            !url.pathname.includes('.')) {
      const basePath = self.location.pathname.slice(0, self.location.pathname.lastIndexOf('/') + 1);
      url.pathname = `${basePath}index.html`;
      return fetch(url.href);
    }

    return fetch(e.request);
  })());
});
