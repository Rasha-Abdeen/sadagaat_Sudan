import React from 'react';
import {
  BrowserRouter as Router,
  Switch,HashRouter,
  Route,
  Link,NavLink, Redirect
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'


// what menue diaplay for un Authorize user login/register button
function UnAuth_user_menu(){
  const {t} = useTranslation()

  
    return(

            <div className="col-md-4">
            <div className="widget no-border m-0">
            <ul className="list-inline pull-right flip sm-pull-none sm-text-center mt-5">

                <li className="mt-sm-10 mb-sm-10">
                  <Link to ='/login'>
                <button 
                  className="btn btn-default btn-flat btn-xs bg-light p-5 font-11 pl-10 pr-10 no-border" 
                >
                  
                  {t('Login/Register')}</button>
                </Link>
                </li>
            </ul>
            </div>
            </div> 
    )
}export default UnAuth_user_menu