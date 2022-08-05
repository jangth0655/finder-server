import { gql } from "apollo-server-core";

export default gql`
  scalar Date
  type User {
    id: Int!
    createdAt: Date!
    updatedA: Date!
    email: String!
    username: String!
    password: String!
    avatar: String
    bio: String
    careers: String
    region: String!
    phone: String!
    name: String!
    followers: [User]
    following: [User]
    seeFollowings(page: Int): [User]
    seeFollowers(page: Int): [User]
    totalFollowing: Int
    totalFollowers: Int
    isMe: Boolean!
    isFollowing: Boolean!
    shops: [Shop]
  }
`;
