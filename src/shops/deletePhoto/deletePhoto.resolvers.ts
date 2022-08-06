import client from "../../client";
import { deleteToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../type";
import { protectResolver } from "../../users/user.utils";

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectResolver(async (_, { id, file }) => {
      try {
        const existPhoto = await client.photo.findFirst({
          where: { id },
          select: { id: true },
        });
        if (!existPhoto) {
          return {
            ok: false,
            error: "Could not found Photo.",
          };
        }
        await deleteToS3(file, "Upload");
        await client.photo.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: e,
        };
      }
    }),
  },
};

export default resolvers;
