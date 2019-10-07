import { ICampaign } from "../../common/types";

export interface ICampaignState {
  activeCampaign?: string;
}

export type CampaignAction = ISelectCampaign;

export type CampaignDispatch = (action: CampaignAction) => void;

export interface ISelectCampaign {
  type: "select_campaign";
  payload: { campaign: string };
}
