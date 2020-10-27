import React ,{ useState, useEffect, Component }  from 'react';
import Header from '../sub_page_header'
import address from './../utils/address';
import axios from 'axios';
import { render } from '@testing-library/react';
import i18n from 'i18next'
import  {withTranslation}  from 'react-i18next'
import DonationTable from './DonationTable'

/**
 * This component display donation page  when you click button on the home page 
 * @see http://sadagaat-uk.org/donate
 * @component
 */
class Donate extends Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      id:null,        
      amount: "",
      currency:"SDG",
      message:'',
      iconClass:'',
      styleClass:'',
      loading: false,
      hubs:[],
      render: false,

    }
}
/**
 * Get hub list from API
 */
   async componentDidMount () {

     await axios.get(`${address()}hubs`, {headers: {'accept-language': `${i18n.language}`}})
        .then(response => {
          const hubs = response.data
          this.setState({hubs})

          })

      
        .catch(error => {
          console.log(error);
        })
        setTimeout(function() { 
          this.setState({render: true}) }.bind(this), 10)

  }
  /** 
   * Get hub when language cahangeed
   */
  async componentWillReceiveProps(){

    axios.get(`${address()}hubs`, {headers: {'accept-language': `${i18n.language}`}})
        .then(response => {
          const hubs = response.data
          this.setState({hubs})
          })

      
        .catch(error => {
          console.log(error);
        })
  }

/**
 * 
 * @param {object} e event of input field
 * @param {String} message  message custom validation message 
 */
  handleFormErrorMessage =(e,message = '')=>{
    const {t} = this.props
  
    if (e.target.value === '' && message ==='')
    
    e.target.setCustomValidity(t('select a hub from the list'))
    else
    e.target.setCustomValidity(message)
      
    }

    handleChange=(e)=>{
    
      this.setState({
        [e.target.name]:e.target.value,
      })
  }

       handleSubmite =(e)=>{
            e.preventDefault()
            const id = this.state.id

          const data = {
              hid : id ,
              amount:this.state.amount,
              currency:this.state.currency
            }
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
                this.setState({loading:true })

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
    let renderContainer = false
     const{t}= this.props
     const loading  = this.state.loading;


    return (

    <div>
      <Header name={t('Donate')}/>

      <section>
        <div class="container">
          <div class="section-content">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-5">
               
                <h3 class="mt-0 line-bottom">{t('Donate Through SyberPay')}
                    <span class="font-weight-300"></span>
                </h3>
                   <p className={this.state.styleClass}>
                     <i className ={this.state.iconClass} style = {{margin:'5px'}}>
                     </i>
                    {t(this.state.message)}
                   </p>
                  <form
                       //data-toggle="validator"
                        role="form"
                       id="popup_paypal_donate_form_onetime_recurring"
                       onSubmit = {this.handleSubmite}
                    >

                      <div className="row">
                       <div className="col-sm-12">
                        <div className="form-group mb-20">
                          <label><strong>{t('I Want to Donate for')}</strong></label>

                          <select    
                              name="id"
                              className="form-control"
                              onChange ={this.handleChange}
                              onInvalid = {(e)=> this.handleFormErrorMessage(e)}
                              onInput={function(e) {
                                e.target.setCustomValidity(t(''))}}
                              required
                              >
                                <option value = ''>{t('Select Hub')}...</option>
                              {this.state.hubs.map(hub =>
                              <option key={hub.id} value = {hub.id} >

                                {hub.name}
                                </option>
                              )}
                          </select>
                        </div>
                      </div>
                      </div>

                      <div className="row">
                   
                      <div className="col-sm-9">
                       <div className="form-group mb-20">
                          <label><strong>{t('How much do you want to donate?')}</strong></label>

                           <input
                               id = 'id'
                                name="amount" 
                                className="form-control"
                                type="number" 
                                min="1"
                                onChange ={this.handleChange}
                                onInvalid = {(e)=> this.handleFormErrorMessage(e,t('Enter a valid amount'))}
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

export default withTranslation()(Donate);
