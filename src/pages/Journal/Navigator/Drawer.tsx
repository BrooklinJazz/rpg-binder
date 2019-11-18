import React, { ReactNode, useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import styled, { StyledComponent } from "styled-components";

import { useCampaigns } from "../../../api/hooks";
import {
  buttonHeight,
  hover,
  navigatorWidth,
  surface2
} from "../../../common/styles";
import { ICampaign } from "../../../common/types";
import { DefaultButton } from "../../../components/StyledButtons";
import { Text } from "../../../components/StyledTypography";
import { selectCampaign } from "../../../context/campaign/actions";
import { useCampaignDispatch } from "../../../context/campaign/store";

const Grid = styled.section`
  display: grid;
  grid-area: drawer;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(minMax(1fr, 1fr), 2);
  grid-template-areas:
    "campaign-drawer"
    ".";
`;

const CampaignListGrid = styled.section`
  grid-area: campaign-drawer;
  display: grid;
  grid-gap: 2px;
  grid-template-columns: 1fr;
  grid-template-rows: ${buttonHeight} 1fr;
  grid-template-areas:
    "campaign-header"
    "campaign-list";
`;

const CampaignHeader = styled(Text)`
  grid-area: campaign-header;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${surface2};
`;

const ListItem = styled(DefaultButton)`
  width: 100%;
  white-space: nowrap;
  text-align: left;
  padding-left: 10px;
  background-color: ${surface2};
  margin-bottom: 2px;
  &:hover {
    background-color: ${props => hover(surface2(props))};
  }
`;

const Scroll = styled.div`
  transition: 0.3s;
  height: max-content;
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

const Fade = styled.div`
  transition: 1s;
  opacity: ${({ state }: { state: string }) => (state === "entered" ? 1 : 0)};
`;

const ScrollAnimation = ({
  open,
  children
}: {
  open: boolean;
  children: ReactNode;
}) => {
  return (
    <Transition in={open} timeout={0}>
      {state => <Scroll state={state}>{children}</Scroll>}
    </Transition>
  );
};

const FadeAnimation = ({
  children,
  open
}: {
  children: ReactNode;
  open: boolean;
}) => {
  return (
    <Transition mountOnEnter in={open} timeout={0}>
      {state => <Fade state={state}>{children}</Fade>}
    </Transition>
  );
};

const CampaignList = styled(FadeAnimation)`
  grid-area: campaign-list;
  display: flex;
  flex-direction: column;
`;

const CampaignDrawer = ({ open }: { open: boolean }) => {
  const { campaigns } = useCampaigns();
  const dispatch = useCampaignDispatch();
  const renderCampaign = (campaign: ICampaign) => (
    <ListItem
      onClick={() => dispatch(selectCampaign({ campaign: campaign._id }))}
      key={campaign._id}
    >
      {campaign.name}
    </ListItem>
  );

  const renderCampaigns = () => campaigns && campaigns.map(renderCampaign);
  return (
    <CampaignListGrid>
      <CampaignHeader>Campaigns</CampaignHeader>
      <CampaignList open={open}>{renderCampaigns()}</CampaignList>
    </CampaignListGrid>
  );
};

export const Drawer = ({ open }: { open: boolean }) => {
  return (
    <Grid>
      <ScrollAnimation open={open}>
        <CampaignDrawer open={open} />
      </ScrollAnimation>
    </Grid>
  );
};
