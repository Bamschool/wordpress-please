import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/blog/container";
import MoreStories from "../components/blog/more-stories";
import HeroPost from "../components/blog/hero-post";
import Intro from "../components/blog/intro";
import Layout from "../components/blog/layout";
import { getAllPostsForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  const seo = {
    title: `Next.js Blog Example with ${CMS_NAME}`,
    metaDesc: "This is a meta description",
    fullHead: "This is the full head content",
    ogImage: "https://www.example.com/og-image.jpg",
  };

  return (
    <Layout preview={preview} seo={seo}>
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
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};
