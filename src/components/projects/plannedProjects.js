import React, { useState, useEffect } from 'react';
import Header from "../sub_page_header";
import address from "../utils/address"
import { useTranslation } from "react-i18next";
import i18n from 'i18next'
import Project from ".";
/**
 * This component returns planned projects
 * @component
 * * * @param {string} props Project type
 * @see https://sadagaat.com/planned-projects
 */
function PlannedProjects() {
  const { t } = useTranslation();
  const[cover,setCover]=useState({})

  async function fetchCover() {

    try {
      const fetcher = await window.fetch(`${address()}cover-image/PROJECT3`,
    {headers: {'accept-language': `${i18n.language}`}
   });
   const response= fetcher.json();
   setCover(fetcher);
   console.log(" c************over image value ***********************",cover.status)
     
    } catch (error) {
      console.log(" cant load planned project cover image dur to ",error)
      
    }
    

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
        backgroundImage: 'url(' + `${address()}cover-image/PROJECT3` + ')'
        
       }}  className=" inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Planned Projects")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       :
       <section className=" projects-bg-img inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Planned .,.,.f,gProjects")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       }
        <Project type="planned" />
      </section>
    </React.Fragment>
  );
}



export default PlannedProjects;
