import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CAMPAIGN_NAMES } from "../../api/apollo";

const CampaignSelect = () => {
  const { data, loading, error } = useQuery<
    { campaigns: { _id: string; name: string }[] }
  >(CAMPAIGN_NAMES);
  return (
    <div>
      <button onClick={() => console.log(data)}>test:</button>
      {data && data.campaigns.map(campaign => <div>{campaign.name}</div>)}
    </div>
  );
};

export default CampaignSelect;
