import React from "react";

import { Modal } from "../../../components/StyledModal";
import { closeModal } from "../../../context/campaign/actions";
import {
  useCampaignDispatch,
  useCampaignState
} from "../../../context/campaign/store";

import { CampaignForm } from "./Form";

export const CampaignModal = () => {
  const { modalIsOpen } = useCampaignState();
  const dispatch = useCampaignDispatch();
  const close = () => dispatch(closeModal());
  if (!modalIsOpen) {
    return null;
  }
  return (
    <Modal title="Create New Campaign" close={close}>
      <CampaignForm />
    </Modal>
  );
};
