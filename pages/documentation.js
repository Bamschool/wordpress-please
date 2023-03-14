import React, { useState } from "react";
import { useRouter } from "next/router";
import client from "client";
import { gql } from "@apollo/client";
import { data } from "autoprefixer";
import Sidebar from "../components/documentation/sidebar";
import Layout from "../components/blog/layout";
export const getStaticProps = async () => {
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
      revalidate: 10,
      data,
      myexampleprop: "test",
    },
  };
};

function jonghwan(props) {
  const { data } = props;
  return (
    <div className="flex">
      <Sidebar allDocumentations={data.documentations.edges} />
      {data.documentations.edges.map((edge) => (
        <div key={edge.node.title}>{edge.node.title}</div>
      ))}
    </div>
  );
}

export default jonghwan;
