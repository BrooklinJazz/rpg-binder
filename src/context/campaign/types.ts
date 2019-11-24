import { ICampaign } from "../../common/types";

export interface ICampaignState {
  activeCampaign?: string;
  modalIsOpen: boolean;
}

export type CampaignAction = ISelectCampaign | IOpenModal | ICloseModal;

export type CampaignDispatch = (action: CampaignAction) => void;

export interface ISelectCampaign {
  type: "select_campaign";
  payload: { campaign: string | undefined };
}
export interface IOpenModal {
  type: "open_modal";
}

export interface ICloseModal {
  type: "close_modal";
}
