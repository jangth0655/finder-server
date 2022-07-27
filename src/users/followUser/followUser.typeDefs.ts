import { gql } from "apollo-server-core";
export default gql`
  type FollowUserMutation {
    ok: Boolean!
    error: String
  }
  type Mutation {
    followUser(username: String!): FollowUserMutation
  }
`;
