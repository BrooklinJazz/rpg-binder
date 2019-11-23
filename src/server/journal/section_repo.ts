import { ISectionDocument, ISection, ISectionInput } from "../types";
import SectionModel from "./section_model";

const build = (section: ISectionDocument | null): ISection => {
  return section && section.toObject();
};

const buildMany = (sections: ISectionDocument[]): ISection[] =>
  sections.map(build);

export class SectionRepo {
  public static findByCampaign = (campaign: string) =>
    SectionModel.find({ campaign }).then(buildMany);

  public static findById = (id: string) =>
    SectionModel.findById(id).then(build);

  public static findByIds = (sectionIds: string[]) =>
    SectionModel.find({ _id: { $in: sectionIds } }).then(buildMany);

  public static create = (input: ISectionInput): Promise<ISection> =>
    SectionModel.create(input).then(build);

  public static deleteById = (id: string) =>
    SectionModel.findByIdAndDelete(id).then(build);

  public static update = ({
    _id,
    ...input
  }: ISectionInput): Promise<ISection> =>
    SectionModel.update({ _id }, { ...input }, { upsert: true }).then(build);

  public static updateOrCreate = (input: ISectionInput): Promise<ISection> =>
    input._id ? SectionRepo.update(input) : SectionRepo.create(input);
}
