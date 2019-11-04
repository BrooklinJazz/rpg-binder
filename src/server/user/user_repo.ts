import UserObject from "./user_object";
import user_model from "./user_model";
import UserModel from "./user_model";
import { IUserDocument, IUser, IUserInput } from "../types";

const build = (user: IUserDocument | null): IUser => user && user.toObject();

export class UserRepo {
  findByEmail = (email: string) =>
    UserModel.findOne({ email: email }).then(build);

  create = (input: IUserInput) => UserModel.create(input).then(build);
}
