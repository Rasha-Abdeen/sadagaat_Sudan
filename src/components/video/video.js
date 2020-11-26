import React, { Component } from "react";
import ReactDOM from "react-dom";
import ModalVideo from "react-modal-video";

class ModalVedioComponent extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <React.Fragment>
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId="JI-1UEwo-tg"
          onClose={() => this.setState({ isOpen: false })}
        />
        <a onClick={this.openModal} className="modal-btn">
          <i className="fa fa-play-circle text-theme-colored font-72" />
        </a>
      </React.Fragment>
    );
  }
}
export default ModalVedioComponent;
