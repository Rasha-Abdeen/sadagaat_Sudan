import React, { useEffect, useState } from "react";
import address from "../utils/address";
import Header from "../sub_page_header";
import parse from "html-react-parser";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import work from "../images/work.jpg";
import dates from "../images/dates.jpg";
import blood from "../images/blood.jpg";
import Gallery from 'react-grid-gallery'
import { useTranslation } from "react-i18next";

/**
 * This component to display gallery images using react-grid-gallery 
 * @see http://sadagaat.com/gallery
 */


export default function More() {
    const { t } = useTranslation();

     const staticImages=
        [{
            src: work,
            thumbnail: work,
            thumbnailWidth: 320,
            thumbnailHeight: 174,
    },
    {
        src: dates,
        thumbnail: dates,
        thumbnailWidth: 320,
        thumbnailHeight: 174,
       
},{
    src:blood,
    thumbnail: blood,
    thumbnailWidth: 320,
    thumbnailHeight: 174,
  
}]

    const gallery=[]
    let images=[]
    const [image,setImage]= useState([]);
    async function fetchData() {
      const fetcher = await window.fetch(`${address()}gallary`);
      const response = await fetcher.json();
      setImage(response);
      
    }
    useEffect(() => {
      fetchData();
    }, []);


   
    for(let i = 0; i < image.length; i++) {
        var obj = {}; // <---- Move declaration inside loop
    
        obj['src'] = `${address()}gallary/${image[i].imageName}/image`;
        obj['thumbnail'] = `${address()}gallary/${image[i].imageName}/image`;
        obj['thumbnailWidth']= 320;
        obj['thumbnailHeight']= 174;
        gallery.push(obj);
    }
     function smallStyle(){

        return({
            display:"grid",
            background:"white",
            gridGap:"10px 20px",
            border:'1px  ',
            padding:"10px 20px 0 0"   
        });
     }


    return (
        <React.Fragment>

             

            {Object.keys(image).length != 0
            ? 
            
                <div className="container" style={{marginTop:"50px",marginBottom:"90px"}} >
              <Gallery 
             images={gallery}
             thumbnailStyle={smallStyle}
             imageCountSeparator={t("of")}

              />     
                </div>
              
            :  <div className="container" style={{marginTop:"10px",marginBottom:"90px"}}>
                 <Gallery 

                images={staticImages}
                thumbnailStyle={smallStyle}
                imageCountSeparator={t("of")}

                />
                </div>
}

            </React.Fragment>

    );
}
