import React, { useRef, useState, Component, useEffect } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import address from "../utils/address";


function TopBar() {
  const { t } = useTranslation();
  const [contact ,setContact]= useState ({})
  const searchDir = i18n.dir() === "rtl" ? "pl-0" : "pr-0";
  const inputDir = i18n.dir() === "rtl" ? "float-right" : "float-left";
  const btnDir =
    i18n.dir() === "rtl" ? "float-left btnRight " : "float-right btnLeft ";

    async function fetchContact() {
      const fetcher = await window.fetch(`${address()}contact-info/SD`,
      {headers: {'accept-language': `${i18n.language}`}
     });
     const response = await fetcher.json();
     setContact(response);
    }
     useEffect(() => {
      fetchContact();
    
    },[i18n.language])


  function setSearchQuery() {
    localStorage.setItem(
      "searchQuery",
      document.getElementById("searchQuery").value
    );
    console.log(localStorage.getItem("searchQuery"));
  }

  function redirectSearchPage() {
    setSearchQuery();
    window.location.pathname = "/Search-Results";
  }
  function enterPressListener() {
    let searchInput = document.getElementById("searchQuery");
    console.log(searchInput);
    searchInput.addEventListener("keypress", function (e) {
      console.log(e);
      if (searchInput.value !== "" && e.code === "Enter") {
        e.preventDefault();
        redirectSearchPage();
      }
    });
  }
  return (
    <div className="header-top bg-theme-colored sm-text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <div className="widget no-border m-0">
              <ul className="styled-icons icon-dark icon-theme-colored icon-sm sm-text-center">
                {
                  (contact.length != 0 && contact.facebook != null) ?
                  <li>
                  <a
                    href={contact.facebook}
                    target="blank"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                  :
                  <li>
                  <a
                    href="https://web.facebook.com/Sadagaat/?_rdc=1&_rdr"
                    target="blank"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                }
                
                {(contact.length != 0 && contact.twitter != null) ?
                <li>
                  <a href={contact.twitter}target="blank">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>:<li>
                  <a href="http://twitter.com/sadagaat " target="blank">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>}
                {(contact.length != 0 && contact.linkedin != null)?
                <li>
                <a
                  href={contact.linkedin}
                  target="blank"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
                :
                <li>
                  <a
                    href="http://www.linkedin.com/pub/sadagaat-sudan/54/431/5b7"
                    target="blank"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                }
                {
                 (contact.length !=0 && contact.youtube !=null )  ?
                  <li>
                  <a
                    href={contact.youtube}
                    target="blank"
                  >
                    <i className="fa fa-youtube-play"></i>
                  </a>
                </li>:<li>
                  <a
                    href="https://www.youtube.com/channel/UCRSvaVpv6Hw6eUnI6OsutSQ"
                    target="blank"
                  >
                    <i className="fa fa-youtube-play"></i>
                  </a>
                </li>

                }
                {
                 (contact.length != 0 && contact.instagram != null)  ?
                  <li>
                  <a
                    href={contact.instagram}
                    target="blank"
                  >
                    <i className=" fa fa-instagram"></i>
                  </a>
                </li>:
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
          <div className="col-md-5 col-sm-5">
            <div className="widget no-border m-0 text-center">
              <ul className="list-inline flip sm-pull-none mt-5">
                <li className="m-0 pl-10 pr-10">
                  <i className="fa fa-phone text-white">
                    <span className="text-white" style={{ padding: "7px" }}>
                      {
                        (contact.length != 0 && contact.length != null)?
                        contact.phone
                        :
                        +249910010077
                      }
                    </span>
                  </i>
                </li>
                <li className="m-0 pl-10 pr-10">
                  <i className="fa fa-envelope-o text-white">
                      {
                       (contact.length != 0 && contact.length != null)  ?
                        <span className="text-white" style={{ padding: "7px" }}>

                        {contact.email}
                        </span>
                        :
                        <span className="text-white" style={{ padding: "7px" }}>
                        info@sadagaat.com
                        </span>
                      }
                   
                  </i>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-3 sm-mt-10">
            <div className={" no-border " + searchDir}>
              <form className="search-bar" onSubmit={redirectSearchPage}>
                <input
                  name="search"
                  id="searchQuery"
                  placeholder={t("Search in Projects")}
                  className={"form-control d-inline " + inputDir}
                  type="text"
                  required="required"
                  onFocus={enterPressListener}
                />

                <Link
                  to="/Search-Results"
                  className={"btn text-theme d-inline " + btnDir}
                  onClick={setSearchQuery}
                >
                  <i className="fa fa-search"></i>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
