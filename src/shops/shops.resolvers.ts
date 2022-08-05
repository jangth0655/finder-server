import client from "../client";
import { Resolvers } from "../type";

const pageSize = 5;
const resolvers: Resolvers = {
  Shop: {
    photos: ({ id }, { page = 1 }) =>
      client.photo.findMany({
        where: {
          shopId: id,
        },
        select: {
          url: true,
          id: true,
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }),
    comments: ({ id }) =>
      client.comment.findMany({
        where: {
          shopId: id,
        },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isLike: async ({ id }, _, { loggedInUser }) => {
      const favs = Boolean(
        await client.fav.findFirst({
          where: {
            userId: loggedInUser.id,
            shopId: id,
          },
          select: {
            id: true,
          },
        })
      );

      return favs;
    },
    favCount: ({ id }) =>
      client.fav.count({
        where: {
          shopId: id,
        },
      }),
  },
};

export default resolvers;
