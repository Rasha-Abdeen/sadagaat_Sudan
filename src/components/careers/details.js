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
/**
 * This component returns Vacancy details
 * @component
 * * * @param {string} props Vacancy Id
 * @see https://sadagaat.com/careers
 */
class Vacancy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacancy: [],
      render: false,
      cover: " ",
      popupIsOpen: false,
    };
  }
  async componentDidMount() {
    // Get Vacancy ID from Props
    let id = this.props.match.params.id;
    try {
      const { data: vacancy } = await axios.get(`${address()}vacancies/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState({ vacancy });
      console.log(this.state.vacancy.description);

      const { data: cover } = await axios.get(`${address()}cover-image/CARRIER1`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      if (this.cover.status == 500){
        this.setState({cover: undefined})

      }else{
        this.setState({cover});

      }    } catch (error) {
      console.log("can not load careers");
    }

    try {
      const { data: cover } = await axios.get(`${address()}cover-image/CARRIER1`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState(cover);
    } catch (error) {
      console.log("can not load carrer1 cover image");
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

    try {
      
      const { data: cover } = await axios.get(`${address()}cover-image/CARRIER1`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState(cover);
      console.log("the carrer cover image****************",this.state.cover)


    } catch (error) {
      console.log(" can't load carrer cover image *********************",this.state.cover)
    }
  }
  goToLink = (url) => {
    window.location = url;
  };
  handelClosePopup = () => {
    this.setState({ popupIsOpen: false });
  };
  onOpen = () => {
    this.setState({ popupIsOpen: true });
  };
  render() {
    let renderContainer = false;
         

    if (this.state.render) {
      const { t } = this.props;
      const vacancy = this.state.vacancy;
      const popupDir = i18n.dir() === "rtl" ? "left center" : "right center";
      const cover = this.state.cover;
      console.log("the cover image of carrer section ************",cover)
      renderContainer = (
        <React.Fragment>
          <section>
          {
          (cover !== undefined || cover != null)?
       <section style={{ 
         //backgroundImage: 'url(' + "https://images.wallpaperscraft.com/image/couple_mountains_travel_125490_1280x720.jpg"+ ')',
        backgroundImage: 'url(' + `${address()}cover-image/CARRIER1` + ')'
        
       }}  className=" inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Careers")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       :
       <section className="careers-bg-img inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Careers")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       }
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
                              {/* FroalaEditorView Component: Used to render data entered by froala editor */}
                              {vacancy.description !== null  ? (
                                <FroalaEditorView model={vacancy.description} />
                              ) : null}
                            </div>
                          </div>
                        </div>


                        {
                            vacancy.url !== null ?
                          
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
                                {/* Redirection Message */}
                                <h6>{t("directMsg")}</h6>
                                {/* Link to vacancy application link */}
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
                        </div>:null}
                        
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
