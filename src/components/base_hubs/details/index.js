import React, { useRef, useState, Component, useEffect } from "react";
import Header from "../../sub_page_header";
//import Parser from 'react-string-color-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "@ckeditor/ckeditor5-build-classic/build/translations/ar";


import { useTranslation } from "react-i18next";
import base_hubs from "..";
import parse from "html-react-parser";
import i18n from "i18next";
import address from "../../utils/address";
import { Route, useHistory } from 'react-router'
import { browserHistory } from 'react-router';
import i18next from "i18next";

/**
 * This component to display more inforamtion just in water sector . it display it in table format 
 * @component
 * @see http://sadagaat.com/water/details
 */

function Details() {

   const { t } = useTranslation();
   const [data, setData] = useState("");
   const [loading, setLoading] = useState(false);
   const [dir ,setDir]=useState("");



   async function fetchTable() {
    const fetcher = await window.fetch(`${address()}hubs/1102`,
    {headers: {'accept-language': `${i18n.language}`}
   });


   
   const response = await fetcher.json();
   setData(response.formatedDescription);
//   setDir(i18n.language === "ar" ? "rtl": "ltr")
  //  console.log(dir)   
 }   
  
 useEffect(() => {
   window.localStorage.setItem('sadagaat-language', i18next.language)
   fetchTable()
  },[]);

  useEffect(() => {
   if(window.localStorage.getItem('sadagaat-language') !==  i18next.language) {
    setLoading(true) 
    window.location.reload()
   }
  },[i18n.language]);

  return (
    loading? null: 
    <React.Fragment>
      <section>
      
      <div className="container">
            <div className="row multi-row-clearfix">
              <div>
                    {data !== undefined && data !== null ?
        <div >
          <CKEditor 
            editor={ ClassicEditor }
            disabled={true}
            data= {data}
            // onChange={ ( event, editor ) => {
            //   const data = editor.getData();
            //   console.log("the event happen ************&&&&&&&&&",event)
            //   setTimeout(() => {
            //     window.location.reload(false);
          
            //   },9000 );


          //}
             
          //}
            
            config={{toolbar: [],
           language: {
            ui: i18n.language,
            content: 'en'
        },
           highlight:{
             options:[
               {
                 model:"YellowMarker",
                 class:"marker-yellow",
                 title:"Yellow Marker",
                 color:"var(--ck-highlight-marker-yellow)",
                 type: "marker",
               },
               {
                model:"BlueMarker",
                class:"marker-blue",
                title:"Blue Marker",
                color:"var(--ck-highlight-marker-blue)",
                type: "marker",
              },
              {
                model:"greenMarker",
                class:"marker-green",
                title:"Green Marker",
                color:"var(--ck-highlight-marker-green)",
                type: "marker",
              },
              {
                model:"pinkMarker",
                class:"marker-pink",
                title:"Pink Marker",
                color:"var(--ck-highlight-marker-pink)",
                type: "marker",
              },
              {
                model:"orangeMarker",
                class:"marker-orange",
                title:"Orange marker",
                color:"var(--ck-highlight-marker-orange)",
                type: "marker",
              },
              {
                model:"redPen",
                class:"pen-red",
                title:"Red Pen",
                color:"var(--ck-highlight-pen-red)",
                type: "pen",
              },
              {
                model:"greenPen",
                class:"pen-green",
                title:"Green Pen",
                color:"var(--ck-highlight-pen-green)",
                type: "pen",
              },
             ]
           }
          
          }
          }
       
            />     
        </div>   :
                    <div>  
                         <h4>{t("No More Information")}</h4>
                         </div>

                    }
        </div>
        </div>
        </div>

        

      </section>
    </React.Fragment>
  );
}
export default Details;
