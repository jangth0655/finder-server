import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../../users/user.utils";

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectResolver(
      async (_, { shopId, comment }, { loggedInUser }) => {
        const existShop = await client.shop.findUnique({
          where: {
            id: shopId,
          },
          select: { id: true },
        });
        if (!existShop) {
          return {
            ok: false,
            error: "Could not found Shop.",
          };
        }
        await client.comment.create({
          data: {
            comment,
            shop: {
              connect: { id: shopId },
            },
            user: {
              connect: { id: loggedInUser.id },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
