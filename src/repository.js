import React from 'react'
import axios from 'axios';
import i18n from 'i18next'
import { Redirect } from "react-router-dom";
import {address} from './components/utils/address'

const tokenKey = 'x-access-token';
const user_email ='user_email';
/**
 * This function post ceddential data to API  and set token and  in the local storage 
 * @param {object} data  user credential data username and password
 * @return {object} response form API 
 */
export function login(data) 

{
     return axios.post(`${address()}users/authenticate`, {
         userName: data.email,
         password: data.password 

          })
    .then(response => {
    // set token and email in to local storage
            localStorage.setItem(tokenKey, response.data.token);
            localStorage.setItem(user_email,response.data.email)
            localStorage.setItem('tokenExpired', Date.now() + 1 * 60 * 60 * 1000);
            return response.data
         
        })
    
    .catch(err => Promise.reject(err));
    //.catch(err => console.log(err));
}
    
    
   /**
         * registration new user
         * @param {object} data new user data
         * @return {object} response form API 
         */
    export function register(data) {

        return axios.post(`${address()}users/member/signUp`,
        data
        )
             
        .then(response => {
        
        return response.data
        })
            .catch(err =>Promise.reject(err));
        }

        /** forget password   This function call when user forget password  
         *@param {email} data  user email
        */
    
        export function forgotPassword(data) 
        {

             return axios.post(`${address()}password-forgot`,null,{ params: {
                email:data.email
              }})
            .then(response =>{
                 return response.data
                        })
            
            .catch(err => Promise.reject(err));
        }
        /**
         * This function post new passwor to API
         * @param {object} data  new password  and token
         */

        export function resetPassword(data) 

        {
             return axios.post(`${address()}password-reset`,null, 
                {params:
                    {
                    token:data.token,
                    password:data.password
                    }
                    
                 })
            .then(response => {
                    
                    return response.data
                })
            
            .catch(err => Promise.reject(err));
            //.catch(err => console.log(err));
        }     


   /**
    * check if user authorize or not if there is token in to local storage
    * @return {boolean} return true if found token  , false if token not found
    */
   export function isAuthenticated()
   {
        return localStorage.getItem(tokenKey) 
       
       
    }
    /**
     * This function call when user Logged out its remove Token from Local storage and redirect user to home page
     */
    export function logout() {
        localStorage.removeItem(tokenKey);
        window.location='/login'
      }
   
/**
 * this function post volunteer form data to API
 * @param {object} data  volunteer form data 
 */
        export function submit_volunteer_data(data) 
        {
            let token = localStorage.getItem(tokenKey)
            return axios.post(`${address()}members`, data,{ 
                headers:{ 
                            "Authorization":`Bearer ${token}`
                        }})
                 
            .then(response => {
            
            return response.data
            })
                .catch(err =>Promise.reject(err));

        }



        
      
    
    
   