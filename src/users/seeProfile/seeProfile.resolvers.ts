import client from "../../client";
import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { id }) => {
      try {
        const user = await client.user.findFirst({
          where: { id },
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
