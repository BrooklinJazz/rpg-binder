import { IUserInput, IDecodedToken, IAuthData } from "../types";
import { UserRepo } from "./user_repo";
import { UserInputError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authTokenFromUser } from "../helpers";

export default class IUserObject {
  public email: string;
  private password: string;
  constructor({ email, password }: IUserInput) {
    this.email = email;
    this.password = password;
  }

  public static refreshToken = (token: string) => {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "", {
      ignoreExpiration: true
    }) as IAuthData;
    return UserRepo.findById(decodedToken.userId).then(({ email, password }) =>
      new IUserObject({ email, password }).getAuthCredentials()
    );
  };

  public getAuthCredentials = async () => {
    const createdUser = await UserRepo.findByEmail(this.email);
    const token = authTokenFromUser(createdUser);
    return { userId: createdUser._id, token, tokenExpiration: 1 };
  };

  public getHashedPassword = async () => await bcrypt.hash(this.password, 12);

  public createAndSave = async () => {
    try {
      const emailExists = await UserRepo.findByEmail(this.email);
      if (emailExists) {
        throw new UserInputError("That email is already taken");
      }
      await UserRepo.create({
        email: this.email,
        password: await this.getHashedPassword()
      });
      return await this.getAuthCredentials();
    } catch (error) {
      throw error;
    }
  };
}
