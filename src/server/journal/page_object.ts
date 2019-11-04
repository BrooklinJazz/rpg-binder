import { IPage } from "../types";
import { PageRepo } from "./page_repo";

export default class PageObject {
  _id: string;
  relatedPages: IPage[];
  name: string;
  campaign: string;
  constructor({ name, campaign, _id }: IPage, relatedPages: IPage[] = []) {
    this.name = name;
    this._id = _id;
    this.campaign = campaign;
    this.relatedPages = relatedPages;
  }

  static fromPage = async (page: IPage) => {
    const relatedPages = await PageRepo.findByIds(page.relatedPages);
    return new PageObject(page, relatedPages);
  };
}
