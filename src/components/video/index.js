import React from "react";
import { useTranslation } from "react-i18next";
import ModalVedioComponent from "./video";

const Video = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <section
        className="divider parallax layer-overlay overlay-dark-9 bg-img"
        data-parallax-ratio="0.7"
      >
        <div className="display-table">
          <div className="display-table-cell">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <ModalVedioComponent></ModalVedioComponent>
                  <p className="font-20 text-white mt-20">
                    "{t("video text")}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Video;
