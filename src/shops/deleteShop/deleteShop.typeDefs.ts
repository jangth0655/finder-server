import { gql } from "apollo-server-core";
export default gql`
  type DeleteShopReponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteShop(id: Int!): DeleteShopReponse!
  }
`;
