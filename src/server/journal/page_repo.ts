import { IPage, IPageDocument, IPageInput } from "../types";
import PageModel from "./page_model";

const build = (campaign: IPageDocument | null): IPage =>
  campaign && campaign.toObject();

const buildMany = (Pages: IPageDocument[]): IPage[] => Pages.map(build);

export class PageRepo {
  public static findBySection = (section: string) =>
    PageModel.find({ section }).then(buildMany);

  public static findByIds = (pageIds: string[]) =>
    PageModel.find({ _id: { $in: pageIds } }).then(buildMany);

  public static create = (input: IPageInput) =>
    PageModel.create(input).then(build);

  public static update = ({ _id, ...input }: IPageInput): Promise<IPage> =>
    PageModel.update({ _id }, { ...input }, { upsert: true }).then(build);

  public static updateOrCreate = (input: IPageInput): Promise<IPage> =>
    input._id ? PageRepo.update(input) : PageRepo.create(input);
}
