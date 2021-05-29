import React, { useRef, useState, useEffect } from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Link } from "react-router-dom";
import address from "./../utils/address";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { getMonthName } from "./getMonthName";

/**
 * This function showing last 3 events and lase 3 news n the home Page
 * @component
 * @see http://sadagaat-uk.org/
 */
function Event() {
  const [news, setNews] = useState([]);
  const [events, setEvent] = useState([]);
  const style = i18n.dir() === "rtl" ? "pl-0" : "pr-0";
  const styleMr = i18n.dir() === "rtl" ? " ml-5" : " mr-5";

  const { t } = useTranslation();
  /**  useEffect call fetchNews() , fetchNews() functions to get all news and events  when component mounted or  when recived props
   */

  useEffect(() => {
    fetcEvents();
    fetchNews();
  }, [i18n.language]);
  /**
   * This function get News from APIs and set the last three News
   * @return {Array} array of News returned by APIs
   */
  async function fetchNews() {
    const fetcher = await window.fetch(`${address()}news`, {
      headers: { "accept-language": `${i18n.language}` },
    });
    const response = await fetcher.json();
    console.log(response);
    setNews(response.slice(0, 3));
  }
  /**
   * This function get Events from APIs and set the last three News
   * @return {Array} array of events returned by APIs
   */

  async function fetcEvents() {
    const fetcher = await window.fetch(`${address()}events`, {
      headers: { "accept-language": `${i18n.language}` },
    });
    const response = await fetcher.json();
    console.log(response);
    setEvent(response.slice(0, 3));
  }

  return (
    <React.Fragment>
      <section>
        <div className="container">
          <div className="section-content">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-4">
                <h3 className="text-uppercase title line-bottom mt-0 mb-30">
                  <span className="text-theme-colored">{t("Events1")}</span>
                </h3>

                {events.map((event) => (
                  <div
                    className="event media sm-maxwidth400 border-bottom mt-5 mb-0 pt-10 pb-15"
                    key={event.id}
                  >
                    <div className="row">
                      <div className={`col-xs-2 col-md-3 ${style}`}>
                        <div className="event-date text-center bg-theme-colored border-1px p-0 pt-10 pb-10 sm-custom-style">
                          <span className="font-28 text-white font-weight-700">
                              {event.startDate.slice(8, 10)}
                            </span>
                            <span className="font-18 text-white  font-weight-700 text-center text-uppercase">
                              {/* {event.startDate.slice(0,4)} */}
                              {getMonthName(event.startDate)}
                            </span>
                        </div>
                      </div>
                      <Link to={"/event/" + event.id}>
                        <div className="col-xs-9 pr-10 pl-10">
                          <div className="event-content mt-10 p-5 pb-0 pt-0">
                            <h5 className="media-heading font-16 font-weight-600">
                              <p>{event.name}</p>
                            </h5>
                            <span className="list-inline font-weight-600 text-gray-dimgray">
                              
                                <i
                                  className={`fa fa-calendar ${styleMr} text-theme-colored`}
                                />
                                {`${event.startDate}`}
                              </span>
                              <span>
                                {"  "}
                                <i
                                  className={`fa fa-map-marker text-theme-colored ${styleMr}`}
                                />
                                {event.locationName}
                              </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-xs-12 col-sm-6 col-md-8">
                <h2 class="line-bottom border-bottom mt-0">
                  {" "}
                  {t("Latest")}
                  <span className="text-theme-colored"> {t("News")} </span>
                </h2>

                <div className="event media sm-maxwidth400 border-bottom mt-5 mb-0 pt-10 pb-15">
                  <div className="row">
                    <Carousel
                      autoPlay={5000}
                      stopAutoPlayOnHover
                      dots
                      rtl={true}
                    >
                      {news.map((news_) => (
                        <div className="causes" key={news_.id}>
                          <div className="row-fluid">
                            <div className="col-md-5">
                              <img
                                src={`${address()}news/${news_.id}/image`}
                                alt="News"
                                height="250px"
                              />
                            </div>
                            <div className="col-md-7">
                              <div class="event-content pull-left flip">
                                <h2 className="line-bottom mt-0">
                                  {news_.name}
                                </h2>
                                <h4 className="mt-0 mb-0 text-theme-colored"></h4>
                                <p className="project-discription">
                                  {news_.description}
                                </p>
                                <Link
                                  className="btn btn-theme-colored btn-sm"
                                  to={"/news/" + news_.id}
                                >
                                  {t("Read More")}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export default Event;
