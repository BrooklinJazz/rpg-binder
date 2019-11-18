import React from "react";
import { CampaignModal } from "./Modal/index";
import { SelectCampaign } from "./SelectCampaign";
import { Grid } from "./Grid";

const Campaigns = () => {
  return (
    <>
      <CampaignModal />
      <Grid>
        <SelectCampaign />
      </Grid>
    </>
  );
};

export default Campaigns;
