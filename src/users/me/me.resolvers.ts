import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../user.utils";

const resolvers: Resolvers = {
  Query: {
    me: protectResolver(async ({}, {}, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          return false;
        }
        const user = await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        });
        return user;
      } catch (e) {
        console.log(e);
        return false;
      }
    }),
  },
};

export default resolvers;
