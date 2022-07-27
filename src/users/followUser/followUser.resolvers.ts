import client from "../../client";
import { Resolvers } from "../../type";
import { protectResolver } from "../user.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectResolver(async (_, { username }, { loggedInUser }) => {
      try {
        const toFollowUser = await client.user.findFirst({
          where: {
            username,
          },
          select: {
            id: true,
          },
        });

        if (!toFollowUser) {
          return {
            ok: false,
            error: `Could not found username`,
          };
        }
        const isFollow = await client.user.count({
          where: {
            id: loggedInUser.id,
            following: {
              some: {
                username,
              },
            },
          },
        });
        if (isFollow) {
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                disconnect: {
                  username,
                },
              },
            },
          });
        } else {
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                connect: {
                  username,
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
    }),
  },
};

export default resolvers;
