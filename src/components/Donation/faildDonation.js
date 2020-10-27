import React ,{ useState, useEffect, Component }  from 'react';
import Header from '../sub_page_header'
import axios from 'axios';
import { render } from '@testing-library/react';
import  {withTranslation}  from 'react-i18next'
import{Link} from 'react-router-dom'


class FaildDonate extends Component {


   render(){
     const{t}= this.props

    return (

    <div>
      <Header name={t('Donate')}/>

      <section>
        <div className="container">
          <div className="section-content">
           
          <div className="jumbotron text-center ">
            <div><i className="fa fa-times-circle fa-5x text-danger"></i></div>
              <h1 className="display-3">{t('Sorry')}</h1>
              <div className=""><h3>{t('Donation failed')}</h3></div>
              {/* <hr /> */}
              <p className="lead mt-5">
              <Link className="btn btn-primary" to="/donate" role="button">{t('Retry donation')}</Link>

              </p>
            </div>


            </div>
          </div>
        </section>

             </div>
    )
}
}

export default withTranslation()(FaildDonate);

