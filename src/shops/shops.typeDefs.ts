import { gql } from "apollo-server-core";
export default gql`
  type Photo {
    id: Int!
    url: String!
    shop: [Shop]
  }

  type Favs {
    id: Int!
    createdAt: String
    updatedAt: String
    shop: Shop
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
    comments: [Comment]
    user: User!
    isMine: Boolean
    isLike: Boolean
    favCount: Int
  }
`;
