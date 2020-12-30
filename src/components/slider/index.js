import React from "react";
import { Slide } from "react-slideshow-image";
import slide1 from "../images/slide 1.jpg";
import slide2 from "../images/slide 2.jpg";
import slide3 from "../images/slide 3.jpg";
import slide4 from "../images/slide 4.jpg";
import slide5 from "../images/slide 5.jpg";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

const slideImages = [slide1, slide2, slide3, slide4, slide5];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  // onChange: (oldIndex, newIndex) => {
  //   console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  // },
};
const Slideshow = () => {
  return (
    <React.Fragment>
      <div className="slide-container">
        <Slide {...properties}>
          <LazyLoad once={true}>
            <div>
              <Link to="/single-projects/3463">
                <img src={require("../images/slide10.jpg")} />
              </Link>
            </div>
          </LazyLoad>
          <LazyLoad once={true}>
            <div>
              <img src={require("../images/slide9.jpg")} />
            </div>
          </LazyLoad>
          <LazyLoad once={true}>
            <div>
              <Link to="/single-projects/3057">
                <img src={require("../images/slide 6.jpg")} />
              </Link>
            </div>
          </LazyLoad>
          <LazyLoad once={true}>
            <div>
              <Link to="/single-projects/1911">
                <img src={require("../images/slide 1.jpg")} />
              </Link>
            </div>
          </LazyLoad>
          {/* </div> */}

          {/* <div  className = "img-responsive" style={{ backgroundImage: `url(${slideImages[1]})`, backgroundSize: 'auto'}}></div>
        </div> */}
          <LazyLoad once={true}>
            <div>
              <Link to="/single-projects/2374">
                <img src={require("../images/slide 5.jpg")} />
              </Link>
            </div>
          </LazyLoad>

          {/* <div style={{ backgroundImage: `url(${slideImages[2]})`}} ></div> */}
          <LazyLoad once={true}>
            <div>
              <Link to="/single-projects/2710">
                <img src={require("../images/slide 2.jpg")} />
              </Link>
            </div>
          </LazyLoad>
          {/* <div  className = "img-responsive" style={{ backgroundImage: `url(${slideImages[3]})` }}></div> */}
          <LazyLoad once={true}>
            <div>
              <Link to="/single-projects/2054">
                <img src={require("../images/slide 3.jpg")} />
              </Link>
            </div>
          </LazyLoad>

          {/* <div  className = "img-responsive" style={{ backgroundImage: `url(${slideImages[3]})` }}></div> */}
          <LazyLoad once={true}>
            <div>
              <Link to="/single-projects/2042">
                <img src={require("../images/slide 4.jpg")} />
              </Link>
            </div>
          </LazyLoad>
        </Slide>
      </div>
    </React.Fragment>
  );
};
export default Slideshow;
