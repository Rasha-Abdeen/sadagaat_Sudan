import React, { useState, useEffect } from "react";
import address from "./../utils/address";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

/**
 * This component showing the number of  ongoing projects , completed projects,planning projects, donors and volunteers
 * @component
 * @see http://sadagaat-uk.org/
 */

function Numbers() {
  const [notDoneProjects, setNotDoneProjects] = useState([]);
  const [dooners, setDooners] = useState([]);
  const [volunteer, setVolunteer] = useState([]);
  const [doneProjects, setDoneProjects] = useState([]);
  const [planedProjects, setPlanedProjects] = useState([]);
  const { t } = useTranslation();

  /**
   * This function get   all ongoing projects returned from APIs
   * @return {Array} array of ongoing Projects
   */
  async function fetchNotDoneProjects() {
    const fetcher = await window.fetch(`${address()}projects/notFinished`);
    const response = await fetcher.json();
    setNotDoneProjects(response);
  }
  /**
   * This function get all donors returned from APIs
   * @return {Array} array of donors
   */
  async function fetchDooner() {
    const fetcher = await window.fetch(`${address()}donors`);
    const response = await fetcher.json();
    setDooners(response);
  }

  /**
   * This function get volunteers returned from APIs
   * @return {Array} array of volunteers
   */
  async function fetchVolunteers() {
    const fetcher = await window.fetch(`${address()}totalMembers`);
    const response = await fetcher.json();
    setVolunteer(response);
  }

  /**
   * This function get completed Projects returned from APIs
   * @return {Array} array of completed Projects
   */
  async function fetchDoneProjects() {
    const fetcher = await window.fetch(`${address()}projects/finished`);
    const response = await fetcher.json();
    setDoneProjects(response);
  }
  /**
   * This function get Planned Projects returned from APIs
   * @return {Array} array of Planned Projects
   */
  async function fetchPlanedProjects() {
    const fetcher = await window.fetch(`${address()}projects/plan`);
    const response = await fetcher.json();
    setPlanedProjects(response);
  }

  useEffect(() => {
    fetchNotDoneProjects();
    fetchDooner();
    fetchVolunteers();
    fetchDoneProjects();
    fetchPlanedProjects();
  }, [i18n.language]);

  return (
    <React.Fragment>
      <section
        className=" bg-img divider parallax layer-overlay overlay-dark-9"
        data-bg-img={require("../images/x.jpg")}
        data-parallax-ratio="0.7"
      >
        <div className="container pt-80 pb-80">
          <div className="row">
            <Link to="/complete-projects">
              <div className="fig-col col-xs-12 mb-xs-50">
                <div className="funfact text-center">
                  <i className="pe-7s-rocket mt-5 text-white" />
                  <h2 className="text-white font-42 font-weight-500 mt-0 mb-0">
                    <CountUp end={doneProjects} duration={5} />
                  </h2>
                  <h5 className="text-white text-uppercase font-weight-600">
                    {t("Completed Projects")}
                  </h5>
                </div>
              </div>
            </Link>

            <Link to="/projects">
              <div className="fig-col col-xs-12 mb-xs-50">
                <div className="funfact text-center">
                  <i className="pe-7s-rocket mt-5 text-white" />
                  <h2 className="text-white font-42 font-weight-500 mt-0 mb-0">
                    <CountUp end={notDoneProjects} duration={5} />
                  </h2>
                  <h5 className="text-white text-uppercase font-weight-600">
                    {t("Ongoing Projects")}
                  </h5>
                </div>
              </div>
            </Link>

            <Link to="/planned-projects">
              <div className="fig-col col-xs-12 mb-xs-50">
                <div className="funfact text-center">
                  <i className="pe-7s-rocket mt-5 text-white" />
                  <h2 className="text-white font-42 font-weight-500 mt-0 mb-0">
                    <CountUp end={planedProjects} duration={5} />
                  </h2>
                  <h5 className="text-white text-uppercase font-weight-600">
                    {t("Planned Projects")}
                  </h5>
                </div>
              </div>
            </Link>

            <Link to="/donate">
              <div className="fig-col col-xs-12 mb-xs-50">
                <div className="funfact text-center">
                  <i className="pe-7s-rocket mt-5 text-white" />
                  <h2 className="text-white font-42 font-weight-500 mt-0 mb-0">
                    <CountUp end={dooners} duration={5} />
                  </h2>
                  <h5 className="text-white text-uppercase font-weight-600">
                    {t("Donors")}
                  </h5>
                </div>
              </div>
            </Link>

            <Link to="/volunteerForm">
              <div className="fig-col col-xs-12 mb-xs-50">
                <div className="funfact text-center">
                  <i className="pe-7s-rocket mt-5 text-white" />
                  <h2 className="text-white font-42 font-weight-500 mt-0 mb-0">
                    <CountUp end={volunteer} duration={5} />
                  </h2>
                  <h5 className="text-white text-uppercase font-weight-600">
                    {t("Volunteer")}
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export default Numbers;
