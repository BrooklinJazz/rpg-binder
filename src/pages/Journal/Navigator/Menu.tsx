import React from "react";
import styled from "styled-components";

import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

import { useCampaign } from "../../../api/hooks";
import {
  navbarPadding,
  onSurface,
  onSurfaceHover,
  surface2
} from "../../../common/styles";
import { HoverableIcon } from "../../../components/StyledIcon";
import { Text } from "../../../components/StyledTypography";

const MenuBars = styled(HoverableIcon).attrs(props => ({
  icon: faBars
}))`
  grid-area: menu-left;
`;

const SearchIcon = styled(HoverableIcon).attrs(props => ({
  icon: faSearch
}))`
  grid-area: menu-right;
  margin-left: auto;
`;

export const Grid = styled.div`
  grid-area: menu;
  background-color: ${surface2};
  display: grid;
  grid-template-areas: "menu-left menu-center menu-right";
  grid-template-columns: "1fr 1fr 1fr";
  grid-template-rows: 1fr;
  align-items: center;
  padding: 0 ${navbarPadding};
`;

const Header = styled(Text)`
  grid-area: menu-center;
  text-align: center;
`;

const CampaignName = () => {
  const { campaign } = useCampaign();
  return <Header>{campaign && campaign.name}</Header>;
};

export const Menu = () => {
  return (
    <Grid>
      <MenuBars />
      <CampaignName />
      <SearchIcon />
    </Grid>
  );
};
