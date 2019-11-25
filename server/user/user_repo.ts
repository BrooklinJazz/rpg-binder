import { IUser, IUserDocument, IUserInput } from "../types";
import UserModel from "./user_model";

const build = (user: IUserDocument | null): IUser => user && user.toObject();

export class UserRepo {
  public static findByEmail = (email: string) =>
    UserModel.findOne({ email }).then(build);

  public static findById = (id: string) => UserModel.findById(id).then(build);

  public static create = (input: IUserInput) =>
    UserModel.create(input).then(build);
}
