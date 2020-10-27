import React from 'react';
import Header from '../sub_page_header';
import { useTranslation } from 'react-i18next';
import Project from '.'


const Projects_=()=>{
  
   const {t} = useTranslation()
  
return(
  <React.Fragment>
    <section>
      <Header name={t('Ongoing Projects')} coverImage = {'projects-bg-img'}/>
      <Project type = {'ongoing'} />
    </section>
</React.Fragment>

)

}

export default Projects_;