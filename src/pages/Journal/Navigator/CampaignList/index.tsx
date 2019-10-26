import "./CampaignList.scss";

import combineClasses from "combine-classes/lib";
import React from "react";
import { CSSTransition } from "react-transition-group";

import { useQuery } from "@apollo/react-hooks";

import { CAMPAIGN_NAMES } from "../../../../api/apollo";
import { Theme } from "../../../../common/theme";
import Loading from "../../../../components/Loading";
import { Text } from "../../../../components/Typeography";
import { selectCampaign } from "../../../../context/campaign/actions";
import {
  useCampaignDispatch,
  useCampaignState
} from "../../../../context/campaign/store";
import { useJournalMachine } from "../../../../context/journal";
import ListItem from "../ListItem";

interface IProps {
  open: boolean;
}

const CampaignList = ({ open }: IProps) => {
  const { data, loading } = useQuery<{
    campaigns: { _id: string; name: string }[];
  }>(CAMPAIGN_NAMES);
  const { actions } = useJournalMachine();
  const { activeCampaign } = useCampaignState();
  return (
    <CSSTransition
      classNames="navigator-campaigns"
      unmountOnExit
      in={open}
      timeout={200}
    >
      <div className="NavigatorCampaigns">
        <Text
          className={combineClasses("NavigatorCampaignsHeading", Theme.default)}
        >
          Campaigns
        </Text>
        {loading || !data ? (
          <Loading />
        ) : (
          data.campaigns.map(campaign => (
            <ListItem
              key={campaign._id}
              className="NavigatorCampaignsItem"
              onClick={() => actions.changeCampaign(campaign._id)}
              active={activeCampaign === campaign._id}
            >
              {campaign.name}
            </ListItem>
          ))
        )}
      </div>
    </CSSTransition>
  );
};

export default CampaignList;
