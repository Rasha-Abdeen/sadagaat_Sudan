import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import slide_1 from "../images/slide 1.jpg";
import slide_2 from "../images/slide 2.jpg";
import address from "../utils/address.js";
/**
 * This component returns hompage's slider
 * @component
 * @see https://sadagaat-uk.org/
 */
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
};
const slides = [
  { img: slide_1, link: "1911" },
  { img: slide_2, link: "3562" },
];
const Slideshow = () => {
  const [fetchedSlide, setSlides] = useState([]);
  async function fetchData() {
    console.log("slider");
    const fetcher = await window.fetch(`${address()}slider`);
    const response = await fetcher.json();
    setSlides(response);
    console.log("the fetch  method call");
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <div className="slide-container">
        <Slide {...properties}>
          {Object.keys(fetchedSlide).length != 0
            ? fetchedSlide.map((slide) => (
                <div>
                  <a href={slide.link}>
                    <img src={`${address()}slider/${slide.imageName}/image`} />
                  </a>
                </div>
              ))
            : slides.map((slide) => (
                <div>
                  <Link to={"/single-projects/" + slide.link}>
                    <img src={slide.img} />
                  </Link>
                </div>
              ))}
        </Slide>
      </div>
    </React.Fragment>
  );
};
export default Slideshow;
