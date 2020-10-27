import React,{Component} from 'react';
import Header from '../sub_page_header';
import { login } from '../../repository';
import Registration from './Registration'
import { Link  } from 'react-router-dom';
import  {withTranslation}  from 'react-i18next'
import i18n from 'i18next'
import 'react-notifications/lib/notifications.css';
import NotificationSystem from 'react-notification-system';

/**
 * This Component display Login page 
 * @component
 * @see http://sadagaat-uk.org/login
 */
class Login extends Component{
  notificationSystem = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
                  email: "",
                  password: "",
                  loading:false,
                  success_reset:'',
                
                }                 
            }

            componentDidMount(){
              const {t , history} = this.props
                // To show notiication with state in the props that state returd after successful reset passwoed
              if (this.props.location.state !== undefined) {
              let successPassworddReset  =  this.props.location.state.referrer 
             
              const notification = this.notificationSystem.current;
                  notification.addNotification({
                    title: t('Reset Password'),
                    message: t(successPassworddReset),
                    level: 'success',
                    //dismissible:'none',
                    autoDismiss:8,
                    position:'tc',

                  });
              history.replace("/login")
            }
          
             }
             // to show notification after successful registration
             componentDidUpdate()
             {
                const {t , history} = this.props
                if (this.props.location.state !== undefined ) 
                {
                  let successPassworddReset  =  this.props.location.state.referrer 
              
                  const notification = this.notificationSystem.current;
                      notification.addNotification({
                        title:t('Registration'),
                        message: t(successPassworddReset),
                        level: 'success',
                        //dismissible:'none',
                        autoDismiss:8,
                        position:'tc',

                      });
                  history.replace("/login")
                // replace the tab after registration to login tab
                  window.$('.nav-tabs a[href="#login-tab"]').tab('show');

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
    const {history} = this.props

    e.preventDefault();
    // send credential to login
     login(this.state)
      .then(data =>{ 

        this.setState({loading:true})
        setTimeout(() => 
        {
          this.setState({ loading: false });
        }, 2000)
        window.location = "/"
    
    })
    
    
    .catch(err =>{
      console.log(err.message)
      let message;
        if (err.message === 'Request failed with status code 500')
          message = 'username or Password not correct'
          else if (err.message === 'Network Error')
           message = 'Network Error'
           else 
           message = 'something went wrong try again later'
        this.setState({
          
          loading:true

        })
        setTimeout(() => {
          this.setState({ loading: false,
            errorMessage: message,
            iconClass:'fa fa-times-circle',
            styleClass:'error-msg',
             password: ""
           });
        }, 2000)
      }
      );
    }
   // to remove notification when click in registration tab
    clearHistory=()=>{
      const notification = this.notificationSystem.current;
      notification.clearNotifications()
    }
   render(){
    const {t} = this.props 
    const folat = i18n.dir()==='rtl'?'right':'left'
    const loading  = this.state.loading
    const message = this.props.location.state
    var style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px',
        },
      },
        Containers: {
          DefaultStyle: {
            position: 'absolute',
            margin:'-25px 5px 5px -190px',
            left:'50%',
            maxWidth:'500px'
          },
      },
      MessageWrapper: {
        DefaultStyle: {
         textAlign:'center'
        }
      },
      Title: {
        DefaultStyle: {
          textAlign:'center'
        },
      }
    }

  
    return(

        <div id="wrapper" className="clearfix">

          <Header name={t('Login/Register')}/>

              <div className="main-content">
                <section>
                  {/* notification after successfull password reseted and registration */}
                <NotificationSystem ref={this.notificationSystem} style={style}/>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8 col-md-offset-2">
                        <ul className="nav nav-tabs">
                          <li className ="active" style = {{ float:`${folat}`}}>
                            <a 
                            href="#login-tab"
                            data-toggle="tab"
                            id = "login"
                            >
                                {t('Login')}
                            </a>
                            </li>
                          <li  style = {{ float:`${folat}`}}>
                            <a href="#register-tab" data-toggle="tab"  onClick = {this.clearHistory}>
                              {t('Register')}
                              </a>
                              </li>
                        </ul>
                        <div className="tab-content">
                          <div className="tab-pane fade in active p-15" id="login-tab">
                            <h4 className="text-gray mt-0 pt-5"> {t('Login')}</h4>
                            <hr />
                               <div className={this.state.styleClass}>
                                 <i className ={this.state.iconClass} style = {{margin:'5px'}}></i> 
                                     {t(this.state.errorMessage)}
                                </div>
                                <form  
                                    role="form" 
                                    name="login-form" 
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
                                    onChange = {this.handleChange} required 
                                    value = {this.state.email}
                                    pattern = '^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,8})(\.[a-z]{2,8})?$'
                                    title = {t("that email address is invalid")}
                                    required = "required"
                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t("that email address is invalid"))}
                                    onInput={function(e) {
                                            e.target.setCustomValidity(t(''))}
                                          }
                                      />
                                </div>
                               </div>
                                
                               
                              <div className="row">
                                <div className="form-group col-md-12">
                                    <label for="form_password">{t('password')}</label>
                                  <input id="form_password"
                                   name="password" 
                                   className="form-control" 
                                   type="password"
                                   value = {this.state.password}
                                    onChange = {this.handleChange}
                                    onInvalid = {(e)=>this.handleFormErrorMessage(e)}
                                    onInput={function(e) {
                                     e.target.setCustomValidity(t(''))}
                                        }
                                    required
                                    />
                                </div>

                              </div>
                              
                              <div className="form-group mt-10">
                                <button type="submit" 
                                className="btn btn-block text-white btn-theme-green btn-lg">
                                     {loading && (
                                          <i
                                            className="fa fa-spinner fa-spin"
                                            style={{ margin: "5px" }}
                                          />
                                        )}
                                  {t('Login')}
                                  </button>
                              </div>
                              <div className={`form-group clear pull-${folat} text-center p-5`}>
                                <Link 
                                  className="text-theme-colored font-weight-600 font-12" 
                                  to="/forgot_password">
                                    {t('Forgot Your Password')}
                                  </Link>
                              </div>
                            
                            </form>
                          </div>
                          <Registration />
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

export default withTranslation()(Login);
