import { AuthenticationError } from "apollo-server";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import path from "path";

import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { IAuthData, IContext } from "./types";
import UserModel from "./user/user_model";

const app = express();
// app.use(express.static(path.join(__dirname, "../build")));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }): Promise<{}> => {
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
        user = decodedToken && (await UserModel.findById(decodedToken.userId));
      } catch (error) {
        throw new AuthenticationError(error);
      }
    }
    // NOTE using || undefined to get around possible null type.
    return { user: user || undefined };
  },
  playground: false
});

server.applyMiddleware({ app, path: "/api" });

app.get("*", function(req, res) {
  res.send("Hello");
  // res.sendFile(path.join(__dirname, "../build", "index.html"));
});

dotenv.config();

const PORT = process.env.PORT || 4000;

mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-o0hne.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen({ port: PORT, path: "/api" }, () => {
      console.log(`🚀  Server ready at UNKNOWN probably 4000`);
    });
    // .then(({ url }: { url: string }) => {
    // })
    // .catch(err => console.log("SERVER ERROR", err));
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
