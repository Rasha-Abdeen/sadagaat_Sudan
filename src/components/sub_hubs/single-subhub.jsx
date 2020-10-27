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
import Projects from "./single_suhub_projects";

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
      offset: 0,
      currentPage: 1,
      postsPerPage: 6,
      subhubId: 0,
    };
  }
  /**
   * Get shub information from APIs
   * Get Projects that related to specific subhub
   */

  async componentDidMount() {
    //  Get id of subhub from url
    let id = this.props.match.params.subhub_id;
    this.setState({ subhubId: id });
    console.log(this.state.projectId);
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

    await axios
      .get(`${address()}subHubs/${id}/projects`, {
        headers: { "accept-language": `${i18n.language}` },
      })

      .then((response) => {
        const projects = response.data;
        this.setState({ projects });
        console.log(projects);
      })
      .catch((error) => {
        // alert(error.message)
      });
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

    await axios
      .get(`${address()}subHubs/${id}/projects`, {
        headers: { "accept-language": `${i18n.language}` },
      })

      .then((response) => {
        const projects = response.data;
        this.setState({ projects });
      })
      .catch((error) => {
        // alert(error.message)
      });
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
    const { projects } = this.state;
    const totalDonation = subhub.total_donation;

    const currentPosts = projects.slice(
      this.state.offset,
      this.state.offset + this.state.postsPerPage
    );
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
            <Projects projectId={this.props.match.params.subhub_id} />
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default withTranslation()(SingleSubhub);
