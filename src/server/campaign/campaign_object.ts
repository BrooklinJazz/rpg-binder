import CampaignRepo from "./campaign_repo";
import { ICampaignInput } from "../types";

export default class CampaignObject {
  private name: string;
  private creator: string;
  constructor({ name, creator }: ICampaignInput) {
    this.name = name;
    this.creator = creator;
  }

  public createAndSave = async () => {
    try {
      return CampaignRepo.create({ name: this.name, creator: this.creator });
    } catch (error) {
      throw error;
    }
  };
}
