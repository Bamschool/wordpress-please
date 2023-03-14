import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/blog/container";
import MoreSentences from "../components/korean/more-sentences";
import KoreanIntro from "../components/korean/korean-intro";
import Layout from "../components/blog/layout";
import HeroKoreansentences from "../components/korean/hero-sentences";
import { getAllKoreansentencesForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

export default function korean({ allKoreansentences: { edges }, preview }) {
  const heroSentence = edges[0]?.node;
  const moreSentences = edges.slice(1);

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
          <MoreSentences koreansentences={moreSentences} />
        )}
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

// import { GetStaticProps } from "next";
// import { getKoreanSentences } from "../lib/api";

// import Link from "next/link";

// export default function korean({ sentences }) {
//   return (
//     <div>
//       <h1>Korean Sentences</h1>
//       <ul>
//         {sentences.nodes.map((sentence) => (
//           <li key={sentence.slug}>
//             <Link href={`/korean/${sentence.slug}`}>
//               <span>{sentence.title}</span>
//             </Link>
//             {sentence.author && (
//               <div>
//                 <p>{sentence.author.node.name}</p>
//                 <img src={sentence.author.node.avatar.url} alt="" />
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const sentences = await getKoreanSentences();

//   return {
//     props: {
//       sentences,
//     },
//   };
// };
