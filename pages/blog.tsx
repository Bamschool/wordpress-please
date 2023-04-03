import { useState } from 'react';
import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/blog/container";
import MoreStories from "../components/blog/more-stories";
import HeroPost from "../components/blog/hero-post";
import Intro from "../components/blog/intro";
import Layout from "../components/blog/layout";
import { getAllPostsForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Date from '../components/blog/date';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  const [perPage, setPerPage] = useState(6);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);

  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)


  const handleSearch = (value: any) => {
    setSearchTerm(value)
    if (value !== "") {
    let result = morePosts.filter(post =>
      post.node.title.toLowerCase().includes(value.toLowerCase())
    )
    setPosts(result)
    } 
    else {
      setPosts([])
    }
  }
  const handleChange = () => {
    let filteredData = morePosts.filter(post => post.node.title)
  }
  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return morePosts.slice((current - 1) * pageSize, current * pageSize);
  };

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(morePosts.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  }

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize)
  }

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === 'prev') {
      return <button><i className="fa fa-angle-double-left"></i></button>;
    }
    if (type === 'next') {
      return <button><i className="fa fa-angle-double-right"></i></button>;
    }
    return originalElement;
  }


  const seo = {
    title: `Next.js Blog Example with ${CMS_NAME}`,
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <Container>
        <div className='flex justify-end mt-10'>
          <button
            className="search-toggle flex items-center justify-center cursor-pointer hover:text-neutral-500"
            data-toggle="search"
            aria-label="Search Toggle"
            onClick={() => setOpen(!open)}
          >
            <span className="mr-2">Search</span>
            <svg width="22" height="22" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 15.5L19 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round">
              </path>
            </svg>
          </button>
          {open &&
            <div className="search-overlay is-visible"></div>
          }
          <div className={`search-block ${open ? 'is-visible' : 'is-hidden'}`}>
            <div data-toggle="search-close" onClick={() => setOpen(false)}>
              <span className="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={38} height={38} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </span>
            </div>
            <input
              type="text"
              defaultValue=''
              placeholder="Type to search blog.."
              aria-label="search-query"
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)} />
       
            <SimpleBar style={{ maxHeight: 'calc(100vh - 125px)' }}>
              {posts.length > 0 &&
                <div className="search-result-block" >
                  <div className="search-results row g-4 mt-2">
                    <p className="h4 mb-0"><span className="font-secondary">{posts.length} </span>results found.</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 lg:grid-cols-6 gap-4'>
                      {posts.map(post => (

                        <div className="max-w-sm bg-white border border-gray-200 overflow-hidden rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          {post.node.featuredImage &&
                            <div className='h-40'>
                              <a href={`/posts/${post.node.slug}`}>
                                <img className="rounded-t-lg h-full w-full" src={post.node.featuredImage.node.sourceUrl} alt="" />
                              </a>

                            </div>
                          }
                          <div className="p-5">
                            <Date dateString={post.node.date} />
                            <a href={`/posts/${post.node.slug}`}>
                              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{post.node.title}</h5>
                            </a>
                          </div>
                        </div>

                      ))}
                    </div>


                  </div>
                </div>
              }
            </SimpleBar>
          </div>
        </div>
        <Intro />

        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={getData(current, size)} />}

        <div className='pagination'>

          <Pagination
            className="pagination-data"
            // showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
            onChange={PaginationChange}
            total={morePosts.length}
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
  const allPosts = await getAllPostsForHome(preview);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};

// import Head from "next/head";
// import Link from "next/link";
// import { gql } from "@apollo/client";

// import { getApolloClient } from "../lib/apollo-client";

// import styles from "../styles/Home.module.css";
// import { useEffect, useState } from "react";

// export default function Home({ page, posts }) {
//   const { title, description } = page;
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>{title}</title>
//         <meta name="description" content={description} />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>{title}</h1>

//         <p className={styles.description}>{description}</p>

//         <ul className={styles.grid}>
//           {posts &&
//             posts.length > 0 &&
//             posts.map((post) => {
//               return (
//                 <li key={post.slug} className={styles.card}>
//                   <Link href={post.path}>
//                     <span>
//                       <h3
//                         dangerouslySetInnerHTML={{
//                           __html: post.title,
//                         }}
//                       />
//                     </span>
//                   </Link>
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: post.excerpt,
//                     }}
//                   />
//                 </li>
//               );
//             })}

//           {!posts ||
//             (posts.length === 0 && (
//               <li>
//                 <p>Oops, no posts found!</p>
//               </li>
//             ))}
//         </ul>
//       </main>
//     </div>
//   );
// }

// export async function getStaticProps() {
//   const apolloClient = getApolloClient();

//   const data = await apolloClient.query({
//     query: gql`
//       {
//         generalSettings {
//           title
//           description
//         }
//         posts(first: 10000) {
//           edges {
//             node {
//               id
//               excerpt
//               title
//               slug
//             }
//           }
//         }
//       }
//     `,
//   });

//   const posts = data?.data.posts.edges
//     .map(({ node }) => node)
//     .map((post) => {
//       return {
//         ...post,
//         path: `/posts/${post.slug}`,
//       };
//     });

//   const page = {
//     ...data?.data.generalSettings,
//   };

//   return {
//     props: {
//       page,
//       posts,
//     },
//   };
// }
