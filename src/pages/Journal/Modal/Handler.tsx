import React from "react";

import {
  JournalModalStates,
  useJournalModalState
} from "../../../context/journal";
import { PageModal } from "./PageModal/index";
import { SectionModal } from "./SectionModal/index";

export const Handler = () => {
  const { state } = useJournalModalState();
  switch (state) {
    case JournalModalStates.CREATE_PAGE:
      return <PageModal />;
    case JournalModalStates.CREATE_SECTION:
      return <SectionModal />;
    default:
      throw new Error("Handler rendered with invalid state: " + state);
      break;
  }
};
