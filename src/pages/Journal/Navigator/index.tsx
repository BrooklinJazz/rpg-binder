import React, { useState } from "react";
import { GridTemplateAreas } from "../../../common/constants";
import combineClasses from "combine-classes";
import "./Navigator.scss";
import Heading from "./Heading";
import Sections from "./Sections";
import Pages from "./Pages";
import { useQuery } from "@apollo/react-hooks";
import { CAMPAIGN } from "../../../api/apollo";
import { useCampaignState } from "../../../context/campaign/store";
import { INpc } from "../../../common/types";
import { Theme } from "../../../common/theme";
import CampaignList from "./CampaignList";
const Navigator = () => {
  const { activeCampaign } = useCampaignState();
  const [open, setOpen] = useState(false);
  const { data } = useQuery<
    { campaign: { name: string; npcs: INpc[] } },
    { campaignId: string }
  >(CAMPAIGN, { variables: { campaignId: activeCampaign! } });
  return (
    <div
      className={combineClasses(
        "NavigatorContainer",
        GridTemplateAreas.SIDEBAR
      )}
    >
      <CampaignList open={open} />
      <div className="Navigator">
        <Heading
          toggleCampaignList={() => setOpen(!open)}
          campaignName={data && data.campaign.name}
        />
        <Sections />
        <Pages />
      </div>
    </div>
  );
};

export default Navigator;
