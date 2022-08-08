import client from "../../client";
import { Resolvers } from "../../type";

const PAGE_SIZE = 5;
const resolvers: Resolvers = {
  Query: {
    favShops: async (_, { id, page = 1 }) => {
      try {
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
          take: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE,
        });
        return {
          ok: true,
          shops,
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
