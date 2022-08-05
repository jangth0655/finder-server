import client from "../../client";
import { Resolvers } from "../../type";
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, name, email, region, bio, careers, phone, password }
    ) => {
      try {
        const existUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
          select: {
            id: true,
          },
        });
        if (existUser) {
          return {
            ok: false,
            error: "There is already user.",
          };
        }

        const hashingPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            username,
            email,
            region,
            password: hashingPassword,
            name,
            careers,
            bio,
            phone,
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
    },
  },
};

export default resolvers;
