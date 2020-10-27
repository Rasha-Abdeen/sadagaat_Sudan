import React, { Component } from "react";
import address from "../utils/address";
import axios from "axios";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import "@brainhubeu/react-carousel/lib/style.css";
import { Link } from "react-router-dom";
import { getNumberWithComma, Precision } from "../events/getMonthName";
import parse from "html-react-parser";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import Slider from "./slider";
import StepSlider from "./step_slider";
import ReactPlayer from "react-player";

/**
 * This Component display project information like (carousal of images , name , discription ...)
 * @component
 * @see http://sadagaat-uk.org/single-projects/1944
 */

class SinglProject2 extends Component {
  constructor() {
    super();
    this.state = {
      project: [],
      Steps: [],
      reversedSteps: [],
      render: false,
      stepsMedia: [],
      activeTab1: "active",
      activeTab2: "",
    };
  }
  /**
   * return project from API
   */
  async componentDidMount() {
    // get projct id from url
    let id = this.props.match.params.project_id;
    try {
      const { data: project } = await axios.get(`${address()}projects/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState({ project });
    } catch (error) {
      console.log("can not load project for the home page slider");
    }

    try {
      const { data: Steps } = await axios.get(
        `${address()}projects/step/${id}`,
        {
          headers: { "accept-language": `${i18n.language}` },
        }
      );
      this.setState({ Steps });
      console.log(this.state.Steps);
    } catch (error) {
      console.log("can not load project for the home page slider");
    }
    this.setState({ stepsMedia: this.getStepsMedia() });
    // this.setState({ reversedSteps: this.getReversedSteps() });

    setTimeout(
      function () {
        this.setState({ render: true });
      }.bind(this),
      10
    );
  }

  /**
   * returned project when recive prpos like language 'ar' , 'en'
   */
  async componentWillReceiveProps() {
    let id = this.props.match.params.project_id;

    try {
      const { data: project } = await axios.get(`${address()}projects/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState({ project });
    } catch (error) {
      console.log("can not load project for the home page slider");
    }

    try {
      const { data: Steps } = await axios.get(
        `${address()}projects/step/${id}`,
        {
          headers: { "accept-language": `${i18n.language}` },
        }
      );
      this.setState({ Steps });
      console.log(this.state.Steps);
    } catch (error) {
      console.log("can not load project for the home page slider");
    }

    this.setState({ stepsMedia: this.getStepsMedia() });
    // this.setState({ reversedSteps: this.getReversedSteps() });
  }

  showDate = () => {
    if (this.state.project.startAt === null) return null;
    else
      return (
        <h5 class="font-weight-600 text-gray-dimgray d-inline">
          <i className="fa fa-calendar m-5"></i>
          <span className="">{this.state.project.startAt}</span>
        </h5>
      );
  };

  getStepsMedia = () => {
    let steps_media = [];
    let i, j, k;
    for (i = 0; i < this.state.Steps.length; i++) {
      steps_media.push({ id: i, media: [] });
      for (j = 0; j < this.state.Steps[i].imageData.length; j++) {
        steps_media[i].media.push({
          item: this.state.Steps[i].imageData[j],
          type: "img",
        });
      }
      for (k = 0; k < this.state.Steps[i].videoData.length; k++) {
        steps_media[i].media.push({
          item: this.state.Steps[i].videoData[k],
          type: "vid",
        });
      }
    }
    return steps_media;
  };

  changeActiveTab1 = () => {
    this.setState({ activeTab1: "active", activeTab2: "" });
  };

  changeActiveTab2 = () => {
    this.setState({ activeTab1: "", activeTab2: "active" });
  };

  render() {
    let allMedia = this.state.stepsMedia;
    let renderContainer = false;
    if (this.state.render) {
      const { t } = this.props;
      const { project } = this.state;

      const project_images = project.images;
      let steps_images = [];
      //push default project image to array of images
      if (project.imageUrl !== null) {
        project_images.push({
          id: project.id,
          name: project.id,
        });
      }

      let steps = this.state.Steps;

      const projectProgressAlign = i18n.dir() === "rtl" ? "right" : "left";
      const tabs_class = i18n.dir() === "rtl" ? "float-right" : "float-left";
      const btn_class = i18n.dir() === "rtl" ? "float-left" : "float-right";
      const timeline_class = i18n.dir() === "rtl" ? "timeline_ar" : "";

      renderContainer = (
        <React.Fragment>
          <div className="main-content">
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h2 class="line-bottom mt-0">{project.name}</h2>
                    <ul className="nav nav-tabs">
                      <li className={this.state.activeTab1 + " " + tabs_class}>
                        <a
                          href="#login-tab"
                          data-toggle="tab"
                          id="login"
                          onClick={this.changeActiveTab1}
                        >
                          {t("Project Details")}
                        </a>
                      </li>
                      <li className={this.state.activeTab2 + " " + tabs_class}>
                        <a
                          href="#register-tab"
                          data-toggle="tab"
                          onClick={this.changeActiveTab2}
                        >
                          {t("Project Timeline")}
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade in active p-15"
                        id="login-tab"
                      >
                        <div className=" media sm-maxwidth400 mt-5 mb-0 pt-10 pb-15">
                          <div className="row">
                            <div className="causes">
                              <div className="row-fluid">
                                <div className="col-md-6">
                                  {/* check if peoject image array has more than defualte image */}
                                  {project_images.length > 1 ? (
                                    <Slider images={project_images}></Slider>
                                  ) : (
                                    <div
                                      className="post-thumb thumb"
                                      style={{ maxHeight: "400px" }}
                                    >
                                      <img
                                        src={`${address()}projects/${
                                          project.id
                                        }/image`}
                                        alt="project image"
                                        className="img-responsive mb-10"
                                      />
                                    </div>
                                  )}
                                </div>
                                <div class="causes-details col-md-6">
                                  <h5 class="font-weight-600 text-gray-dimgray d-inline">
                                    <i className="fa fa-map-marker m-5"></i>
                                    <span className="">
                                      {project.locationName}
                                    </span>
                                  </h5>
                                  {this.showDate()}
                                  <div className="mb-5">
                                    {parse(project.description)}
                                  </div>
                                  <div className="progress-item mt-0">
                                    <p
                                      className="text-theme-colored font-weight-700"
                                      style={{
                                        textAlign: projectProgressAlign,
                                      }}
                                    >
                                      {t("Project Progress")}
                                    </p>
                                    <div className="progress">
                                      <div
                                        data-percent={Precision(
                                          project.projectProgress
                                        )}
                                        className="progress-bar"
                                      >
                                        <span className="percent">
                                          {Precision(project.projectProgress)}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="progress-item mt-2">
                                    <div className="progress mb-0">
                                      <div
                                        data-percent={Precision(
                                          project.donationProgress
                                        )}
                                        className="progress-bar"
                                      >
                                        <span className="percent">
                                          {Precision(project.donationProgress)}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="mt-10 mb-20">
                                    <ul class="list-inline clearfix mt-10">
                                      <li class="pull-left flip pr-0">
                                        {" "}
                                        {t("Raised")}{" "}
                                        <span class="font-weight-700 font-">
                                          {getNumberWithComma(project.raised)}
                                        </span>
                                      </li>
                                      <li class="text-theme-colored pull-right flip pr-0">
                                        {t("Goals")}
                                        <span class="font-weight-700">
                                          {getNumberWithComma(project.goal)}
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                  <Link
                                    to={"/projects/" + project.id}
                                    class="btn btn-theme-colored btn-sm"
                                    style={{
                                      display: `
                                ${
                                  project.donationProgress >= 100 ? "none" : ""
                                }`,
                                    }}
                                  >
                                    {t("Donate Now")}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade in p-15" id="register-tab">
                        {steps.length > 0 ? (
                          <div>
                            <Timeline
                              lineColor={"#ddd"}
                              className={timeline_class}
                            >
                              {steps.map((step) => (
                                <TimelineItem
                                  key={step.id}
                                  dateText={
                                    t("Phase") +
                                    " " +
                                    (steps.indexOf(step, 0) + 1)
                                  }
                                  style={{
                                    color: "#ff96a7",
                                    background: "#ff96a7",
                                  }}
                                >
                                  <p>{parse(step.text)}</p>
                                  <div className="slider-container">
                                    {allMedia[this.state.Steps.indexOf(step, 0)]
                                      .media.length === 1 ? (
                                      <div
                                        className="post-thumb thumb"
                                        style={{ margin: "20px 0" }}
                                      >
                                        {allMedia[
                                          this.state.Steps.indexOf(step, 0)
                                        ].media[0].type === "img" ? (
                                          <img
                                            src={`${address()}projects/step/${
                                              allMedia[
                                                this.state.Steps.indexOf(
                                                  step,
                                                  0
                                                )
                                              ].media[0].item.name
                                            }/image`}
                                            alt="project image"
                                          />
                                        ) : (
                                          <ReactPlayer
                                            controls={true}
                                            playIcon
                                            className="img-fullwidth img-carousel"
                                            url={`${address()}projects/step/${
                                              allMedia[
                                                this.state.Steps.indexOf(
                                                  step,
                                                  0
                                                )
                                              ].media[0].item.name
                                            }/video`}
                                          />
                                        )}
                                      </div>
                                    ) : (
                                      <StepSlider
                                        media={
                                          allMedia[
                                            this.state.Steps.indexOf(step, 0)
                                          ]
                                        }
                                      ></StepSlider>
                                    )}
                                  </div>
                                </TimelineItem>
                              ))}
                            </Timeline>
                            <div className="mb-20">
                              <Link
                                to={"/projects/" + project.id}
                                class={
                                  "btn btn-theme-colored btn-sm mb-20 " +
                                  btn_class
                                }
                                style={{
                                  display: `
                                ${
                                  project.donationProgress >= 100 ? "none" : ""
                                }`,
                                }}
                              >
                                {t("Donate Now")}
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <h4>{t("No Project Timeline")}</h4>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </React.Fragment>
      );
    }
    return renderContainer;
  }
}
export default withTranslation()(SinglProject2);
