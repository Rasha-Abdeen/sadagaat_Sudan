import React, { Component } from "react";
import Carousel from "@brainhubeu/react-carousel";
import address from "../utils/address";

import "@brainhubeu/react-carousel/lib/style.css";
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { images: this.props.images };
  }
  render() {
    return (
      <Carousel
        slidesPerScroll={1}
        autoPlay={6000}
        rtl
        arrowLeft={
          <i className="fa fa-chevron-right fa-2x" style={{ margin: "10px" }} />
        }
        arrowRight={
          <i className="fa fa-chevron-left fa-2x" style={{ margin: "10px" }} />
        }
        addArrowClickHandler
        // animationSpeed={1000}
        infinite
        clickToChange
        centered
        breakpoints={{
          1000: {
            // these props will be applied when screen width is less than 1000px
            slidesPerPage: 2,
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
        {this.state.images.map((image) => (
          <div
            className="post-thumb thumb"
            style={{ maxHeight: "400px", width: "100%" }}
          >
            <img
              src={`${address()}projects/${image.name}/image`}
              alt="project image"
              width="500"
              className="img-responsive"
              style={{ height: "400px", width: "100%" }}
            />
          </div>
        ))}
      </Carousel>
    );
  }
}

export default Slider;
