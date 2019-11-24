import CampaignRepo from "./campaign_repo";
import CampaignObject from "./campaign_object";
import { ICampaignInput } from "../../src/common/types";

export default class CampaignFacade {
  private user: string;
  constructor(user: string) {
    this.user = user;
  }
  // this is probably an antipattern using the repo rather than the BO.
  public getCampaigns = () => CampaignRepo.findByUser(this.user);
  public getCampaign = (id: string) => CampaignRepo.findById(id);
  public create = (input: ICampaignInput) =>
    new CampaignObject({ ...input, creator: this.user }).createAndSave();
  public delete = (id: string) => {
    return CampaignRepo.findById(id)
      .then(campaign => CampaignObject.fromCampaign(campaign))
      .then(campaignObj => campaignObj.delete(id));
  };
}
