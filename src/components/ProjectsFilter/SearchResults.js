import React from "react";
import Header from "../sub_page_header";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import FilteredProjects from "./FilteredProject";

const SearchResults = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <section>
        <Header name={t("Search Results")} coverImage={"projects-bg-img"} />
        <FilteredProjects search={true} />
      </section>
    </React.Fragment>
  );
};

export default SearchResults;
