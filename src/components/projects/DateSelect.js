import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const DateSelected = (props) => {
  const { t } = useTranslation();
  const [alertOn, setAlert] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const filterAlign =
    i18n.dir() === "rtl" ? "row float-left" : "row float-right";
  const btnColClasses =
    i18n.dir() === "rtl" ? "col-md-4 col-sm-6 pl-0" : "col-md-4 col-sm-6 pr-0";
  const clearFilterClasses =
    i18n.dir() === "rtl"
      ? "btn datePick-btn btn-theme ml-0"
      : "btn datePick-btn btn-theme mr-0";
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
        <div className="col-md-4 col-sm-4">
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
            // selected={startDate}
            // onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="col-md-4 col-sm-4">
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

  function clearFilterBtn() {
    let clearFilter = props.cleared;
    setStartDate(null);
    setEndDate(null);
    clearFilter();
  }

  function showAlert() {
    setAlert(true);
    setTimeout(function () {
      setAlert(false);
    }, 3000);
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
    }
    ///
    else {
      showAlert();
    }

    console.log(Dates);
  }

  function filterBtnClasses() {
    let filterBtn =
      i18n.dir() === "rtl"
        ? "btn datePick-btn btn-theme-colored ml-5 "
        : "btn datePick-btn btn-theme-colored mr-5 ";

    if (startDate === null || endDate === null)
      filterBtn = filterBtn + "disabled";
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

  return (
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
      <div className={filterAlign}>
        {datePickerCustom()}
        <div className={btnColClasses}>
          <button className={filterBtnClasses()} onClick={sendSelectedDates}>
            {t("Filter")}
          </button>
          <button className={clearFilterClasses} onClick={clearFilterBtn}>
            {t("Clear Filter")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelected;
