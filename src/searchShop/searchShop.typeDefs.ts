import { gql } from "apollo-server-core";
export default gql`
  type Mutation {
    searchShop(name: String!): [Shop]
  }
`;
