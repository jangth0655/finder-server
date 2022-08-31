import client from "../../client";
import { deleteToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../type";
import { protectResolver } from "../user.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteAccount: protectResolver(
      async (_, { id, avatar }, { loggedInUser }) => {
        try {
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

          if (avatar) {
            await deleteToS3(avatar, "avatar");
          }

          await client.user.delete({
            where: {
              id,
            },
          });

          return {
            ok: true,
          };
        } catch (e) {
          return {
            ok: false,
            error: e,
          };
        }
      }
    ),
  },
};
export default resolvers;
