import React, { Component } from "react";
import axios from "axios";
import address from "./../utils/address";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import parse from "html-react-parser";
import Popup from "reactjs-popup";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import Header from "../sub_page_header";

class Vacancy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacancy: [],
      render: false,
      popupIsOpen: false,
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.id;
    try {
      const { data: vacancy } = await axios.get(`${address()}vacancies/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState({ vacancy });
      console.log(this.state.vacancy.description);
    } catch (error) {
      console.log("can not load careers");
    }
    setTimeout(
      function () {
        this.setState({ render: true });
      }.bind(this),
      10
    );
  }

  async componentWillReceiveProps() {
    let id = this.props.match.params.id;
    try {
      const { data: vacancy } = await axios.get(`${address()}vacancies/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState({ vacancy });
      console.log(this.state.vacancy);
    } catch (error) {
      console.log("can not load careers");
    }
  }
  goToLink = (url) => {
    window.location = url;
  };
  // PopupIsOpen = () => {
  //   return this.state.popupIsOpen;
  // };
  handelClosePopup = () => {
    this.setState({ popupIsOpen: false });
  };
  onOpen = () => {
    this.setState({ popupIsOpen: true });
  };
  render() {
    let renderContainer = false;
    if (this.state.render) {
      const style = i18n.dir() === "rtl" ? "pl-0" : "pr-0";
      const styleMr = i18n.dir() === "rtl" ? " ml-5" : " mr-5";
      const { t } = this.props;
      const vacancy = this.state.vacancy;
      const popupDir = i18n.dir() === "rtl" ? "left center" : "right center";
      const btnDir = i18n.dir() === "rtl" ? "mr-5" : "ml-5";
      renderContainer = (
        <React.Fragment>
          <section>
            <Header name={t("Careers")} coverImage={"careers-bg-img"} />
            <div className="container">
              <div className="section-content">
                <div className="row">
                  <div className="col-md-9 col-md-offset-1">
                    <div
                      className=" sm-maxwidth400 mt-5 mb-0 pt-10 pb-15"
                      key={vacancy.id}
                    >
                      <div className="row">
                        <div className="col-md-11">
                          <div className="event-content mt-10 p-5 pb-0 pt-0">
                            <h4 className="text-uppercase title line-bottom mt-0 mb-10">
                              <span className="text-theme-colored">
                                {vacancy.title}
                              </span>
                            </h4>
                            <h6 className="text-colored mb-10">
                              <i className="fa fa-calendar"></i>{" "}
                              {t("Closing Date")}: {vacancy.endDate}
                            </h6>
                            <div className="list-formatting">
                              {vacancy.description !== null ? (
                                <FroalaEditorView model={vacancy.description} />
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-1">
                          <Popup
                            trigger={
                              <button className="btn btn-flat btn-theme-colored btn-sm">
                                {t("Apply")}
                              </button>
                            }
                            position={popupDir}
                          >
                            {(close) => (
                              <div>
                                <h6>{t("directMsg")}</h6>
                                <a
                                  href={vacancy.url}
                                  target="_blank"
                                  className="btn btn-flat btn-colored btn-default btn-theme-colored mr-5 btn-sm"
                                >
                                  {t("Apply")}
                                </a>
                                <a
                                  onClick={close}
                                  className="btn btn-flat btn-colored btn-default btn-theme-colored mr-5 btn-sm"
                                >
                                  {t("Cancel")}
                                </a>
                              </div>
                            )}
                          </Popup>
                          {/* <a
                            className="btn btn-flat btn-colored btn-theme-colored"
                            href={vacancy.url}
                            target="blank"
                          >
                            {t("Apply")}
                          </a> */}
                        </div>
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
    return renderContainer;
  }
}

export default withTranslation()(Vacancy);
