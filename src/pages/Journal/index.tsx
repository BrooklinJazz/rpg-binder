import combineClasses from "combine-classes/lib";
import React from "react";

import { GridTemplateAreas } from "../../common/constants";
import { useCampaignState } from "../../context/campaign/store";
import Navbar from "./JournalNavbar";
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
