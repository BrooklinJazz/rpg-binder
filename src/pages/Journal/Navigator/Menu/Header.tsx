import React from "react";
import styled from "styled-components";

import { useCampaign } from "../../../../api/hooks";
import { Text } from "../../../../components/StyledTypography";

const CenteredHeader = styled(Text)`
  grid-area: menu-center;
  text-align: center;
`;

export const Header = () => {
  const { campaign } = useCampaign();
  return <CenteredHeader>{campaign && campaign.name}</CenteredHeader>;
};
