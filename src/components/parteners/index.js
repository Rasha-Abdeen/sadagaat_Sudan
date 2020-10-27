import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useTranslation } from "react-i18next";
// package to optomize image 
import LazyLoad from 'react-lazyload';

/**
 * This component display parteners logos in home page
 * @component
 */
 function Parteners() {
  const { t } = useTranslation();
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
            <Carousel
              slidesPerPage={3}
              slidesPerScroll={1}
              autoPlay={3000}
              animationSpeed={1000}
              infinite
              rtl
              clickToChange
              centered
              breakpoints={{
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
              }}
            >
              <div className="item">
              <LazyLoad once={true}>
                  <img
                    src={require("../images/partener1.png")}
                    height="100vh" width = '150px'
                    alt="Sudanese American Medical Association"
                  />
                  </LazyLoad>
   
              </div>
              <div className="item">
              <LazyLoad once={true}>
                <img
                  src={require("../images/partener2.png")}
                  alt="Soba Uneviersity Hospital"
                  height="100vh" width = '150px'
                />
                </LazyLoad>
              </div>
              <div className="item">
              <LazyLoad once={true}>
                  <img src={require("../images/partener3.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
              </LazyLoad>
              </div>
              <div className="item">
              <LazyLoad once={true}>
                  <img src={require("../images/partener4.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
              </LazyLoad>
              </div>
              <div className="item">
              <LazyLoad once={true}>
                  <img src={require("../images/partener5.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
              </LazyLoad>
              </div>
              <div className="item">
              <LazyLoad once={true}>
                  <img src={require("../images/partener6.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
              </LazyLoad>
              </div>
              <div className="item">
              <LazyLoad once={true}>
                  <img src={require('../images/partener7.png')} alt="" height="100vh" width = '150px' />
             </LazyLoad>
              </div>
              <div className="item">
              <LazyLoad once={true}>
                  <img src={require("../images/partener9.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
                </LazyLoad>
              </div>
              <div className="item">
              <LazyLoad once={true}>
                  <img src={require("../images/partener10.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
              </LazyLoad>
              </div>
              <div className="item">
              <LazyLoad once={true}>
                  <img src={require("../images/partener11.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
              </LazyLoad>
              </div>
              <div className="item">
              <LazyLoad once={true}>
                  <img src={require("../images/partener12.png")} alt="Sadagaat USA" height="100vh" width = '150px' />
              </LazyLoad>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
    </React.Fragment>
  );
}

export default Parteners;
