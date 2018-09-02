# Reactive-QR

React.js + HTML5 WebWorker QR Code scanner!

There is few other QR code scanner React components out there, but because non of them are using WebWorkers for concurrent image processing, performance is extremely bad on mobile devices,
or if performance is fine, QR codes not always detected. Main bottleneck for decoding QR codes is to do it a lot in a short amount of time. In avg. from live camera decoder should process 20+ frames in other to recognize QR code text. So if component is doing that synchronous way, CPU goes high and UI is blocking, or you are just processing less frames to unblock UI, but getting poor accuracy.

This component aims to break that bottleneck with WebWorker as a main source of decoding images, which is the most CPU intensive operation. That allows to unblock UI and React component life cycle, and process frames whenever they are available from WebRTC video component.

[Live working example: Demo](https://tigranbs.github.io/reactive-qr)

## Installation

This is a regular NPM package which is currently using [`jsQR`](https://github.com/cozmo/jsQR) to decode captured frames. But because of the principle how this component built, QR code decoding library is working only in WebWorker, so we can change to any JS library without touching React component!

### NPM

Component available [on npm](https://www.npmjs.com/package/reactive-qr), and can be used with any bundler such us Webpack, Browserify or Gulp.

```bash
npm install --save reactive-qr
```

```javascript
// ES6 import
import ReactiveQR from "reactive-qr";

.....
<ReactiveQR onCode={code => console.log(code)} />
.....
```
