import React, { useState } from "react";
import { GridTemplateAreas } from "../../../common/constants";
import combineClasses from "combine-classes";
import "./Navigator.scss";
import Heading from "./Heading";
import Sections from "./Sections";
import Pages from "./Pages";
import { useQuery } from "@apollo/react-hooks";
import { CAMPAIGN, LOCATION_NAME } from "../../../api/apollo";
import { useCampaignState } from "../../../context/campaign/store";
import { INpc } from "../../../common/types";
import CampaignList from "./CampaignList";
import { useJournalMachine } from "../../../context/journal";
const Navigator = () => {
  const { context } = useJournalMachine();
  const { activeCampaign } = useCampaignState();
  const [open, setOpen] = useState(false);

  const { data: campaignData } = useQuery<
    { campaign: { name: string; npcs: INpc[] } },
    { campaignId: string }
  >(CAMPAIGN, { variables: { campaignId: activeCampaign! } });

  const { data: locationData } = useQuery<
    { location: { name: string } },
    { locationId: string }
    // NOTE skiping if selected location does not exist may still cause an error
  >(LOCATION_NAME, {
    variables: { locationId: context.selectedLocation! }
    // skip: !context.selectedLocation
  });

  // heading can be for campaign or selected location
  const campaignHeading = campaignData && campaignData.campaign.name;
  const locationHeading = locationData && locationData.location.name;
  const heading = context.selectedLocation ? locationHeading : campaignHeading;

  return (
    <div
      className={combineClasses(
        "NavigatorContainer",
        GridTemplateAreas.SIDEBAR
      )}
    >
      <CampaignList open={open} />
      <div className="Navigator">
        <Heading toggleCampaignList={() => setOpen(!open)}>{heading}</Heading>
        <Sections />
        <Pages />
      </div>
    </div>
  );
};

export default Navigator;
