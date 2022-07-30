import { gql } from "apollo-server-core";
export default gql`
  type DeleteCommentResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteComment(id: Int!): DeleteCommentResponse!
  }
`;
