import { IUserInput } from "../types";
import { UserRepo } from "./user_repo";
import { UserInputError } from "apollo-server";
import bcrypt from "bcryptjs";
import { authTokenFromUser } from "../helpers";

export default class IUserObject {
  email: string;
  password: string;
  repo: UserRepo;
  constructor({ email, password }: IUserInput, repo: UserRepo) {
    this.email = email;
    this.password = password;
    this.repo = repo;
  }

  getAuthCredentials = async () => {
    const createdUser = await this.repo.findByEmail(this.email);
    const token = authTokenFromUser(createdUser);
    return { userId: createdUser._id, token, tokenExpiration: 1 };
  };

  getHashedPassword = async () => await bcrypt.hash(this.password, 12);

  createAndSave = async () => {
    try {
      const emailExists = await this.repo.findByEmail(this.email);
      if (emailExists) {
        throw new UserInputError("That email is already taken");
      }
      await this.repo.create({
        email: this.email,
        password: await this.getHashedPassword()
      });
      return await this.getAuthCredentials();
    } catch (error) {
      throw error;
    }
  };
}
