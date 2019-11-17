import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import { faBars, faCloudSun, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCampaign } from "../../../api/hooks";
import { PROJECT_NAME } from "../../../common/constants";
import { capitalize, ProviderList } from "../../../common/helpers";
import {
  hover,
  landscapeBreakpoint,
  navbarHeight,
  navbarZIndex,
  onPrimary,
  onPrimaryHover,
  surface2,
  phoneBreakpoint,
  tabletBreakpoint
} from "../../../common/styles";
import BaseProviderIcon from "../../../components/ProviderIcon";
import { Button, DefaultButton } from "../../../components/StyledButtons";
import { Navbar as BaseNavbar } from "../../../components/StyledNavbar";
import { H1, H2 } from "../../../components/StyledTypography";
import { toggleTheme } from "../../../context/theme/actions";
import { useThemeDispatch, useThemeState } from "../../../context/theme/store";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { Theme } from "../../../context/theme/types";
import { useAuthDispatch } from "../../../context/auth/store";
import { logoutAction } from "../../../context/auth/actions";

const Grid = styled(BaseNavbar)`
  display: grid;
  grid-template-columns: repeat(minMax(min-content, 1fr), 3);
  grid-template-rows: 1fr;
  grid-template-areas: "left center right";
  align-items: center;
  padding: 0 20px;
  @media (max-width: ${phoneBreakpoint}) {
    grid-template-columns: repeat(minMax(min-content, 1fr), 2);
    grid-template-areas: "left right";
  }
`;

const Brand = styled(H1)`
  grid-area: left;
  color: ${onPrimary};
`;
const Header = styled(H2)`
  grid-area: center;
  text-align: center;
  color: ${onPrimary};
  @media (max-width: ${tabletBreakpoint}) {
    display: none;
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

const ProviderIcon = styled(BaseProviderIcon)`
  & {
    color: ${onPrimary};
    margin: 0 5px;
  }
`;

const ProviderIconWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
`;

const ProviderIcons = () => {
  return (
    <ProviderIconWrapper>
      {ProviderList.map(provider => (
        <ProviderIcon key={provider} provider={provider} hoverable />
      ))}
    </ProviderIconWrapper>
  );
};

const SignOut = styled(Button).attrs(props => ({
  children: "Sign Out"
}))`
  background-color: transparent;
  color: ${onPrimary};
  &:hover {
    color: ${onPrimaryHover};
  }
`;

const HoverIcon = styled(FontAwesomeIcon)`
  color: ${onPrimary};
  &:hover {
    color: ${onPrimaryHover};
    cursor: pointer;
  }
`;

const ThemeIcon = () => {
  const dispatch = useThemeDispatch();
  const { theme } = useThemeState();
  return (
    <div
      // TODO Extract this style
      style={{ marginRight: "auto", marginLeft: "auto" }}
      role="button"
      onClick={() => dispatch(toggleTheme())}
    >
      <HoverIcon icon={theme === Theme.LIGHT ? faCloudSun : faSun} />
    </div>
  );
};

const ExpandedContent = () => {
  const dispatch = useAuthDispatch()
  return (
    <>
      <ThemeIcon />
      <ProviderIcons />
      <SignOut onClick={() => dispatch(logoutAction())} />
    </>
  );
};

const MobileContent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <ThemeIcon />
      <div onClick={() => setMenuOpen(!menuOpen)}>
        <HoverIcon icon={faBars} />
      </div>
      <MobileDropdown open={menuOpen} />
    </>
  );
};

const RightContentHandler = () => {
  const { width } = useWindowDimensions();
  // removes the "px in 1200px"
  const content =
    width > parseInt(phoneBreakpoint) ? <ExpandedContent /> : <MobileContent />;
  return <RightContent>{content}</RightContent>;
};

const DropdownWrapper = styled.div`
  position: absolute;
  top: ${navbarHeight};
  left: 0;
  z-index: ${navbarZIndex};
  height: max-content;
  width: 100vw;
`;

const Item = styled(DefaultButton)`
  text-align: left;
  background-color: ${surface2};
  width: 100%;
  &:hover {
    background-color: ${props => hover(surface2(props))};
  }
  * {
    margin: 0 20px;
  }
`;

const ItemWithoutIcon = styled(Item)`
  text-align: left;
  padding-left: 61px;
`;

const MobileDropdown = ({ open }: { open: boolean }) => {
  const dispatch = useAuthDispatch();
  if (!open) {
    return null;
  }
  return (
    <DropdownWrapper>
      {ProviderList.map(provider => (
        <Item key={provider}>
          <BaseProviderIcon colored={true} provider={provider} />
          {capitalize(provider)}
        </Item>
      ))}
      <div onClick={() => dispatch(logoutAction())}>
        <ItemWithoutIcon>Sign Out</ItemWithoutIcon>
      </div>
    </DropdownWrapper>
  );
};

export const Navbar = () => {
  const { campaign } = useCampaign();
  return (
    <Grid>
      <Brand weight="light">{PROJECT_NAME}</Brand>
      <Header weight="light">{campaign && campaign.name}</Header>
      <RightContentHandler />
    </Grid>
  );
};
