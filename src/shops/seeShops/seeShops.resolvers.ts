import client from "../../client";
import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    seeShops: (_, { page = 1 }) =>
      client.shop.findMany({
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};

export default resolvers;
