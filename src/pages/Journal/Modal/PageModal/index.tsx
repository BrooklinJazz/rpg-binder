import React from "react";
import { Modal } from "../../../../components/StyledModal";
import { useJournalModalState } from "../../../../context/journal";

export const PageModal = () => {
  const { close } = useJournalModalState();
  return (
    <Modal title="Create New Page" close={close}>
      Page Modal
    </Modal>
  );
};
