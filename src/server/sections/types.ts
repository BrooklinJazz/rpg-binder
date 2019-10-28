import { ICampaign, IUser } from "../models/types";
import { IPageDocument } from "../pages/types";
import { Document } from "mongoose";

export interface ISectionDocument extends Document {
  name: string;
  pages: IPageDocument["_id"][];
  creator: IUser["_id"];
  campaign: ICampaign["_id"];
}
