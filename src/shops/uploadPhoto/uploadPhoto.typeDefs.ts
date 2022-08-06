import { gql } from "apollo-server-core";
export default gql`
  type UploadPhotoResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    uploadPhoto(photoUrl: Upload!, id: Int!): UploadPhotoResponse
  }
`;
