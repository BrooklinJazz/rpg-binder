import combineClasses from "combine-classes/lib";
import React from "react";

import { GridTemplateAreas } from "../../common/constants";
import { useCampaignState } from "../../context/campaign/store";
import Navbar from "./JournalNavbar";

const Journal = () => {
  const { activeCampaign } = useCampaignState();
  if (!activeCampaign) {
    throw new Error("Rendered Journal with no Active Campaign");
  }
  return (
    <>
      <Navbar />
      <div className={combineClasses(GridTemplateAreas.PAGE)}>
        Journal Placeholder
      </div>
    </>
  );
};

export default Journal;
