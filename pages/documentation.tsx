import Head from "next/head";
import { GetStaticProps } from "next";

import { useRouter } from "next/router";
import client from "../client";
import { gql } from "@apollo/client";
import { data } from "autoprefixer";

import Layout from "../components/blog/layout";
import Sidebar from "../components/documentation/sidebar";
import React, { useState } from "react";
import SecondNavbar from "../components/documentation/secondNavbar";

export const getStaticProps = async ({ preview = false }) => {
  const { data } = await client.query({
    query: gql`
      query AllDocumentations {
        documentations(
          first: 20
          where: { orderby: { field: DATE, order: DESC } }
        ) {
          edges {
            node {
              title
              excerpt
              slug
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              author {
                node {
                  name
                  firstName
                  lastName
                  avatar {
                    url
                  }
                }
              }
              categories {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      data,
      preview,
      myexampleprop: "test",
    },
    revalidate: 10,
  };
};

interface DocumentationProps {
  data: any;
  children?: React.ReactNode;
}

export default function documentation(props: DocumentationProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header">
      <div>
        <SecondNavbar
          onMenuButtonClick={() => setSidebarOpen((prev) => !prev)}
        />
      </div>
      <div className="grid md:grid-cols-sidebar">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          allDocumentations={props.data.documentations.edges}
        />
        {props.children}
      </div>{" "}
    </div>
  );
}

// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import client from "client";
// import { gql } from "@apollo/client";
// import { data } from "autoprefixer";
// import Sidebar from "../components/documentation/sidebar";
// import Layout from "../components/blog/layout";
// export const getStaticProps = async () => {
//   const { data } = await client.query({
//     query: gql`
//       query AllDocumentations {
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
//   });
//   return {
//     props: {
//       revalidate: 10,
//       data,
//       myexampleprop: "test",
//     },
//   };
// };

// function jonghwan(props) {
//   const { data } = props;
//   return (
//     <div className="flex">
//       <Sidebar allDocumentations={data.documentations.edges} />
//       {data.documentations.edges.map((edge) => (
//         <div key={edge.node.title}>{edge.node.title}</div>
//       ))}
//     </div>
//   );
// }

// export default jonghwan;
