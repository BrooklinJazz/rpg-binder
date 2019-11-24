import { IUserInput } from "../types";
import UserObject from "./user_object";
import { UserRepo } from "./user_repo";

export default class UserFacade {
  public signUp = (input: IUserInput) => {
    return new UserObject(input, new UserRepo()).createAndSave();
  };
  public login = (input: IUserInput) => {
    return new UserObject(input, new UserRepo()).getAuthCredentials();
  };
}
