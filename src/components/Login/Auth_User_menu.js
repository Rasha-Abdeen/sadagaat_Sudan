
import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

import { logout} from '../../repository';
import i18n from "i18next";
import { useTranslation } from 'react-i18next'


// menue displayed to authenticate user
function Auth_user_menu()
{ // user email to display  in top of page after login
  const userName = localStorage.getItem('user_email')
  const {t} = useTranslation()
  const menuStyle = i18n.dir() === 'rtl'?'pull-left':'pull-right'


  const handleClick = ()=>{
      logout();
     
  }

    return(
        <div className="col-md-4">
              <div className="widget no-border m-0">
                <ul className={`list-inline ${menuStyle} flip sm-pull-none sm-text-center mt-5`}>
                  <li className="mt-sm-10 mb-sm-10">
                    <a className="p-5 font-14 pl-10 pr-10 text-white dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                      href="">{userName}<i className="fa fa-angle-down text-white"></i></a>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">

                        <li>
                          <Link  to ='/volunteerForm'>
                            {t('Volunteer Form')}
                          </Link>
                          </li>
                        <li> <Link  onClick ={handleClick}>{t('Logout')}</Link></li>
                      </ul>
                  </li>
                </ul>
              </div>
            </div>
    )

}
export default Auth_user_menu