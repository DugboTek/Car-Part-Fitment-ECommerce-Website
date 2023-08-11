import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs, resolvers } from "./dist/merge_schema.js";

// Initialize the Apollo Server with resolvers and typeDefs
async function startServer() {
  const server = new ApolloServer({
    typeDefs, // Your GraphQL schema type definitions
    resolvers, // Your GraphQL resolvers
  });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  // Add health check endpoint
  app.get("/health", function (req, res) {
    res.status(200).send("Healthy");
  });

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(
      `Server is running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

// Start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
