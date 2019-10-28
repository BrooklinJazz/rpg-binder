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
  campaigns: ICampaign["_id"];
}

export interface ICampaignInput {
  name: string;
  description?: string;
}

export interface IUpdateCampaignInput extends ICampaignInput {
  _id: string;
}

export interface ICampaign extends Document, ICampaignInput {
  npcs: INpc["_id"][];
  creator: IUser["_id"];
  organizations: IOrganization["_id"][];
  locations: ILocation["_id"][];
}

export interface INpcInput {
  name: string;
  description?: string;
  campaign: ICampaign["_id"];
  avatar?: File;
}

export interface IUpdateNpcInput extends INpcInput {
  _id: string;
}

export interface INpc extends Document, INpcInput {
  creator: IUser["_id"];
}

export interface IOrganizationInput {
  name: string;
  description?: string;
  campaign: ICampaign["_id"];
}

export interface IOrganization extends Document, IOrganizationInput {
  npcs: INpc["_id"][];
  creator: IUser["_id"];
}

export interface ILocationInput {
  name: string;
  description?: string;
  campaign: ICampaign["_id"];
  parentLocation?: ILocation["_id"];
}
export interface IUpdateLocationInput extends ILocationInput {
  _id: string;
}

export interface ILocation extends Document, ILocationInput {
  creator: IUser["_id"];
  npcs: INpc["_id"][];
  organizations: IOrganization["_id"][];
  locations: ILocation["_id"][];
}

export interface IContext {
  user?: IUser;
}
