import { gql } from "apollo-server-core";
export default gql`
  type SeeProfileResponse {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeProfile(id: Int!, page: Int): SeeProfileResponse
  }
`;
