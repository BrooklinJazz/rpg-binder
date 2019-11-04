import {
  IPage,
  ICreateSectionInput,
  ISectionDocument,
  ISection
} from "../types";
import { SectionRepo } from "./section_repo";
import { PageRepo } from "./page_repo";

interface IFromSectionProps extends ICreateSectionInput {
  pages: IPage[];
  _id: string;
}

export default class SectionObject {
  _id: string;
  pages: IPage[];
  name: string;
  campaign: string;
  constructor({ name, campaign, _id }: ISection, pages: IPage[] = []) {
    this.name = name;
    this._id = _id;
    this.campaign = campaign;
    this.pages = pages;
  }

  static fromSection = async (section: ISection) => {
    const pages = await new PageRepo().findBySection(section._id);
    return new SectionObject(section, pages);
  };
}
