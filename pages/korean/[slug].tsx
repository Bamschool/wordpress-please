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
import Header from "../../components/blog/header";
import Meta from "../../components/blog/meta";
import {
  getAllKoreansentencesWithSlug,
  getKoreansentenceAndMorePosts,
} from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";

export default function Post({ koreansentence, koreansentences, preview }) {
  const router = useRouter();
  const moreKoreansentences = koreansentences?.edges;
  const seo = koreansentence?.seo || {};

  if (!router.isFallback && !koreansentence?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const keywords =
    koreansentence && koreansentence.tags
      ? koreansentence.tags.edges.map((tag) => tag.node.name)
      : [];

  return (
    <Container>
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Meta
              title={seo?.title || koreansentence?.title || "Fallback Title"}
              description={seo?.metaDesc || "Fallback Description"}
              ogImage={koreansentence.featuredImage?.sourceUrl || undefined}
              twitterSite="@YourActualTwitterHandle"
              keywords={keywords}
            />
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
