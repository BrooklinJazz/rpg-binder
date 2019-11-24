import React from "react";
import styled, { css } from "styled-components";

import { buttonHeight, navigatorWidth } from "../../../../../common/styles";
import { CampaignList } from "./CampaignList";
import { CampaignFooter } from "./Footer";
import { CampaignHeader } from "./Header";
import { Transition } from "react-transition-group";

const ScrollAnimation = css`
  transition: 0.3s;
  width: ${({ state }: { state: string }) => {
    switch (state) {
      case "entering":
        return 0;
      case "entered":
        return navigatorWidth;
      case "exiting":
        return navigatorWidth;
      case "exited":
        return 0;
    }
  }};
  overflow: hidden;
`;

const Grid = styled.section`
  display: grid;
  grid-area: drawer;
  grid-gap: 2px;
  grid-template-columns: 1fr;
  grid-template-rows: ${buttonHeight} 1fr ${buttonHeight};
  grid-template-areas:
    "campaign-header"
    "campaign-list"
    "campaign-footer";
  ${ScrollAnimation}
`;

export const Drawer = ({ open }: { open: boolean }) => {
  return (
    <Transition in={open} timeout={0}>
      {state => (
        <Grid state={state}>
          <CampaignHeader>Campaigns</CampaignHeader>
          <CampaignList open={open} />
          <CampaignFooter />
        </Grid>
      )}
    </Transition>
  );
};
