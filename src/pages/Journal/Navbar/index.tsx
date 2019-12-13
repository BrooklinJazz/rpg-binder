import React from "react";
import styled from "styled-components";

import { useCampaign } from "../../../api/hooks";
import { PROJECT_NAME } from "../../../common/constants";
import { navbarPadding, phoneBreakpoint } from "../../../common/styles";
import { Navbar as BaseNavbar } from "../../../components/StyledNavbar";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { Brand } from "./Brand";
import { ExpandedContent } from "./ExpandedContent";
import { Header } from "./Header";
import { MobileContent } from "./MobileContent";

const Grid = styled(BaseNavbar)`
  display: grid;
  grid-template-columns: repeat(3, minMax(min-content, 1fr));
  grid-template-rows: 1fr;
  grid-template-areas: "left center right";
  padding: ${navbarPadding};
  align-items: center;
  @media (max-width: ${phoneBreakpoint}) {
    grid-template-columns: repeat(2, minMax(min-content, 1fr));
    grid-template-areas: "left right";
  }
`;

const RightContent = styled.div`
  grid-area: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  * {
    font-size: 1em;
  }
`;

export const Navbar = () => {
  const { width } = useWindowDimensions();
  const { campaign } = useCampaign();
  return (
    <Grid>
      <Brand>{PROJECT_NAME}</Brand>
      <Header>{campaign && campaign.name}</Header>
      <RightContent>
        {width > parseInt(phoneBreakpoint, 10) ? (
          <ExpandedContent />
        ) : (
          <MobileContent />
        )}
      </RightContent>
    </Grid>
  );
};
