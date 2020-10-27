import React, { useState, useEffect ,useRef } from 'react';

import Header from '../sub_page_header';
import address from './../utils/address';
import{Link} from 'react-router-dom'
import 'react-circular-progressbar/dist/styles.css';
import i18n from 'i18next'
import { useTranslation } from 'react-i18next';
import Hub_Subhubs from './hub_subHubs'

/**
 * This component of display health Hub Information such as Image , name , discription ,donation Button for feeding hub 
 * @component
 * @see http://sadagaat-uk.org/health
 */

function Health (){

  const [health, setHealth ] = useState([])
  const {t} = useTranslation()


  /**
     * This function return health hub information returned by the API 
     * @return {object} health hub returned by the API
     */

  async function healthHub() {
    const fetcher = await window.fetch(`${address()}hubs/1695`,{headers: {'accept-language': `${i18n.language}`}})
    const response = await fetcher.json()
    console.log(response)
    setHealth(response)
  }

  /**  useEffect call healthHub() function when component mounted or  when swiches Language through props i18n.language  
 * i18n .language = en  Or ar 
*/

  useEffect(() => {

      healthHub() 
     },[i18n.language])

return(
  <React.Fragment>
<section>
<Header name={t('Health')} coverImage = {'health-bg-img'}/>

      <div className="container">
    <div className="row multi-row-clearfix">
    <div>
          <div className="col-xs-12 col-sm-6 col-md-12">
              <h2 >

              </h2>

              <div className="event media sm-maxwidth400 border-bottom mt-5 mb-0 pt-10 pb-15">
                <div className="row">
                   
                      <div className="causes">
                        <div className="row-fluid">
                          <div className="col-md-6">
                      
                            <div className ="post-thumb thumb" style = {{mxaHeight:"600px"}}>
                            <img
                              src = {`${address()}hubs/${health.id}/image`}
                              alt="health image"
                              className= 'img-responsive'
                              style= {{height:'400px',
                                        width:'500px'}}
                              
                            />
                            </div>
                       
                          </div>
                          <div class="causes-details col-md-6">
                                
                                <h2 class="line-bottom mt-0">{health.name}</h2>
                                 

                                  <p>{health.description}</p>
                                  
                                  <div class="mt-10 mb-20">
                                  <ul class="list-inline clearfix mt-10">
                                    <li class="text-theme-colored pull-right flip pr-0">
                                      
                                    </li>
                                  </ul>
                                </div>
                                <Link to = {'/hub/'+health.id} class="btn btn-theme-colored btn-sm">{t('Donate Now')}</Link>
                              </div>
           
                        </div>
                      </div>
              
                </div>
           
              </div>
            </div>

                 
        
            
          </div>
        
      
     
  </div>
   <br />
 {/** this component display all subhubs related to Health hub */}
    <Hub_Subhubs  hubId = {health.id} name = {t('Health Sub Sectors')}/>
                                            
      </div>
      </section>
      </React.Fragment>

);

}
export default Health;