import React, { useEffect, useState } from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useTranslation } from "react-i18next";
// package to optomize image 
import address from "../utils/address.js";
import part_1 from "../images/partener1.png"
import part_2 from "../images/partener2.png"
import part_3 from "../images/partener3.png"
import part_4 from "../images/partener4.png"
import part_5 from "../images/partener5.png"
import part_6 from "../images/partener6.png"
import part_7 from "../images/partener7.png"
import part_9 from "../images/partener9.png"
import part_10 from "../images/partener10.png"
import part_11 from "../images/partener11.png"
import part_12 from "../images/partener12.png"

import LazyLoad from 'react-lazyload';

/**
 * This component display parteners logos in home page
 * @component
 */
 function Parteners() {
  
const { t } = useTranslation();
const [part, setPart] = useState([]);

 const properties = {
  slidesPerPage: 3,
  slidesPerScroll: 1,
  autoPlay: 3000,
  animationSpeed: 1000,
  infinite: true,
  rtl: true,
  clickToChange: true,
  centered: true,
  breakpoints: {
    1000: {
      // these props will be applied when screen width is less than 1000px
      slidesPerPage: 2,
      clickToChange: false,
      centered: false,
      arrows: false,
      infinite: true,
    },
    500: {
      slidesPerPage: 1,
      slidesPerScroll: 1,
      clickToChange: false,
      centered: false,
      animationSpeed: 2000,
      infinite: true,
    },
  }
 };

 const images = [
  {img: part_1},
  {img: part_2},
  {img: part_3},
  {img: part_4},
  {img: part_5},
  {img: part_6},
  {img: part_7},
  {img: part_9},
  {img: part_10},
  {img: part_11},
  {img: part_12}
 ]



  async function fetchData() {
    console.log("carsoul partener ");

    const fetcher = await window.fetch(`${address()}partener`);
    const response = await fetcher.json();
    setPart(response);
    console.log("the fetch  method call ****************",part);
  }
  useEffect(() => {
    fetchData();
  }, []);




  return (
    <React.Fragment>
    <section className="clients bg-light">
      <div className="container pt-0 pb-0">
        <div className="section-title text-center">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <h2 className="text-uppercase line-bottom-center mt-0">
                {t("Our")}{" "}
                <span className="text-theme-colored font-weight-600">
                  {t("Parteners")}
                </span>
              </h2>
            </div>
          </div>
        </div>
       
        <div className="row">
          <div className="col-md-12">
          <Carousel {...properties}>
              {
                Object.keys(part).length != 0 ?
                part.map((part)=>(
                  
                  <div className="item">
                  <LazyLoad once={true}>
                  <a href={part.link}>

                      <img
                        src={`${address()}partener/${part.imageName}/image`}
                        height="100vh" width = '150px'
                        alt="Sudanese American Medical Association"
                      />
                      </a>
                      </LazyLoad>
       
                  </div>
                ))
                :

                images.map((image)=>(
                  <div className="item">
                  <LazyLoad once={true}>
                  <img
                        src={image.img}
                        height="100vh" width = '150px'
                        alt="Sudanese American Medical Association"
                      /> 
                       </LazyLoad>
                    </div>

                ))

            //   <LazyLoad once={true}>
            //       <img
            //         src={require("../images/partener1.png")}
            //         height="100vh" width = '150px'
            //         alt="Sudanese American Medical Association"
            //       />
            //       </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //     <img
            //       src={require("../images/partener2.png")}
            //       alt="Soba Uneviersity Hospital"
            //       height="100vh" width = '150px'
            //     />
            //     </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //       <img src={require("../images/partener3.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
            //   </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //       <img src={require("../images/partener4.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
            //   </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //       <img src={require("../images/partener5.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
            //   </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //       <img src={require("../images/partener6.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
            //   </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //       <img src={require('../images/partener7.png')} alt="" height="100vh" width = '150px' />
            //  </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //       <img src={require("../images/partener9.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
            //     </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //       <img src={require("../images/partener10.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
            //   </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //       <img src={require("../images/partener11.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
            //   </LazyLoad>
            //   </div>
            //   <div className="item">
            //   <LazyLoad once={true}>
            //       <img src={require("../images/partener12.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
            //   </LazyLoad>
            //   </div>
              
                
              }
              
            </Carousel>
          </div>
        </div>
      </div>
    </section>
    </React.Fragment>
  );
}

export default Parteners;
