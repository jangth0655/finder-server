import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../../users/user.utils";
import { GraphQLUpload } from "graphql-upload";
import { UploadToS3 } from "../../shared/shared.utils";

const resolvers: Resolvers = {
  Upload: GraphQLUpload as any,
  Mutation: {
    createShops: protectResolver(
      async (
        _,
        { url, website, region, description, name, slug },
        { loggedInUser }
      ) => {
        console.log(url);
        try {
          const existShop = await client.shop.findFirst({
            where: {
              OR: [{ name }, { slug }],
            },
            select: { id: true },
          });
          if (existShop) {
            return {
              ok: false,
              error: "Shop name or slug already exists.",
            };
          }
          const shop = await client.shop.create({
            data: {
              name,
              website,
              region,
              description,
              slug,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });

          let fileUrl;
          if (shop && url) {
            fileUrl = await UploadToS3(url, loggedInUser.id, "Upload");
            await client.photo.create({
              data: {
                url: fileUrl,
                shop: {
                  connect: {
                    id: shop.id,
                  },
                },
              },
            });
          }

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
      }
    ),
  },
};

export default resolvers;
