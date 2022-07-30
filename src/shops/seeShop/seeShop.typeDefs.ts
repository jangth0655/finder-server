import { gql } from "apollo-server-core";
export default gql`
  type Query {
    seeShop(id: Int!): Shop
  }
`;
