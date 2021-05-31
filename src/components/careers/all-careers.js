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
/**
 * This component returns Open Vacancies
 * @component
 * @see https://sadagaat.com/careers
 */
class AllCareers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      careers: [],
      cover: {},
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
    } catch (error) {
      console.log("can not load careers");
    }
    try {
      const { data: cover } = await axios.get(`${address()}cover-image/CARRIER1`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      if (this.cover.status == 500){
        this.setState({cover: undefined})

      }else{
        this.setState({cover});

      }
    } catch (error) {
console.log(" can't fetch carrer cover image")
    }
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
    } catch (error) {
      console.log("can not load careers");
    }

    try {
      
      const { data: cover } = await axios.get(`${address()}cover-image/CARRIER1`, {
        headers: { "accept-language": `${i18n.language}` },
      });
      this.setState(cover);
      console.log("the carrer cover image****************",this.state.cover)
      if (this.cover.status === undefined){
        this.setState({cover: undefined})

      }


    } catch (error) {
      console.log(" can't load carrer cover image *********************",this.state.cover)
    }
    
  }
  render() {
    const style = i18n.dir() === "rtl" ? "pl-0" : "pr-0";
    const styleMr = i18n.dir() === "rtl" ? " ml-0" : " mr-0";
    const { t } = this.props;
    const careers = this.state.careers;
    const cover = this.state.cover;
    return (
      <React.Fragment>
        <section>
          {/* Careers page header */}
          {
          (cover !== undefined)?
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
                 <h3 className="font-28 text-white">
                   {t("Careers")} </h3>
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
                  {careers.length > 0 ? (
                    // Maping Vacancies
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
                                  {/* Link to vacancy details */}
                                  <Link to={"/vacancy/" + career.id}>
                                    {career.title}
                                  </Link>
                                </span>
                              </h4>
                              <h6 className="text-colored mb-10">
                                <i className="fa fa-calendar"></i>{" "}
                                {t("Closing Date")}: {career.endDate}
                              </h6>
                              {/* FroalaEditorView Component: Used to render data entered by froala editor */}
                              <FroalaEditorView
                              // Retun part of vacancy description (First 300 letters)
                              />
                            </div>
                          </div>
                          <div className={"col-md-2 col-lg-2 " + style}>
                            {/* Link to vacancy details */}
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
                    // No Vacancies Message
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
