export const GET_ALL_PROGRAMS_QUERY = `
  query GetAllPrograms {
    programs(first: 50) {
      nodes {
        id
        slug
        title
        content
        programFields {
          subtitle
          badge
          targetAudience
          problemBarriers {
            title
            description
          }
          keyOutcomes {
            outcome
          }
          deliveryFormat {
            duration
            mode
          }
        }
      }
    }
  }
`;

export const GET_PROGRAM_BY_SLUG_QUERY = `
  query GetProgramBySlug($slug: ID!) {
    program(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      programFields {
        subtitle
        badge
        targetAudience
        problemBarriers {
          title
          description
        }
        keyOutcomes {
          outcome
        }
        deliveryFormat {
          duration
          mode
        }
      }
    }
  }
`;

export const GET_ALL_POSTS_QUERY = `
  query GetAllPosts($first: Int = 20) {
    posts(first: $first) {
      nodes {
        id
        slug
        title
        excerpt
        date
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      date
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export const GET_ALL_RESOURCES_QUERY = `
  query GetAllResources {
    resources(first: 100) {
      nodes {
        id
        slug
        title
        resourceFields {
          resourceType
          downloadUrl
          readingTime
        }
      }
    }
  }
`;
