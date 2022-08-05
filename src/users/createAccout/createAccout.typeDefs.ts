import { gql } from "apollo-server-core";
export default gql`
  type CreateAccoutMutation {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      name: String!
      email: String!
      region: String!
      bio: String
      careers: String!
      phone: String
      password: String!
    ): CreateAccoutMutation!
  }
`;
