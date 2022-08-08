import jwt from "jsonwebtoken";
import client from "../client";
import { Context, Resolver } from "../type";

type Token = {
  id: number;
  iat?: number;
};

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }

    const ok = jwt.verify(token, process.env.SECRETE_KEY!) as Token;
    const user = await client.user.findUnique({
      where: {
        id: ok.id,
      },
    });

    if (!user) return null;
    return user;
  } catch (e) {
    console.log(e);
    return `${e}`;
  }
};

export const protectResolver =
  (resolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in.",
      };
    }
    return resolver(root, args, context, info);
  };
