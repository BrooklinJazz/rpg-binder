import {
  ISectionDocument,
  ISection,
  ICreateSectionInput,
  ICampaignDocument
} from "../types";
import SectionModel from "./section_model";

const build = (campaign: ISectionDocument | null): ISection =>
  campaign && campaign.toObject();

const buildMany = (sections: ISectionDocument[]): ISection[] =>
  sections.map(build);

export class SectionRepo {
  static findByCampaign = (campaign: string) =>
    SectionModel.find({ campaign }).then(buildMany);

  static create = (input: ICreateSectionInput): Promise<ISection> =>
    SectionModel.create(input).then(build);
}
