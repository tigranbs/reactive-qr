# Reactive-QR

![Reactive QR Demo](https://i.imgur.com/1N9H687.jpg)

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

## Props

### Configurations

#### shouldDecode - Boolean | default: true

Sometimes we need to have a condition to stop or allow deciding images

#### rearCamera - Boolean | default: true

Choosing between rear and front cameras.

#### className - String

className for `VideoStream` component wrapper.

#### style - Object | default: {}

style object for wrapper component

#### videoStyle - Object | default: {}

style object for HTML5 video component, which displays camera stream

### Events

#### onInit - Function(error: Boolean, message: String)

This function triggers when camera is ready to process images. This mainly happens when HTML5 Camera API receives callback that camera exists on device and hardware initialization is completed.

#### onCode - Function(code: String)

Callback when there is a valid decoded QR code text. Sometimes QR code text can be irrelevant because of the image decoding issues when there is a lighting issues, or image quality is poor. So you definitely have to check decoded text.
