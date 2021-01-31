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
import DatePicker from "react-datepicker";

/**
 * this componnet display projects  and filter projects acourding to recived props
 * @param {string} props type of project 'completed , ongoing' , planed
 * @component
 * @see http://sadagaat-uk.org/projects
 */
const Projects = (props) => {
  const [data, setData] = useState([]);
  let [projects, setProjects] = useState(data);
  let [currentPage, setCurrentPage] = useState(0);
  let [projectsType, setProjectsType] = useState(0);
  const [postsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  let [Dates, SetSelectedDates] = useState({
    startDate: "01/01/2001",
    endDate: "01/01/2025",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [alertOn, setAlert] = useState(false);
  let [sortOn, setSortOn] = useState(false);
  let [filterOn, setFilterOn] = useState(false);
  const [loading, setLoading] = useState(true);
  let [sorting, toggleSorting] = useState(false);
  let [sortBtnFlip, toggleSortBtns] = useState("");
  const { t } = useTranslation();
  //@example projectType = 'onging'
  const projectType = props.type;
  const projectProgressAlign = i18n.dir() === "rtl" ? "right" : "left";
  const filterAlign = i18n.dir() === "rtl" ? "float-right" : "float-left ";
  const clearFilterClasses =
    i18n.dir() === "rtl"
      ? "btn datePick-btn btn-theme"
      : "btn datePick-btn btn-theme";
  const sorBtnClasses = i18n.dir() === "rtl" ? " ml-0" : " mr-0";
  const iconDir = i18n.dir() === "rtl" ? " mr-10" : " ml-10";
  function range(start, end) {
    var ans = [];
    for (let i = start; i >= end; i--) {
      ans.push(i);
    }
    return ans;
  }

  /**
   * Get all projects from API
   */
  async function fetchData() {
    filterProjectsType(props.type);
    let prefix = address();
    let FilterUrl =
      prefix +
      "projects/filtter?type=" +
      projectsType +
      "&page=" +
      currentPage +
      "&size=" +
      postsPerPage;
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
    setTotalPages(response.totalPages);
    setLoading(false);
    console.log(Dates.endDate);
  }

  function SetDates() {
    const today = new Date();
    let dates = "";
    if (
      startDate !== null &&
      startDate !== null &&
      startDate <= today &&
      endDate <= today &&
      startDate <= endDate
    ) {
      Dates = {
        startDate:
          "" +
          (startDate.getMonth() + 1) +
          "/" +
          startDate.getDate() +
          "/" +
          startDate.getFullYear(),
        endDate:
          "" +
          (endDate.getMonth() + 1) +
          "/" +
          endDate.getDate() +
          "/" +
          endDate.getFullYear(),
      };
      SetSelectedDates(dates);
      fetchDataFiltered();
    }
    ///
    else {
      showAlert();
    }

    console.log(dates);
  }

  function showAlert() {
    setAlert(true);
    setTimeout(function () {
      setAlert(false);
    }, 3000);
  }

  async function fetchDataFiltered() {
    let isSorting;
    if (document.getElementsByClassName("flip-v") === undefined) {
      isSorting = false;
    } else isSorting = true;
    filterProjectsType(props.type);
    let prefix = address();
    let FilterUrl =
      prefix +
      "projects/search-order?" +
      "startDate=" +
      Dates.startDate +
      "&endDate=" +
      Dates.endDate +
      "&status=" +
      projectType +
      "&inASEOrder=" +
      isSorting +
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
    setTotalPages(response.totalPages);
    setLoading(false);
    console.log(Dates.endDate);
  }
  /**
   * This function check the filter of Projects matching with type
   * @param {string} type  type of project 'completed' ,'ongoing' , 'planned'
   * @param {Array} allProjects  array of all projects
   */
  function datePickerCustom() {
    const today = new Date();
    const years = range(today.getFullYear(), 2000);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dateInputClasses =
      i18n.dir() === "rtl" ? "dateInput ml-5" : "dateInput";
    return (
      <React.Fragment>
        <div className="col-md-2 col-sm-3 col-xs-6">
          <DatePicker
            selected={startDate}
            className={dateInputClasses}
            placeholderText={t("Select Start Date")}
            onChange={(date) => setStartDate(date)}
            selectsStart
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <select
                  value={date.getYear()}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={months[date.getMonth()]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
          />
        </div>
        <div className="col-md-2 col-sm-3 col-xs-6">
          <DatePicker
            className={dateInputClasses}
            placeholderText={t("Select End Date")}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <select
                  value={date.getYear()}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[date.getMonth()]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
          />
        </div>
      </React.Fragment>
    );
  }

  function clearFilter() {
    setStartDate("");
    setEndDate("");
    filterOn = false;
    fetchData();
  }

  function filterProjectsType(type) {
    if (type === "ongoing") projectsType = 2;
    if (type === "completed") projectsType = 1;
    if (type === "planned") projectsType = 3;
  }
  useEffect(() => {
    fetchData();
  }, [props]);

  // Change page
  function paginate(pageNumber) {
    console.log(pageNumber);
    currentPage = pageNumber.selected;
    console.log(currentPage);
    if (filterOn === false) fetchData();
    else fetchDataFiltered();
  }

  function filterBtnClasses() {
    let filterBtn =
      i18n.dir() === "rtl"
        ? "btn datePick-btn btn-theme-colored ml-5 "
        : "btn datePick-btn btn-theme-colored mr-5 ";

    if (startDate === null || endDate === null) {
      filterBtn = filterBtn + "disabled";
      filterOn = true;
    }
    return filterBtn;
  }
  function alertClasses() {
    let classes = "row fade-in ";
    if (alertOn === false) classes = "row fade-out d-none";
    return classes;
  }

  function hideAlert() {
    setAlert(false);
  }

  let projectsPage = data;

  function toggleSortBtn() {
    if (sortBtnFlip === "") {
      console.log(sorting);
      toggleSortBtns(" flip-v");
      data.reverse();
    } else {
      console.log(sorting);
      toggleSortBtns("");
      data.reverse();
    }
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
        <div className="row">
          <div className="dateSelect mb-50 pr-0">
            <div className="container">
              <div className={alertClasses()}>
                <div className="col-md-12">
                  <div className="alert alert-danger alert-dismissible }">
                    <button type="button" className="close" onClick={hideAlert}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <p>{t("Please Choose Proper Dates")}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                {datePickerCustom()}
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className={"xs-mt-10 " + filterAlign}>
                    <button className={filterBtnClasses()} onClick={SetDates}>
                      {t("Filter")}
                    </button>
                    <button
                      className={clearFilterClasses}
                      onClick={clearFilter}
                    >
                      {t("Clear Filter")}
                    </button>
                  </div>
                </div>
                <div className="col-md-2 col-sm-12 col-xs-12 sm-mt-10 ">
                  <button
                    className={"sort-btn d-inline " + sorBtnClasses}
                    onClick={toggleSortBtn}
                  >
                    {t("Sort By Date") + " "}
                    <i
                      className={
                        "fa fa-sort-amount-desc flip-none " +
                        sortBtnFlip +
                        iconDir
                      }
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {loading && <Preload loading={loading} />}
          {data !== undefined && data.length > 0 ? (
            data.map((project, index) => (
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
                      </Link>
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

export default Projects;
