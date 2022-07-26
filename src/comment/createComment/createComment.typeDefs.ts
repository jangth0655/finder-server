import { gql } from "apollo-server-core";
export default gql`
  type CreateCommentResponse {
    ok: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    createComment(shopId: Int!, comment: String!): CreateCommentResponse!
  }
`;
