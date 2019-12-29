import { IPage, ISection } from "../types";
import { PageRepo } from "./page_repo";
import { SectionRepo } from "./section_repo";

export default class SectionObject {
  public _id: string;
  public pages: IPage[];
  public name: string;
  public campaign: string;
  public parentSection?: string;
  public sections: SectionObject[];

  constructor(
    { name, campaign, _id, parentSection }: ISection,
    pages: IPage[] = [],
    sections: SectionObject[] = []
  ) {
    this.name = name;
    this._id = _id;
    this.campaign = campaign;
    this.parentSection = parentSection;
    this.sections = sections;
    this.pages = pages;
  }

  public delete = () =>
    SectionRepo.deleteById(this._id).then(() =>
      PageRepo.deleteByIds(this.pages.map(page => page._id))
    );

  public static fromSection = async (section: ISection) => {
    const pages = await PageRepo.findBySection(section._id);
    const sections = await SectionRepo.findBySection(section._id);
    const sectionObjects: SectionObject[] = await Promise.all(
      sections.map(SectionObject.fromSection)
    );
    return new SectionObject(section, pages, sectionObjects);
  };
}
