import client from "../client";
import { Resolvers } from "../type";

const resolvers: Resolvers = {
  Query: {
    searchShop: async (_, { name }) => {
      const shop = await client.shop.findMany({
        where: {
          name: {
            startsWith: name,
          },
        },
      });

      return shop;
    },
  },
};

export default resolvers;
