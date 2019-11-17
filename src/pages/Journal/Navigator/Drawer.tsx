import React from "react";
import { useCampaigns } from "../../../api/hooks";
import styled from "styled-components";
import { buttonHeight, surface2 } from "../../../common/styles";
import { Text } from "../../../components/StyledTypography";
import { ICampaign } from "../../../common/types";
import { DefaultButton } from "../../../components/StyledButtons";

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "campaign-list"
    ".";
`;

const CampaignListGrid = styled.section`
  grid-area: campaign-list;
  display: grid;
  grid-gap: 2px;
  min-width: 200px;
  grid-template-columns: 1fr;
  grid-template-rows: ${buttonHeight} 1fr;

  grid-template-areas:
    "campaign-list-header"
    "campaign-list-items";
`;

const CampaignHeader = styled(Text)`
  grid-area: campaign-list-header;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${surface2};
`;

const ListItem = styled(DefaultButton)`
  width: 100%;
`;

const CampaignList = () => {
  const { campaigns } = useCampaigns();
  const renderCampaign = (campaign: ICampaign) => (
    <ListItem key={campaign._id}>{campaign.name}</ListItem>
  );
  const renderCampaigns = () => campaigns && campaigns.map(renderCampaign);
  return (
    <CampaignListGrid>
      <CampaignHeader>Campaigns</CampaignHeader>
      {renderCampaigns()}
    </CampaignListGrid>
  );
};

export const Drawer = ({ open }: { open: boolean }) => {
  return (
    <Grid>
      <CampaignList />
    </Grid>
  );
};
