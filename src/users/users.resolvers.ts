import client from "../client";
import { Resolvers } from "../type";

const PAGE_SIZE = 5;
const resolvers: Resolvers = {
  User: {
    totalFollowing: async ({ id }) => {
      try {
        return await client.user.count({
          where: {
            followers: {
              some: {
                id,
              },
            },
          },
        });
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    totalFollowers: async ({ id }) => {
      try {
        return client.user.count({
          where: {
            following: {
              some: {
                id,
              },
            },
          },
        });
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    isMe: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exist = await client.user.count({
        where: {
          id: loggedInUser.id,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exist);
    },
    shops: async ({ id }, { page = 1 }) => {
      console.log(page);
      try {
        return await client.user
          .findUnique({
            where: {
              id,
            },
          })
          .shops({
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
          });
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};

export default resolvers;
