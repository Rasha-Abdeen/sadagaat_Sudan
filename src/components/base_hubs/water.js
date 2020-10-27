import React, { useState, useEffect , useRef} from 'react';

import Header from '../sub_page_header';
import address from './../utils/address';
import{Link} from 'react-router-dom'
import 'react-circular-progressbar/dist/styles.css';
import i18n from 'i18next'
import { useTranslation } from 'react-i18next';
import Hub_Subhubs from './hub_subHubs'

/**
 * This component of display Water Hub Information such as Image , name , discription ,donation Button for feeding hub 
 * @component
 * @see http://sadagaat-uk.org/water
 */

function Water (){

  const [water, setwater ] = useState([])
  const {t} = useTranslation()

/**
     * This function return Water hub information returned by the API 
     * @return {object} Water hub returned by the API
*/
  async function waterHub() {
    const fetcher = await window.fetch(`${address()}hubs/1102`,{headers: {'accept-language': `${i18n.language}`}})
    const response = await fetcher.json()
    setwater(response)
  }

  /**  useEffect  waterHub call helth Hub function when component mounted or  when swiches Language through props i18n.language  
 * i18n .language = en  Or ar 
*/
  useEffect(() => {
      waterHub()
        } , [i18n.language])
 

return(
  <React.Fragment>
<section>
<Header name={t('Water')} coverImage = {'water-bg-img'}/>

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
                              src = {`${address()}hubs/${water.id}/image`}
                              alt="water image"
                              className= 'img-responsive'
                              style= {{height:'400px',
                                        width:'500px'}}
                              
                            />
                            </div>
                       
                          </div>
                          <div class="causes-details col-md-6">
                                
                                <h2 class="line-bottom mt-0">{water.name}</h2>
                                 

                                  <p>{water.description}</p>
                                  
                                  <div class="mt-10 mb-20">
                                  <ul class="list-inline clearfix mt-10">
                                    <li class="text-theme-colored pull-right flip pr-0">
                                    </li>
                                  </ul>
                                </div>
                                <Link to= {'/hub/'+water.id} class="btn btn-theme-colored btn-sm">{t('Donate Now')}</Link>
                              </div>
           
                        </div>
                      </div>
              
                </div>
           
              </div>
            </div>

                 
        
            
          </div>
        
      
     
  </div>
   <br />
{/** this component display all subhubs related to Water hub */}

          <Hub_Subhubs  hubId = {water.id} name = {t('Water Sub Sectors')}/>
      </div>
    </section>
    </React.Fragment>

)

}
export default Water;