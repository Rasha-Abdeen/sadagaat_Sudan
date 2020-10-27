import React, { useState, useEffect } from "react";
import address from "./../utils/address";
import i18n from "i18next";

import Login from "../Login/Login";
import Auth_user_menu from "../Login/Auth_User_menu";
import UnAuth_user_menu from "../Login/UnAuth_user-menu";
import { isAuthenticated } from "../../repository";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="header-top bg-theme-colored sm-text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="widget no-border m-0">
              <ul className="styled-icons icon-dark icon-theme-colored icon-sm sm-text-center">
                <li>
                  <a
                    href="https://web.facebook.com/Sadagaat/?_rdc=1&_rdr"
                    target="blank"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                {/* <li>
                  <Link to="#">
                    <i className="fa fa-twitter"></i>
                  </Link>
                </li> */}
                <li>
                  <a
                    href="http://twitter.com/sadagaat "
                    target="blank"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                {/* <li>
                  <Link to="#">
                    <i className="fa fa-instagram"></i>
                  </Link>
                </li> */}
                <li>
                  <a
                    href="http://www.linkedin.com/pub/sadagaat-sudan/54/431/5b7"
                    target="blank"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="widget no-border m-0">
              <ul className="list-inline pull-right flip sm-pull-none mt-5">
                <li className="m-0 pl-10 pr-10">
                  <i className="fa fa-phone text-white">
                  <span className="text-white" style = {{padding:'7px'}} >
                 +249910010077
                  </span>
                  </i>
                </li>
                <li className="m-0 pl-10 pr-10">
                  <i className="fa fa-envelope-o text-white">
                  <span className="text-white" style = {{padding:'7px'}}>
                     info@sadagaat.com
                  </span>
                  </i>
                </li>
              </ul>
            </div>
          </div>

          {isAuthenticated() ? <Auth_user_menu /> : <UnAuth_user_menu />}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
