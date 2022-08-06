import { gql } from "apollo-server-core";
export default gql`
  type DeletePhotoResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deletePhoto(id: Int!): DeletePhotoResponse!
  }
`;
