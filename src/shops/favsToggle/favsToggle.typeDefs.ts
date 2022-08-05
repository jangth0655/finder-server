import { gql } from "apollo-server-core";
export default gql`
  type FavsToggleResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    favsToggle(id: Int!): FavsToggleResponse
  }
`;
