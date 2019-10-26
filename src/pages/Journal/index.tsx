import React from "react";

import { useCampaignState } from "../../context/campaign/store";
import {
  JournalModalProvider,
  JournalStateProvider
} from "../../context/journal";
import { EntryStateProvider } from "../../context/journal/entry";
import JournalCreateModal from "./CreateModal";
import Entry from "./Entry";
import Navbar from "./Navbar";
import Navigator from "./Navigator";

const Journal = () => {
  const { activeCampaign } = useCampaignState();
  if (!activeCampaign) {
    throw new Error("Rendered Journal with no Active Campaign");
  }
  return (
    <JournalStateProvider>
      <JournalModalProvider>
        <EntryStateProvider>
          <Navbar />
          <Navigator />
          <Entry />
          <JournalCreateModal />
        </EntryStateProvider>
      </JournalModalProvider>
    </JournalStateProvider>
  );
};

export default Journal;
