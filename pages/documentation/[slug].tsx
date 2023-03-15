import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import DocumentationBody from "../../components/documentation/documentation-body";

import {
  getAllDocumentationWithSlug,
  getDocumentationAndMorePosts,
} from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import Sidebar from "../../components/documentation/sidebar";

export default function Post({ documentation, documentations, preview }) {
  const router = useRouter();
  const moreDocumentations = documentations?.edges;

  if (!router.isFallback && !documentation?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      {documentation && (
        <DocumentationBody content={documentation.content} title={undefined} />
      )}
    </div>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getDocumentationAndMorePosts(
    params?.slug,
    preview,
    previewData
  );

  if (!data.documentation) {
    return { notFound: true };
  }

  return {
    props: {
      preview,
      documentation: data.documentation,
      documentations: data.documentations,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allDocumentations = await getAllDocumentationWithSlug();

  return {
    paths:
      allDocumentations.edges.map(
        ({ node }) => `/documentation/${node.slug}`
      ) || [],
    fallback: true,
  };
}

// import React, { useState } from "react";
// import client from "../../client";
// import { gql } from "@apollo/client";
// import Sidebar from "../../components/documentation/sidebar";

// import DocumentationBody from "../../components/documentation/documentation-body";
// import SecondNavbar from "../../components/documentation/secondNavbar";
// export async function getStaticPaths() {
//   const { data } = await client.query({
//     query: gql`
//       query AllDocumentations {
//         documentations {
//           nodes {
//             slug
//           }
//         }
//       }
//     `,
//   });

//   return {
//     paths: data.documentations.nodes.map((doc) => `/documentation/${doc.slug}`),
//     fallback: false,
//   };
// }

// export const getStaticProps = async ({ params, preview = false }) => {
//   const { data } = await client.query({
//     query: gql`
//       query Documentation($slug: String!) {
//         documentation: documentationBy(slug: $slug) {
//           title
//           content
//         }
//         documentations(
//           first: 20
//           where: { orderby: { field: DATE, order: DESC } }
//         ) {
//           edges {
//             node {
//               title
//               excerpt
//               slug
//               date
//               featuredImage {
//                 node {
//                   sourceUrl
//                 }
//               }
//               author {
//                 node {
//                   name
//                   firstName
//                   lastName
//                   avatar {
//                     url
//                   }
//                 }
//               }
//               categories {
//                 nodes {
//                   name
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//     variables: { slug: params.slug },
//   });

//   return {
//     props: {
//       data,
//       preview,
//       myexampleprop: "test",
//     },
//   };
// };

// interface DocumentationProps {
//   data: any;
//   children?: React.ReactNode;
// }

// function jonghwan(props: DocumentationProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { data } = props;
//   const documentation = data.documentation;

//   if (!documentation) {
//     return (
//       <div>
//         <h1>Error: The requested documentation was not found.</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="grid min-h-screen grid-rows-header ">
//       <div>
//         <SecondNavbar
//           onMenuButtonClick={() => setSidebarOpen((prev) => !prev)}
//         />
//       </div>
//       <div className="grid md:grid-cols-sidebar">
//         <Sidebar
//           open={sidebarOpen}
//           setOpen={setSidebarOpen}
//           allDocumentations={props.data.documentations.edges}
//         />
//         <DocumentationBody
//           content={documentation.content}
//           title={documentation.title}
//         />
//       </div>{" "}
//     </div>
//   );
// }

// export default jonghwan;

// import React from "react";
// import client from "client";
// import { gql } from "@apollo/client";
// import Sidebar from "../../components/documentation/sidebar";
// import DocumentationBody from "../../components/documentation/documentation-body";

// export async function getStaticPaths() {
//   const { data } = await client.query({
//     query: gql`
//       query AllDocumentations {
//         documentations {
//           nodes {
//             slug
//           }
//         }
//       }
//     `,
//   });

//   return {
//     paths: data.documentations.nodes.map((doc) => `/documentation/${doc.slug}`),
//     fallback: false,
//   };
// }

// export const getStaticProps = async ({ params }) => {
//   const { data } = await client.query({
//     query: gql`
//       query Documentation($slug: String!) {
//         documentation: documentationBy(slug: $slug) {
//           title
//           content
//         }
//         documentations(
//           first: 20
//           where: { orderby: { field: DATE, order: DESC } }
//         ) {
//           edges {
//             node {
//               title
//               excerpt
//               slug
//               date
//               featuredImage {
//                 node {
//                   sourceUrl
//                 }
//               }
//               author {
//                 node {
//                   name
//                   firstName
//                   lastName
//                   avatar {
//                     url
//                   }
//                 }
//               }
//               categories {
//                 nodes {
//                   name
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//     variables: { slug: params.slug },
//   });

//   return {
//     props: {
//       data,
//       myexampleprop: "test",
//     },
//   };
// };

// function jonghwan(props) {
//   const { data } = props;
//   const documentation = data.documentation;
//   return (
//     <div className="flex">
//       <Sidebar allDocumentations={data.documentations.edges} />
//       <DocumentationBody
//         content={documentation.content}
//         title={documentation.title}
//       />
//     </div>
//   );
// }

// export default jonghwan;
