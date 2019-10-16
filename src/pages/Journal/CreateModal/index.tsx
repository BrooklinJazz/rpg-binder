import React, { useState } from "react";

import { titleFromJournalModalState } from "../../../common/helpers";
import { Theme } from "../../../common/theme";
import Fade from "../../../components/Fade";
import Modal from "../../../components/Modal";
import {
  useJournalMachine,
  useJournalModalState
} from "../../../context/journal";
import ModalHandler from "./ModalHandler";

const JournalCreateModal = () => {
  const { close, isOpen, state } = useJournalModalState();
  const title = titleFromJournalModalState(state);
  return (
    <Fade in={isOpen}>
      <Modal title={title} className={Theme.default} close={close}>
        <ModalHandler />
      </Modal>
    </Fade>
  );
};

export default JournalCreateModal;
