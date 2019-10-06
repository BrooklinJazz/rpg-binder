import { Document } from "mongoose";

export interface IInput<T> {
  input: T;
}

export interface IUserInput {
  email: string;
  password: string;
}

export interface IAuthData {
  userId: string;
  token: string;
  tokenExpiration: number;
}

export interface IUser extends Document, IUserInput {
  npcs: Array<INpc["_id"]>;
  campaigns: Array<ICampaign["_id"]>;
}

export interface ICampaignInput {
  name: string;
  description?: string;
}

export interface IUpdateCampaignInput extends ICampaignInput {
  _id: string;
}

export interface ICampaign extends Document, ICampaignInput {
  npcs: Array<INpc["_id"]>;
  creator: IUser["_id"];
}

export interface INpcInput {
  name: string;
  description: string;
  creator: IUser;
  campaign: IUser;
}

export interface INpc extends Document, INpcInput {
  creator: IUser["_id"];
  campaign: ICampaign["_id"];
}

export interface IContext {
  user?: IUser;
}
