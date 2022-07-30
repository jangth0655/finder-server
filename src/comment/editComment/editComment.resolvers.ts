import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../../users/user.utils";

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectResolver(
      async (_, { id, comment }, { loggedInUser }) => {
        const existComment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!existComment) {
          return {
            ok: false,
            error: "Could not found error.",
          };
        } else if (existComment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "not authorized.",
          };
        } else {
          await client.comment.update({
            where: { id },
            data: { comment },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolvers;
