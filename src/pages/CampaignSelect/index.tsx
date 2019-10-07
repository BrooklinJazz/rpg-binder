import "./CampaignSelect.scss";

import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { CAMPAIGN_NAMES } from "../../api/apollo";
import Loading from "../../components/Loading";
import { H1, H2 } from "../../components/Typeography";

const CampaignSelect = () => {
  const { data, loading, error } = useQuery<{
    campaigns: { _id: string; name: string }[];
  }>(CAMPAIGN_NAMES);
  return (
    <div className="CampaignSelect">
      <div className="CampaignSelectContent">
        <H1>Select Campaign</H1>
        {loading && <Loading />}
        {data &&
          data.campaigns.map(campaign => (
            <H2 key={campaign._id}>{campaign.name}</H2>
          ))}
      </div>
    </div>
  );
};

export default CampaignSelect;
