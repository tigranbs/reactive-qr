import React, { Component } from "react";
import VideoStream from './video_stream';
import QRWorker from './qr_decode.worker';

const wrapperStyles = {
  display: 'flex',
  height: '100%',
  overflowY: 'hidden',
};

class ReactiveQR extends Component {
  webWorker = null;

  componentWillMount() {
    this.webWorker = new QRWorker();
    this.webWorker.addEventListener('message', this.onFrameDecoded);
  }

  componentWillUnmount() {
    if (this.webWorker !== null) {
      this.webWorker.terminate();
      this.webWorker = null;
    }
  }

  onFrame = () => {

  };

  onInitCameraStream = () => {

  };

  onFrameDecoded = () => {

  };

  render() {
    return (
      <div style={wrapperStyles}>
        <VideoStream onFrame={this.onFrame} onInit={this.onInitCameraStream} />
      </div>
    );
  }
}

export default ReactiveQR;
