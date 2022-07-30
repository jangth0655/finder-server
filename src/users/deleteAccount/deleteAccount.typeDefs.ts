import { gql } from "apollo-server-core";
export default gql`
  type DeleteAccount {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteAccount(id: Int!): DeleteAccount!
  }
`;
