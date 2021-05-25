import React, { useState, useEffect } from 'react';
import address from "../utils/address"
import i18n from 'i18next'

import Header from "../sub_page_header";
import { useTranslation } from "react-i18next";
import VolunteerPrograms from "./volunteers-programs";

const Programs = () => {
  const { t } = useTranslation();
  const [cover , setCover]= useState({});
  async function fetchCover() {
    const fetcher = await window.fetch(`${address()}cover-image/VOLUNTEER3`,
    {headers: {'accept-language': `${i18n.language}`}
   });
    const response = await fetcher.json()
   setCover(response);
   console.log(" c************over image value ***********************",cover)
  }
  useEffect(() => {
         fetchCover()
        }, [i18n.language])

  return (
    <React.Fragment>
      <section>
      {
            (cover !== undefined)
            ?
       <section style={{ 
         //backgroundImage: 'url(' + "https://images.wallpaperscraft.com/image/couple_mountains_travel_125490_1280x720.jpg"+ ')',
        backgroundImage: 'url(' + `${address()}cover-image/VOLUNTEER3` + ')'
        
       }}  className=" inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Volunteers Programs")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       :
       <section className=" volunteer-bg-img inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Volunteers Programs")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       }
        
        <VolunteerPrograms type={"ongoing"} />
      </section>
    </React.Fragment>
  );
};

export default Programs;
