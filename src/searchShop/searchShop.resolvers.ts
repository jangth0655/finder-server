import client from "../client";
import { Resolvers } from "../type";

const resolvers: Resolvers = {
  Mutation: {
    searchShop: async (_, { name }) => {
      const shop = await client.shop.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });
      return shop;
    },
  },
};

export default resolvers;
