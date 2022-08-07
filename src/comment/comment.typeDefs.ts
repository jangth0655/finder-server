import { gql } from "apollo-server-core";
export default gql`
  scalar Date
  type Comment {
    id: Int!
    createdAt: Date
    updatedAt: Date
    shop: Shop!
    user: User!
    comment: String!
    isMine: Boolean
  }
`;
