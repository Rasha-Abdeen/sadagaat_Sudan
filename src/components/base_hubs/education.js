import React, { Component } from "react";
import address from "../utils/address";
import Header from "../sub_page_header";
import { Link } from "react-router-dom";
import i18n from "i18next";
import Hub_Subhubs from "./hub_subHubs";
import { withTranslation } from "react-i18next";
import Popup from "reactjs-popup";

/**
 * This comoponent display subHub information  and Project related to this subhub
 * @component
 * @see http://sadagaat-uk.org/single-subhub/1849
 */

class Education extends Component {
  constructor() {
    super();
    this.state = {
      hub: [],
      files: [],
      offset: 0,
      activeTab1: "active",
      activeTab2: "",
    };
  }
  /**
   * Get shub information from APIs
   * Get Projects that related to specific subhub
   */

  async componentDidMount() {
    //  Get id of subhub from url
    const fetcher = await window.fetch(`${address()}hubs/1738`, {
      headers: { "accept-language": `${i18n.language}` },
    });
    const response = await fetcher.json();
    //Get data from API' Response
    this.setState({ hub: response, files: response.files });
    console.log(this.state.hub.files);
  }
  async componentWillReceiveProps() {
    const fetcher = await window.fetch(`${address()}hubs/1738`, {
      headers: { "accept-language": `${i18n.language}` },
    });
    const response = await fetcher.json();
    //Get data from API' Response
    this.setState({ hub: response, files: response.files });
  }
  // Toggle Tab1 to Active and Tab2 to not Active
  changeActiveTab1 = () => {
    this.setState({ activeTab1: "active", activeTab2: "" });
  };
  // Toggle Tab1 to not Active and Tab2 to Active
  changeActiveTab2 = () => {
    this.setState({ activeTab1: "", activeTab2: "active" });
  };
  //Get File name
  getFileName = () => {
    return this.state.files[0].name;
  };
  //Get file type from it's name (.pdf / .docs / .xlsx)
  fileType = () => {
    let fileName = this.state.files[0].name;
    let type = "";
    if (fileName.search(".pdf") > 0) {
      type = "pdf";
    } else if (fileName.search(".xlsx") > 0) {
      type = "xlsx";
    } else if (fileName.search(".docs") > 0) {
      type = "docx";
    }
    return type;
  };
  //Set File Icon
  fileIcon = () => {
    let fileType = this.fileType();
    console.log(fileType);
    switch (fileType) {
      case "pdf":
        return <i class="fa fa-file-pdf-o"></i>;
      case "xlsx":
        return <i class="fa fa-file-excel-o"></i>;
      case "docx":
        return <i class="fa fa-file-word-o"></i>;
    }
  };
  // Open Pdf File in New Tab
  openFile = () => {
    let url = address() + "hub/document/" + this.getFileName();
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        var outside = URL.createObjectURL(blob);
        this.setState({ file: outside });
        window.open(this.state.file);
      });
  };

  render() {
    let hubFiles = this.state.files;
    const { t } = this.props;
    const { hub } = this.state;
    // Set Tabs classes for direction change
    const tabs_class = i18n.dir() === "rtl" ? "float-right" : "float-left";
    // Set button classes for direction change

    const btnDir = i18n.dir() === "rtl" ? "mr-5" : "ml-5";
    return (
      <React.Fragment>
        <section>
          <Header name={t("Education")} coverImage={"education-bg-img"} />
          <div className="container">
            <div className="row multi-row-clearfix">
              <div>
                <div className="col-xs-12 col-md-12">
                  <h2 class="line-bottom mt-0">{hub.name}</h2>
                  {/* Tabs */}
                  <ul className="nav nav-tabs">
                    {/* Discreption Tab */}
                    <li className={this.state.activeTab1 + " " + tabs_class}>
                      <a
                        href="#login-tab"
                        data-toggle="tab"
                        id="login"
                        onClick={this.changeActiveTab1}
                      >
                        {t("Sector Details")}
                      </a>
                    </li>
                    {/* Files Tab */}
                    <li className={this.state.activeTab2 + " " + tabs_class}>
                      <a
                        href="#register-tab"
                        data-toggle="tab"
                        onClick={this.changeActiveTab2}
                      >
                        {t("Sector File")}
                      </a>
                    </li>
                  </ul>
                  {/* Tabs Content  */}
                  <div className="tab-content">
                    {/* Discreption Tab Content */}
                    <div
                      className="tab-pane fade in active p-15"
                      id="login-tab"
                    >
                      <div className="event media sm-maxwidth400 border-bottom mt-5 mb-5 pt-10 pb-15">
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
                                    src={`${address()}hubs/${hub.id}/image`}
                                    alt="Education Sector"
                                    style={{ height: "400px", width: "500px" }}
                                  />
                                </div>
                              </div>
                              <div class="causes-details col-md-6">
                                <p>{hub.description}</p>
                                <div class="mt-10 mb-20">
                                  <ul class="list-inline clearfix mt-10">
                                    <li class="text-theme-colored pull-right flip pr-0"></li>
                                  </ul>
                                </div>
                                {/* Link to Donation Page */}
                                <Link
                                  to={"/hub/" + hub.id}
                                  class="btn btn-theme-colored btn-sm"
                                >
                                  {t("Donate Now")}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Sub Sectors Component  , Props: Hubid and Hub name*/}
                      <Hub_Subhubs
                        hubId={hub.id}
                        name={t("Education Sub Sectors")}
                      />
                    </div>
                    {/* Files Tab Content */}
                    <div className="tab-pane fade in p-15" id="register-tab">
                      {/*  */}
                      {hubFiles !== undefined && hubFiles.length > 0 ? (
                        // maping files
                        hubFiles.map((file, index) => (
                          <div>
                            {/* Check file type */}
                            {this.fileType() === "pdf" ? (
                              // Popup if file type is pdf
                              <Popup
                                trigger={(open) => (
                                  <a className="popupCustom-btn">
                                    {/* return file icon and name */}
                                    {this.fileIcon()} {file.displayName}
                                  </a>
                                )}
                                position="bottom center"
                                closeOnDocumentClick
                              >
                                <div>
                                  <h6>
                                    {/* return file icon and name */}
                                    {this.fileIcon()} {file.displayName}
                                  </h6>
                                  {/* Save File link */}
                                  <a
                                    href={`${address()}hub/document/${this.getFileName()}`}
                                    className="btn btn-flat btn-theme-colored btn-sm"
                                    target="_slef"
                                    download="pdf"
                                  >
                                    {t("Save")}
                                  </a>
                                  {/* Open file in new tab */}
                                  <a
                                    onClick={this.openFile}
                                    className={
                                      "btn btn-flat btn-theme-colored btn-sm " +
                                      btnDir
                                    }
                                  >
                                    {t("Open")}
                                  </a>
                                </div>
                              </Popup>
                            ) : (
                              // File link
                              <a
                                href={`${address()}hub/document/${this.getFileName()}`}
                              >
                                {/* Return file icon and name */}
                                {this.fileIcon()} {file.displayName}
                              </a>
                            )}
                          </div>
                        ))
                      ) : (
                        // No files message
                        <p>{t("No Files Available")}</p>
                      )}
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
}
export default withTranslation()(Education);
