import React from "react";

import {
  JournalModalStates,
  useJournalModalState
} from "../../../context/journal";
import CreateLocation from "./Location";
import CreateNpc from "./Npc";
import CreateOrganization from "./Organization";

const ModalHandler = () => {
  const { state } = useJournalModalState();
  switch (state) {
    // NOTE this
    case JournalModalStates.CREATE_LOCATION:
      return <CreateLocation />;
    case JournalModalStates.CREATE_ORGANIZATION:
      return <CreateOrganization />;
    case JournalModalStates.CREATE_NPC:
      return <CreateNpc />;
    default:
      throw new Error("Modal Handler called in invalid state");
  }
};

export default ModalHandler;
