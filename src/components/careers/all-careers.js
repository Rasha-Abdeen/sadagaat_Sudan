import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import address from "./../utils/address";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import parse from "html-react-parser";
import Header from "../sub_page_header";

class AllCareers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      careers: [],
    };
  }

  async componentDidMount() {
    try {
      const { data: careers } = await axios.get(
        `${address()}vacancies/to-apply`,
        {
          headers: { "accept-language": `${i18n.language}` },
        }
      );
      this.setState({ careers });
      console.log(this.state.careers);
    } catch (error) {
      console.log("can not load careers");
    }
    console.log(this.state.careers);
  }

  async componentWillReceiveProps() {
    try {
      const { data: careers } = await axios.get(
        `${address()}vacancies/to-apply`,
        {
          headers: { "accept-language": `${i18n.language}` },
        }
      );
      this.setState({ careers });
      console.log(this.state.careers);
    } catch (error) {
      console.log("can not load careers");
    }
  }

  careerDescription = (description) => {
    if (description !== null) {
      // parse(description);
      console.log(description);
      if (description.length >= 299) {
        // return parse(description.slice(0, 299) + " ...");
        return description.slice(0, 299) + " ...";
      } else return parse(description);
    } else return null;
  };

  render() {
    const style = i18n.dir() === "rtl" ? "pl-0" : "pr-0";
    const styleMr = i18n.dir() === "rtl" ? " ml-0" : " mr-0";
    const { t } = this.props;
    const careers = this.state.careers;
    return (
      <React.Fragment>
        <section>
          <Header name={t("Careers")} coverImage={"careers-bg-img"} />
          <div className="container">
            <div className="section-content">
              <div className="row">
                <div className="col-md-9 col-md-offset-1">
                  {careers.length > 0 ? (
                    careers.map((career) => (
                      <div
                        className="sm-maxwidth400 mt-5 mb-0 pt-10 pb-15 border-bottom"
                        key={career.id}
                      >
                        <div className="row pl-0 pr-0">
                          <div className="col-md-10 col-lg-10">
                            <div className="event-content mt-10 p-5 pb-0 pt-0">
                              <h4 className="text-uppercase title line-bottom mt-0 mb-10">
                                <span className="text-theme-colored">
                                  <Link to={"/vacancy/" + career.id}>
                                    {career.title}
                                  </Link>
                                </span>
                              </h4>
                              <h6 className="text-colored mb-10">
                                <i className="fa fa-calendar"></i>{" "}
                                {t("Closing Date")}: {career.endDate}
                              </h6>
                              {/* {this.careerDescription(career.description)} */}
                              <FroalaEditorView
                                model={career.description.slice(0, 299)}
                              />
                            </div>
                          </div>
                          <div className={"col-md-2 col-lg-2 " + style}>
                            <Link
                              className={
                                "btn btn-flat btn-colored btn-theme-colored " +
                                styleMr
                              }
                              to={"/vacancy/" + career.id}
                            >
                              {t("Details")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h3>{t("No Vacancies Available Now")}</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default withTranslation()(AllCareers);
