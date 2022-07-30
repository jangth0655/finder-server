import client from "../../client";
import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    seeShop: (_, { id }) =>
      client.shop.findUnique({
        where: {
          id,
        },
      }),
  },
};
export default resolvers;
