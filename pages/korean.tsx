import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/blog/container";
import MoreSentences from "../components/korean/more-sentences";
import KoreanIntro from "../components/korean/korean-intro";
import Layout from "../components/blog/layout";
import HeroKoreansentences from "../components/korean/hero-sentences";
import { getAllKoreansentencesForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import { useState } from "react";
import Date from "../components/blog/date";
import SimpleBar from "simplebar-react";
import Pagination from "rc-pagination";
export default function korean({ allKoreansentences: { edges }, preview }) {
  const heroSentence = edges[0]?.node;
  const moreSentences = edges.slice(1);

  const [perPage, setPerPage] = useState(6);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);

  const [koreansentences, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = (value: any) => {
    setSearchTerm(value);
    if (value !== "") {
      let result = moreSentences.filter((koreansentence) =>
        koreansentence.node.title.toLowerCase().includes(value.toLowerCase())
      );
      setPosts(result);
    } else {
      setPosts([]);
    }
  };
  const handleChange = () => {
    let filteredData = moreSentences.filter(
      (koreansentence) => koreansentence.node.title
    );
  };
  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return moreSentences.slice((current - 1) * pageSize, current * pageSize);
  };

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(moreSentences.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <button>
          <i className="fa fa-angle-double-left"></i>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <i className="fa fa-angle-double-right"></i>
        </button>
      );
    }
    return originalElement;
  };

  const seo = {
    title: `Korean Sentences Example with ${CMS_NAME}`,
    metaDesc: "This is a meta description",
    fullHead: "This is the full head content",
    ogImage: "https://www.example.com/og-image.jpg",
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.metaDesc} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@YourTwitterHandle" />
        <meta property="twitter:title" content={seo.title} />
        <meta property="twitter:description" content={seo.metaDesc} />
        <meta property="twitter:image" content={seo.ogImage} />
      </Head>
      <Container>
        <div className="flex justify-end mt-10">
          <button
            className="search-toggle flex items-center justify-center cursor-pointer hover:text-neutral-500"
            data-toggle="search"
            aria-label="Search Toggle"
            onClick={() => setOpen(!open)}
          >
            <span className="mr-2">Search</span>
            <svg
              width="22"
              height="22"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 15.5L19 19"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          {open && <div className="search-overlay is-visible"></div>}
          <div className={`search-block ${open ? "is-visible" : "is-hidden"}`}>
            <div data-toggle="search-close" onClick={() => setOpen(false)}>
              <span className="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width={38}
                  height={38}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </span>
            </div>
            <input
              type="text"
              defaultValue=""
              placeholder="Type to search blog.."
              aria-label="search-query"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <SimpleBar style={{ maxHeight: "calc(100vh - 125px)" }}>
              {koreansentences.length > 0 && (
                <div className="search-result-block">
                  <div className="search-results row g-4 mt-2">
                    <p className="h4 mb-0">
                      <span className="font-secondary">
                        {koreansentences.length}{" "}
                      </span>
                      results found.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 lg:grid-cols-6 gap-4">
                      {koreansentences.map((koreansentence) => (
                        <div className="max-w-sm bg-white border border-gray-200 overflow-hidden rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          {koreansentence.node.featuredImage && (
                            <div className="h-40">
                              <a href={`/korean/${koreansentence.node.slug}`}>
                                <img
                                  className="rounded-t-lg h-full w-full"
                                  src={
                                    koreansentence.node.featuredImage.node
                                      .sourceUrl
                                  }
                                  alt=""
                                />
                              </a>
                            </div>
                          )}
                          <div className="p-5">
                            <Date dateString={koreansentence.node.date} />
                            <a href={`/korean/${koreansentence.node.slug}`}>
                              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {koreansentence.node.title}
                              </h5>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </SimpleBar>
          </div>
        </div>

        <KoreanIntro />
        {heroSentence && (
          <HeroKoreansentences
            title={heroSentence.title}
            coverImage={heroSentence.featuredImage}
            date={heroSentence.date}
            author={heroSentence.author.node}
            slug={heroSentence.slug}
            excerpt={heroSentence.excerpt}
          />
        )}
        {moreSentences.length > 0 && (
          <MoreSentences koreansentences={getData(current, size)} />
        )}
        <div className="pagination">
          <Pagination
            className="pagination-data"
            // showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
            onChange={PaginationChange}
            total={moreSentences.length}
            current={current}
            pageSize={size}
            showSizeChanger={false}
            itemRender={PrevNextArrow}
            onShowSizeChange={PerPageChange}
          />
        </div>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allKoreansentences = await getAllKoreansentencesForHome(preview);

  return {
    props: { allKoreansentences, preview },
    revalidate: 10,
  };
};
