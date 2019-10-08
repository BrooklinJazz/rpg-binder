import "./CampaignSelect.scss";

import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { CAMPAIGN_NAMES } from "../../api/apollo";
import { SuccessButton } from "../../components/Button";
import Loading from "../../components/Loading";
import { H1, H2, Body } from "../../components/Typeography";
import { selectCampaign } from "../../context/campaign/actions";
import { useCampaignDispatch } from "../../context/campaign/store";
import { RouteComponentProps, withRouter } from "react-router";
import { Routes } from "../../common/routes";
import combineClasses from "combine-classes/lib";
import { GridTemplateAreas } from "../../common/constants";
import { Theme } from "../../common/theme";

const CampaignSelect = ({ history }: RouteComponentProps) => {
  const { data, loading, error } = useQuery<{
    campaigns: { _id: string; name: string }[];
  }>(CAMPAIGN_NAMES);
  const dispatch = useCampaignDispatch();
  return (
    <div className={combineClasses("CampaignSelect", GridTemplateAreas.PAGE)}>
      <div className="CampaignSelectContent">
        <div className="CampaignSelectHeader">
          <H1 fontWeight="light" elementStyle="H2">
            Campaigns
          </H1>
        </div>
        <div className={Theme.default}>
          <Body className={combineClasses(Theme.onDefault, Theme.hoverable)}>
            + New
          </Body>
        </div>
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
      </div>
    </div>
  );
};

export default withRouter(CampaignSelect);
