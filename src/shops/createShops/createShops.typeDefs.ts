import { gql } from "apollo-server-core";
export default gql`
  scalar Upload
  type CreateShopsResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createShops(
      url: Upload
      website: String
      region: String!
      description: String
      name: String!
      slug: String!
    ): CreateShopsResponse!
  }
`;
