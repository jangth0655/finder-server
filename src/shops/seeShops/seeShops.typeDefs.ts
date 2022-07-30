import { gql } from "apollo-server-core";
export default gql`
  type Query {
    seeShops(page: Int): [Shop]
  }
`;
