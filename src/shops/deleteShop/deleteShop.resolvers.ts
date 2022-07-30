import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../../users/user.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteShop: protectResolver(async (_, { id }, { loggedInUser }) => {
      const existShop = await client.shop.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!existShop) {
        return {
          ok: false,
          error: "Could not found.",
        };
      } else if (existShop.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized.",
        };
      } else {
        await client.shop.delete({
          where: { id },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};

export default resolvers;
