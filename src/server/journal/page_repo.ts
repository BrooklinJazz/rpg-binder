import { IPageDocument, IPage, ICreatePageInput } from "../types";
import PageModel from "./page_model";

const build = (campaign: IPageDocument | null): IPage =>
  campaign && campaign.toObject();

const buildMany = (Pages: IPageDocument[]): IPage[] => Pages.map(build);

export class PageRepo {
  static findBySection = (section: string) =>
    PageModel.find({ section }).then(buildMany);

  //   static findById = (section: string) =>
  //     PageModel.findById({ section }).then(build);

  static findByIds = (pageIds: string[]) =>
    PageModel.find({ _id: { $in: pageIds } }).then(buildMany);

  static create = (input: ICreatePageInput) =>
    PageModel.create(input).then(build);
}
