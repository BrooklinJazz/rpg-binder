import React from "react";

import { Modal } from "../../../../components/StyledModal";
import { useJournalModalState } from "../../../../context/journal";

export const SectionModal = () => {
  const { close } = useJournalModalState();
  return (
    <Modal title="Create New Section" close={close}>
      Section Modal
    </Modal>
  );
};
