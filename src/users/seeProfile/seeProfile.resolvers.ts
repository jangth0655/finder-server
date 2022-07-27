import client from "../../client";
import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!user) {
          return {
            ok: false,
            error: "Could not found user.",
          };
        }
        return {
          ok: true,
          user,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: `${e}`,
        };
      }
    },
  },
};

export default resolvers;
