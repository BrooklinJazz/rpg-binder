import { ISelectCampaign } from "./types";

export const selectCampaign = (payload: ISelectCampaign["payload"]): ISelectCampaign => ({
  type: "select_campaign",
  payload
});
