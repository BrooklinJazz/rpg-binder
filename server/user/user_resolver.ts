import { IInput, IUserInput, IAuthData } from "../types";
import UserFacade from "./user_facade";

export default {
  Query: {
    login: async (
      root: any,
      { input }: IInput<IUserInput>
    ): Promise<IAuthData> => new UserFacade().login(input)
  },
  Mutation: {
    createUser: async (
      root: any,
      { input }: IInput<IUserInput>
    ): Promise<IAuthData> => new UserFacade().signUp(input)
  }
};
