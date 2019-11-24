import React from "react";
import styled from "styled-components";

import { buttonHeight } from "../../../../../common/styles";
import { CampaignList } from "./CampaignList";
import { CampaignHeader } from "./Header";

const Grid = styled.section`
  grid-area: campaign-drawer;
  display: grid;
  grid-gap: 2px;
  grid-template-columns: 1fr;
  grid-template-rows: ${buttonHeight} 1fr;
  grid-template-areas:
    "campaign-header"
    "campaign-list";
`;

export const Campaigns = ({ open }: { open: boolean }) => {
  return (
    <Grid>
      <CampaignHeader>Campaigns</CampaignHeader>
      <CampaignList open={open} />
    </Grid>
  );
};
