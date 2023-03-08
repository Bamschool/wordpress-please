import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/blog/container";
import KoreanBody from "../../components/korean/korean-body";
import MoreSentences from "../../components/korean/more-sentences";
import SentenceHeader from "../../components/korean/sentnece-header";
import KoreanHeader from "../../components/korean/korean-header";
import SectionSeparator from "../../components/blog/section-separator";
import Layout from "../../components/blog/layout";
import PostTitle from "../../components/blog/post-title";
import Tags from "../../components/blog/tags";
import {
  getAllKoreansentencesWithSlug,
  getKoreansentenceAndMorePosts,
} from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";

export default function Post({ koreansentence, koreansentences, preview }) {
  const router = useRouter();
  const moreKoreansentences = koreansentences?.edges;

  if (!router.isFallback && !koreansentence?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const seo = {
    title: `${koreansentence.title} | ${CMS_NAME}`,
    metaDesc: koreansentence.seo?.metaDesc || "",
    fullHead: koreansentence.seo?.fullHead || "",
    ogImage: koreansentence.featuredImage?.node.sourceUrl || "",
  };

  return (
    <Layout preview={preview} seo={seo}>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:image" content={seo.ogImage} />
        {seo.fullHead && <>{seo.fullHead}</>}
      </Head>
      <Container>
        <SentenceHeader />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <KoreanHeader
                title={koreansentence.title}
                coverImage={koreansentence.featuredImage}
                date={koreansentence.date}
                author={koreansentence.author}
                categories={koreansentence.categories}
              />
              <KoreanBody content={koreansentence.content} />
              <footer>
                {koreansentence.tags.edges.length > 0 && (
                  <Tags tags={koreansentence.tags} />
                )}
              </footer>
            </article>

            <SectionSeparator />
            {moreKoreansentences.length > 0 && (
              <MoreSentences koreansentences={moreKoreansentences} />
            )}
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getKoreansentenceAndMorePosts(
    params?.slug,
    preview,
    previewData
  );

  return {
    props: {
      preview,
      koreansentence: data.koreansentence,
      koreansentences: data.koreansentences,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allKoreansentences = await getAllKoreansentencesWithSlug();

  return {
    paths:
      allKoreansentences.edges.map(({ node }) => `/korean/${node.slug}`) || [],
    fallback: true,
  };
};
