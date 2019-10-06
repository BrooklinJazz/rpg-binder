import jwt from "jsonwebtoken";

import { IContext, IUser } from "../../models/types";

export const checkSignedIn = (context: IContext) => {
  if (!context.user) {
    throw new Error("User is not authenticated");
  }
};

export const authTokenFromUser = (user: IUser) =>
  jwt.sign(
    { userId: user.id, email: user.email },
    // NOTE using an empty string when undefined to avoid a type issue.
    process.env.JWT_SECRET_KEY || "",
    { expiresIn: "1h" }
  );

export const userIdFromContext = (context: IContext): string => {
  if ("user" in context && "id" in context!.user!) {
    return context.user!._id;
  } else {
    throw new Error("user id not in passed context userIdFromContext");
  }
};
