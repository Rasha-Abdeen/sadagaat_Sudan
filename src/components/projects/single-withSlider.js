import React, { Component } from "react";
import address from "../utils/address";
import axios from "axios";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import "@brainhubeu/react-carousel/lib/style.css";
import { Link } from "react-router-dom";
import { getNumber, Precision,getNumberWithLang } from "../events/getMonthName";
import {getNumberWithComma} from "../events/getMonthName";
import parse from "html-react-parser";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import Slider from "./slider";
import StepSlider from "./step_slider";
import ReactPlayer from "react-player";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { VenueLocationIcon } from "./VenueLocationIcon";

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
      activeTab3: "",
      showMap: false,
      currency:[],
      currencyval: [],
      
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
      const currentcur= project;
      this.setState({ project });
      this.setState({currencyval: project.currency});


     this.setState({currency: project.currency.currencyTranslations});
      //console.log('currency ...............: ',currency);
      this.setTranslationData()
      //console.log("this is project data ",project.currency.currencyTranslations);

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
    this.setState({ activeTab1: "active", activeTab2: "", activeTab3: "" });
  };

  changeActiveTab2 = () => {
    this.setState({ activeTab1: "", activeTab2: "active", activeTab3: "" });
  };

  changeActiveTab3 = () => {
    this.setState({ activeTab1: "", activeTab2: "", activeTab3: "active" });
    setTimeout(() => {
      this.setState({ showMap: true });
    }, 1000);
  };


  setTranslationData=()=>{
    // get newstranslation  array 
    const currency = this.state.currency
     // loping through array
    for(let i = 0 ;i < currency.length; i++){
      // check user language with lacale
      if(i18n.language === currency[i].locale){
        // fill the state with one translation news , news name and descriptions
        this.setState({
        
             name:currency[i].name,
             //description:newsData[i].description
           
        })
       // console.log('translationsDataname',this.state.translationNews)

      }
    }
}

  render() {
    const currency = this.state.currency;
    const currencyval = this.state.currencyval;
   
//console.log ("this value of currencyval:.....",currency)
    let allMedia = this.state.stepsMedia;
    let renderContainer = false;
    if (this.state.render) {
      const { t } = this.props;
      const { project } = this.state;

      const project_images = project.images;
      let projectImages = [];
      //push default project image to array of images
      if (project.imageUrl !== null) {
        projectImages.push({
          id: project.id,
          name: project.id,
        });
      }

      let steps = this.state.Steps;
      let currentLocation = [project.locationLat, project.locationLng];
      let zoom = 9;
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
                      <li className={this.state.activeTab3 + " " + tabs_class}>
                        <a
                          href="#location-tab"
                          data-toggle="tab"
                          onClick={this.changeActiveTab3}
                        >
                          {t("Project Map")}
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
                         
 <div>{

           currency.map((currency,index)=>{
              return ( (i18n.language === currency.locale) && (currency !== "undefined" )  ) ?
              <div class="mt-10 mb-20">
              <ul class="list-inline clearfix mt-10">
                <li class="pull-left flip pr-0">
                  {" "}
                  {t("Raised")}{" "}
                  <span class="font-weight-700 font-">
                  {currency.name}{" "}{getNumber(project.raised)}
                  </span>
                </li>
                <li class="text-theme-colored pull-right flip pr-0">
                  <span className="text-theme-colored font-weight-700">
                  {t("Goal")}
                  {currency.name}{" "}{getNumber(project.goal)}
                  </span>
                  </li>
                  </ul>
                </div>
              :
             null
             
            })}
              </div>   
              <div>{ 
              ( currency.length == 0  )?(

                
                <div className="causes-details clearfix p-15 pt-15 pb-15">
                <ul className="list-inline font-16 font-weight-600 clearfix mb-5">
                  <li className="pull-left font-weight-400 text-black-333 pr-0">
                    {t("Raised")}
                    <span className="text-theme-colored font-weight-700">
                      {/* pass raise to getNumber function to   */}
                      {i18n.language === "ar"?"ج.س":"SDG"}

                      {getNumber(project.raised)}
                    </span>
                  </li>
                  <li className="pull-right font-weight-400 text-black-333 pr-0">
                    {t("Goal")}
                    <span className="text-theme-colored font-weight-700"> {i18n.language === "ar"?"ج.س":"SDG"}

                      {getNumber(project.goal)}
                    </span>
                  </li>
                </ul>
                </div>

     ):null}
            
           </div>
     
     {
       project.raised != 0 && project.goal != 0 ?
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
                                  </Link>:
                                  <Link
                                  to={"/projects/" + project.id}
                                
                                >
                                 
                                </Link>

     }
                                  
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
                                    color: "#243f60",
                                    background: "#243f60",
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
                              {
                                project.raised != 0 && project.goal != 0 ?
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
                              </Link>:
                              <Link
                              to={"/projects/" + project.id}
                              
                            >
                              
                            </Link>
                              }
                              
                            </div>
                          </div>
                        ) : (
                          <h4>{t("No Project Timeline")}</h4>
                        )}
                      </div>
                      <div className="tab-pane fade in p-15" id="location-tab">
                        <div className="row">
                          {project.locationLat != 0.0 &&
                          project.locationLng != 0.0 ? (
                            <div id="LocationMap">
                              {this.state.showMap ? (
                                <React.Fragment>
                                  <Map center={currentLocation} zoom={zoom}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker
                                      position={currentLocation}
                                      icon={VenueLocationIcon}
                                    >
                                      <Popup>
                                        <div className="poup-text">
                                          <h6>{project.name}</h6>
                                          <p>{project.locationName}</p>
                                        </div>
                                      </Popup>
                                    </Marker>
                                  </Map>
                                  <div className="mt-20">
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
                                </React.Fragment>
                              ) : (
                                <p className="text-center">
                                  {t("Loading Map")}
                                </p>
                              )}
                            </div>
                          ) : (
                            <h4>{t("Map not available")}</h4>
                          )}
                        </div>
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
