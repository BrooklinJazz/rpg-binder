import { ICampaign, IUser } from "../models/types";
import { IPageDocument, IPage } from "../pages/types";
import { Document } from "mongoose";
import { Omit } from "../../common/types";

export interface ISectionDocument extends Document, Omit<ISection, "_id"> {
  name: string;
  pages: IPageDocument["_id"][];
  creator: IUser["_id"];
  campaign: ICampaign["_id"];
}

export interface ISection {
  _id: string;
  name: string;
  pages: IPage[];
}
