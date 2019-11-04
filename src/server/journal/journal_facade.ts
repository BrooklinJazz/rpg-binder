import { ICreateSectionInput, ICreatePageInput } from "../types";
import { SectionRepo } from "./section_repo";
import SectionObject from "./section_object";
import { PageRepo } from "./page_repo";
import PageObject from "./page_object";

export default class JournalFacade {
  user: string;
  campaign: string;
  constructor({ user, campaign }: { user: string; campaign: string }) {
    this.user = user;
    this.campaign = campaign;
  }
  // NOTE using the repo directly may be an antipattern
  getSections = () =>
    SectionRepo.findByCampaign(this.campaign).then(async sections =>
      Promise.all(
        sections.map(async section => await SectionObject.fromSection(section))
      )
    );

  createSection = (input: ICreateSectionInput) =>
    SectionRepo.create(input).then(section =>
      SectionObject.fromSection(section)
    );

  createPage = (input: ICreatePageInput) =>
    PageRepo.create(input).then(page => PageObject.fromPage(page));
}
