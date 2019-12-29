import { ISection, ISectionData, ISectionDocument } from "../../types";
import SectionModel from "./section_model";

const build = (section: ISectionDocument | null): ISection => {
  return section && section.toObject();
};

const buildMany = (sections: ISectionDocument[]): ISection[] =>
  sections.map(build);

export class SectionRepo {
  public static findByCampaign = (campaign: string) =>
    SectionModel.find({ campaign, parentSection: undefined }).then(buildMany);
  
  public static findBySection = (parentSection: string) =>
    SectionModel.find({ parentSection }).then(buildMany);

  public static findById = (id: string) =>
    SectionModel.findById(id).then(build);

  public static findByIds = (sectionIds: string[]) =>
    SectionModel.find({ _id: { $in: sectionIds } }).then(buildMany);

  public static create = (input: ISectionData): Promise<ISection> =>
    SectionModel.create(input).then(build);

  public static deleteById = (id: string) =>
    SectionModel.findByIdAndDelete(id).then(build);

  public static deleteInCampaign = (campaign: string) =>
    SectionModel.deleteMany({ campaign });

  public static update = ({ _id, ...input }: ISectionData): Promise<ISection> =>
    SectionModel.update({ _id }, { ...input }, { upsert: true }).then(build);

  public static updateOrCreate = (input: ISectionData): Promise<ISection> =>
    input._id ? SectionRepo.update(input) : SectionRepo.create(input);
}
