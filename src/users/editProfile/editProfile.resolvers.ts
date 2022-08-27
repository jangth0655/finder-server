import bcrypt from "bcrypt";
import client from "../../client";
import { deleteToS3, UploadToS3 } from "../../shared/shared.utils";
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
          const currentUser = await client.user.findUnique({
            where: {
              id: loggedInUser.id,
            },
            select: {
              id: true,
              username: true,
              email: true,
            },
          });
          const existUser = await client.user.findFirst({
            where: {
              OR: [{ username }, { email }],
            },
            select: {
              id: true,
              username: true,
              email: true,
            },
          });
          let hashPassword = null;
          if (password) {
            hashPassword = await bcrypt.hash(password, 10);
          }
          let fileUrl;
          if (avatar) {
            await deleteToS3(avatar, "avatar");
            fileUrl = await UploadToS3(avatar, loggedInUser.id, "avatar");
          }

          if (username !== currentUser.username) {
            if (username === existUser.username) {
              return {
                ok: false,
                error: "Username is already taken.",
              };
            }
            await client.user.update({
              where: { id: loggedInUser.id },
              data: { username },
            });
          }

          if (email !== currentUser.email) {
            if (email === existUser.email) {
              return {
                ok: false,
                error: "Email is already taken.",
              };
            }
            await client.user.update({
              where: { id: loggedInUser.id },
              data: { email },
            });
          }

          const updateUser = await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
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
              username: updateUser.username,
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
