import React, { useState, useEffect , useRef } from 'react';
import Header from '../sub_page_header';
import address from '../utils/address';
import i18n from 'i18next'
import { useTranslation } from 'react-i18next';
import {Link} from 'react-router-dom'
import {getMonthName} from './getMonthName'
import ReactPaginate from 'react-paginate'
import Preload from '../preload'


/**
 * This component showing calender of all events 
 * @component
 *  @see http://sadagaat-uk.org/calender
 */

function Calendar(){

  const [data, setData ] = useState([])
  const [offset ,setOffset]= useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const[cover,setCover]=useState({})
  const {t} = useTranslation()
  const [loading , setLoading] = useState(true)
  const styleMr = i18n.dir() === "rtl" ? "l" : "r"

/**
     * This function return All events returned by the API 
     * @return {Array} array  of events returned by the API
*/
  async function fetchData() {
    const fetcher = await window.fetch(`${address()}events`,{headers: {'accept-language': `${i18n.language}`}})
    const response = await fetcher.json()
    setData(response)
    setLoading(false)

  }

  async function fetchCover() {
    const fetcher = await window.fetch(`${address()}cover-image/EVENT2`,{headers: {'accept-language': `${i18n.language}`}}).then((fetcher)=>{
      if(fetcher.status == 500){ 
        setCover(undefined)

       }else{
        setCover(fetcher)
  
       }
     });
    
    

  }
  
 /**  useEffect call fetchData()  to get all events when component mounted or  when change language
*/
  
  useEffect(() => {
      fetchData()
      fetchCover()
   },[i18n.language])

  // Get current events you wate to post in page
const currentPosts = data.slice(offset , offset + postsPerPage);

// Change page paginate change current page of pagenation  and change the value of offset

const paginate = (e) => {
  setCurrentPage(e.selected)
  setOffset(e.selected * postsPerPage)
}
    return(
   <section>
      {(cover !== undefined )?
       <section style={{ 
         //backgroundImage: 'url(' + "https://images.wallpaperscraft.com/image/couple_mountains_travel_125490_1280x720.jpg"+ ')',
        backgroundImage: 'url(' + `${address()}cover-image/EVENT2` + ')'
        
       }}  className=" inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Events")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
       :
       <section className=" events-bg-img inner-header divider parallax layer-overlay overlay-dark-6">
         <div className="container pt-60 pb-60 "
       >
           <div className="section-content">
             <div className="row" >
               <div className="col-md-12 text-center">
                 <h3 className="font-28 text-white">{t("Events")} </h3>
               </div>
             </div>
           </div>
         </div>
       </section>
             
       
       
       }


  <div className="container mt-30 mb-30">
    <div className="section-content">
      <div className="row">
      {loading && <Preload  loading = {loading}/>}

      {currentPosts.map((event) => (  
        <div className="col-sm-6 col-md-4 col-lg-4">
          <div className="schedule-box maxwidth500 bg-lighter mb-30" >
            <div className="schedule-details border-bottom-theme-color-2px clearfix p-15 pt-10">
              <div className={`text-center pull-left flip bg-theme-colored p-10 pt-5 pb-5 m${styleMr}-10`} key = {event.id}>
                <div style = {{height:'50px'}}>
                  <span className="font-19 text-white font-weight-600 border-bottom">
                      {event.startDate.slice(8,10)}
                  </span>
                  <span className="font-12 text-white text-uppercase">
                     {getMonthName(event.startDate)}
                  </span>
                </div>
              </div>
              <Link to = {'/event/'+event.id} >
              <h4 className="title mt-5 mb-5">
                
                 {event.name} 
                
                </h4>
               
              <div className="list-inline font-11 text-gray" style = {{height:'50px'}}>
                <span><i className={`fa fa-calendar m${styleMr}-5`} /> {event.startDate}</span>
                <span><i className={`fa fa-map-marker ${styleMr}`} /> {event.locationName}</span>
              </div>
              <div className="clearfix" >
            </div>
            </Link>
          </div>
        </div>
        </div>
      ))}
      </div>
      </div>

      {/* pagination doesnt appear untile the event length being more than 6  postPerPage */}
      {data.length > postsPerPage &&(
      <div style = {{position:'absolute',bottom:'0%'}}>

    <ReactPaginate
                        previousLabel={t('prev')}
                        nextLabel={t('next')}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(data.length / postsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={paginate}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
            </div>
      )}
      </div>
      </section>

    )
}
export default Calendar;