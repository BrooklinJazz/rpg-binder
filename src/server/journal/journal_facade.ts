import { ICreatePageInput, ISectionInput } from "../types";
import PageObject from "./page_object";
import { PageRepo } from "./page_repo";
import SectionObject from "./section_object";
import { SectionRepo } from "./section_repo";

export default class JournalFacade {
  private user: string;
  private campaign: string;
  constructor({ user, campaign }: { user: string; campaign: string }) {
    this.user = user;
    this.campaign = campaign;
  }
  // NOTE using the repo directly may be an antipattern
  public getSections = () =>
    SectionRepo.findByCampaign(this.campaign).then(async sections =>
      Promise.all(
        sections.map(async section => await SectionObject.fromSection(section))
      )
    );

  public getPages = (section: string) =>
    PageRepo.findBySection(section).then(async sections =>
      Promise.all(sections.map(async page => await PageObject.fromPage(page)))
    );

  public updateOrCreateSection = (input: ISectionInput) =>
    SectionRepo.updateOrCreate(input).then(section =>
      SectionObject.fromSection(section)
    );

  public createPage = (input: ICreatePageInput) =>
    PageRepo.create(input).then(page => PageObject.fromPage(page));
}
