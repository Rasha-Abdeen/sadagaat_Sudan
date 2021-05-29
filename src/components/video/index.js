import React, { useRef, useState, Component, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ModalVedioComponent from "./video";
import address from "../utils/address";
import i18n from "i18next";


const Video = () => {
  const { t } = useTranslation();
  const [link,setLink]= useState({})


  async function fetchTable() {
    const fetcher = await window.fetch(`${address()}video-config`,
    {headers: {'accept-language': `${i18n.language}`}
   });
   const response = await fetcher.json();
   setLink(response);
   console.log("the fetched link text .*******",link.text)
 
 
 }
 useEffect(()=>{
fetchTable();
 },[i18n.language])
  return (
    <React.Fragment>
      <section
        className="divider parallax layer-overlay overlay-dark-9 bg-img"
        data-parallax-ratio="0.7"
      >
        <div className="display-table">
          <div className="display-table-cell">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <ModalVedioComponent></ModalVedioComponent>
                    {
                      (link.length !=0  && link.text != null )?
                      <p className="font-20 text-white mt-20">

                      "{link.text}"
                      </p>
                      :
                      <p className="font-20 text-white mt-20">

                      "{t("video text")}"
                      </p>

                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Video;
