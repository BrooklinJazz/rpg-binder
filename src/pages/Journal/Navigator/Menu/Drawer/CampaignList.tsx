import React from "react";
import styled from "styled-components";

import { useCampaigns } from "../../../../../api/hooks";
import { ICampaign } from "../../../../../common/types";
import { selectCampaign } from "../../../../../context/campaign/actions";
import { useCampaignDispatch } from "../../../../../context/campaign/store";
import { ListItem } from "../../ListItem";
import { FadeAnimation } from "./FadeAnimation";

const Item = ({ campaign }: { campaign: ICampaign }) => {
  const dispatch = useCampaignDispatch();
  const select = () => dispatch(selectCampaign({ campaign: campaign._id }));
  return (
    <ListItem onClick={select} key={campaign._id}>
      {campaign.name}
    </ListItem>
  );
};

const List = styled(FadeAnimation)`
  grid-area: campaign-list;
  display: flex;
  flex-direction: column;
`;

export const CampaignList = ({ open }: { open: boolean }) => {
  const { campaigns } = useCampaigns();
  const renderCampaigns = () =>
    campaigns &&
    campaigns.map(campaign => <Item key={campaign._id} campaign={campaign} />);
  return <List open={open}>{renderCampaigns()}</List>;
};
