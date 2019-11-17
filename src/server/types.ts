import { Document } from "mongoose";

import { Omit } from "../common/types";

export interface IUserInput {
  email: string;
  password: string;
}

export interface ICampaignInput {
  name: string;
  creator: string;
}

export interface IUpdateCampaignInput extends ICampaignInput {
  _id: string;
}

export interface IAuthData {
  userId: string;
  token: string;
  tokenExpiration: number;
}

export interface IInput<T> {
  input: T;
}

export interface IContext {
  user: string;
}

export interface IUserDocument extends Document, Omit<ISection, "_id"> {
  name: string;
  sections: ISectionDocument["_id"][];
  creator: IUserDocument["_id"];
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  sections: ISection[];
  campaigns: ICampaign[];
}

export interface ICampaignDocument extends Document, Omit<ICampaign, "_id"> {
  name: string;
  sections: ISectionDocument["_id"][];
  creator: IUserDocument["_id"];
}

export interface ICampaign {
  _id: string;
  name: string;
  sections: ISection[];
}

export interface ISectionDocument extends Document, Omit<ISection, "_id"> {
  name: string;
  pages: IPageDocument["_id"][];
  creator: IUserDocument["_id"];
  campaign: ICampaign["_id"];
}

export interface ISection {
  _id: string;
  name: string;
  campaign: string;
  pages: IPage[];
}
export interface IPageDocument extends Document, Omit<IPage, "_id"> {
  name: string;
  creator: IUserDocument["_id"];
  campaign: ICampaign["_id"];
}

export interface IPage {
  _id: string;
  name: string;
  description?: string;
  relatedPages: string[];
  campaign: string;
  section: string;
}

export interface IPagesBySection {
  section: ISection;
  pages: IPage[];
}

export type TPagesBySections = IPagesBySection[];

export interface ICreateSectionInput {
  name: string;
  campaign: string;
}

export interface ICreatePageInput {
  name: string;
  description?: string;
  section: string;
  campaign: string;
  relatedPages: string[];
}
