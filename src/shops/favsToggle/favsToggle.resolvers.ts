import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../../users/user.utils";

const resolvers: Resolvers = {
  Mutation: {
    favsToggle: protectResolver(async (_, { id }, { loggedInUser }) => {
      const existShop = await client.shop.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });
      if (!existShop) {
        return {
          ok: false,
          error: "Could not found shops.",
        };
      }
      const fav = await client.fav.findFirst({
        where: {
          shopId: id,
          userId: loggedInUser.id,
        },
        select: { id: true },
      });

      if (fav) {
        await client.fav.delete({
          where: {
            id: fav.id,
          },
        });
        return {
          ok: true,
        };
      }

      await client.fav.create({
        data: {
          userId: loggedInUser.id,
          shopId: id,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
