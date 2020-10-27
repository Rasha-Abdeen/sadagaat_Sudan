import React from 'react'
import './i18n';
import { useTranslation  } from 'react-i18next';
/**
 * This function Change language  its display language switch button and change the selected language
 * @component 
 * @see https://medium.com/@ricklee_10931/react-multi-lingual-with-react-i18next-57879f986168
 */
function LanguageSelector () {
  
  const {i18n,t} = useTranslation()

  /**
   * This function return language selected ar or en  
   *  i18n.changeLanguage function to switch between languages
   * @param {string} lng  language selected 'ar' , 'en'
   * @return {string} 'en' or 'ar'
   */
  const changeLanguage = (lng) => {
  
    i18n.changeLanguage(lng);
    
  }

 
  return (
        <div>
          <button
           className={`lang-switch bg-transparent btn btn-light ${i18n.language === "ar" ? "d-none" : ""}`} 
           
           onClick={(event) => changeLanguage("ar")}>العربية</button>

          <button className={`lang-switch bg-transparent btn btn-light ${i18n.language === "en" ? "d-none" : ""}`} 
          
          onClick={(event) => (
            
            changeLanguage("en")
   
            
            )}>English</button>
        </div>
  )
}

export default LanguageSelector