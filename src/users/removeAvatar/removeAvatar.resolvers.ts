import client from "../../client";
import { deleteToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../type";
import { protectResolver } from "../user.utils";

const resolvers: Resolvers = {
  Mutation: {
    removeAvatar: protectResolver(async (_, { avatar }, { loggedInUser }) => {
      if (!avatar) {
        return {
          ok: false,
          error: "Could not found avatar image",
        };
      }
      await deleteToS3(avatar, "avatar");
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          avatar: null,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
