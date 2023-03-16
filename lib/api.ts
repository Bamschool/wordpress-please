const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
            id
            content
            title
            seo {
              metaDesc
              title
              fullHead
            }
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            seo {
              metaDesc
              fullHead
              title
            }
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
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
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
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

// 여기서부턴 koreansentnec부분입니다// 여기서부턴 koreansentnec부분입니다// 여기서부턴 koreansentnec부분입니다

export async function getPreviewKoreanentence(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewKoreansentence($id: ID!, $idType: KoreansentenceIdType!) {
      koreansentence(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.koreansentence;
}

export async function getAllKoreansentencesWithSlug() {
  const data = await fetchAPI(`
    {
      koreansentences(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.koreansentences;
}

export async function getAllKoreansentencesForHome(preview) {
  const data = await fetchAPI(
    `
    query AllKoreansentences {
      koreansentences(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
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
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.koreansentences;
}

export async function getKoreansentenceAndMorePosts(
  slug,
  preview,
  previewData
) {
  const koreansentencePreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSameKoreansentence = isId
    ? Number(slug) === koreansentencePreview.id
    : slug === koreansentencePreview.slug;
  const isDraft =
    isSameKoreansentence && koreansentencePreview?.status === "draft";
  const isRevision =
    isSameKoreansentence && koreansentencePreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment KoreansentenceFields on Koreansentence {
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
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query KoreansentenceBySlug($id: ID!, $idType: KoreansentenceIdType!) {
      koreansentence (id: $id, idType: $idType) {
        ...KoreansentenceFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      koreansentences(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...KoreansentenceFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? koreansentencePreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.koreansentence.slug = koreansentencePreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.koreansentence.revisions) {
    const revision = data.koreansentence.revisions.edges[0]?.node;

    if (revision) Object.assign(data.koreansentence, revision);
    delete data.koreansentence.revisions;
  }

  // Filter out the main post
  data.koreansentences.edges = data.koreansentences.edges.filter(
    ({ node }) => node.slug !== slug
  );
  // If there are still 3 posts, remove the last one
  if (data.koreansentences.edges.length > 2) data.koreansentences.edges.pop();

  return data;
}

// 여기서부턴 documentation// // 여기서부턴 documentation// // 여기서부턴 documentation// // 여기서부턴 documentation// // 여기서부턴 documentation//
export async function getPreviewDocumentation(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewDocumentation($id: ID!, $idType: DocumentationIdType!) {
      documentation(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllDocumentationWithSlug() {
  const data = await fetchAPI(`
  {
    documentations(first: 10000) {
      edges {
        node {
          slug
          id
          content
          title
          seo {
            metaDesc
            title
            fullHead
          }
        }
      }
    }
  }
  `);
  return data?.documentations;
}

export async function getAllDocumentationsForHome(preview) {
  const data = await fetchAPI(`
  query AllDocumentations {
    documentations(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
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
  `);

  return data?.documentations.edges || [];
}

export async function getDocumentationAndMorePosts(slug, preview, previewData) {
  const documentationPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSameDocumentation = isId
    ? Number(slug) === documentationPreview.id
    : slug === documentationPreview.slug;
  const isDraft =
    isSameDocumentation && documentationPreview?.status === "draft";
  const isRevision =
    isSameDocumentation && documentationPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment DocumentationFields on Documentation {
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
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query DocumentationBySlug($id: ID!, $idType: DocumentationIdType!) {
      documentation(id: $id, idType: $idType) {
        ...DocumentationFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      documentations(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...DocumentationFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? documentationPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.documentation.slug = documentationPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.documentation.revisions) {
    const revision = data.documentation.revisions.edges[0]?.node;

    if (revision) Object.assign(data.documentation, revision);
    delete data.documentation.revisions;
  }

  // Filter out the main post
  data.documentations.edges = data.documentations.edges.filter(
    ({ node }) => node.slug !== slug
  );
  // If there are still 3 posts, remove the last one
  if (data.documentations.edges.length > 2) data.documentations.edges.pop();

  return data;
}
