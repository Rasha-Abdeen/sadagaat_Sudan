import React ,{Component}from 'react';
import Header from '../sub_page_header';
import Axios from 'axios';
import {submit_volunteer_data, logout} from '../../repository'
import {animateScroll as scroll } from "react-scroll";
import  {withTranslation}  from 'react-i18next'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * This Component diplay volunteer form 
 * @component
 * @see http://sadagaat-uk.org/volunteerForm
 */
class VolunteerForm extends Component{ 

    constructor() {
        super();
     
        this.state = { 
            form:{
            name:'',
            gender:'FEMALE', 
            ageGroup:'15-25',
            phoneNumber:'',
            secondPhoneNumber:'',
            email:'',
            bloodGroup:'AB',
            educationLevel:'Secondary School',
            languages:'',
            studyField:'',
            job:'',
            country:'',
            city:'',
            cityProjects:'',
            volunteeredBefore:'',
            heardAboutSadagaat:'',
            volunteerTime:'',
            vacationTime:'',
            countryProjects:'',
            volunteeredPeriod:'',
            volunteeredProjects:'',
            receiveEmails:''
            },
            response:{
                message:'',
                styleClass:''
                
            },
            dob: moment()
          
            /*there is some quistion not found in bakend and mobile app  */
         
         }
        }
        clearState =()=>{
            this.setState({
                form:{
                    ...this.state.form,
                    name:'',
                    gender:'FEMALE', 
                    ageGroup:'15-25',
                    phoneNumber:'',
                    secondPhoneNumber:'',
                    email:'',
                    bloodGroup:'AB',
                    educationLevel:'Secondary School',
                    languages:'',
                    studyField:'',
                    job:'',
                    country:'',
                    city:'',
                    cityProjects:'',
                    volunteeredBefore:'',
                    heardAboutSadagaat:'',
                    volunteerTime:'',
                    vacationTime:'',
                    countryProjects:'',
                    volunteeredPeriod:'',
                    volunteeredProjects:'',
                    receiveEmails:''

                }
            })

        } 

/**
 * This function validate from and return custom message fill this field
 * @param {object} e event of input 
 * @param {string} message that return from handleFormErrorMessage 
 * @returns {'fill this field'} custom message
 * */
 
    handleFormErrorMessage =(e,message = '')=>{
        const {t} = this.props
        
        if (e.target.value === '')
        
        e.target.setCustomValidity(t('fill this field'))
        else
        e.target.setCustomValidity(message)
            
        }

        /**
     * this function set the value of input form in the state
     * @param {object} e  event from input field
     * @example name:'ahmed'
     */
       handleChange = (e)=> {
        this.setState({
            form: {
            ...this.state.form ,
            [e.target.name]:e.target.value,
          }
           
            })
        }
       
        /**
         * This function pass form data  to api through submit_volunteer_data  function and recive mresponse (message) 
         * @param {object} e  submit button
         * 
         */
       
        handleSubmit = (e) => {
        e.preventDefault();
        submit_volunteer_data(this.state.form)

        .then(response => {
                this.clearState()
            this.setState({
                response:{
                    ...this.state.response ,
                message:'Your Form Submitted Successfully',
                styleClass:'success-msg'
            }
            })
           
        })
      
        .catch(err => {
           // check message returned from API
            const message = ''
            if (err.message === 'Request failed with status code 401')
            {
                logout()
                message = 'Please Login Again'
            }

            if (err.message ==='Network Error')
                message = 'Network Error'
            else 
                message = "something went wrong try again later"
            //const message = err.message ==='Network Error'?err.message : "something went wrong try again later"
            this.setState({
                response:{
                    ...this.state.response ,
                        message:message,
                        styleClass:'error-msg'
                }
        })
    })
                     scroll.scrollTo(70);
    }
       
       

    render(){
        const {t}= this.props
     
return(
    <React.Fragment>
        <div className="main-content">

        <Header name={t('Volunteer Registration')} coverImage = {'volunteer-bg-img'}/>


            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="tab-content">
                                <div className="tab-pane active p-15" id="register-tab">

                                    <form 
                                            id="reg-form" 
                                            name = 'volunteer-form'
                                            className="register-form" 
                                            onSubmit ={this.handleSubmit}
                                         >           
                                        <div className="icon-box mb-0 p-0">
                                            <h4 className="text-gray pt-10 mt-0 mb-30">
                                                {t('Fill Your Volunteering Form')}
                                            </h4>
                                        </div>
                                       
                                        <div className={`${this.state.response.styleClass} bold`} role="alert">
                                               <p> {t(this.state.response.message)} </p>
                                        </div>
                                        
                                        <p className="text-gray"></p>

                                        <div className ="row">
                                            <div className="form-group required col-md-12 ">
                                                <label className = "control-label">{t('name')}</label>

                                                <input 
                                                    name="name" 
                                                    className="form-control" 
                                                    type="text"
                                                    onChange ={this.handleChange}
                                                    pattern = '^([A-Za-z\u0621-\u064A]+)\s([A-Za-z\u0621-\u064A]+)(\s[A-Za-z\u0621-\u064A]+)?(\s[A-Za-z\u0621-\u064A]+)?([A-Za-z\u0621-\u064A\s]+)?$'
                                                    title = {t('Please enter your fullName')}
                                                    value  = {this.state.form.name}
                                                    required="required"
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('Please enter your fullName'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group required col-md-5">

                                                <label for="" className="control-label float-left">{t('Gender')}</label>

                                                <select 
                                                    name="gender"
                                                    className ="form-control float-right" 
                                                    onChange ={this.handleChange}
                                                    value= {this.state.form.gender}
                                                    required = "required"
                                                
                                                >
                                                    <option name ='gender'>{t("FEMALE")}</option>
                                                    <option name ="gender">{t('MALE')}</option>
                                                </select>
                                            </div>
                                            

                                            <div className="form-group required col-md-7">
                                                <label className = "control-label">{t('Age Range')}</label>

                                                <div className="form-check- form-inline">
                                                    <div className="radio-inline ">

                                                        <input 
                                                            className="form-check-input form"
                                                            id = "1"
                                                            type="radio"
                                                            name="ageGroup" 
                                                            value ='15-25'
                                                            checked={this.state.form.ageGroup === '15-25'}
                                                            onChange ={this.handleChange}
                                                            
                                                        />

                                                        <label className="form-check-label" for="1">
                                                            15-25
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">
                                                        <input
                                                            id='2'
                                                            className="form-check-input" 
                                                            type="radio"
                                                            name="ageGroup" 
                                                            value ='25-35'
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.ageGroup === '25-35'}
                                                            
                                                            
                                                        />
                                                        <label className="form-check-label" for="2">
                                                            25-35
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">

                                                        <input 
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="ageGroup" 
                                                            id="3" 
                                                            value='35-45'
                                                            onChange = {this.handleChange}
                                                            checked={this.state.form.ageGroup === '35-45'}
                                                            
                                                            
                                                        />
                                                        <label className="form-check-label" for="3" >
                                                            35-45
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">

                                                        <input
                                                            className="form-check-input" 
                                                            type="radio"
                                                            name="ageGroup"
                                                            id="4" 
                                                            value ='45-'
                                                            checked={this.state.form.ageGroup === '45-'}
                                                            onChange ={this.handleChange}
                                                            
                                                        />

                                                        <label className="form-check-label" for="3">
                                                            45-
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                      
                                        <div className="row">
                                            <div className="form-group required col-md-6">
                                                <label for="" className = "control-label">{t('Phone')}.</label>
                                                    <small className = "font-12 text-gray">   </small>

                                                <input 
                                                   
                                                    name="phoneNumber"
                                                    className="form-control"
                                                    type="tel"
                                                    onChange ={this.handleChange}
                                                    pattern="^(0[0-9]{9})|(00[0-9]{12})$"
                                                    title = {t('Enter a valid phone number with 10 number or 14')}
                                                    value = {this.state.form.phoneNumber}
                                                    required="required"
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('Enter a valid phone number with 10 number or 14'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}}
                                                 />
                                            </div>
                                            <div className="form-group required col-md-6">
                                                <label>{t('Additional Phone')}</label>
                                                <small className = "font-12 text-gray">   </small>


                                                <input
                                                    name="secondPhoneNumber"
                                                    className="form-control"
                                                    type="tele"
                                                    onChange ={this.handleChange}
                                                    value = {this.state.form.secondPhoneNumber}
                                                    pattern="^(0[0-9]{9})|(00[0-9]{12})$"
                                                    title = {t('Enter a valid phone number with 10 number or 14')}
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('Enter a valid phone number with 10 number or 14'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}
                                                        }
                                                    />
                                                </div>
                                                </div>
                                            <div className="row">
                                            <div className="form-group required col-md-8">
                                                <label for="" className = "control-label">{t('E-Mail')}</label>
                                                
                                                <input 
                                                    id="" 
                                                    name="email"
                                                    className="form-control"
                                                    type="text"
                                                    onChange ={this.handleChange}
                                                    pattern = '^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,8})(\.[a-z]{2,8})?$'
                                                    title = {t("that email address is invalid")}
                                                    value ={this.state.form.email}
                                                    required="required"
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('that email address is invalid'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}} 
                                                />
                                            </div>
                                            <div className="form-group required col-md-4">
                                                <label className = "control-label">{t('Blood Group')}</label>

                                                <select 
                                                    name="bloodGroup"
                                                    className="form-control float-right" 
                                                    value ={this.state.form.bloodGroup}
                                                    onChange={this.handleChange}>
                                                    <option >AB</option>
                                                    <option >A</option>
                                                    <option >B</option>
                                                    <option >O</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group required col-md-6">
                                                <label>{t('Educational Level')}</label>

                                                <select
                                                    name ='educationLevel'
                                                    className="form-control float-right"  
                                                    value ={this.state.form.educationLevel}
                                                    onChange ={this.handleChange}

                                                 >
                                                    <option>{t('Secondary School')}</option>
                                                    <option >{t('University Degree')}</option>
                                                </select>
                                            </div>
                                            <div className="form-group required col-md-6">
                                                <label>{t('Languages you Know?')}</label> 

                                                <input 
                                                    name="languages"
                                                    className="form-control" 
                                                    type="text"
                                                    pattern = '^[^\s].+[^\s]$'
                                                    onChange ={this.handleChange}                                                    
                                                    value = {this.state.form.languages}
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('your value must not be white space'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}}
                                                    
                                                />
                                            </div>
                                            </div>

                                        <div className="row">
                                            <div className="form-group required col-md-6">
                                                <label>{t('What did you Study(or are studding)?')}</label>

                                                <input 
                                                    name="studyField"
                                                    className="form-control" 
                                                    type="text"
                                                    pattern = '^[^\s].+[^\s]$'
                                                    value = {this.state.form.studyField}
                                                    onChange ={this.handleChange}
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('your value must not be white space'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}}
                                                />
                                            </div>
                                            
                                            <div className="form-group required col-md-6">
                                                <label>{t('If you currently work , what is your job?')}</label>

                                                <input 
                                                    name="job" 
                                                    className="form-control"
                                                    type="text"
                                                    pattern = '^[^\s].+[^\s]$'
                                                    value = {this.state.form.job}
                                                    onChange ={this.handleChange}
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('your value must not be white space'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}}
                                                    
                                                />
                                            </div>
                                         
                                        </div>
                                        <div className="row">
                                            <div className="form-group required col-md-6">
                                                <label for="">
                                                    {t('In which State do you live ?')}
                                                </label>
                                                <input 
                                                    id="" 
                                                    name="country"
                                                    className="form-control"
                                                    type="text"
                                                    pattern = '^[^\s].+[^\s]$'
                                                    value = {this.state.form.country}
                                                    onChange ={this.handleChange}
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('your value must not be white space'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}}
                                                    
                                                    
                                                 />
                                            </div>
                                            <div className="form-group required col-md-6">
                                                <label>{t('In which city?')}</label>

                                                <input 
                                                    id="city" 
                                                    name="city"
                                                    className="form-control"
                                                    type="text"
                                                    value = {this.state.form.city}
                                                    pattern = '^[^\s].+[^\s]$'
                                                    onChange ={this.handleChange}
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('your value must not be white space'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}}
                                                    
                                                    
                                                />
                                            </div>
                                            <div className="form-group required col-md-6">
                                                <label>
                                                    {t('Did Sadagaat executed any projects in your State?')}
                                                </label>
                                                <div className="form-check- form-inline">
                                                    <div className="radio-inline">

                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="cityProjects"  
                                                            value="yes"
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.cityProjects === 'yes'}
                                                            
                                                        />
                                                        <label className="form-check-label" >
                                                             {t('Yes')}  
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio"
                                                            name="cityProjects" 
                                                            id=""
                                                            value='no'
                                                            onChange ={this.handleChange}
                                                            pattern = '^[^\s].+[^\s]$'
                                                            checked={this.state.form.cityProjects === 'no'}
                                                            
                                                        />
                                                        <label className="form-check-label" for="">
                                                              {t('No')}
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">

                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio"
                                                            name="cityProjects"
                                                            value='dont'
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.cityProjects === 'dont'}
                                                            
                                                        />
                                                        <label className="form-check-label" for="">
                                                            {t('I Dont Know')}
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            
                                         <div className="form-group required col-md-6">
                                                <label>
                                                    {t('Did you volunteer in Sadagaat before?')}
                                                </label>
                                                <div className="form-check- form-inline">
                                                    <div className="radio-inline">

                                                        <input 
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="volunteeredBefore" 
                                                            id="1" 
                                                            value='yes'
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.volunteeredBefore === 'yes'}
                                                            
                                                        />
                                                        <label className="form-check-label" for="1">
                                                            {t('Yes')}
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="volunteeredBefore" 
                                                            value='no'
                                                            onChange = {this.handleChange}
                                                            checked={this.state.form.volunteeredBefore === 'no'}

                                                            
                                                        />
                                                        <label className="form-check-label" for="">
                                                           {t('No')}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group required col-md-6">
                                                <label for="">{t('If yes , Since when?')}</label>
                                                <input 
                                                    id = 'date'
                                                    name="volunteerTime"
                                                    className="form-control"
                                                    type="date"
                                                    value = {this.state.form.volunteerTime}
                                                    onChange ={this.handleChange}
                                                    max={moment().format("YYYY-MM-DD")}
                                                    onInvalid = {(e) =>(e,t('enter date no later than')+ moment().format("YYYY-MM-DD"))}
                                                    onInput={function(e) {
                                                         e.target.setCustomValidity(t(''))}}                                                     
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label for="">
                                                    {t('What projects did you participated in with Sadagaat?')}
                                                </label>
                                                
                                                <input 
                                                    id="" 
                                                    name="volunteeredProjects"
                                                    className="form-control" 
                                                    type="text"
                                                    pattern = '^[^\s].+[^\s]$'
                                                    onChange ={this.handleChange}
                                                    value = {this.state.form.volunteeredProjects}
                                                    onInvalid = {(e)=>this.handleFormErrorMessage(e,t('your value must not be white space'))}
                                                    onInput={function(e) {
                                                        e.target.setCustomValidity(t(''))}}
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label>{t('How did you know about Sadagaat?')}</label>
                                                <div className="form-check- form-inline">
                                                    <div className="radio-inline">

                                                        <input 
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="heardAboutSadagaat" 
                                                            id="1"
                                                            value='Friends'
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.heardAboutSadagaat === 'Friends'}
                                                            
                                                        />
                                                        <label className="form-check-label" for="1">
                                                            {t('Friends')}
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">
                                                        <input 
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="heardAboutSadagaat"
                                                            id=""
                                                            value = 'NewsPaper'
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.heardAboutSadagaat === 'NewsPaper'}
                                                        />
                                                        <label className="form-check-label" for="">
                                                        {t('NewsPaper , magazzen')}
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">

                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio"
                                                            name="heardAboutSadagaat" 
                                                            value='Social Media'
                                                            onChange={this.handleChange}
                                                            checked={this.state.form.heardAboutSadagaat === 'Social Media'}
                                                        />
                                                        <label className="form-check-label" for="">
                                                            {t('Social Media')}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <label>
                                                {t('what is the suitable time for you to volunteer in Sadagaat?')}
                                                </label>
                                                <div className="form-check- form-inline">
                                                    <div className="radio-inline">

                                                        <input 
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="volunteeredPeriod"
                                                            id="1"
                                                            value='Morning time'
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.volunteeredPeriod === 'Morning time'}
                                                        />
                                                        <label className="form-check-label" for="1">
                                                            {t('Morning time')}
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio"
                                                            name="volunteeredPeriod"
                                                            value ='Evening time'
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.volunteeredPeriod === 'Evening time'}


                                                        />
                                                        <label className="form-check-label" for="">
                                                            {t('Evening time')}
                                                        </label>
                                                    </div>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label>
                                                    {t('Would you like us to send a newsletter about Sadagaat work in your email?')}
                                                </label>
                                                <div className="form-check- form-inline">
                                                    <div className="radio-inline">

                                                        <input 
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="receiveEmails" 
                                                         
                                                            value = 'true'
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.receiveEmails === 'true'}
                                                        />
                                                        <label className="form-check-label" >
                                                            {t('Yes')}
                                                        </label>
                                                    </div>
                                                    <div className="radio-inline">

                                                        <input
                                                            className="form-check-input" 
                                                            type="radio"
                                                            name="receiveEmails" 
                                                            id="" 
                                                            value = 'false'
                                                            onChange ={this.handleChange}
                                                            checked={this.state.form.receiveEmails === 'false'}
                                                        />
                                                        <label className="form-check-label" for="">
                                                             {t('No')}
                                                        </label>
                                                    </div>
                                            </div>
                                            
                                        </div>
                                        <div className="form-group">
                                            <button className="btn text-white btn-theme-green btn-lg btn-block mt-15"
                                                 type="submit" >
                                                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    {t('Submit')}
                                            </button>
                                        </div>
                                        </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </React.Fragment>

        )
    }

}export default withTranslation()(VolunteerForm);
