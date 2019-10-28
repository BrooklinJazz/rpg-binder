import { ISection } from "../sections/types";
import Page from "./model";
import Section from "./model";
import { IPage } from "./types";
import { toObject } from "../helpers";

export class PageRepo {
  public async findById(id: string): Promise<IPage> {
    return await Page.findById(id).then(toObject);
  }

  public async findBySection(id: string): Promise<IPage[]> {
    return await Page.find({ parentSection: id }).then(toObject);
  }

  public async findSection(page: IPage): Promise<ISection> {
    return await Section.findById(page.parentSection).then(toObject);
  }

  public async findRelatedPages(page: IPage): Promise<IPage[]> {
    const found = await Page.findById(page._id);
    if (!found) {
      throw new Error("page not found");
    }
    const relatedPages = await Page.find({
      id: { $in: found.relatedPages }
    }).then(toObject);
    return relatedPages;
  }
}
