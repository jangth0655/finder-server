import client from "../../client";
import { deleteToS3, UploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../type";
import { protectResolver } from "../../users/user.utils";

const resolvers: Resolvers = {
  Mutation: {
    editShop: protectResolver(
      async (
        _,
        { id, website, region, description, name, slug, url, photoId },
        { loggedInUser }
      ) => {
        const existShop = await client.shop.findUnique({
          where: { id },
          select: { id: true, name: true, slug: true },
        });
        if (!existShop) {
          return {
            ok: false,
            error: "Could not found Shop.",
          };
        }

        if (name && name !== existShop.name) {
          const existName = await client.shop.findUnique({
            where: { name },
            select: { id: true },
          });
          if (existName) {
            return {
              ok: false,
              error: "Name is already exist.",
            };
          }
          await client.shop.update({
            where: { id },
            data: { name },
          });
        }

        if (slug && slug !== existShop.slug) {
          const existSlug = await client.shop.findUnique({
            where: { slug },
            select: { id },
          });
          if (existSlug) {
            return {
              ok: false,
              error: "Slug is already exist.",
            };
          }
          await client.shop.update({
            where: { id },
            data: { slug },
          });
        }

        let editPhoto;
        if (url && photoId) {
          await deleteToS3(photoId, "Upload");
          editPhoto = await UploadToS3(url, loggedInUser.id, "Upload");
          await client.photo.update({
            where: { id: photoId },
            data: { url: editPhoto },
          });
        }

        if (website) {
          await client.shop.update({
            where: { id: existShop.id },
            data: { website },
          });
        }
        if (description) {
          await client.shop.update({
            where: { id: existShop.id },
            data: { description },
          });
        }

        if (region) {
          await client.shop.update({
            where: { id: existShop.id },
            data: { region },
          });
        }

        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
