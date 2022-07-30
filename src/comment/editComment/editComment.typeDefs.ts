import { gql } from "apollo-server-core";
export default gql`
  type EditCommentResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editComment(id: Int!, comment: String!): EditCommentResponse!
  }
`;
