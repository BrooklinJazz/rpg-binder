import { IPage } from "../types";
import { PageRepo } from "./page_repo";

export default class PageObject {
  _id: string;
  relatedPages: IPage[];
  name: string;
  campaign: string;
  section: string;
  description?: string;
  isPinned: boolean;
  constructor(
    { name, campaign, _id, description, section, isPinned}: IPage,
    relatedPages: IPage[] = []
  ) {
    this.name = name;
    this._id = _id;
    this.isPinned = isPinned;
    this.description = description;
    this.campaign = campaign;
    this.section = section;
    this.relatedPages = relatedPages;
  }

  static fromPage = async (page: IPage) => {
    // NOTE may need to build actual pageObjects for related pages.
    const relatedPages = await PageRepo.findByIds(page.relatedPages);
    return new PageObject(page, relatedPages);
  };
}
