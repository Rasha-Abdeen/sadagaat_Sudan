import React, { Component } from "react";
import address from "../utils/address";
import axios from "axios";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { Precision, getNumber } from "../events/getMonthName";
import ReactPaginate from "react-paginate";
import parse from "html-react-parser";
import DateSelected from "../projects/DateSelect";

/**
 * This comoponent display subHub information  and Project related to this subhub
 * @component
 * @see http://sadagaat-uk.org/single-subhub/1849
 */

class SingleSubhub extends Component {
  constructor() {
    super();
    this.state = {
      subhub: [],
      projects: [],
      totalPages: 0,
      currentPage: 0,
      postsPerPage: 6,
      filterOn: false,
      Dates: {
        startDate: "01/01/2001",
        endDate: "01/01/2025",
      },
    };
  }
  /**
   * Get shub information from APIs
   * Get Projects that related to specific subhub
   */

  async fetchData(subHubId) {
    let prefix = address();
    let FilterUrl =
      prefix +
      "projects/filtter?" +
      "page=" +
      this.state.currentPage +
      "&size=" +
      this.state.postsPerPage +
      "&subhubId=" +
      subHubId;
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
    console.log(response.data);
    console.log(response.totalPages);
    this.state.projects = response.data;
    this.state.totalPages = response.totalPages;
    // setLoading(false);
    console.log(this.state.projects[0]);
  }
  ///////////////////////////////////
  /// fetchDataFiltered
  //////////////////////////////////
  async fetchDataFiltered() {
    let prefix = address();
    let FilterUrl =
      prefix +
      "projects/filtter?" +
      "&startDate=" +
      this.state.Dates.startDate +
      "&endDate=" +
      this.state.Dates.endDate +
      "&page=" +
      this.state.currentPage +
      "&size=" +
      this.state.postsPerPage;
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
    console.log(response.data);
    this.state.projects = response.data;
    this.state.totalPages = response.totalPages;
    console.log(response.totalPages);
    console.log(this.state.Dates.endDate);
  }

  async componentDidMount() {
    //  Get id of subhub from url
    let id = this.props.match.params.subhub_id;

    await axios
      .get(`${address()}subHubs/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      })

      .then((response) => {
        const subhub = response.data;
        this.setState({ subhub });
      })
      .catch((error) => {});
    this.fetchData(id);

    // await axios
    //   .get(`${address()}subHubs/${id}/projects`, {
    //     headers: { "accept-language": `${i18n.language}` },
    //   })

    //   .then((response) => {
    //     const projects = response.data;
    //     this.setState({ projects });
    //     console.log(projects);
    //   })
    //   .catch((error) => {
    //   });
  }
  /**
   * Function call when change props Like  switch language
   */
  async componentWillReceiveProps() {
    let id = this.props.match.params.subhub_id;

    await axios
      .get(`${address()}subHubs/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      })

      .then((response) => {
        const subhub = response.data;
        this.setState({ subhub });
      })
      .catch((error) => {
        // alert(error.message)
      });

    // if (this.state.filterOn === false) this.fetchData();
    // else this.fetchDataFiltered();

    // await axios
    //   .get(`${address()}subHubs/${id}/projects`, {
    //     headers: { "accept-language": `${i18n.language}` },
    //   })

    //   .then((response) => {
    //     const projects = response.data;
    //     this.setState({ projects });
    //   })
    //   .catch((error) => {
    //   });
  }

  // Change page
  paginate = (e) => {
    this.setState({
      currentPage: e.selected,
      offset: e.selected * this.state.postsPerPage,
    });
  };

  render() {
    const { t } = this.props;
    const { subhub } = this.state;
    const { projects } = this.state.projects;
    const totalDonation = subhub.total_donation;

    // const currentPosts = projects.slice(
    //   this.state.offset,
    //   this.state.offset + this.state.postsPerPage
    // );
    const projectProgressAlign = i18n.dir() === "rtl" ? "right" : "left";

    return (
      <React.Fragment>
        <section>
          <div className="container">
            <div className="row multi-row-clearfix">
              <div>
                <div className="col-xs-12 col-sm-6 col-md-12">
                  <h2></h2>

                  <div className="event media sm-maxwidth400 border-bottom mt-5 mb-0 pt-10 pb-15">
                    <div className="row">
                      <div className="causes">
                        <div className="row-fluid">
                          <div className="col-md-6">
                            <div
                              className="post-thumb thumb"
                              style={{ mxaHeight: "600px" }}
                            >
                              <img
                                className="img-responsive"
                                src={`${address()}subHubs/${subhub.id}/image`}
                                alt="subhub image"
                                style={{ height: "400px", width: "500px" }}
                              />
                            </div>
                          </div>
                          <div class="causes-details col-md-6">
                            <h2 class="line-bottom mt-0">{subhub.name}</h2>

                            <p>{subhub.description}</p>

                            <div class="mt-10 mb-20">
                              <ul class="list-inline clearfix mt-10">
                                <li class="text-theme-colored pull-right flip pr-0"></li>
                              </ul>
                            </div>
                            <Link
                              to={"/sub_hubs/" + subhub.id}
                              class="btn btn-theme-colored btn-sm"
                            >
                              {t("Donate Now")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />

            {/* Projects related to subhub */}

            <div className="row multi-row-clearfix">
              <div className="blog-posts">
                <h3 class="mt-10 line-bottom">{t("Projects")}</h3>
                <br />
                {/* <div className=" dateSelect">
                  <DateSelected
                  clicked={GetSelectedDates}
                  cleared={clearFilter}
                  ></DateSelected>
                </div> */}
                {this.state.projects.map((project) => (
                  <div className="col-md-4 col-sm-6" key={project.id}>
                    <Link to={"/single-projects/" + project.id}>
                      <div
                        className="causes bg-white mb-30 border-bottom"
                        style={{ height: "600px" }}
                      >
                        <div
                          className="thumb"
                          // style = {{ maxHeight: '260px'}}
                        >
                          <img
                            src={`${address()}projects/${project.id}/image`}
                            className="img-fullwidth"
                            width="390"
                            height="260"
                          />
                        </div>
                        <div className="causes-details clearfix p-10 pt-15 pb-15">
                          <ul className="list-inline font-14 font-weight-600 clearfix mb-5">
                            <li className="pull-left font-weight-400 text-black-333 pr-0">
                              <span className="text-theme-colored font-weight-500">
                                {t("Raised")}
                                {getNumber(project.raised)}
                              </span>
                            </li>
                            <li className="pull-right font-weight-400 text-black-333 pr-0">
                              <span className="text-theme-colored font-weight-00">
                                {t("Goal")}
                                {getNumber(project.goal)}
                              </span>
                            </li>
                          </ul>

                          <div className="progress-item mt-0">
                            <div className="progress">
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
                          <div className="progress-item mt-0">
                            <p
                              className=""
                              style={{ textAlign: projectProgressAlign }}
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
                ))}
                {/* {projects.length > this.state.postsPerPage && (
                  <div style={{ position: "absolute", bottom: "0%" }}>
                    <ReactPaginate
                      previousLabel={t("prev")}
                      nextLabel={t("next")}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={Math.ceil(
                        projects.length / this.state.postsPerPage
                      )}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.paginate}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default withTranslation()(SingleSubhub);
