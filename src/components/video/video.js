import React, { Component } from "react";
import ReactDOM from "react-dom";
import ModalVideo from "react-modal-video";
import axios from "axios";
import address from "../utils/address";
import i18n from "i18next";
import getVideoId from 'get-video-id';



class ModalVedioComponent extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      link: " ",
      video:[],
      id: ""
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  async componentDidMount() {
  try {
    const { data: video  } = await axios.get(`${address()}video-config`, {
      headers: { "accept-language": `${i18n.language}` },
    });
    this.setState({ video });
    this.setState({link: video.link})
    this.setState({id: getVideoId(this.state.link)})

    console.log("the video link  ",this.state.link);
  } catch (error) {
    console.log("can not load video ...........");
  }

  
}
  // get projct id from url
async componentWillReceiveProps() {
  try {
    const { data: video } = await axios.get(`${address()}video-config`, {
      headers: { "accept-language": `${i18n.language}` },
    });
    this.setState({ video });
    this.setState({link: video.link})
    this.setState({id: getVideoId(this.state.link)})

  } catch (error) {
    console.log("can not load Contact for the contact page slider");
  }

}


  render() {
    let link = this.state.link
    const {id }= getVideoId(link) 

    console.log("here we go this is the youtube testttttttted link ********",link)
    console.log("here we go this is the youtube id ********",id)


    return (
      <React.Fragment>
        { id != "" ?
        <ModalVideo
        
        channel="youtube"
        isOpen={this.state.isOpen}
        videoId={id}
        onClose={() => this.setState({ isOpen: false })}
      />:
      <ModalVideo
      channel="youtube"
      isOpen={this.state.isOpen}
      videoId="JI-1UEwo-tg"
      onClose={() => this.setState({ isOpen: false })}
    />
    }
        
        <a onClick={this.openModal} className="modal-btn">
          <i className="fa fa-play-circle text-theme-colored font-72" />
        </a>
      </React.Fragment>
    );
  }
}
export default ModalVedioComponent;
