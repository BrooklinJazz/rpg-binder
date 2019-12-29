import { IPageData, IPageInput, ISectionInput } from "../types";
import PageObject from "./page_object";
import { PageRepo } from "./page_repo";
import SectionObject from "./section_object";
import { SectionRepo } from "./section_repo";
import SectionCollection from "./section_collection";

export default class JournalFacade {
  private user: string;
  private campaign: string;
  constructor({ user, campaign }: { user: string; campaign: string }) {
    this.user = user;
    this.campaign = campaign;
  }
  // NOTE using the repo directly may be an antipattern
  public getSections = () =>
    SectionRepo.findByCampaign(this.campaign)
      .then(async sections => SectionCollection.fromSections(sections))
      .then(collection => collection.getSortedSections());

  public reorderSections = (startIndex: number, endIndex: number) =>
    SectionRepo.findByCampaign(this.campaign)
      .then(sections => SectionCollection.fromSections(sections))
      .then(sectionCollection =>
        sectionCollection.reorder(startIndex, endIndex)
      );

  public getPages = (section: string) =>
    PageRepo.findBySection(section).then(async sections =>
      Promise.all(sections.map(async page => await PageObject.fromPage(page)))
    );

  public getPage = (id: string) =>
    PageRepo.findById(id).then(async page => await PageObject.fromPage(page));

  public updateOrCreateSection = (input: ISectionInput) =>
    SectionRepo.updateOrCreate({ ...input, creator: this.user }).then(section =>
      SectionObject.fromSection(section)
    );

  public updateOrCreatePage = (input: IPageInput) =>
    PageRepo.updateOrCreate({ ...input, creator: this.user }).then(page =>
      PageObject.fromPage(page)
    );

  public createPage = (input: IPageData) =>
    PageRepo.create(input).then(page => PageObject.fromPage(page));

  public deletePage = (input: { _id: string }) =>
    PageRepo.deleteById(input._id);

  public deleteSection = (input: { _id: string }) =>
    SectionRepo.findById(input._id)
      .then(section => {
        return SectionObject.fromSection(section);
      })
      .then(section => section.delete());
}
