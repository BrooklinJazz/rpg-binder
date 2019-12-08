import { AuthenticationError } from "apollo-server";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

import jwt from "express-jwt";
import { decode } from "jsonwebtoken";
import jwksRsa from "jwks-rsa";

const authConfig = {
  domain: "brooklin-myers.auth0.com",
  audience: "https://rpg-binder.herokuapp.com/"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from brooklin-myers.auth0.com

const app = express();
app.use(express.static(path.join(__dirname, "../build")));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

app.use(checkJwt);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }): Promise<{}> => {
    // @ts-ignore checkJwt places user on req
    return { userId: req.user.sub };
  },
  playground: false
});

server.applyMiddleware({ app, path: "/api" });

dotenv.config();

const PORT = process.env.PORT || 4000;

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-o0hne.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen({ port: PORT, path: "/api" }, () => {
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    });
    // .then(({ url }: { url: string }) => {
    // })
    // .catch(err => console.log("SERVER ERROR", err));
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
