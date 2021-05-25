import React, { useState, useEffect, Component } from "react";
import Header from "../sub_page_header";
import { withTranslation } from "react-i18next";
import i18n from "i18next";
import { Link } from "react-router-dom";
import address from "../utils/address"

class SuccessDonate extends Component {

  constructor(props) {
    super(props);
    this.state = {
     cover:{},
    };
  }
  async componentDidMount() {
    try {
      const fetcher = await window.fetch(`${address()}cover-image/DONATION`,
    {headers: {'accept-language': `${i18n.language}`}
   });
   const response= fetcher.json();
   this.setState({cover:response});
   console.log(" c************over image value ***********************",this.state.cover.status)
        
    } catch (error) {
      console.log(" cant load planned project cover image dur to ",error)
      
    }
  }
  

  async componentWillReceiveProps() {
    try {
      const fetcher = await window.fetch(`${address()}cover-image/DONATION`,
    {headers: {'accept-language': `${i18n.language}`}
   });
   const response= fetcher.json();
   this.setState({cover:response});
   console.log(" c************over image value ***********************",this.state.cover.status)
       
    } catch (error) {
      console.log(" cant load planned project cover image dur to ",error)
      
    }



  }
  render() {
    const { t } = this.props;
    const cover = this.state.cover;
    const checkOverDonation = () => {
      let x = window.location.href;
      console.log(x);
      let y = x.search("totalAmount=");
      let z = x.search("&sadgaatAmount=");
      let SadagatAmountStart = z + 15;
      let totalAmount = x.slice(y + 12, z);
      let sadagatAmount = x.slice(SadagatAmountStart);
      console.log(sadagatAmount);
      console.log(totalAmount);
      if (sadagatAmount > 0) {
        return <p>"{t("Over Donation Msg")}"</p>;
      }
    };
    const overDonationMessage = checkOverDonation();
    return (
      <div>
{
      (cover !== undefined)
      ?
       <section style={{ 
         //backgroundImage: 'url(' + "https://images.wallpaperscraft.com/image/couple_mountains_travel_125490_1280x720.jpg"+ ')',
        backgroundImage: 'url(' + `${address()}cover-image/DONATION` + ')'
        
       }}  className=" inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Donate")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       :
       <section className=" projects-bg-img inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Donate")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       }

        <section>
          <div className="container">
            <div className="section-content">
              <div className="jumbotron text-center ">
                <div>
                  <i className="fa fa-check-circle fa-5x  text-primary"></i>
                </div>
                <h1 className="display-3">{t("Thank You!")}</h1>
                <div className="">
                  <h3>{t("Donation was completed successfully")}</h3>
                </div>
                {overDonationMessage}
                {/* <hr /> */}
                <p className="lead mt-5">
                  <Link className="btn btn-primary" to="/" role="button">
                    {t("Continue to homepage")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation()(SuccessDonate);
