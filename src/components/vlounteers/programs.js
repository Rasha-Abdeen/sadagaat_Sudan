import React from "react";
import Header from "../sub_page_header";
import { useTranslation } from "react-i18next";
import VolunteerPrograms from "./volunteers-programs";

const Programs = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <section>
        <Header
          name={t("Volunteers Programs")}
          coverImage={"volunteer-bg-img"}
        />
        <VolunteerPrograms type={"ongoing"} />
      </section>
    </React.Fragment>
  );
};

export default Programs;
