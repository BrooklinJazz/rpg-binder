import React from "react";

import { useCampaignState } from "../../context/campaign/store";
import Navbar from "./Navbar";
import Navigator from "./Navigator";
import Entry from "./Entry";

const Journal = () => {
  const { activeCampaign } = useCampaignState();
  if (!activeCampaign) {
    throw new Error("Rendered Journal with no Active Campaign");
  }
  return (
    <>
      <Navbar />
      <Navigator />
      <Entry />
    </>
  );
};

export default Journal;
