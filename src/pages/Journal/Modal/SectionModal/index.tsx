import React from "react";

import { Modal } from "../../../../components/StyledModal";
import { useJournalModalState } from "../../../../context/journal";
import { SectionForm } from "./Form";

export const SectionModal = () => {
  const { close } = useJournalModalState();
  return (
    <Modal title="Create New Section" close={close}>
      <SectionForm />
    </Modal>
  );
};
