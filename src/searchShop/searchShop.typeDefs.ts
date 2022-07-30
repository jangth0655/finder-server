import { gql } from "apollo-server-core";
export default gql`
  type Query {
    searchShop(name: String!): [Shop]
  }
`;
