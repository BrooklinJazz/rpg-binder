import "./Navigator.scss";

import combineClasses from "combine-classes";
import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";

import { CAMPAIGN, LOCATION_NAME } from "../../../api/apollo";
import { GridTemplateAreas } from "../../../common/constants";
import { INpc } from "../../../common/types";
import { useCampaignState } from "../../../context/campaign/store";
import { useJournalMachine } from "../../../context/journal";
import AddPage from "./AddPage";
import AddSection from "./AddSection";
import CampaignList from "./CampaignList";
import Heading from "./Heading";
import Pages from "./Pages";
import Sections from "./Sections";

const Navigator = () => {
  const { context } = useJournalMachine();
  const { activeCampaign } = useCampaignState();
  const [open, setOpen] = useState(false);
  const locationId = context.selectedLocation && context.selectedLocation.id;

  const { data: campaignData } = useQuery<
    { campaign: { name: string; npcs: INpc[] } },
    { campaignId: string }
  >(CAMPAIGN, { variables: { campaignId: activeCampaign! } });

  const { data: locationData, loading: locationLoading } = useQuery<
    { location: { name: string } },
    { locationId?: string }
  >(LOCATION_NAME, {
    variables: { locationId }
    // skip doesn't seem to work when value is defined
    // skip: !context.selectedLocation
  });

  // heading can be for campaign or selected location
  const campaignHeading = campaignData && campaignData.campaign.name;
  const locationHeading =
    locationData && !locationLoading && locationData.location.name;
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
        <AddSection />
        <AddPage />
      </div>
    </div>
  );
};

export default Navigator;
