import CampaignRepo from "./campaign_repo";
import { ICampaignInput, ICampaign } from "../types";
import { SectionRepo } from "../journal/sections/section_repo";
import { PageRepo } from "../journal/page_repo";

export default class CampaignObject {
  private name: string;
  private creator: string;
  constructor({ name, creator }: ICampaignInput) {
    this.name = name;
    this.creator = creator;
  }

  static fromCampaign(campaign: ICampaign) {
    return new CampaignObject({ ...campaign });
  }

  public async delete(campaignId: string) {
    await SectionRepo.deleteInCampaign(campaignId)
      .then(() => PageRepo.deleteInCampaign(campaignId))
      .then(() => CampaignRepo.deleteById(campaignId));
  }
  public createAndSave = async () => {
    try {
      return CampaignRepo.create({ name: this.name, creator: this.creator });
    } catch (error) {
      throw error;
    }
  };
}
