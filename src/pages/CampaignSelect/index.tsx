import "./CampaignSelect.scss";

import combineClasses from "combine-classes/lib";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { useQuery } from "@apollo/react-hooks";
import { faBookDead } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CAMPAIGN_NAMES } from "../../api/apollo";
import { GridTemplateAreas } from "../../common/constants";
import { Routes } from "../../common/routes";
import { Theme } from "../../common/theme";
import { SuccessButton } from "../../components/Button";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import { H1, H2, Text } from "../../components/Typeography";
import { selectCampaign } from "../../context/campaign/actions";
import { useCampaignDispatch } from "../../context/campaign/store";

const CampaignSelect = ({ history }: RouteComponentProps) => {
  const { data, loading, error } = useQuery<{
    campaigns: { _id: string; name: string }[];
  }>(CAMPAIGN_NAMES);
  const dispatch = useCampaignDispatch();
  return (
    <>
      {/* <Modal /> */}
      <div className={combineClasses("CampaignSelect", GridTemplateAreas.PAGE)}>
        <div className="CampaignSelectContent">
          <div className="CampaignSelectHeader">
            <H1 fontWeight="light">Campaigns</H1>
          </div>
          <div className={combineClasses(Theme.default, "CampaignSelectNew")}>
            <Text className={combineClasses(Theme.onDefault, Theme.hoverable)}>
              + New
            </Text>
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
                  <Text
                    className={combineClasses(
                      Theme.background,
                      Theme.hoverable,
                      "CampaignSelectListItem"
                    )}
                    size="regular"
                    onClick={setCampaign}
                    key={campaign._id}
                  >
                    <FontAwesomeIcon
                      className="CampaignSelectListItemIcon"
                      icon={faBookDead}
                    />
                    {"  "}
                    {campaign.name}
                  </Text>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CampaignSelect);
