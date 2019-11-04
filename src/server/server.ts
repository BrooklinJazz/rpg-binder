import { ApolloServer, AuthenticationError } from "apollo-server";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { IAuthData, IContext } from "./types";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }): Promise<IContext> => {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    let decodedToken;
    let user;
    // only throw an error if a token was provided but is invalid
    // because some calls do not require a token
    if (token) {
      try {
        decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY || ""
        ) as IAuthData;
        user = decodedToken && (await User.findById(decodedToken.userId));
      } catch (error) {
        throw new AuthenticationError(error);
      }
    }
    // NOTE using || undefined to get around possible null type.
    return { user: user || undefined };
  }
});

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-o0hne.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    server
      .listen()
      .then(({ url }: { url: string }) => {
        console.log(`🚀  Server ready at ${url}`);
      })
      .catch(err => console.log("SERVER ERROR", err));
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
