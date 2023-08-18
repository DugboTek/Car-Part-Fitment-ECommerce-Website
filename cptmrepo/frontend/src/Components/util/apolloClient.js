/**
 * ! Apollo Client Configuration
 *
 * This module sets up the Apollo Client instance to communicate with the Apollo Server.
 * The Apollo Client is responsible for managing data fetching and caching in the frontend.
 */

// Import required packages from '@apollo/client'
import { ApolloClient, InMemoryCache } from "@apollo/client";

const liveserver = "https://apollo-server-cptm-dev.azurewebsites.net/graphql";
const localserver = "http://localhost:8080/graphql";
export const apollo_client = new ApolloClient({
  // The URI of your Apollo Server.
  uri: liveserver,

  // The cache implementation to be used by Apollo Client.
  cache: new InMemoryCache(),
});
