import CampaignModel from "./campaign_model";
import { ICampaignDocument, ICampaign, ICampaignInput } from "../types";

const build = (campaign: ICampaignDocument): ICampaign => campaign.toObject();
const buildMany = (campaigns: ICampaignDocument[]): ICampaign[] =>
  campaigns.map(build);

export default class CampaignRepo {
  static findByUser = (userId: string) => {
    return CampaignModel.find({ creator: userId }).then(buildMany);
  };
  static create = (input: ICampaignInput) => CampaignModel.create(input).then(build);
}
