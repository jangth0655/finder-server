import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import Upload = require("graphql-upload/Upload.mjs");

const PORT = process.env.PORT;

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(logger("tiny"));
  await apollo.start();
  apollo.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
}

startApolloServer();
