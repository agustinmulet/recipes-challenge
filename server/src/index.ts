import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./resolvers/RecipeResolver";

const PORT = 4000;

const main = async () => {
  const app = express();
  app.use(cors());
  
  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RecipeResolver],
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
  });
};

main();
