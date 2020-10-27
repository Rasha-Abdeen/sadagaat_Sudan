import React, { useState, useEffect } from "react";
import axios from "axios";
import address from "./../utils/address";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import work from "../images/work.jpg";
import dates from "../images/dates.jpg";
import blood from "../images/blood.jpg";
import LazyLoad from 'react-lazyload';


/**
 * This component display Photo Gallery in home page
 * @component
 */
function Photo() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
    <section>
      <div className="container">
        <div className="section-title text-center">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <h2 className="text-uppercase line-bottom-center mt-0">
                {t("Photo")}{" "}
                <span className="text-theme-colored font-weight-600">
                  {t("Gallery")}
                </span>
              </h2>
      
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div
              id="grid"
              className="gallery-isotope grid-3 masonry gutter-10 clearfix"
            >
              <div className="gallery-item breakfast" style={{ float: "left" }}>
                <div className="thumb">
                <LazyLoad once={true}>
                  <img
                    width="370px"
                    height="270px"
                    className="img-fullwidth"
                    src={require('../images/blood.jpg')}
                    alt="project"
                  />
                  </LazyLoad>
                  <div className="overlay-shade" />
                  <div className="portfolio-upper-part">
                  </div>
                  <div className="portfolio-view">
                    <a
                      className="image-popup-vertical-fit"
                      title="Donate"
                      href={blood}
                    >
                      <i className="fa fa-camera font-24 text-theme-colored" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="gallery-item breakfast" style={{ float: "left" }}>
                <div className="thumb">
                <LazyLoad once={true}>
                  <img
                    width="370px"
                    height="270px"
                    className="img-fullwidth"
                    src={require('../images/work.jpg')}
                    alt="project"
                  />
                  </LazyLoad>
                  <div className="overlay-shade" />
                  <div className="portfolio-upper-part">
                    {/* <h4 className="font-22 mb-0">{photo.title}</h4> */}
                  </div>
                  <div className="portfolio-view">
                    <a
                      className="image-popup-vertical-fit"
                      title="Donate"
                      href={work}
                    >
                      <i className="fa fa-camera font-24 text-theme-colored" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="gallery-item breakfast" style={{ float: "left" }}>
                <div className="thumb">
                <LazyLoad once={true}>
                  <img
                    width="370px"
                    height="270px"
                    className="img-fullwidth"
                    src={require('../images/dates.jpg')}
                    alt="project"
                  />
                  </LazyLoad>
                  <div className="overlay-shade" />
                  <div className="portfolio-upper-part">
                    {/* <h4 className="font-22 mb-0">{photo.title}</h4> */}
                  </div>
                  <div className="portfolio-view">
                    <a
                      className="image-popup-vertical-fit"
                      title="Donate"
                      href={dates}
                    >
                      <i className="fa fa-camera font-24 text-theme-colored" />
                    </a>
                  </div>
                </div>
              </div>
              {/* ))} */}
            </div>
          </div>
        </div>
      </div>
    </section>
    </React.Fragment>
  );
}

export default Photo;
