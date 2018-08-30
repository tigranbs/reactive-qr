import React, { Component } from "react";
import VideoStream from './video_stream';

const wrapperStyles = {
  display: 'flex',
  height: '100%',
  overflowY: 'hidden',
};

class ReactiveQR extends Component {
  webWorker = null;

  componentWillMount() {
    // TODO: make WebWorker stuff here!
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
