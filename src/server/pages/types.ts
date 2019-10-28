import { ICampaign, IUser } from "../models/types";
import { Document } from "mongoose";
import { ISectionDocument } from "../sections/types";

export interface IPageDocument extends Document {
  name: string;
  relatedPages: IPageDocument["id"][];
  parentSection: ISectionDocument["_id"];
  creator: IUser["_id"];
  campaign: ICampaign["_id"];
}
