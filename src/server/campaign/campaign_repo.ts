import CampaignModel from "./campaign_model";
import { ICampaignDocument, ICampaign } from "../types";
import { ICampaignInput } from "../../common/types";

const build = (campaign: ICampaignDocument): ICampaign => campaign.toObject();
const buildMany = (campaigns: ICampaignDocument[]): ICampaign[] =>
  campaigns.map(build);

export default class CampaignRepo {
  findByUser = (userId: string) => {
    return CampaignModel.find({ creator: userId }).then(buildMany);
  };
  create = (input: ICampaignInput) => CampaignModel.create(input).then(build);
}
