import bcrypt from "bcrypt";
import client from "../../client";
import { Resolvers } from "../../type";
const jwt = require("jsonwebtoken");

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password: newPassword }) => {
      try {
        const user = await client.user.findFirst({
          where: {
            username,
          },
          select: { id: true, password: true },
        });
        if (!user) {
          return {
            ok: false,
            error: "Could not found user.",
          };
        }

        const passwordOk = await bcrypt.compare(newPassword, user.password);

        if (!passwordOk) {
          return {
            ok: false,
            error: "Incorrect info.",
          };
        }
        const token = await jwt.sign({ id: user.id }, process.env.SECRETE_KEY!);

        return {
          ok: true,
          token,
        };
      } catch (e) {
        return {
          ok: false,
          error: `${e}`,
        };
      }
    },
  },
};

export default resolvers;
