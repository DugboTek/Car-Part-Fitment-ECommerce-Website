import {mongo_config} from './config.js' ;
import { MongoClient, ServerApiVersion } from "mongodb";
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import {typeDefs, resolvers} from './schema_resolver.js';

const app = express();
const mongoURI =
  `mongodb+srv://${mongo_config.username}:${mongo_config.password}@cluster0.ycxjdeu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true
  },
});

// Connect the client to the server	
await client.connect();
// Send a ping to confirm a successful connection
// const adminDatabase = client.db('admin');
// await adminDatabase.command({ ping: 1 });
// console.log("⭐⭐⭐⭐ Pinged your deployment. You successfully connected to MongoDB! ⭐⭐⭐⭐");

const db = client.db("Parts");
const collection = db.collection("Data");


// 5. Create Apollo Server
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: ({ req }) => ({
        // Include the MongoDB client collection in the context
        collection: collection,
      }),
});

// 6. Apply Apollo middleware to Express app
await server.start(); 
server.applyMiddleware({ app });

// 7. Start the server
app.listen({ port: 4000 }, () =>
  console.log(`THE SERVER IS READY at ✨✨✨ http://localhost:4000${server.graphqlPath} ✨✨✨`)
);
// app.listen( {port: 4000} ); //uri: http://localhost:4000/graphql or http://167.246.60.3:4000/graphql

// client.close();
// console.log("Client closed! Yay!");  