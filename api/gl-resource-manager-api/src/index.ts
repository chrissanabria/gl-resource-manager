import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers  } from './schema.js';
import { getAuthData } from './auth.js';
import { resolvers as scalarResolvers, typeDefs as scalarTypeDefs } from 'graphql-scalars'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [
    ...scalarTypeDefs,
    typeDefs
  ],
  resolvers: {
    ...scalarResolvers,
    ...resolvers
  },
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || '';

    // Try to retrieve a user with the token
    const authData = await getAuthData(token);

    // Add the user to the context
    return { authData };
  },
});

console.log(`🚀  Server ready at: ${url}`);