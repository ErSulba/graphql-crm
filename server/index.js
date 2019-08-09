import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// ENV
dotenv.config({ path: 'variables.env' });
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization'];

    if (token !== 'null') {
      try {
        // Verify user token
        const actualUser = await jwt.verify(token, process.env.SECRET);
        // setting the user in the context, so we can use it
        return { actualUser };
      } catch (err) {
        console.log(err);
      }
    }
    // console.log(token);
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Server is running on http://localhost:4000${server.graphqlPath}`
  )
);
