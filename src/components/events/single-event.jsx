import React, { Component } from "react";
import Header from "../sub_page_header";
import address from "../utils/address";
import axios from "axios";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import ReactPlayer from 'react-player'

/**
 * This component showing single event returned from APIs and set the event (images , vedios) in carousal
 * @component
 * @see http://sadagaat-uk.org/event/2865 
 */

class SinglEvent extends Component {
  constructor() {
    super();
    this.state = {
      event: [],
      allMedia: [],
    };
  }

  /**
   * This function call when component mounted return specific event  
   * @example event with id = 2865
   * @returns void set the event details in the state
   */
  async componentDidMount() {
    // get event id from props.match.params
    let id = this.props.match.params.event_id;
    await axios
      .get(`${address()}events/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      })

      .then((response) => {
        const event = response.data;
        this.setState({ event });
        // call function to fill event media(images and videos)
        this.fillMediaArray();
      })
      .catch((error) => {
        console.log(error.message);
      });
   
  }
/**
   * This function call when component receive props  like language 
   * @example change language from 'ar' to 'en'
   * @returns void set the event details in the state
   */
  async componentWillReceiveProps() {
    let id = this.state.event.id;

    axios
      .get(`${address()}events/${id}`, {
        headers: { "accept-language": `${i18n.language}` },
      })

      .then((response) => {
        const event = response.data;
        this.setState({ event });
    // call function to fill event media(images and videos)
        this.fillMediaArray();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  /**
   * This function joine event videos  and images arrays in one array AllMedia
   * @returns void fill the state 
   */

  fillMediaArray = () => {
    const event_images = this.state.event.images;
    const event_videos = this.state.event.video;
    const allMedia = [];
//check if event has images
    if (event_images.length > 0) {
      event_images.map((image) => {
        // push images in all media array add new propartity type to object
        allMedia.push({
          type: "image",
          id: image.id,
          name: image.name,
        });
      });
    }
// check if event has videos
    if (event_videos.length > 0) {
      event_videos.map((video) => {
// push videos in all media array add new propartity type to object
        allMedia.push({
          type: "video",
          id: video.id,
          name: video.name,
        });
      });
    }
    //fill state with all media array
    this.setState({ allMedia });
  };

  render() {
    const { t } = this.props;
    const event = this.state.event;
    const allMedia = this.state.allMedia;
    return (
      <div class="main-content">
        <Header name={t("Events")}  coverImage = {'events-bg-img'}/>

        <section>
          <div class="container">
            <div class="row">
              <div class="col-md-7">
                <h2 class="text-theme-colored ">{event.name}</h2>
                <div class="entry-header">
                  {/* {check if all media has images or video if there is one image its will not display the default image insted of carousal} */}
                  {allMedia.length > 0 ? (
                    <Carousel
                      slidesPerScroll={1}
                      rtl
                      arrowLeft={
                        <i
                          className="fa fa-chevron-right fa-2x"
                          style={{ margin: "10px" }}
                        />
                      }
                      arrowRight={
                        <i
                          className="fa fa-chevron-left fa-2x"
                          style={{ margin: "10px" }}
                        />
                      }
                      addArrowClickHandler
                      // animationSpeed={1000}
                      infinite
                      clickToChange
                      centered
                      breakpoints={{
                        1000: {
                          // these props will be applied when screen width is less than 1000px
                          slidesPerPage: 2,
                          clickToChange: false,
                          centered: false,

                          infinite: false,
                        },
                        500: {
                          slidesPerPage: 1,
                          slidesPerScroll: 1,
                          clickToChange: false,
                          centered: false,
                          animationSpeed: 2000,
                          infinite: false,
                        },
                      }}
                    >
                      {/* {looping throuh all media  and check the type if its image or video} */}
                      {allMedia.map((media) =>
                        media.type === "image" ? (
                          <div
                            class="post-thumb thumb"
                            style={{ mxaHeight: "500px" }}
                          >
                            <img
                              src={`${address()}events/${media.name}/image`}
                              className="img-fullwidth img-responsive"
                              alt=""
                              style={{ height: "400px" }}
                            />
                          </div>
                        ) : (
                          <div>
                            {/* {to display video} */}
                            <ReactPlayer 
                                      controls = {true}
                                      playIcon
                                      className="img-fullwidth img-responsive"
                                      url = {`${address()}events/${media.name}/video`}
                                       />
                        </div>
                        )
                      )}
                    </Carousel>
                  ) : (
                    <div
                      class="post-thumb thumb"
                      style={{ mxaHeight: "500px" }}
                    >
                      <img
                        src={`${address()}events/${event.id}/image`}
                        className="img-fullwidth img-responsive"
                        alt=""
                        style={{ height: "400px" }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div class="col-md-5">
                <ul>
                  <li>
                    <h4>{t("Topic")}:</h4>
                    <p>{event.name}</p>
                  </li>
                  <li>
                    <h4>{t("Description")}:</h4>
                    <p>{event.description}</p>
                  </li>
                  <li>
                    <h4>{t("Start Date")}:</h4>
                    <p>{event.startDate}</p>
                  </li>
                  <li>
                    <h4>{t("End Date")}:</h4>
                    <p>{event.endDate}</p>
                  </li>
                  <li>
                    <h4>{t("Location")}:</h4>
                    <p>{event.locationName}</p>
                  </li>

                  <li>
                    <h5></h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default withTranslation()(SinglEvent);
