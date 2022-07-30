import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../../users/user.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectResolver(async (_, { id }, { loggedInUser }) => {
      const existComment = await client.comment.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!existComment) {
        return {
          ok: false,
          error: "Could not found Comment.",
        };
      } else if (existComment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized.",
        };
      } else {
        await client.comment.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};

export default resolvers;
