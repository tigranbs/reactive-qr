import jsQR from 'jsqr';

self.addEventListener('message', (event) => {
  const { data, width, height } = event.data;
  const code = jsQR(data, width, height);
  self.postMessage(code);
});
