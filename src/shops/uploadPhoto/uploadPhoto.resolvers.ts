import { UploadToS3 } from "./../../shared/shared.utils";
import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../../users/user.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(async (_, { photoUrl, id }) => {
      try {
        const exsitShop = await client.shop.findFirst({
          where: {
            id,
          },
          select: { id: true },
        });
        if (!exsitShop) {
          return {
            ok: false,
            error: "Could not found shop",
          };
        }

        let file;
        file = await UploadToS3(photoUrl, id, "Upload");

        await client.photo.create({
          data: {
            url: file,
            shopId: id,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: `${e}`,
        };
      }
    }),
  },
};

export default resolvers;
