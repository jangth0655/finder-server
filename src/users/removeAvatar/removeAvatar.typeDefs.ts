import { gql } from "apollo-server-core";
export default gql`
  type RemoveAvatarRespnose {
    ok: Boolean!
    error: String
  }
  type Mutation {
    removeAvatar(avatar: String!): RemoveAvatarRespnose!
  }
`;
