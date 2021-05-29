import React, { useState, useEffect } from "react";
import Header from "../sub_page_header";
import address from "./../utils/address";
import i18n from "i18next";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

/**
 * This component display  all news in news page
 * @component
 * @see http://sadagaat-uk.org/news
 */
function News() {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [table,setTable]=useState([]);
  const [desc,setDesc]=useState([]);
  const { t } = useTranslation();
  const style = i18n.dir() === "rtl" ? "pull-right ml-20" : "pull-left mr-20";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [i18n.language]);

  /**
   * this function get news from APIs
   * @returns {Array} array of news object
   */
  async function fetchData() {
    const fetcher = await window.fetch(`${address()}donation-description`,
    {headers: {'accept-language': `${i18n.language}`}
   });
    const response = await fetcher.json();
    setData(response);
  }
  const currentPosts = data
  

  return (
    <React.Fragment>
      <section>
        <Header name={t("News")} coverImage={"news-bg-img"} />

        <div className="container mt-30 mb-30 pt-30 pb-30">
          <div class="row">


{
    currentPosts.map((data)=>{

parse(description)
    })
}          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default News;
