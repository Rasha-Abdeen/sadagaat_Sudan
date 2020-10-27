import React from "react";
import Slider from "../slider";
import Hubs from "../../components/base_hubs";
import About from "../../components/about";
import ProjectCarousel from "../../components/projects/projectCarousel";
import Numbers from "../../components/numbers";
import Photo from "../../components/photo_gallery";
import Video from "../../components/video";
import Events from "../../components/events";
import Parteners from "../parteners";
import LazyLoad from 'react-lazyload';


/**
 * This component display  home page 
 * @see http://sadagaat-uk.org
 * @component
 */

function Home() {
  return (
    <React.Fragment>
    <div className="main-content">
      <Slider />
      <Hubs />
      <About />
      <ProjectCarousel />
      <LazyLoad once={true}>
      <Numbers />
      </LazyLoad>
      <LazyLoad once={true}>
      <Photo />
      </LazyLoad>
      <LazyLoad once={true}>
      <Video />
      </LazyLoad>
      <LazyLoad once={true}>
      <Events />
      </LazyLoad>
      <LazyLoad once={true}>
      <Parteners />
      </LazyLoad>
    </div>
    </React.Fragment>
  );
}

export default Home;
