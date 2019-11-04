import { ICampaignInput } from "../../common/types";
import CampaignRepo from "./campaign_repo";

export default class CampaignObject {
  public name: string;
  public repo: CampaignRepo;
  constructor({ name }: ICampaignInput, repo: CampaignRepo) {
    this.name = name;
    this.repo = repo;
  }

  createAndSave = async () => {
    try {
      return this.repo.create({ name: this.name });
    } catch (error) {
      throw error;
    }
  };
}
