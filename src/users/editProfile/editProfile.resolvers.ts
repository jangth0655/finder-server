import bcrypt from "bcrypt";
import client from "../../client";
import { UploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../type";
import { protectResolver } from "../user.utils";
const GraphQLUpload = require("graphql-upload");

const resolvers: Resolvers = {
  Upload: GraphQLUpload as any,
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          email,
          username,
          password,
          avatar,
          bio,
          careers,
          region,
          phone,
          name,
        },
        { loggedInUser }
      ) => {
        try {
          let hashPassword = null;
          if (password) {
            hashPassword = await bcrypt.hash(password, 10);
          }
          let fileUrl = null;
          if (avatar) {
            fileUrl = await UploadToS3(avatar, loggedInUser.id, "avatar");
          }

          const updateUser = await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              username,
              email,
              bio,
              careers,
              region,
              phone,
              name,
              ...(hashPassword && { password: hashPassword }),
              avatar: fileUrl ? fileUrl : "",
            },
          });

          if (updateUser.id) {
            return {
              ok: true,
            };
          } else {
            return {
              ok: false,
              error: `Could not update profile`,
            };
          }
        } catch (e) {
          console.log(e);
          return {
            ok: false,
          };
        }
      }
    ),
  },
};

export default resolvers;
