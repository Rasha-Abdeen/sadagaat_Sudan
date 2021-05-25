import React, { useRef, useState, Component, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "i18next";
import address from "../utils/address";
import parse from "html-react-parser";



function Footer() {
  const { t, i18n } = useTranslation();
  const [footer,setFooter]=useState([]);
  const [contact,setContact]=useState({})
  const [location,setLocation]=useState({})



  /**
   * this component display footer section appear in each page
   * @component
   */
  async function fetchTable() {
    const fetcher = await window.fetch(`${address()}copy-right`,
    {headers: {'accept-language': `${i18n.language}`}
   });
   const response = await fetcher.json();
   setFooter(response);
   console.log("the fetched Footer .*****************.*****.**************",response.text)
 
 
 }
 async function fetchContact() {
  const fetcher = await window.fetch(`${address()}contact-info/SD`,
  {headers: {'accept-language': `${i18n.language}`}
 });
 const response = await fetcher.json();
 setContact(response);
 setLocation(contact.location)
}
 useEffect(() => {
  fetchTable();
  fetchContact();

},[i18n.language])

  return (
    <React.Fragment>
      <div>
        <footer
          id="footer"
          className="footer"
          data-bg-img="images/Sadgaat-Pattern.png"
          data-bg-color="#25272e"
        >
          <div className="container pt-70 pb-40">
            <div className="row border-bottom-black">
              <div className="col-sm-6 col-md-3">
                <div className="widget dark">
                  <h2 className="text-white pb-0">{t("SADAGAAT")}</h2>
                  <h4 className="text-white text-decoration-inline">
                    {t("hashtag")}
                  </h4>

                  <ul className="styled-icons icon-dark icon-theme-colored icon-circled icon-sm">
                      {
                        
                        (contact.length != 0 && contact.facebook != null )? 
                        <li>
                        <a 
                        href={contact.facebook}
                        target="blank"
                        >
                          
                        <i className="fa fa-facebook" />
                        </a>
                        </li>
                        :
                        <li>
                        <a
                        href="http://www.facebook.com/groups/sadagaat"
                        target="blank"
                      >
                        <i className="fa fa-facebook" />
                      </a>
                      </li>
                      }
                     {
                       (contact.length != 0 && contact.twitter != null )?
                       <li>
                       <a href={contact.twitter} target="blank">
                         <i className="fa fa-twitter" />
                       </a>
                     </li>
                       :
                       <li>
                       <a href="http://twitter.com/sadagaat " target="blank">
                         <i className="fa fa-twitter" />
                       </a>
                     </li>
                     }
                   
                   {
                     (contact.length != 0 && contact.linkedin != null ) ? 
                     <li>
                      <a
                        href={contact.linkedin}
                        target="blank"
                      >
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                     :
                     <li>
                      <a
                        href="http://www.linkedin.com/pub/sadagaat-sudan/54/431/5b7"
                        target="blank"
                      >
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                   }
                    


                    {
                      (contact.length != 0 && contact.youtube != null) ?
                      <li>
                  <a
                    href={contact.youtube}
                    target="blank"
                  >
                    <i className="fa fa-youtube-play"></i>
                  </a>
                </li>
                      :
                      <li>
                  <a
                    href="https://www.youtube.com/channel/UCRSvaVpv6Hw6eUnI6OsutSQ"
                    target="blank"
                  >
                    <i className="fa fa-youtube-play"></i>
                  </a>
                </li>
                    }
                    {
                      (contact.length != 0 && contact.instagram != null) ?
                      <li>
                      <a
                        href={contact.instagram}
                        target="blank"
                      >
                        <i className=" fa fa-instagram"></i>
                      </a>
                    </li>
                      :
                      <li>
                      <a
                        href="https://www.instagram.com/sadagaat_organization/"
                        target="blank"
                      >
                        <i className=" fa fa-instagram"></i>
                      </a>
                    </li>
                    }
               
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="widget dark">
                  <h5 className="widget-title line-bottom">{t("Sectors")}</h5>
                  <ul className="list angle-double-right list-border">
                    <li>
                      <Link to="/water">{t("Water Sector")}</Link>
                    </li>
                    <li>
                      <Link to="/health">{t("Health Sector")}</Link>
                    </li>
                    <li>
                      <Link to="/feeding">{t("Feeding Sector")}</Link>
                    </li>
                    <li>
                      <Link to="/education">{t("Education Sector")}</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="widget dark">
                  <h5 className="widget-title line-bottom">
                    {t("Quick Links")}
                  </h5>
                  <ul className="list angle-double-right list-border">
                    <li>
                      <Link to="/about">{t("About Us")}</Link>
                    </li>
                    <li>
                      <Link to="/projects">{t("Projects")}</Link>
                    </li>
                    {/* <li>
                    <Link to="/donate">{t("Donate")}</Link>
                  </li> */}
                    <li>
                      <Link to="/volunteerForm">{t("Become a Volunteer")}</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="widget dark">
                  <h5 className="widget-title line-bottom">
                    {t("Contact Us")}
                  </h5>
                  <ul className="list angle-double-right list-border">
                    <li>
                      {" "}
                      <i className="fa fa-phone " /> &nbsp;
                      {
                       (contact.length != 0 && contact.length != null)  ?
                        contact.phone :
                        i18n.dir() === "rtl" ? "249910010077+" : "+249910010077"
                      }
                  
                    </li>
                    <li>
                      {" "}
                      <i className="fa fa-envelope-o " />  &nbsp;
                      {
                        (contact.length != 0 && contact.length != null)?
                        contact.email:
                        <p>  info@sadagaat.com</p>
                      }
                    </li>
                    <li>
                      {" "}
                      <i className="fa fa-globe " /> &nbsp;
                      {(contact.length != 0 && contact.length != null)? 
                        contact.website : <p>www.sadagaat.com</p>
                
                      }
                      
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
                    { footer.length != 0 ?
                    <div className="footer-bottom bg-theme-colored">
                    <div className="container pt-15 pb-10">
                      <div className="row">
                        <div className="col-md-12">
                          <p className="font-12 text-white text-center m-0">
{parse(`${footer.text}`)}
</p>
                </div>
              </div>
            </div>
          </div>
: 
<div className="footer-bottom bg-theme-colored">
<div className="container pt-15 pb-10">
  <div className="row">
    <div className="col-md-12">
      <p className="font-12 text-white text-center m-0">
{t("All Rights Reserved © Sadagaat Community of Charity - 2020") }
</p>
                </div>
              </div>
            </div>
          </div>
}
               
        </footer>
        <Link className="scrollToTop">
          <i className="fa fa-angle-up" />
        </Link>
      </div>
    </React.Fragment>
  );
}
export default Footer;
