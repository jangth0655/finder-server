import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    createdAt: String!
    updatedA: String!
    email: String!
    username: String!
    password: String!
    avatar: String
    bio: String
    careers: String
    region: String!
  }
`;
