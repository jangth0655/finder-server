import { gql } from "apollo-server-core";
export default gql`
  scalar Upload
  type EditShopResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editShop(
      id: Int!
      website: String
      region: String
      description: String
      name: String
      slug: String
      url: Upload
      shop: String
      phone: String
      photoId: Int
      photoUrl: String
    ): EditShopResponse!
  }
`;
