import { UserInputError } from "apollo-server";
import bcrypt from "bcryptjs";

import { IAuthData, IInput, IUserInput } from "../../models/types";
import User from "../../models/user";
import { authTokenFromUser } from "./helpers";

export default {
  Query: {
    login: async (
      root: any,
      { input: { email, password } }: IInput<IUserInput>
    ): Promise<IAuthData> => {
      const user = await User.findOne({ email });
      const validPassword =
        user && (await bcrypt.compare(password, user.password));
      if (!user || !validPassword) {
        throw new UserInputError("Invalid login credentials");
      }
      const token = authTokenFromUser(user);
      return { userId: user.id, token, tokenExpiration: 1 };
    }
  },
  Mutation: {
    createUser: async (
      root: any,
      { input: { email, password } }: IInput<IUserInput>
    ): Promise<IAuthData> => {
      try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          throw new UserInputError("That email is already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          email,
          password: hashedPassword
        });
        const createdUser = await user.save();
        const token = authTokenFromUser(createdUser);
        return { userId: createdUser.id, token, tokenExpiration: 1 };
      } catch (error) {
        throw error;
      }
    }
  }
};
