import "./CampaignSelect.scss";

import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { CAMPAIGN_NAMES } from "../../api/apollo";
import { SuccessButton } from "../../components/Button";
import Loading from "../../components/Loading";
import { H1, H2 } from "../../components/Typeography";
import { selectCampaign } from "../../context/campaign/actions";
import { useCampaignDispatch } from "../../context/campaign/store";
import { RouteComponentProps, withRouter } from "react-router";
import { Routes } from "../../common/routes";

const CampaignSelect = ({ history }: RouteComponentProps) => {
  const { data, loading, error } = useQuery<{
    campaigns: { _id: string; name: string }[];
  }>(CAMPAIGN_NAMES);
  const dispatch = useCampaignDispatch();
  return (
    <div className="CampaignSelect">
      <div className="CampaignSelectContent">
        <H1 className="CampaignSelectHeader">Select Campaign</H1>
        <div className="CampaignSelectList">
          {loading && <Loading />}
          {data &&
            data.campaigns.map(campaign => {
              const setCampaign = () => {
                history.push(Routes.DASHBOARD);
                dispatch(selectCampaign({ campaign: campaign._id }));
              };
              return (
                <H2 onClick={setCampaign} key={campaign._id}>
                  {campaign.name}
                </H2>
              );
            })}
        </div>
        <div className="CampaignSelectAdd">
          <SuccessButton>Add Campaign</SuccessButton>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CampaignSelect);
