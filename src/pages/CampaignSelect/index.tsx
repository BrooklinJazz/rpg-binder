import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CAMPAIGN_NAMES } from "../../api/apollo";

const CampaignSelect = () => {
  const { data, loading, error } = useQuery<{ _id: string; name: string }[]>(
    CAMPAIGN_NAMES
  );
  return (
    <div>
      <button onClick={() => console.log(data)}>data</button>
    </div>
  );
};

export default CampaignSelect;
