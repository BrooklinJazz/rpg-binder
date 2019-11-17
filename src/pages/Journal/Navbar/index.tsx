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
  phoneBreakpoint,
  surface2,
  tabletBreakpoint
} from "../../../common/styles";
import BaseProviderIcon from "../../../components/ProviderIcon";
import { Button, DefaultButton } from "../../../components/StyledButtons";
import { Navbar as BaseNavbar } from "../../../components/StyledNavbar";
import { H1, H2 } from "../../../components/StyledTypography";
import { logoutAction } from "../../../context/auth/actions";
import { useAuthDispatch } from "../../../context/auth/store";
import { toggleTheme } from "../../../context/theme/actions";
import { useThemeDispatch, useThemeState } from "../../../context/theme/store";
import { Theme } from "../../../context/theme/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { Brand } from "./Brand";
import { ExpandedContent } from "./ExpandedContent";
import { Header } from "./Header";
import { MobileContent } from "./MobileContent";

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
