import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../user.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteAccount: protectResolver(async (_, { id }, { loggedInUser }) => {
      const existUser = await client.user.findUnique({
        where: { id },
        select: { id: true },
      });

      if (!existUser) {
        return {
          ok: false,
          error: "Could not found.",
        };
      }

      if (id !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized.",
        };
      }

      await client.user.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
export default resolvers;
