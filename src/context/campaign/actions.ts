import { ICloseModal, IOpenModal, ISelectCampaign } from "./types";

export const selectCampaign = (
  payload: ISelectCampaign["payload"]
): ISelectCampaign => ({
  type: "select_campaign",
  payload
});

export const openModal = (): IOpenModal => ({
  type: "open_modal"
});

export const closeModal = (): ICloseModal => ({
  type: "close_modal"
});
