import client from "../client";
import { Resolvers } from "../type";

const pageSize = 5;
const resolvers: Resolvers = {
  User: {
    seeFollowings: async ({ username }, { page = 1 }) => {
      try {
        return await client.user
          .findFirst({
            where: {
              username,
            },
          })
          .following({
            take: pageSize,
            skip: (page - 1) * pageSize,
          });
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    seeFollowers: async ({ username }, { page = 1 }) => {
      try {
        return await client.user
          .findFirst({
            where: {
              username,
            },
          })
          .followers({
            take: pageSize,
            skip: (page - 1) * pageSize,
          });
      } catch (e) {
        console.log(e);
        return null;
      }
    },

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
    shops: async ({ id }) => {
      try {
        return await client.user
          .findUnique({
            where: {
              id,
            },
          })
          .shops();
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};

export default resolvers;
