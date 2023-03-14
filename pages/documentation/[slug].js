import React from "react";
import client from "client";
import { gql } from "@apollo/client";
import Sidebar from "../../components/documentation/sidebar";
import DocumentationBody from "../../components/documentation/documentation-body";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query AllDocumentations {
        documentations {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return {
    paths: data.documentations.nodes.map((doc) => `/documentation/${doc.slug}`),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query Documentation($slug: String!) {
        documentation: documentationBy(slug: $slug) {
          title
          content
        }
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
    variables: { slug: params.slug },
  });

  return {
    props: {
      data,
      myexampleprop: "test",
    },
  };
};

function jonghwan(props) {
  const { data } = props;
  const documentation = data.documentation;
  return (
    <div className="flex">
      <Sidebar allDocumentations={data.documentations.edges} />
      <DocumentationBody
        content={documentation.content}
        title={documentation.title}
      />
    </div>
  );
}

export default jonghwan;
