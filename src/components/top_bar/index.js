import React from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function TopBar() {
  const { t } = useTranslation();
  const searchDir = i18n.dir() === "rtl" ? "pl-0" : "pr-0";
  const inputDir = i18n.dir() === "rtl" ? "float-right" : "float-left";
  const btnDir =
    i18n.dir() === "rtl" ? "float-left btnRight " : "float-right btnLeft ";
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
          <div className="col-md-3 col-sm-3">
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
                <li>
                  <a href="http://twitter.com/sadagaat " target="blank">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
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
          <div className="col-md-6 col-sm-6">
            <div className="widget no-border m-0 text-center">
              <ul className="list-inline flip sm-pull-none mt-5">
                <li className="m-0 pl-10 pr-10">
                  <i className="fa fa-phone text-white">
                    <span className="text-white" style={{ padding: "7px" }}>
                      +249910010077
                    </span>
                  </i>
                </li>
                <li className="m-0 pl-10 pr-10">
                  <i className="fa fa-envelope-o text-white">
                    <span className="text-white" style={{ padding: "7px" }}>
                      info@sadagaat.com
                    </span>
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
