import { IPage, IPageDocument, IPageData } from "../types";
import PageModel from "./page_model";

const build = (page: IPageDocument | null): IPage => page && page.toObject();

const buildMany = (Pages: IPageDocument[]): IPage[] => Pages.map(build);

export class PageRepo {
  public static findBySection = (section: string) =>
    PageModel.find({ section }).then(buildMany);

  public static findInSession = (campaign: string) =>
    PageModel.find({ inSession: true, campaign }).then(buildMany);

  public static findByIds = (pageIds: string[]) =>
    PageModel.find({ _id: { $in: pageIds } }).then(buildMany);

  public static findById = (input: string) =>
    PageModel.findById(input).then(build);

  public static create = (input: IPageData) =>
    PageModel.create(input).then(build);

  public static deleteById = (id: string) =>
    PageModel.findByIdAndDelete(id).then(build);

  public static deleteInCampaign = (campaign: string) =>
    PageModel.deleteMany({ campaign });

  public static deleteByIds = (ids: string[]) =>
    PageModel.deleteMany({ id: { $in: ids } });

  public static update = ({ _id, ...input }: IPageData): Promise<IPage> =>
    PageModel.update({ _id }, { ...input }, { upsert: true }).then(build);

  // NOTE addToSession * removeFromSession is not returning buildable page,
  // but we don't have to return anything currently so I'm just not building for now.
  public static addToSession = (_id: string) =>
    PageModel.update({ _id }, { inSession: true });

  public static removeFromSession = (_id: string) =>
    PageModel.update({ _id }, { inSession: false });

  public static updateOrCreate = (input: IPageData): Promise<IPage> =>
    input._id ? PageRepo.update(input) : PageRepo.create(input);
}
