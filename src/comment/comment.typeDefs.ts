import { gql } from "apollo-server-core";
export default gql`
  type Comment {
    id: String
    createdAt: String
    updatedAt: String
    shop: Shop!
    user: User!
    comment: String!
    isMine: Boolean
  }
`;
