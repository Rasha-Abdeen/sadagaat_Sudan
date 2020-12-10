import React, { Component } from "react";
import address from "../utils/address";
import axios from "axios";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import "@brainhubeu/react-carousel/lib/style.css";
import { Precision, getNumber } from "../events/getMonthName";
import parse from "html-react-parser";
import Slider from "./programSlider";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

/**
 * This Component display project information like (carousal of images , name , discription ...)
 * @component
 * @see http://sadagaat-uk.org/single-projects/1944
 */

class SingleVolunteersProgram extends Component {
  constructor() {
    super();
    this.state = {
      program: [],
      // projectImages: [],
      allMedia: [],
      render: false,
    };
  }
  /**
   * return project from API
   */
  async componentDidMount() {
    // get projct id from url
    let id = this.props.match.params.id;
    try {
      const { data: program } = await axios.get(`${address()}programs/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState({ program });
      console.log(this.state.program.description);
    } catch (error) {
      console.log("can not load project for the home page slider");
    }

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
    let id = this.props.match.params.id;
    try {
      const { data: program } = await axios.get(`${address()}programs/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState({ program });
      console.log(this.state.program.description);
    } catch (error) {
      console.log("can not load project for the home page slider");
    }
  }

  getMedia = () => {
    let all_media = [{ name: "main", type: "img" }];
    let images = this.state.program.images;
    let videos = this.state.program.videos;
    let i;
    for (i = 0; i < images.length; i++) {
      all_media.push({ name: images[i].name, type: "img" });
    }
    for (i = 0; i < videos.length; i++) {
      all_media.push({ name: videos[i].name, type: "vid" });
    }
    console.log(images.length, videos.length, all_media.length);
    return all_media;
  };

  showDate = () => {
    if (this.state.program.startAt === null) return null;
    else
      return (
        <h5 class="font-weight-600 text-gray-dimgray d-inline">
          <i className="fa fa-calendar m-5"></i>
          <span className="">{this.state.program.startAt}</span>
        </h5>
      );
  };

  progress = (x, y) => {
    console.log(x / y);
    return (x / y) * 100;
  };

  render() {
    let renderContainer = false;
    if (this.state.render) {
      const { t } = this.props;
      const { program } = this.state;
      let allMedia = this.getMedia();
      //push default project image to array of images

      renderContainer = (
        <React.Fragment>
          <div className="main-content">
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h2 class="line-bottom mt-0">{program.name}</h2>
                    <div className=" media sm-maxwidth400 mt-5 mb-0 pt-10 pb-15">
                      <div className="row">
                        <div className="causes">
                          <div className="row-fluid">
                            <div className="col-md-6">
                              {/* check if peoject image array has more than defualte image */}
                              {allMedia !== undefined && allMedia.length > 1 ? (
                                <Slider
                                  media={allMedia}
                                  progId={program.id}
                                ></Slider>
                              ) : (
                                <div
                                  className="post-thumb thumb"
                                  style={{ maxHeight: "400px" }}
                                >
                                  <img
                                    src={`${address()}programs/${
                                      program.id
                                    }/image`}
                                    alt="project image"
                                    className="img-responsive mb-10"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="col-md-6 causes-details programs clearfix p-15 pt-15 pb-15">
                              <h5 class="font-weight-600 text-gray-dimgray d-inline">
                                <i className="fa fa-map-marker"></i>
                                <span className="">
                                  <span> </span>
                                  {program.locationName}
                                </span>
                              </h5>
                              <span> </span>
                              {this.showDate()}
                              <ul className="list-inline font-16 font-weight-600 clearfix mb-5">
                                <li className="pull-right font-weight-400 text-black-333 pr-0">
                                  {t("Target") + ": "}
                                  <span className="text-theme-colored font-weight-700">
                                    {/* Get targeted volunteers number*/}
                                    {program.target}
                                  </span>
                                </li>
                                {/* <br></br> */}
                                <li className="pull-left font-weight-400 text-black-333 pr-0">
                                  {t("Subscribed Volunteers") + ": "}
                                  <span className="text-theme-colored font-weight-700">
                                    {/* Get subscribed volunteers number*/}
                                    {program.subscribed}
                                  </span>
                                </li>
                              </ul>
                              <div className="progress-item mt-20">
                                <div className="progress">
                                  <div
                                    data-percent={Precision(
                                      this.progress(
                                        program.subscribed,
                                        program.target
                                      )
                                    )}
                                    className="progress-bar"
                                  >
                                    <span className="percent">
                                      {Precision(
                                        this.progress(
                                          program.subscribed,
                                          program.target
                                        )
                                      )}
                                      %
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <h4 className="text-uppercase">{program.name}</h4>
                              <p className="mt-5 p-15">
                                <div className="list-formatting">
                                  {program.description !== null ? (
                                    <FroalaEditorView
                                      model={program.description}
                                    />
                                  ) : null}
                                </div>
                              </p>
                            </div>
                          </div>
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
export default withTranslation()(SingleVolunteersProgram);
