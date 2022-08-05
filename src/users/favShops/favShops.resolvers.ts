import client from "../../client";
import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    favShops: async (_, { id, page = 1 }) => {
      const existUser = await client.user.findFirst({
        where: { id },
        select: { id: true },
      });
      if (!existUser) {
        return {
          ok: false,
          error: "Could not found user.",
        };
      }
      const shops = await client.fav.findMany({
        where: {
          userId: id,
        },
        select: {
          shop: true,
        },
      });
      return {
        ok: true,
        shops,
      };
    },
  },
};

export default resolvers;
