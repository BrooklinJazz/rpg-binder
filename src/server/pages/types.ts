import { ICampaign, IUser } from "../models/types";
import { Document } from "mongoose";
import { ISectionDocument, ISection } from "../sections/types";
import { Omit } from "../../common/types";

export interface IPageDocument extends Document, Omit<IPage, "_id"> {
  name: string;
  creator: IUser["_id"];
  campaign: ICampaign["_id"];
}

export interface IPage {
    _id: string;
    name: string;
    relatedPages: string[];
    parentSection: string[];
}

export interface IPagesBySection {
    section: ISection;
    pages: IPage[];
}
export type TPagesBySections = IPagesBySection[];