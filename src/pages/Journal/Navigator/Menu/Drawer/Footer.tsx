import React from "react";
import styled from "styled-components";

import { useCampaignModalActions } from "../../../../../api/hooks";
import { Add } from "../../../../../components/Add";

export const Grid = styled.div`
  grid-area: campaign-footer;
`;

const AddCampaign = () => {
  const { open } = useCampaignModalActions();
  return <Add onClick={open} title="Campaign" />;
};

export const CampaignFooter = () => {
  return (
    <Grid>
      <AddCampaign />
    </Grid>
  );
};
