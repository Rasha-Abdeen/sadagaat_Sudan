import React, { useState, useEffect } from "react";
import axios from "axios";
import address from "./../utils/address";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import work from "../images/work.jpg";
import dates from "../images/dates.jpg";
import blood from "../images/blood.jpg";
import LazyLoad from 'react-lazyload';
import { withTranslation } from "react-i18next";
import Gallery from '../More_gallery/gallery'
import { Link } from "react-router-dom";

/**
 * This component display Photo Gallery in home page
 * @component
 */
function Photo() {

  const { t } = useTranslation();
  const images=[
   dates,work,dates,blood,work
  ]


const[imageApi,setImageApi]= useState([]);
const [image,setImage]= useState([]);
const [gallery,setGallery]=useState([])

async function fetchData() {
  const fetcher = await window.fetch(`${address()}gallary`);
  const response = await fetcher.json();
  setImage(response);
  console.log("the response data from api.........",response)
  console.log("the image data from api ...",image)

}
useEffect(() => {
  fetchData();
}, []);

console.log("the first 2 element",gallery)
 


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

        <div className="row" >
          <div className="col-md-12  ">
           

     
    



            
      
        { image.length != 0  ?
        <div className="row" >
        <div className="col-md-12  ">
      <div id="grid"
                    className="gallery-isotope grid-3 masonry gutter-10 clearfix">
               
     {image.slice(Math.max(image.length - 3, 1)).map((image, index) => (
     <div className="gallery-item breakfast" style={{ float: "left" }}>
     <div className="thumb">
     <LazyLoad once={true}>
     <img 
                width="370px"
                height="270px"
                className="img-fullwidth"
     src={`${address()}gallary/${image.imageName}/image`} key={index}/>
     </LazyLoad>
     </div>
     </div>
     ))
     }
 </div></div> 
    </div>:

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
                  <div className="portfolio-upper-part">
                  </div>
                  <div className="portfolio-view">
                    <a
                      href={blood}
                    >
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

                  <div className="portfolio-upper-part">
                    {/* <h4 className="font-22 mb-0">{photo.title}</h4> */}
                  </div>
                  <div className="portfolio-view">
                    <a

                      href={work}
                    >
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
                  <div className="portfolio-upper-part">
                    {/* <h4 className="font-22 mb-0">{photo.title}</h4> */}
                  </div>
                  <div className="portfolio-view">
                    <a

                      href={dates}
                    >
                    </a>
                  </div>

                </div>
              </div>
              {/* ))} */}
            </div>




        }

           
<div className="col-md-2 col-md-offset-5">
        <Link to="/gallery" className="btn btn-primary active btn-lg  " > {t("More Images")}</Link>

        </div>
      </div>
      </div>
      </div>
      
    </section>
    </React.Fragment>
  );
}

export default Photo;
