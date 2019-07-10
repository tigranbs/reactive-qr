import React, { Component } from "react";
import PropTypes from 'prop-types';
import VideoStream from './video_stream';

const wrapperStyles = {
  display: 'flex',
  height: '100%',
  overflowY: 'hidden',
};

class ReactiveQR extends Component {
  webWorker = null;

  componentWillMount() {
    this.webWorker = new Worker('qr_decode.worker.js');
    this.webWorker.addEventListener('message', this.onFrameDecoded);
  }

  componentWillUnmount() {
    if (this.webWorker !== null) {
      this.webWorker.terminate();
      this.webWorker = null;
    }
  }

  onVideoStreamInit = (state, drawFrame) => {
    if (this.props.onInit) {
      this.props.onInit(state);
    }
    this.drawVideoFrame = drawFrame;

    if (this.props.shouldDecode) {
      this.drawVideoFrame();
    }
  }

  onFrame = (frameData) => this.webWorker.postMessage(frameData);
  drawVideoFrame = () => { }

  onFrameDecoded = (event) => {
    const code = event.data;
    if (code) {
      const { data } = code;
      if (this.props.onCode && data.length > 0) {
        this.props.onCode(code);
      }
    }

    if (this.props.shouldDecode) {
      this.drawVideoFrame();
    }
  };

  render() {
    return (
      <div className={this.props.className} style={{ ...wrapperStyles, ...this.props.style }}>
        <VideoStream
          onFrame={this.onFrame}
          onInit={this.onVideoStreamInit}
          rearCamera={this.props.rearCamera}
          style={this.props.videoStyle}
        />
      </div>
    );
  }
}

ReactiveQR.propTypes = {
  onInit: PropTypes.func,
  shouldDecode: PropTypes.bool,
  onCode: PropTypes.func,
  style: PropTypes.object,
  videoStyle: PropTypes.object,
  rearCamera: PropTypes.bool,
  className: PropTypes.string,
};

ReactiveQR.defaultProps = {
  onInit: () => { },
  shouldDecode: true,
  onCode: () => { },
  style: {},
  videoStyle: {},
  rearCamera: true,
  className: undefined,
};

export default ReactiveQR;
