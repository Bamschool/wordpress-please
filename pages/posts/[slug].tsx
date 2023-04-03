import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/blog/container";
import PostBody from "../../components/blog/post-body";
import MoreStories from "../../components/blog/more-stories";
import Header from "../../components/blog/header";
import PostHeader from "../../components/blog/post-header";
import SectionSeparator from "../../components/blog/section-separator";
import PostTitle from "../../components/blog/post-title";
import Tags from "../../components/blog/tags";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import Meta from "../../components/blog/meta";

import Head from "next/head";
export default function Post({ post, posts, preview }) {
  const router = useRouter();
  const morePosts = posts?.edges;
  const seo = post?.seo || {};

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const keywords = post?.tags?.edges?.map((tag) => tag.node.name) || [];

  return (
    <Container>
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Meta
              title={seo?.title || post?.title || "Fallback Title"}
              description={seo?.metaDesc || "Fallback Description"}
              ogImage={post.featuredImage?.sourceUrl || "/fallback-image.jpg"}
              twitterSite="@YourActualTwitterHandle"
              keywords={keywords}
            />

            <PostHeader
              title={post.title}
              coverImage={post.featuredImage}
              date={post.date}
              author={post.author}
              categories={post.categories}
            />
            <PostBody content={post.content} textColor={undefined} />
            <footer>
              {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
            </footer>
          </article>

          <SectionSeparator />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </>
      )}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  };
};
// import Head from "next/head";
// import Link from "next/link";
// import { gql } from "@apollo/client";

// import { getApolloClient } from "../../lib/apollo-client";

// import styles from "../../styles/Home.module.css";

// export default function Post({ post, site }) {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>{post.title}</title>
//         <meta
//           name="description"
//           content={`Read more about ${post.title} on ${site.title}`}
//         />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>{post.title}</h1>

//         <div className={styles.grid}>
//           <div
//             className={styles.content}
//             dangerouslySetInnerHTML={{
//               __html: post.content,
//             }}
//           />
//         </div>

//         <p className={styles.backToHome}>
//           <Link href="/">
//             <span>&lt; Back to home</span>
//           </Link>
//         </p>
//       </main>
//     </div>
//   );
// }

// export async function getStaticProps({ params = { postSlug: "" } }) {
//   const { postSlug } = params;

//   const apolloClient = getApolloClient();

//   const data = await apolloClient.query({
//     query: gql`
//       query PostBySlug($slug: String!) {
//         generalSettings {
//           title
//         }
//         postBy(slug: $slug) {
//           id
//           content
//           title
//           slug
//         }
//       }
//     `,
//     variables: {
//       slug: postSlug, // $slug 변수에 postSlug 값을 전달
//     },
//   });

//   // 나머지 코드는 그대로 유지

//   const post = data?.data.postBy;

//   if (!post) {
//     return {
//       props: {},
//       notFound: true,
//     };
//   }

//   const site = {
//     ...data?.data.generalSettings,
//   };

//   return {
//     props: {
//       post,
//       site,
//     },
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// }
