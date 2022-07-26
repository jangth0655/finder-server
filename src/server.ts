import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import { getUser } from "./users/user.utils";

const PORT = process.env.PORT;

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token as string),
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  //app.use(logger("tiny"));
  await apollo.start();
  app.use(graphqlUploadExpress());
  apollo.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
}

startApolloServer();
