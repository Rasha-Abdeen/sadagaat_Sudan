import React, { Component } from "react";
import Carousel from "@brainhubeu/react-carousel";
import address from "../utils/address";
import ReactPlayer from "react-player";
import "@brainhubeu/react-carousel/lib/style.css";
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: this.props.media,
      progId: this.props.progId,
    };
  }

  getImage = (name) => {
    if (name === "main")
      return (
        <img
          src={`${address()}programs/${this.state.progId}/image`}
          alt="program image"
          className=""
          style={{ height: "400px" }}
        />
      );
    else
      return (
        <img
          src={`${address()}programs/${name}/image`}
          alt="program image"
          className=""
          style={{ height: "400px" }}
        />
      );
  };
  render() {
    const media = this.state.media;

    if (media.length > 0) {
      return (
        <Carousel
          slidesPerScroll={1}
          // autoPlay={6000}
          rtl
          arrowLeft={
            <i
              className="fa fa-chevron-right fa-2x"
              style={{ marginLeft: "10px" }}
            />
          }
          arrowRight={
            <i
              className="fa fa-chevron-left fa-2x"
              style={{ marginRight: "10px" }}
            />
          }
          addArrowClickHandler
          // animationSpeed={1000}
          infinite
          clickToChange
          centered
          breakpoints={{
            1000: {
              // these props will be applied when screen width is less than 1000px
              slidesPerPage: 1,
              clickToChange: false,
              centered: false,

              infinite: false,
            },
            500: {
              slidesPerPage: 1,
              slidesPerScroll: 1,
              clickToChange: false,
              centered: false,
              animationSpeed: 2000,
              infinite: false,
            },
          }}
        >
          {/* /projects/step/{imageName}/image */}
          {media.map((mediaItem) => (
            <div className="post-thumb thumb" style={{ margin: "20px 0" }}>
              {mediaItem.type === "img" ? (
                this.getImage(mediaItem.name)
              ) : (
                <div style={{ height: "400px", margin: "0" }}>
                  <ReactPlayer
                    controls={true}
                    playIcon
                    playing={false}
                    className=""
                    url={`${address()}programs/${mediaItem.name}/video`}
                  />
                </div>
              )}
            </div>
          ))}
        </Carousel>
      );
    } else return null;
  }
}

export default Slider;
