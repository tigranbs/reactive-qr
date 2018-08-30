import React, { Component } from 'react';
import { isSafari } from './helpers';

const videoStyles = {
  display: 'flex',
};

class VideoStream extends Component {
  stream = null;
  streamWidth = 0;
  streamHeight = 0;
  video = null;
  canvasContext = null;

  async componentDidMount() {
    let initSuccess = true;
    let message = '';
    try {
      await this.startCamera();
    } catch (e) {
      message = `Browser camera init error: ${e}`;
      initSuccess = false;
    }

    if (typeof this.props.onInit === 'function') {
      this.props.onInit({ error: initSuccess, message });
    }

    this.drawFrame();
  }

  componentWillUnmount() {
    this.stopCamera();
  }

  stopCamera = () => {
    if (!this.stream) return;
    this.stream.getTracks().map(t => t.stop());
    this.stream = null;
    this.streamWidth = 0;
    this.streamHeight = 0;
    this.canvasContext = null;
  };

  startCamera = async () => {
    this.stopCamera();

    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      throw new Error('WebRTC API not supported in this browser');
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(device => device.kind === 'videoinput');
    let videoMode = { facingMode: 'user' };
    if (cameras.length > 1) {
      videoMode = isSafari() ? { facingMode: { exact: 'environment' } } : { deviceId: cameras[1].deviceId };
    }

    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: videoMode,
    });

    if (this.video.srcObject !== undefined) {
      this.video.srcObject = this.stream;
    } else if (this.video.mozSrcObject !== undefined) {
      this.video.mozSrcObject = this.stream;
    } else if (window.URL.createObjectURL) {
      this.video.src = window.URL.createObjectURL(this.stream);
    } else if (window.webkitURL) {
      this.video.src = window.webkitURL.createObjectURL(this.stream);
    } else {
      this.video.src = this.stream;
    }

    this.video.playsInline = true;
    this.video.play(); // firefox does not emit `loadeddata` if video not playing
    await this.streamLoadedPromise();

    this.streamWidth = this.video.videoWidth;
    this.streamHeight = this.video.videoHeight;

    if (!this.canvasContext) {
      const canvas = document.createElement('canvas');
      canvas.width = this.streamWidth;
      canvas.height = this.streamHeight;
      this.canvasContext = canvas.getContext('2d');
    }
  };

  streamLoadedPromise = () => new Promise((resolve, reject) => {
    this.video.addEventListener('loadeddata', resolve, { once: true });
    this.video.addEventListener('error', reject, { once: true });
  });

  drawFrame = () => {

  };

  render() {
    return <video style={videoStyles} ref={v => (this.video = v)} />
  }
};

export default VideoStream;
