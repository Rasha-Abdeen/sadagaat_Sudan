import React, { useEffect , Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Preload from "./components/preload";
import { useTranslation } from "react-i18next";

import TopBar from "./components/top_bar";
import MenuBar  from  "./components/menu_bar";
import Footer  from  "./components/footer";
import Become  from  "./components/become_a_volunteer/index";
import Home  from  "./components/home";
const Contact  = React.lazy(() => import( "./components/contact"));
const About  = React.lazy(() => import( "./components/about/about.js"));
const Projects_  = React.lazy(() => import( "./components/projects/projects"));
const Calendar  = React.lazy(() => import( "./components/events/eventsCalender"));
const Feeding  = React.lazy(() => import( "./components/base_hubs/Feeding"));
const Education  = React.lazy(() => import( "./components/base_hubs/education"));
const Health  = React.lazy(() => import( "./components/base_hubs/health"));
const Water  = React.lazy(() => import( "./components/base_hubs/water"));
const News  = React.lazy(() => import( "./components/news/index"));
const Login  = React.lazy(() => import( "./components/Login/Login"));
const ForgotPassword  = React.lazy(() => import( "./components/Login/Forgot_Password"));
const RestPassword  = React.lazy(() => import( "./components/Login/Reset_password"));
const VolunteerForm  = React.lazy(() => import( "./components/vlounteers/VolunteerForm"));
const Donate  = React.lazy(() => import( "./components/Donation/donate"));
const DonateToProject  = React.lazy(() => import( "./components/Donation/DonateToProject"));
const DonateToSubhub  = React.lazy(() => import( "./components/Donation/DonateToSubhub"));
const DonateToHub  = React.lazy(() => import( "./components/Donation/donateToHub"));
const SuccessDonate  = React.lazy(() => import( "./components/Donation/successfullDonation"));
const FaildDonate  = React.lazy(() => import( "./components/Donation/faildDonation"));
const SingleProject2  = React.lazy(() => import( "./components/projects/single-withSlider"));
const PrivateRoute  = React.lazy(() => import( "./components/menu_bar/privateRoute"));
const PubliceRoute  = React.lazy(() => import( "./components/menu_bar/PublicRoute"));
const SingleSubhub  = React.lazy(() => import( "./components/sub_hubs/single-subhub"));
const SingleEvent  = React.lazy(() => import( "./components/events/single-event"));
const PlannedProjects  = React.lazy(() => import( "./components/projects/plannedProjects"));
const FinishedProjects  = React.lazy(() => import( "./components/projects/finished-project"));
const singleNews  = React.lazy(() => import( "./components/news/single-news"));
const Volunteers  =  React.lazy(() => import( './components/vlounteers/volunteersPage'));
const Registration  = React.lazy(() => import( "./components/Login/Registration"));



function App (){
   
  const { i18n } = useTranslation();
  document.getElementById("direction").dir = i18n.dir();


    useEffect(() => {
      if (i18n.dir() === "rtl") 
      {
        document.getElementById("bootstrp-file").href =
        "css/bootstrap-rtl.min.css";
  
        document.getElementById("main-rtl").href = "css/style-main-rtl.css";
        
        document.getElementById("main-rtl-extra").href =
          "css/style-main-rtl-extra.css";
          
      }
      else if (i18n.dir() === "ltr") {
        document.getElementById("bootstrp-file").href = "";
        document.getElementById("main-rtl").href = "";
        document.getElementById("main-rtl-extra").href = "";
      }
    },i18n.language);

  return (
    <React.Fragment>
    <Switch>
      <div className="main-content">
        {/* <Preload /> */}
        <TopBar />
        <MenuBar />
        
        <Route exact path="/" component={Home} />
        <Suspense fallback = {<Preload/>}>
        <Route path="/about" component={About} />
        <Route exact path="/projects" component={Projects_} />
        <Route exact path="/water" component={Water} />
        <Route exact path="/feeding" component={Feeding} />
        <Route exact path="/health" component={Health} />
        <Route exact path="/education" component={Education} />
        <Route exact path="/news" component={News} />
        <Route path="/contact" component={Contact} />
        <Route exact path="/donate/" component={Donate} />
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route exact path="/volunteers" component={Volunteers} />
        <Route
          exact
          path="/complete-projects"
          component={FinishedProjects}
        />
        <Route
          exact
          path="/planned-projects"
          component={PlannedProjects}
        />

        <Route
          exact
          path="/event/:event_id"
          component={SingleEvent}
        />
        <Route
          exact
          path="/news/:news_id"
          component={singleNews}
        />

        
        <Route exact path="/projects/:project_id" component={DonateToProject} />
        <Route exact path="/sub_hubs/:subhub_id" component={DonateToSubhub} />
        <Route exact path="/hub/:hubId" component={DonateToHub} />
        <Route exact path="/success-donate" component={SuccessDonate} />
        <Route exact path="/failed-donate" component={FaildDonate} />
        <PrivateRoute exact path="/volunteerForm" component={VolunteerForm} />
        <PubliceRoute exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/forgot_password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={RestPassword} />
       
        <Route
          exact
          path="/single-projects/:project_id"
          component={SingleProject2}
        />
        <Route
          exact
          path="/single-subhub/:subhub_id"
          component={SingleSubhub}
        />
        </Suspense>
        <Become />
        <Footer />
     
      </div>
    </Switch>
    </React.Fragment>
  );
}

export default App;
