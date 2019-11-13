import { Document } from "mongoose";
import { IContext, IUser } from "./types";
import jwt from "jsonwebtoken";

export const toObject = (found: Document[] | Document | null) => {
  if (!found) {
    throw new Error("ApplicationException: Model not found");
  }
  if (Array.isArray(found)) {
    return found.map(document => document.toObject);
  }
  return (found as Document).toObject();
};

export const checkSignedIn = (context: IContext) => {
  if (!context.user) {
    throw new Error("User is not authenticated");
  }
};

export const authTokenFromUser = (user: IUser) =>
  jwt.sign(
    { userId: user._id, email: user.email },
    // NOTE using an empty string when undefined to avoid a type issue.
    process.env.JWT_SECRET_KEY || "",
    { expiresIn: "1h" }
  );