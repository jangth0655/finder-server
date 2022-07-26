import { gql } from "apollo-server-core";
export default gql`
  scalar Upload
  type EditProfileMutation {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      email: String
      username: String
      password: String
      avatar: Upload
      bio: String
      careers: String
      region: String
      phone: String
      name: String
    ): EditProfileMutation
  }
`;
