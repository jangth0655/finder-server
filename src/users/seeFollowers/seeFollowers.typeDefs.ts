import { gql } from "apollo-server-core";
export default gql`
  type SeeFollower {
    ok: Boolean!
    error: String
    users: [User]
  }
  type Query {
    seeFollowers(username: String!, page: Int): SeeFollower
  }
`;
