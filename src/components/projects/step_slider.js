import React, { Component } from "react";
import Carousel from "@brainhubeu/react-carousel";
import address from "../utils/address";
import ReactPlayer from "react-player";
import "@brainhubeu/react-carousel/lib/style.css";
class StepSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { media: this.props.media };
  }
  render() {
    const media = this.state.media.media;

    if (media.length > 0) {
      return (
        <Carousel
          slidesPerScroll={1}
          autoPlay={6000}
          rtl
          arrowLeft={
            <i
              className="fa fa-chevron-right fa-2x"
              style={{ margin: "10px" }}
            />
          }
          arrowRight={
            <i
              className="fa fa-chevron-left fa-2x"
              style={{ margin: "10px" }}
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
                <img
                  src={`${address()}projects/step/${mediaItem.item.name}/image`}
                  alt="project image"
                  // className="img-carousel"
                />
              ) : (
                <div>
                  <ReactPlayer
                    controls={true}
                    playIcon
                    className="img-fullwidth img-carousel"
                    url={`${address()}projects/step/${
                      mediaItem.item.name
                    }/video`}
                  />
                </div>

                // <video
                //   controls
                //   src={`${address()}projects/step/${mediaItem.item.name}/video`}
                //   type="video/mp4"
                //   className="img-carousel"
                // ></video>
              )}
            </div>
          ))}
        </Carousel>
      );
    } else return null;
  }
}

export default StepSlider;
