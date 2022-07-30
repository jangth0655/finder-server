import { gql } from "apollo-server-core";
export default gql`
  type Photo {
    id: Int!
    url: String!
    shop: [Shop]
  }

  type Shop {
    id: Int!
    createdAt: String
    updatedAt: String
    website: String
    region: String!
    description: String!
    name: String!
    slug: String!
    photos(page: Int): [Photo]
    user: User!
  }
`;
