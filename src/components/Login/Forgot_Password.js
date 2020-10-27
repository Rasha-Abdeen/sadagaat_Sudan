import React,{Component} from 'react';
import Header from '../sub_page_header';
import { Link } from 'react-router-dom';
import { forgotPassword , resetPassword} from '../../repository'
import  {withTranslation}  from 'react-i18next'



class ForgotPassword extends Component{

  constructor() {
    super();
    this.state = {
                  email:"",
                  message:'',
                  styleClass:'',
                  iconClass:'',
                  loading:false
                }
    
}
handleFormErrorMessage =(e,message = '')=>{
  const {t} = this.props

  if (e.target.value === '')
  
  e.target.setCustomValidity(t('fill this field'))
  else
  e.target.setCustomValidity(message)
    
  }
   
 
   
   handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    }


   
   handleSubmit = (e) => {
    e.preventDefault();
 
     forgotPassword(this.state)
     .then(response => {this.setState({
                      message:'Please Check your Email to Complete Process',
                      styleClass:'success-msg',
                      iconClass:'fa fa-check fa-2x',
                      loading:true
                       })
                       setTimeout(() => {
                        this.setState({ loading: false });
                      }, 2000)
                       
                      })
     .catch(err => {
              this.setState({loading:true})
              let message;
              if (err.message === 'Request failed with status code 404')
                message = 'email not found'
                else if (err.message === 'Network Error')
                message = 'Network Error'
                else 
                message = 'something went wrong try again later'
              setTimeout(() => {
                this.setState({ loading: false,
                                message: message,
                                iconClass:'fa fa-times-circle',
                                styleClass:'error-msg',
                                loginLink:'Login' 
                              })
              }, 2000)
                 
                }
              );
   // window.location = '/reset_password'
          

    
     

   }
   
  
 
   render(){

    const {t} = this.props
    const loading  = this.state.loading 

    return(

        <div id="wrapper" className="clearfix">

              <div className="main-content">

              <Header name={t('Login/Register')}/>

                <section>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8 col-md-offset-2">
                      
                        <div className="tab-content">
                          <div className="tab-pane fade in active p-15" id="login-tab">
                            

                          

                            <h4 className="text-gray mt-0 pt-5"> {t('Reset Password')}</h4>
                            <p className = {this.state.styleClass}>
                                <i className = {this.state.iconClass} style = {{margin:'5px'}}></i>
                                    {t(this.state.message)}
                              </p>

                            <form  id = 'form'
                                    //data-toggle="validator"
                                    role="form" name="login-form" 
                                    className="clearfix" 
                                    onSubmit ={this.handleSubmit}
                                    >

                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label for="inputEmail">{t('Email Address')}</label>

                                  <input 
                                    id="inputEmail" 
                                    name="email" 
                                    className="form-control"
                                     type="text"
                                     data-error={t("this email address is invalid")}
                                      onChange = {this.handleChange} 
                                      required = 'true'
                                      pattern = '^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,8})(\.[a-z]{2,8})?$'
                                      title = {t("that email address is invalid")} 
                                      onInvalid = {(e)=>this.handleFormErrorMessage(e,t("that email address is invalid"))}
                                      onInput={function(e) {
                                              e.target.setCustomValidity(t(''))}
                                            }
                                      />

                                    <div class="help-block with-errors"></div>
                                </div>
                               </div>
                              <div className="form-group mt-10">
                                
                                <button type="submit" className="btn btn-block text-white btn-theme-green btn-lg">{t('send')}
                                    {loading && (
                                              <i
                                                className="fa fa-spinner fa-spin"
                                                style={{ margin: "5px" }}
                                              />
                                          )}
                                </button>
                                
                              </div>
                            
                            </form>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              </div>
              
              


                  
                    
                    

    )
   }
}

export default withTranslation()(ForgotPassword);