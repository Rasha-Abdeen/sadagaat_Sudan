import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Filters = (props) => {
  const { t } = useTranslation();
  const [alertOn, setAlert] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  let [btnDisabled, setBtnDisabled] = useState("disabled");
  let [sorting, toggleSorting] = useState(false);
  let [sortBtnFlip, toggleSortBtns] = useState("");
  let [filterBtnOn, setFilterBtnOn] = useState(false);
  let [onLoad, setOnLoad] = useState(false);
  const filterAlign = i18n.dir() === "rtl" ? " float-right" : " float-left ";
  const clearFilterClasses =
    i18n.dir() === "rtl"
      ? "btn datePick-btn btn-theme"
      : "btn datePick-btn btn-theme";
  const sorBtnClasses =
    i18n.dir() === "rtl" ? " mr-0 btnFloatLeft" : " ml-0 btnFloatRight";
  const iconDir = i18n.dir() === "rtl" ? " mr-10" : " ml-10";
  function range(start, end) {
    var ans = [];
    for (let i = start; i >= end; i--) {
      ans.push(i);
    }
    return ans;
  }
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
        <div className="col-md-2 col-sm-6 col-xs-6">
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
        <div className="col-md-2 col-sm-6 col-xs-6">
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
            // selected={startDate}
            // onChange={(date) => setEndDate(date)}
          />
        </div>
      </React.Fragment>
    );
  }

  function filterData() {
    let filter = props.filter;
    if (startDate === null && endDate === null && filterBtnOn === false) {
      setAlertMsg("Please Choose Filter");
      showAlert();
    } else if (
      startDate === null &&
      startDate === null &&
      filterBtnOn === true
    ) {
      sendSelectedType();
      filter(true);
    } else {
      sendSelectedDates();
    }
  }

  function clearFilterBtn() {
    let clearFilter = props.cleared;
    setStartDate(null);
    setEndDate(null);
    setFilterBtnOn(false);
    document.getElementById("projectType").value = "All Projects";
    clearFilter();
  }

  let projectTypes = ["All Projects", "Ongoing Projects", "Completed Projects"];

  function showAlert() {
    setAlert(true);
    setTimeout(function () {
      setAlert(false);
    }, 3000);
  }

  function sendSelectedOrder() {
    let getOrder = props.ordered;
    if (sorting == true) {
      getOrder(true);
    } else getOrder(false);
  }

  function sendSelectedType() {
    let getType = props.type;
    let type = document.getElementById("projectType").value;
    if (type === projectTypes[1]) {
      getType("ongoing");
    } else if (type === projectTypes[2]) {
      getType("completed");
    } else getType("");
  }

  function sendSelectedDates() {
    let GetSelectedDates = props.clicked;
    const today = new Date();
    let Dates = "";
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
      GetSelectedDates(Dates);
    } else {
      setAlertMsg("Please Choose Proper Dates");
      showAlert();
    }

    console.log(Dates);
  }

  function toggleSortBtn() {
    let getOrder = props.ordered;
    if (sortBtnFlip === "") {
      toggleSortBtns("flip-v");
      getOrder(true);
    } else {
      toggleSortBtns("");
      getOrder(false);
    }
  }

  function filterBtnClasses() {
    let filterBtn = i18n.dir() === "rtl" ? " ml-5 " : " mr-5 ";
    if ((startDate === null || endDate === null) && filterBtnOn === false) {
      {
        filterBtn = filterBtn + "disabled";
      }
    }

    return filterBtn;
  }

  function filterBtnOnToggle() {
    setFilterBtnOn(true);
  }

  function alertClasses() {
    let classes = "row fade-in ";
    if (alertOn === false) classes = "row fade-out d-none";
    return classes;
  }

  function hideAlert() {
    setAlert(false);
  }

  return (
    <div className="container">
      <div className={alertClasses()}>
        <div className="col-md-12">
          <div className="alert alert-danger alert-dismissible }">
            <button type="button" className="close" onClick={hideAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
            <p>{t(alertMsg)}</p>
          </div>
        </div>
      </div>
      <div className="row">
        {datePickerCustom()}
        <div className="col-md-2 col-sm-6 col-xs-6 sm-mt-10">
          <select
            id="projectType"
            className="filter-select"
            onChange={filterBtnOnToggle}
          >
            {projectTypes.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <div className={"sm-mt-10 " + filterAlign}>
            <button
              className={
                "btn datePick-btn btn-theme-colored" + filterBtnClasses()
              }
              onClick={filterData}
            >
              {t("Filter")}
            </button>
            <button className={clearFilterClasses} onClick={clearFilterBtn}>
              {t("Clear Filter")}
            </button>
          </div>
        </div>
        <div className="col-md-2 col-sm-6 col-xs-6 sm-mt-10">
          {/* <p className="d-inline ml-0">{t("Sort By Date")}</p> */}
          <button
            className={"sort-btn d-inline " + sorBtnClasses}
            onClick={toggleSortBtn}
          >
            {t("Sort By Date") + " "}
            <i
              className={
                "fa fa-sort-amount-desc flip-none " + sortBtnFlip + iconDir
              }
              id="sortingBtn"
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
