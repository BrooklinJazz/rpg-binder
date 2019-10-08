import React from "react";

import { useSubscription } from "@apollo/react-hooks";

import { GET_CAMPAIGN } from "../../api/apollo";
import { ICampaign } from "../../common/types";
import { useCampaignState } from "../../context/campaign/store";
import combineClasses from "combine-classes/lib";
import { GridTemplateAreas } from "../../common/constants";

const Dashboard = () => {
  const { activeCampaign } = useCampaignState();
  if (!activeCampaign) {
    throw new Error("Rendered Dashboard with no Active Campaign");
  }
  const { data }: { data?: ICampaign } = useSubscription(GET_CAMPAIGN, {
    variables: { campaignId: activeCampaign }
  });
  return <div className={combineClasses(GridTemplateAreas.PAGE)}>Dashboard Placeholder</div>;
};

export default Dashboard;
