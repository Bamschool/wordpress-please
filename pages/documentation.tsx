// import Head from "next/head";
// import { GetStaticProps } from "next";
// import Container from "../components/blog/container";
// import MoreSentences from "../components/korean/more-sentences";
// import KoreanIntro from "../components/korean/korean-intro";
// import Layout from "../components/blog/layout";
// import HeroKoreansentences from "../components/korean/hero-sentences";
// import { getAllDocumentationsForHome } from "../lib/api";
// import { CMS_NAME } from "../lib/constants";
// import Sidebar from "../components/documentation/sidebar";
// import { useState } from "react";
// import { useRouter } from "next/router";

// export default function Documentation({ allDocumentations: { edges }, preview }) {
//   const [currentPage, setCurrentPage] = useState(null);
//   const router = useRouter();
//     const {
//     data: { allDocumentations },
//   } = useQuerySubscription(subscription);

//   const categories = allDocumentations.map((doc) => ({
//     title: doc.docstitle[0].suptitle,
//     pages: doc.pages,
//   }));

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//    <div>
//     <Sidebar />
//    </div>
//   );
// }

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//   const allDocumentations = await getAllDocumentationsForHome(preview);

//   return {
//     props: { allDocumentations, preview },
//     revalidate: 10,
//   };
// };


// import Sidebar from "../components/documentation/sidebar";
// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import Layout from "../components/blog/layout";
// const categories = [
//   {
//     title: "Getting Started",
//     pages: [
//       { subtitle: "Introduction", slug: "introduction" },
//       { subtitle: "Installation", slug: "installation" },
//       { subtitle: "Usage", slug: "usage" },
//     ],
//   },
//   {
//     title: "Configuration",
//     pages: [
//       { subtitle: "Basic Configuration", slug: "basic-configuration" },
//       { subtitle: "Advanced Configuration", slug: "advanced-configuration" },
//     ],
//   },
//   {
//     title: "Deployment",
//     pages: [
//       { subtitle: "Heroku", slug: "heroku" },
//       { subtitle: "Vercel", slug: "vercel" },
//       { subtitle: "AWS", slug: "aws" },
//     ],
//   },
// ];

// const Documentation = ({ preview }) => {
//   const [currentPage, setCurrentPage] = useState(null);
//   const router = useRouter();

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <Layout preview={preview}>
//       <div className="flex">
//         <Sidebar categories={categories} />
//         <main className="flex-1">
//           {currentPage ? (
//             <div>{currentPage.content}</div>
//           ) : (
//             <div>Please select a page: {router.query.slug}</div>
//           )}
//         </main>
//       </div>
//     </Layout>
//   );
// };

// export default Documentation;
