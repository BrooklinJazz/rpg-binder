import CampaignRepo from "./campaign_repo";
import CampaignObject from "./campaign_object";
import { ICampaignInput } from "../../common/types";

export default class CampaignFacade {
  user: string;
  constructor(user: string) {
    this.user = user;
  }
  // this is probably an antipattern using the repo rather than the BO.
  public getCampaigns = () => new CampaignRepo().findByUser(this.user);
  public create = (input: ICampaignInput) =>
    new CampaignObject(input, new CampaignRepo()).createAndSave();
}
