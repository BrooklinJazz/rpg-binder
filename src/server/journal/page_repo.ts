import { IPageDocument, IPage, ICreatePageInput } from "../types";
import PageModel from "./page_model";

const build = (campaign: IPageDocument | null): IPage =>
  campaign && campaign.toObject();

const buildMany = (Pages: IPageDocument[]): IPage[] => Pages.map(build);

export class PageRepo {
  findBySection = (section: string) =>
    PageModel.find({ section }).then(buildMany);

  create = (input: ICreatePageInput) => PageModel.create(input).then(build);
}
