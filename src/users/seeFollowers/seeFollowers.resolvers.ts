import client from "../../client";
import { Resolvers } from "../../type";

const PageSize = 5;
const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page = 1 }, { loggedInUser }) => {
      try {
        const existUser = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });

        if (!existUser) {
          return {
            ok: false,
            error: "Could not found user.",
          };
        }
        const users = await client.user
          .findFirst({
            where: {
              id: loggedInUser.id,
            },
          })
          .followers({
            take: PageSize,
            skip: (page - 1) * PageSize,
          });
        return {
          ok: true,
          users,
        };
      } catch (e) {
        return {
          ok: false,
          error: e,
        };
      }
    },
  },
};

export default resolvers;
