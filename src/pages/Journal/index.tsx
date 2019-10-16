import React from "react";

import { useCampaignState } from "../../context/campaign/store";
import Navbar from "./Navbar";
import Navigator from "./Navigator";
import Entry from "./Entry";
import {
  JournalStateProvider,
  JournalModalProvider
} from "../../context/journal";
import JournalCreateModal from "./CreateModal";

const Journal = () => {
  const { activeCampaign } = useCampaignState();
  if (!activeCampaign) {
    throw new Error("Rendered Journal with no Active Campaign");
  }
  return (
    <JournalStateProvider>
      <JournalModalProvider>
        <Navbar />
        <Navigator />
        <Entry />
        <JournalCreateModal />
      </JournalModalProvider>
    </JournalStateProvider>
  );
};

export default Journal;
