import React, { useState, useEffect } from "react";
import address from "../utils/address";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Precision, getNumber } from "../events/getMonthName";
import parse from "html-react-parser";
import ReactPaginate from "react-paginate";
import Preload from "../preload";
import Filters from "./filter";

/**
 * this componnet display projects  and filter projects acourding to recived props
 * @param {string} props type of project 'completed , ongoing' , planed
 * @component
 * @see http://sadagaat-uk.org/projects
 */
const FilteredProjects = (props) => {
  let [data, setData] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [projectsType, setProjectsType] = useState("");
  const [postsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  let [Dates, GetDates] = useState({
    startDate: "1/1/2001",
    endDate: "1/1/2025",
  });
  let [filterOn, setFilterOn] = useState(false);
  let [orderOn, setOrderOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [viewFilter, toggleViewFilter] = useState(true);
  const projectProgressAlign = i18n.dir() === "rtl" ? "right" : "left";
  let searchQuery = "";
  if (props.search === true) {
    searchQuery = localStorage.getItem("searchQuery");
  }

  useEffect(() => {
    fetchData();
  }, [props]);

  function GetSelectedDates(x) {
    Dates.startDate = x.startDate;
    Dates.endDate = x.endDate;
    console.log(Dates);
    setFilterOn(true);
  }

  function getOrder(x) {
    setOrderOn(x);
  }

  function getType(x) {
    console.log(x);
    projectsType = x;
    setProjectsType(x);
  }

  function clearFilter() {
    setFilterOn(false);
    fetchData();
  }
  function filterData(x) {
    if (x === true) {
      setFilterOn(true);
      fetchDataFiltered();
    }
  }

  /**
   * Get all projects from API
   */
  async function fetchData() {
    let prefix = address();
    let FilterUrl =
      prefix +
      "projects/search-order?" +
      "name=" +
      searchQuery +
      "&inASEOrder=" +
      false +
      "&page=" +
      currentPage +
      "&size=" +
      postsPerPage;
    console.log(FilterUrl);
    const fetcher = await window.fetch(
      FilterUrl,
      {
        headers: { "accept-language": `${i18n.language}` },
      },
      {
        items: (page) => page.results,
        params: true,
      }
    );
    const response = await fetcher.json();
    console.log(response);
    setData(response.data);
    // data = response.data;
    console.log(data);
    setTotalPages(response.totalPages);
    console.log(totalPages);
    setLoading(false);
    console.log(Dates.endDate);
  }
  async function fetchDataFiltered() {
    let sorting;
    if (document.getElementsByClassName("flip-v") === undefined) {
      sorting = false;
    } else sorting = true;
    // filterProjectsType(props.type);
    let prefix = address();
    let FilterUrl =
      prefix +
      "projects/search-order?" +
      "name=" +
      searchQuery +
      "&startDate=" +
      Dates.startDate +
      "&endDate=" +
      Dates.endDate +
      "&status=" +
      projectsType +
      "&inASEOrder=" +
      false +
      "&page=" +
      currentPage +
      "&size=" +
      postsPerPage;
    console.log(FilterUrl);
    const fetcher = await window.fetch(
      FilterUrl,
      {
        headers: { "accept-language": `${i18n.language}` },
      },
      {
        items: (page) => page.results,
        params: true,
      }
    );
    const response = await fetcher.json();
    console.log(response);
    setData(response.data);
    console.log(data);
    setTotalPages(response.totalPages);
    setLoading(false);
    console.log(Dates.endDate);
  }
  /**
   * This function check the filter of Projects matching with type
   * @param {string} type  type of project 'completed' ,'ongoing' , 'planned'
   * @param {Array} allProjects  array of all projects
   */

  function filterProjectsType(type) {
    if (type === "ongoing") projectsType = 2;
    if (type === "completed") projectsType = 1;
    if (type === "planned") projectsType = 3;
  }

  // Change page
  function paginate(pageNumber) {
    console.log(pageNumber);
    currentPage = pageNumber.selected;
    console.log(currentPage);
    if (filterOn === false) fetchData();
    else fetchDataFiltered();
  }

  function pageProjects() {
    let x = document.getElementsByClassName("flip-v");
    if (x === undefined && filterOn === false) {
      return data;
    } else return data.reverse();
  }

  return (
    <section>
      <div className="container">
        {(data !== undefined && data.length > 0) || filterOn === true ? (
          <div className="row">
            <div className="dateSelect mb-50 pr-0">
              <Filters
                clicked={GetSelectedDates}
                cleared={clearFilter}
                ordered={getOrder}
                type={getType}
                filter={filterData}
              ></Filters>
            </div>
          </div>
        ) : null}
        <div className="row">
          {loading && <Preload loading={loading} />}
          {data !== undefined && data.length > 0 ? (
            pageProjects().map((project, index) => (
              <div className="col-md-4 col-sm-6" key={index}>
                <Link to={"/single-projects/" + project.id}>
                  <div
                    className="causes bg-white mb-30 border-bottom"
                    style={{ height: "600px" }}
                  >
                    <div className="thumb">
                      <img
                        src={`${address()}projects/${project.id}/image`}
                        className="img-fullwidth"
                        width="100%"
                        height="260"
                      />
                    </div>

                    <div className="causes-details clearfix p-15 pt-15 pb-15">
                      <ul className="list-inline font-16 font-weight-600 clearfix mb-5">
                        <li className="pull-left font-weight-400 text-black-333 pr-0">
                          {t("Raised")}
                          <span className="text-theme-colored font-weight-700">
                            {/* pass raise to getNumber function to   */}
                            {getNumber(project.raised)}
                          </span>
                        </li>
                        <li className="pull-right font-weight-400 text-black-333 pr-0">
                          {t("Goal")}
                          <span className="text-theme-colored font-weight-700">
                            {getNumber(project.goal)}
                          </span>
                        </li>
                      </ul>

                      <div className="progress-item mt-0">
                        {/* <span>{t('Donation Progress')}</span> */}
                        <div className="progress">
                          <div
                            data-percent={Precision(project.donationProgress)}
                            className="progress-bar"
                          >
                            <span className="percent">
                              {Precision(project.donationProgress)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="progress-item mt-0">
                        <p
                          className=""
                          style={{ textAlign: projectProgressAlign }}
                        >
                          {t("Project Progress")}
                        </p>
                        <div className="progress">
                          <div
                            data-percent={Precision(project.projectProgress)}
                            className="progress-bar"
                          >
                            <span className="percent">
                              {Precision(project.projectProgress)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-uppercase">{project.name}</h4>

                      <p className="mt-20 project-discription">
                        {parse(project.description)}
                      </p>

                      {
                        project.raised != 0 && project.goal != 0 ?
                        <Link
                        to={"/projects/" + project.id}
                        className="btn btn-default btn-theme-colored btn-xs font-16 mt-10"
                        style={{
                          display: `${
                            project.donationProgress >= 100 ? "none" : ""
                          }`,
                        }}
                      >
                        {t("Donate")}
                      </Link>:
                      <Link
                        to={"/projects/" + project.id}
                        
                      >
                        
                      </Link>}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <h3 className="text-center">
              {t("No Available Results for Your Search")}
            </h3>
          )}
          {totalPages > 1 && (
            <div style={{ position: "absolute", bottom: "0%" }}>
              <ReactPaginate
                previousLabel={t("prev")}
                nextLabel={t("next")}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={0}
                pageRangeDisplayed={4}
                onPageChange={paginate}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FilteredProjects;
