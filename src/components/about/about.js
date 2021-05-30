import React, { useEffect,useState } from "react";
import Header from "../sub_page_header";
import Parteners from "../parteners";
import About_ from "../about/";
import i18n from "i18next";
/*** translation backage */
import { useTranslation } from "react-i18next";
import address from "../utils/address";

/**
 * about function showing about sadagaat page includes ( About Sadagaat section  ,vision , mission value , parteners)
 * @component
 * @see http://sadagaat.com/about
 */
function About() {
  const { t } = useTranslation();
  // const pull  = 'pull-right'  class name after check direction of page
  const pullStyle = i18n.dir() === "rtl" ? "pull-right" : "pull-left";
  //  marginStyel ='mr-120' or ml-120  class name after check direction
  const marginStyle = i18n.dir() === "rtl" ? "mr-120" : "ml-120";
  const [cover,setCover]=useState("")
  const [about, setAbout]= useState({})

  async function fetchCover() {
    const fetcher = await window.fetch(`${address()}cover-image/ABOUT1`,
    {headers: {'accept-language': `${i18n.language}`}
   });
     const response = await fetcher.json()
   setCover(fetcher);
   console.log(" c************over image value ***********************",cover)
   if(response.status === undefined){ 
    setCover(undefined)
   }
  }
  async function fetchAbout() {
    const fetcher = await window.fetch(`${address()}about-us`,
    {headers: {'accept-language': `${i18n.language}`}
   });
     const response = await fetcher.json()
   setAbout(response);
   console.log(" c************over image value ***********************",cover)
   
  }
  useEffect(() => {
    fetchCover();
    fetchAbout();
  },[i18n.language])  




  return (
    
    <React.Fragment>
      {/* Header Section */}
      
       {      ( cover !== undefined)
?
       <section style={{ 
         //backgroundImage: 'url(' + "https://images.wallpaperscraft.com/image/couple_mountains_travel_125490_1280x720.jpg"+ ')',
        backgroundImage: 'url(' + `${address()}cover-image/ABOUT1` + ')'
        
       }}  className=" inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("About Sadagaat")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       :
       <section className="  about-bg-img inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("About Sadagaat")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       }


      
      {/* About Component */}
      <About_ />
      {/* Vision Mission and Value Section */}
      <div>
        <section className=" divider parallax layer-overlay overlay-theme-colored-8">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-4">
                <h2 className="text-white">{t("Our Vision")}</h2>
                {
                  about.vision != null ? 
                  <p className="text-white">{about.vision}</p>
                  :
                  <p className="text-white">{t("vision_message_1")}</p>
                }
              </div>
              <div className="col-md-4">
                <h2 className="text-white">{t("Our Mission")}</h2>
                {
                  about.mission != null ?
                  <p className="text-white">{about.mission}</p>

                  :
                  <p className="text-white">{t("mission_message_1")}</p>

                }
              </div>
              <div className="col-md-4">
                <h2 className="text-white">{t("Our Values")}</h2>
                {
                  about.value != null ?
                <p className="text-white">{about.value}</p>

                  :
                  <p className="text-white">{t("our_values_description")}</p>

                }
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Parteners Component */}
      <Parteners />
    </React.Fragment>
  );
}
export default About;
