import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

/**
 *  this component shwing  FOUR Hubs  sections in the home page
 * @component
 * @see http://sadagaat-uk.org
 */
function Hubs() {
  const { t } = useTranslation();

  return (
    <section>
      <div className="container pt-0 pb-0">
        <div className="section-content">
          <div className="row equal-height-inner home-boxes" data-margin-top="">
            <Link to="/water">
              <div className="col-md-3 col-sm-3 col-xs-6 pl-0 pr-0 sm-height-auto mt-sm-0 wow fadeInLeft animation-delay1">
                <div className="sm-height-auto bg-theme-colored-darker2">
                  <div className="text-center pt-10 pb-30">
                    <i className="flaticon-charity-responsible-use-of-water text-white font-64" />
                    <h4 className="text-uppercase mt-0 text-white">
                      {t("Water")}
                    </h4>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/health" className="">
              <div className="col-md-3 col-sm-3 col-xs-6 pl-0 pr-0 sm-height-auto mt-sm-0 wow fadeInLeft animation-delay2">
                <div className="sm-height-auto bg-theme-colored-darker3">
                  <div className="text-center pt-10 pb-30">
                    <i className="flaticon-charity-health-insurance text-white font-64" />
                    <h4 className="text-uppercase mt-0 text-white">
                      {t("Health")}
                    </h4>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/feeding">
              <div className="col-md-3 col-sm-3 col-xs-6 pl-0 pr-0 sm-height-auto mt-sm-0 wow fadeInLeft animation-delay3">
                <div className="sm-height-auto bg-theme-colored-darker4">
                  <div className="text-center pt-10 pb-30">
                    <i className="flaticon-charity-food-donation text-white font-64" />
                    <h4 className="text-uppercase mt-0 text-white">
                      {t("Feeding")}
                    </h4>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/education">
              <div className="col-md-3 col-sm-3 col-xs-6 pl-0 pr-0 sm-height-auto mt-sm-0 wow fadeInLeft animation-delay4">
                <div className="sm-height-auto bg-theme-colored">
                  <div className="text-center pt-10 pb-30">
                    <i className="flaticon-charity-supportive-hands text-white font-64" />
                    <h4 className="text-uppercase mt-0 text-white">
                      {t("Education")}
                    </h4>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hubs;
