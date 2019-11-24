import CampaignModel from "./campaign_model";
import { ICampaignDocument, ICampaign, ICampaignInput } from "../types";

const build = (campaign: ICampaignDocument): ICampaign => campaign.toObject();
const buildMany = (campaigns: ICampaignDocument[]): ICampaign[] =>
  campaigns.map(build);

const throwIfEmpty = (doc?: ICampaignDocument | null) => {
  if (!doc) {
    throw new Error("Campaign Document does not exist");
  }
  return doc;
};

export default class CampaignRepo {
  public static findByUser = (userId: string) => {
    return CampaignModel.find({ creator: userId }).then(buildMany);
  };
  public static findById = (id: string) => {
    return CampaignModel.findById(id)
      .then(throwIfEmpty)
      .then(build);
  };
  public static create = (input: ICampaignInput) =>
    CampaignModel.create(input).then(build);

  public static deleteById = (id: string) =>
    CampaignModel.findByIdAndDelete(id);
}
