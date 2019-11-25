import { IInput, IUserInput, IAuthData } from "../types";
import UserFacade from "./user_facade";

export default {
  Query: {
    login: async (
      root: any,
      { input }: IInput<IUserInput>
    ): Promise<IAuthData> => new UserFacade().login(input),
    refreshToken: async (
      root: any,
      { input }: IInput<{token: string}>
    ): Promise<IAuthData> => new UserFacade().refreshToken(input)
  },
  Mutation: {
    createUser: async (
      root: any,
      { input }: IInput<IUserInput>
    ): Promise<IAuthData> => new UserFacade().signUp(input)
  }
};
