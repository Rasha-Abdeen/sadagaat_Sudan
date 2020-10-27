import React from "react";
import { useTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";

/**
 *  this component shwing about Sadagaat  Section in the home page
 * @param {object} props   location of page from props
 * @component
 */
function About_(props) {
  const { t, i18n } = useTranslation();
  // const classParameter  set class name value  = pe-0 or pl-0 after Check page direction
  const classParameter = i18n.dir() === "rtl" ? "pr-0" : "pl-0";

  // const buttonClass  =  set class name value after Check page direction
  const buttonClass = i18n.dir() === "rtl" ? "mr-5" : "ml-5";
  //const show = 'none' or ''  remove button read more from home page adding style show = none  or '' after check page location
  const show = props.history.location.pathname === "/about" ? "none" : "";

  return (
    <React.Fragment>
      <section id="about" className="pt-0">
        <div className="container">
          <div className="section-content">
            <div className="row">
              <div className="col-md-6 mt-20">
                <div className="row">
                  <div
                    className={`col-md-6 col-sm-6 col-xs-12 pl-xs-15 ${classParameter}`}
                  >
                    <div className="img-hover-border">
                      <img
                        className="img-responsive"
                        src={require("../images/about 275 330.jpg")}
                        alt=""
                        style={{ width: "100%", height: "330px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 pl-0 pr-0 d-xs-none">
                    <div className="img-hover-border">
                      <img
                        className="img-responsive"
                        src={require("../images/about 325-177.jpg")}
                        alt=""
                        style={{ width: "100%", height: "156px" }}
                      />
                    </div>
                    <div className="img-hover-border mt-15 mt-sm-20">
                      <img
                        className="img-responsive"
                        src={require("../images/x.jpg")}
                        alt=""
                        style={{ width: "100%", height: "156px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="about-details">
                  <h2 className="font-28 text-uppercase mt-1">
                    {t("About")} <span>{t("Sadagaat")}</span>
                  </h2>
                  <p>
                    {t("about_message_1")} <br />
                    {t("about_message_2")}
                  </p>

                  <Link
                    to="/about"
                    className={`btn btn-flat btn-colored btn-theme-colored mt-15 ${buttonClass}`}
                    style={{ display: show }}
                  >
                    {t("Read More")}
                  </Link>

                  <Link
                    to="/donate"
                    className={`btn btn-flat btn-colored btn-default btn-theme-colored mt-15 ${buttonClass}`}
                  >
                    {t("Donate")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default withRouter(About_);
