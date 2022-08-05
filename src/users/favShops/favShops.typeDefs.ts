import { gql } from "apollo-server-core";
export default gql`
  type FavShop {
    shop: Shop
  }
  type FavShopsResponse {
    ok: Boolean!
    error: String
    shops: [FavShop]
  }
  type Query {
    favShops(id: Int!, page: Int): FavShopsResponse
  }
`;
