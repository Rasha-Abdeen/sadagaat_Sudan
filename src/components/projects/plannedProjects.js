import React from 'react';
import Header from '../sub_page_header';
import { useTranslation } from 'react-i18next';
import Project from '.'

function PlannedProjects(){

  const {t} = useTranslation()

return(
  <React.Fragment>
    <section>
    <Header name={t('Planned Projects')} coverImage = {'projects-bg-img'}/>
    <Project type = 'planned' />
    </section>
  </React.Fragment>

)

}

export default PlannedProjects;