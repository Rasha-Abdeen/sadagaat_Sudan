import React from "react";
import Header from "../sub_page_header";
import { useTranslation } from "react-i18next";
import Project from "./index";
/**
 * This component returns complete projects
 * @component
 * * * @param {string} props Project type
 * @see https://sadagaat.com/complete-projects
 */
function FinishedProjects() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <section>
        <Header name={t("Completed Projects")} coverImage={"projects-bg-img"} />
        <Project type="completed" />
      </section>
    </React.Fragment>
  );
}
export default FinishedProjects;
