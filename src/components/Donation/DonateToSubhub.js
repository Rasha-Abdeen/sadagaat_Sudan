import React ,{ useState, useEffect, Component }  from 'react';
import Header from '../sub_page_header'
import address from '../utils/address';
import axios from 'axios';
import { render } from '@testing-library/react';
import i18n from 'i18next'
import  {withTranslation}  from 'react-i18next'
import DonationTable from './DonationTable';




class DonateToSubhub extends Component {

  constructor(props) {
    super(props);
    this.state = 
    {
                  
      subhub_id: this.props.match.params.hubId,
      amount: 0,
      message:'',
      iconClass:'',
      styleClass:'',
      currency:"SDG",
      loading: false,
      subHubs:[],
      cover:{},
      };
}

 componentDidMount =() =>{

    let id = this.props.match.params.subhub_id
    console.log(this.props.match.params.subhub_id) 

    this.setState({subhub_id:id})
 

    axios.get(`${address()}subHubs/${id}`,{headers: {'accept-language': `${i18n.language}`}})

    .then(response => {

         const subHubs = response.data
          this.setState({subHubs})

    }).catch(error => {
        this.setState({
          message:error.message
        })
    })

    try {
      const fetcher =  window.fetch(`${address()}cover-image/DONATION`,
    {headers: {'accept-language': `${i18n.language}`}
   });
   const response= fetcher.json();
   this.setState({cover:response});
   console.log(" c************over image value ***********************",this.state.cover.status)
       
    } catch (error) {
      console.log(" cant load planned project cover image dur to ",error)
      
    }

}
async componentWillReceiveProps(){

  let id = this.state.subhub_id

  axios.get(`${address()}subHubs/${id}`,{headers: {'accept-language': `${i18n.language}`}})

  .then(response => {

       const subHubs = response.data
        this.setState({subHubs})

  }).catch(error => {
      this.setState({
        message:error.message
      })
  })

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


  handleChange=(e)=>{
          this.setState({
            [e.target.name]:e.target.value
          })

      }

  handleSubmite =(e)=>{

        e.preventDefault()
            let id = this.state.subhub_id
            const data = 
            {
              sid :id,
              amount:this.state.amount,
              currency:this.state.currency
            }
          console.log(data)
          this.setState({loading:true})

          axios.post(`${address()}donate`,data)

          /** syber bay payment feedback */

          .then(response =>{

            if (response.data.responseCode === 1)
            {
                window.location = response.data.paymentUrl

                setTimeout(() => {
                  this.setState({ loading: false });
                }, 2000)

            } else if(response.data.responseCode === 2)
            {
              this.setState({

                  message :"Please Enter Valid Amount",
                  iconClass:'fa fa-times-circle',
                  styleClass:'error-msg',
                  donateTo:'Sadagaat', 
                })
              } else
              {
                this.setState(
                  {
                    message :"something went wrong try again later",
                    iconClass:'fa fa-times-circle',
                    styleClass:'error-msg',
                    donateTo:'Sadagaat', 
                  })

              }
            
              }) .catch(err => {
                this.setState({
                  loading:true 
                })
                let message;
                  if (err.message === 'Network Error')
                  message = 'Network Error'
                  else 
                  message = 'something went wrong try again later'
               
                  setTimeout(() => {
                        this.setState({ loading: false,
                                        message:message,
                                        iconClass:'fa fa-times-circle',
                                        styleClass:'error-msg'
                                      });
                      }, 2000)
                  })
   
  }


   render(){
    const{t}= this.props
    const loading  = this.state.loading;
    const cover = this.state.cover;



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
      <div class="container">
        <div class="section-content">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-5">
            
              <h3 class="mt-0 line-bottom">{t('Donate Through SyberPay')}<span class="font-weight-300"></span></h3>
                  <p className={this.state.styleClass}>
                        <i className ={this.state.iconClass} style = {{margin:'5px'}}>
                        </i>
                        {t(this.state.message)}
                      </p>
              <form
                  data-toggle="validator"
                  role="form"
                  id="popup_paypal_donate_form_onetime_recurring"
                  onSubmit = {this.handleSubmite}>


                    <div className="row">
                    <div className="col-sm-12">
                    <div className="form-group mb-20">

                        <input
                              name="name" 
                              className="form-control"
                              type="readOnly" 
                              value = {this.state.subHubs.name}
                              style = {{fontWight:'bold'}}
                              readonly
                            />
                    </div>
                   </div>
                   </div>

                    <div className="row">
                    <div className="col-sm-9">
                    <div className="form-group mb-20">
                        <label><strong>{t('How much do you want to donate?')}</strong></label>

                        <input
                              name="amount" 
                              className="form-control"
                              type="number" 
                              onChange ={this.handleChange}
                              min="1"
                              onInvalid = {function(e) {
                                e.target.setCustomValidity(t('Enter a valid amount'))}}
                              onInput={function(e) {
                                   e.target.setCustomValidity(t(''))}}
                              required
                            />
                            
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                  
                      <div className="col-sm-3">
                      <div className="form-group mb-20">
                            <label><strong> <br/> </strong></label>

                        <select
                              name="currency" 
                              className="form-control"
                              onChange ={this.handleChange}
                            >
                              <option name ="currency">SDG</option>
                          </select>
                        </div>
                      </div>
                      </div>
                    

                    <div className="col-sm-12">
                      <div className="form-group">

                        <button type="submit" 
                          className="btn btn-flat btn-dark btn-theme-colored mt-10 pl-30 pr-30"
                          data-loading-text="Please wait...">
                            {loading && (
                                          <i
                                            className="fa fa-spinner fa-spin"
                                            style={{ margin: "5px" }}
                                          />
                                        )}
                            
                            {t('Donate')} {t('Now!')}
                        </button>
                      </div>
                    </div>
                </form>     
              </div>
                  <DonationTable />
            </div>
          </div>
        </div>
      </section>


             </div>
    )
}
}

export default withTranslation()(DonateToSubhub);
