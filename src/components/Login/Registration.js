import React,{Component} from 'react';
import {register} from '../../repository';
import{Redirect} from 'react-router-dom'
import i18n from 'i18next'
import { withTranslation } from 'react-i18next'
import {animateScroll as scroll } from "react-scroll";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class Registration extends Component{

  constructor() {
    super();
    this.state = { 
      form:{
   
            firstName:'',
            lastName:'',
            userName: '',
            password: '',
            phoneNumber:'',
            gender:'MALE',
            dateOfBirth:'',
          },
      response:
      {
        message:'',
        success: null,
        styleClass:'',
        iconClass:'',
        loginLink:'',
        confirmPassword:'',
        errorPassword:false
        
      },
      dob: moment()
    };
  }
/**
 * 
 * @param {object} e input field
 * @param {string} message  custom message
 */
 handleFormErrorMessage =(e,message = '')=>{
  const {t} = this.props

  if (e.target.value === '')
  
  e.target.setCustomValidity(t('fill this field'))
  else
  e.target.setCustomValidity(message)
    
  }
   
   handleChange = (e)=> 
   {
      this.setState({
        form:{
          ...this.state.form,
        [e.target.name]: e.target.value
        }
      })   
    }

    handleConfirmPassword = (e)=>{
       const  confirm = e.target.value
       const password = this.state.form.password
       if( confirm === password){
        this.setState({
          response:{
             ...this.state.response,
             confirmPassword:'fa fa-check alert-success',
             errorPassword:false

          }
        })
       }
     else{
      this.setState({
        response:{
           ...this.state.response,
           confirmPassword:'fa fa-times-circle alert-danger',
           errorPassword:true
        }
      })
     }
      
       
    }

   
   handleSubmit=(e) => 
   {

        e.preventDefault();
       let errorconfirm = this.state.response.errorPassword
       if (!errorconfirm){

          register(this.state.form)
          
          .then(token => {
            this.setState({
              response:{
                ...this.state.response,
                success : 1,
              message:'Registerd Successfully',
              styleClass:'success-msg',
              iconClass:'fa fa-check fa-2x',
              loginLink:'Login'
              }
            })
            this.clearState()
            
          }
          )
       
       .catch(err => {
        console.log(err)
        let message;
        if (err.message === 'Request failed with status code 403')
          message = 'This Email Already Exist'
          else if (err.message === 'Network Error')
           message = 'Network Error'
           else 
           message = 'something went wrong try again later'
          
            this.setState({
              response:{
                ...this.state.response,
                success:0,
                message: message,
                iconClass:'fa fa-times-circle',
                styleClass:'error-msg'
              }
           })
          }
        )


                     
        }else{
          this.setState({
            response:{
             ...this.state.response,
             message:'Pasword Not Matching',
             styleClass:'error-msg',
             iconClass:'fa fa-times-circle'
            }
          })
        }
        scroll.scrollTo(70);
    }
    clearState=()=>{
      this.setState({
        form:{
          ...this.state.form,
          firstName:'',
          lastName:'',
          userName: '',
          password: '',
          phoneNumber:'',
          gender:'MALE',
          dateOfBirth:'',
        }
      })
      document.getElementById('confirmPassword').value = ''

    }
   
   render(){
      const {t} = this.props
      const styleClass = i18n.dir() ==='rtl'?'pull-right ml-10':'pull-left mr-10'

  
    return(
                   
                   <div className="tab-pane fade in  p-15" id="register-tab">


                            <form 
                            
                                  name="reg-form" 
                                  id = 'reg-form1'
                                  className="register-form" 
                                  role="form"
                                  onSubmit={this.handleSubmit}
                                  
                                
                              >
                              <div className="icon-box mb-0 p-0">
                                <span className={`icon icon-bordered icon-rounded icon-sm ${styleClass} mb-0`}>
                                  <i className="pe-7s-users"></i>
                                </span> 
                                  <h4 className="text-gray pt-10 mt-0 mb-30">{t('Register Now')}</h4>
                              </div>
                             
                                {this.state.response.success === 1 ?

                                  (
                                      <Redirect 
                                      to = {{
                                          pathname: "/login",
                                         state:{referrer: this.state.response.message}
                                          }}  />
                                      ) :

                                    (<div className = {this.state.response.styleClass}>
                                    <i className = {this.state.response.iconClass} style = {{margin:'5px'}}/>
                                    {t(this.state.response.message)}
                                    
                                    </div>) 
                                }
  
                              <div className="row">
                                <div className="form-group required col-md-6">
                                  <label className = "control-label" for="first-name">{t('First Name')}</label>

                                  <input
                                      id="firs-name" 
                                      name="firstName" 
                                      className="form-control" 
                                      type="text"
                                      pattern = '^([A-Za-z\u0621-\u064A]+)(\s[A-Za-z\u0621-\u064A]+)?$'
                                      title = {t('Please enter a valid name')}
                                      required = "required"
                                      onChange = {this.handleChange}
                                      value = {this.state.form.firstName}
                                      onInvalid = {(e)=>this.handleFormErrorMessage(e,t('Please enter a valid name'))}
                                      onInput={function(e) {
                                          e.target.setCustomValidity(t(''))}}
                                      

                                      
                                  />
                                </div>
                                <div className="form-group required col-md-6">
                                  <label className = "control-label">{t('Last Name')}</label>

                                  <input 
                                        id="last-Mame" 
                                        name="lastName"  
                                        className="form-control"  
                                        type="text" 
                                        pattern = '^([A-Za-z\u0621-\u064A]+)(\s[A-Za-z\u0621-\u064A]+)?$'
                                        title = {t('Please enter a valid name')}                                    
                                        onChange = {this.handleChange}
                                        value = {this.state.form.lastName}
                                        required = "required"
                                        onInvalid = {(e)=>this.handleFormErrorMessage(e,t('Please enter a valid name'))}
                                        onInput={function(e) {
                                            e.target.setCustomValidity(t(''))}}
                               
                                   />
                                       
                                </div>

                                
                              </div>
                              <div className="row">
                                
                                <div className="form-group required col-md-6">
                                  <label className = "control-label">{t('Email Address')}</label>

                                  <input 
                                      name="userName" 
                                      className="form-control" 
                                      type="text" id="inputEmail"
                                      onChange = {this.handleChange}
                                      value = {this.state.form.userName}
                                      pattern = '^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,8})(\.[a-z]{2,8})?$'
                                      title = {t("that email address is invalid")}
                                      required = "required"
                                      onInvalid = {(e)=>this.handleFormErrorMessage(e,t("that email address is invalid"))}
                                        onInput={function(e) {
                                            e.target.setCustomValidity(t(''))}}
                                       
                                      
                                    />
                                </div>
                                <div className="form-group required col-md-6">
                                                <label for="" className="float-left control-label">{t('Gender')}</label>
                                                <select 
                                                className="form-control float-right" 
                                                name ="gender" 
                                                value ={this.state.form.gender} 
                                                onChange = {this.handleChange}
                                                >
                                                    <option value = "FEMALE">{t('FEMALE')}</option>
                                                    <option value = "MALE">{t('MALE')}</option>
                                                </select>
                                            </div>
                                      </div>
                              <div className="row">
                                
                                <div className="form-group required col-md-6">
                                  <label className = "control-label">{t('Phone')}</label>
                                  <small className = "font-12 text-gray"></small>

                                  <input 
                                      name="phoneNumber" 
                                      className="form-control" 
                                      type="tel" 
                                      pattern="^(0[0-9]{9})|(00[0-9]{12})$"
                                      title = {t('Enter a valid phone number with 10 number or 14')}
                                      onChange = {this.handleChange}
                                      value ={this.state.form.phoneNumber} 
                                      required = "required" 
                                      onInvalid = {(e)=>this.handleFormErrorMessage(e,t('Enter a valid phone number with 10 number or 14'))}
                                      onInput={function(e) {
                                          e.target.setCustomValidity(t(''))}}

                                      
                                    />
                                </div>
                                <div className="form-group required col-md-6">
                                    <label className = "control-label">{t('Date Of Birth')}</label>

                                  <input 
                                      name="dateOfBirth" 
                                      className="form-control" 
                                      type="date" 
                                      onChange ={this.handleChange}
                                      required = "required" 
                                      value ={this.state.form.dateOfBirth}
                                      max={moment().format("YYYY-MM-DD")}  
                                      title = {t('enter date no later than')+ moment().format("YYYY-MM-DD")}
                                      onInvalid = {(e)=>
                                        this.handleFormErrorMessage(e,t('enter date no later than')+ moment().format("YYYY-MM-DD"))
                                            }
                                      onInput={function(e) {
                                         e.target.setCustomValidity(t(''))}}  
                                    />
                                </div>

                                  </div>

                              <div className="row">
                                <div className="form-group required col-md-6  has-feedback">
                                  <label className = "control-label" for="form_choose_password"> {t('password')}</label>

                                  <input
                                      id="inputPassword" 
                                      name="password" 
                                      className="form-control" 
                                      type="password"
                                      minlength="8"
                                      required = "required"
                                      onChange = {this.handleChange}
                                      value ={this.state.form.password}
                                      pattern = '^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,20}$'
                                      onInvalid = {(e)=>this.handleFormErrorMessage(e,t('your password should not contain whitespace ,contains at least one digit,contains at least one capital letter, at least 8 characters and at most 20 characters'))}
                                      onInput={function(e) {
                                          e.target.setCustomValidity(t(''))}}

                                      /> 

                                </div>
                                <div className="form-group required col-md-6  has-feedback" >
                                  <label className = "control-label">{t('Re-enter Password')}</label>
                                  <i className = {this.state.response.confirmPassword}></i>


                                  <input 
                                        id="confirmPassword" 
                                        name="re_enter_password"  
                                        className="form-control"  
                                        type="password" 
                                        minlength="8"                                     
                                        data-match="#inputPassword" 
                                        data-match-error={t('Not Matching')} 
                                        // placeholder={t("Confirm")}
                                         required = "required"
                                         onChange = {this.handleConfirmPassword}
                                   />
                                </div>

                                <div className="form-group">
                                <button className="btn text-white btn-theme-green btn-lg btn-block mt-15" type="submit">{t('Register')}</button>
                              </div>
                              </div>
                             
                            </form>
              
                       
            </div>
                  
                    
                    

    )
   }
}

export default withTranslation()(Registration);
