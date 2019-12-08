import CampaignRepo from "./campaign_repo";
import CampaignObject from "./campaign_object";

export default class CampaignFacade {
  private userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  // this is probably an antipattern using the repo rather than the BO.
  public getCampaigns = () => CampaignRepo.findByUser(this.userId);
  public getCampaign = (id: string) => CampaignRepo.findById(id);
  public create = (input: { name: string }) =>
    new CampaignObject({ ...input, creator: this.userId }).createAndSave();
  public delete = (id: string) => {
    return CampaignRepo.findById(id)
      .then(campaign => CampaignObject.fromCampaign(campaign))
      .then(campaignObj => campaignObj.delete(id));
  };
}
