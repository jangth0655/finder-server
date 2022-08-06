import client from "../../client";
import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    seeShop: async (_, { id }) => {
      try {
        const shop = await client.shop.findUnique({
          where: {
            id,
          },
        });

        return shop;
      } catch (e) {
        console.log(e);
        return;
      }
    },
  },
};
export default resolvers;
