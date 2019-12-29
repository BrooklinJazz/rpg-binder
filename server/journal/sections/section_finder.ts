import { SectionRepo } from "./section_repo";

export class SectionFinder {
  private campaign: string;
  private parentSection?: string;
  constructor(campaign: string, parentSection?: string) {
    this.campaign = campaign;
    this.parentSection = parentSection;
  }
  public getSectionsForReorder() {
    if (this.parentSection) {
      return SectionRepo.findBySection(this.parentSection);
    } else {
      return SectionRepo.findByCampaign(this.campaign);
    }
  }
}
