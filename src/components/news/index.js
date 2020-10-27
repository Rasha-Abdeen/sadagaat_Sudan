import React, { useState, useEffect, useRef } from "react";
import Header from "../sub_page_header";
import address from "./../utils/address";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate'
import Preload from '../preload'


/**
 * This component display  all news in news page
 * @component
 * @see http://sadagaat-uk.org/news 
 */
function News() {
  const [data, setData] = useState([]);
  const [offset ,setOffset]= useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const { t } = useTranslation();
  const style = i18n.dir() === "rtl" ? "pull-right ml-20" : "pull-left mr-20";
  const [loading , setLoading] = useState(true)


  useEffect(() => {
    fetchData();
  }, [i18n.language]);

  /**
   * this function get news from APIs
   * @returns {Array} array of news object
   */
  async function fetchData() {
    const fetcher = await window.fetch(`${address()}news`, {
      headers: { "accept-language": `${i18n.language}` },
    });
    const response = await fetcher.json();
    setData(response);
    setLoading(false)
  }
 
// Get current posts
const currentPosts = data.slice(offset , offset + postsPerPage);

// Change page
const paginate = (e) => {
  setCurrentPage(e.selected)
  setOffset(e.selected * postsPerPage)
}

  return (
    <React.Fragment>
    <section>
      <Header name={t("News")} coverImage = {'news-bg-img'} />

      <div className="container mt-30 mb-30 pt-30 pb-30">
        <div class="row">
        {loading && <Preload  loading = {loading}/>}

          {currentPosts.map((news) => (
            <div class="col-md-4 mb-30" key={news.id}>
              <Link to={"/news/" + news.id}>
                <div class="blog-posts single-post">
                  <article class="post clearfix mb-0">
                    <div class="entry-header">
                      <div
                        class="post-thumb thumb"
                        style={{ maxHeight: "260px" }}
                      >
                        <img
                          src={`${address()}news/${news.id}/image`}
                          className="img-fullwidth img-responsive"
                          // height="200"
                          style={{ height: "260px", width: "390px" }}
                          alt=""
                        />
                      </div>
                    </div>

                    <div class="entry-content">
                      <div class="entry-meta media no-bg no-border mt-15">
                        <div class="media-body pl-15">
                          <div class="event-content pull-left flip">
                            <h2 class="line-bottom mt-0">{news.name}</h2>

                            <h4 className="mt-0 mb-0 text-theme-colored">
                              {news.startDate}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <p
                        className="mb-15 project-discription"
                        style={{ height: "100px" }}
                      >
                        {news.description}.
                      </p>

                      {/* < SocialMedia /> */}
                    </div>
                  </article>
                </div>
              </Link>
            </div>
          ))}
{data.length > postsPerPage &&(
  <div style = {{position:'absolute',bottom:'0%'}}>

    <ReactPaginate
                  previousLabel={t('prev')}
                  nextLabel={t('next')}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(data.length / postsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={paginate}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
            </div>
      )}
        </div>

      </div>
      
    </section>
    </React.Fragment>
  );
}

export default News;
