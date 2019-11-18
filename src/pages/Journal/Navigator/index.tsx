import React from "react";
import styled from "styled-components";

import {
  buttonHeight,
  navbarHeight,
  navigatorWidth,
  surface1
} from "../../../common/styles";
import { Menu } from "./Menu";
import { PageFooter } from "./PageFooter";
import { Pages } from "./Pages";
import { SectionFooter } from "./SectionFooter";
import { Sections } from "./Sections";

const halfNavigatorWidth = `${parseInt(navigatorWidth, 10) / 2}px`;

export const Grid = styled.section`
  background-color: ${surface1};
  grid-area: navigator;
  display: grid;
  grid-gap: 2px;
  /* NOTE drawer is inside menu component */
  grid-template-areas:
    "drawer menu menu"
    "drawer sections pages"
    "drawer section-footer page-footer";
  grid-template-columns: max-content minMax(${halfNavigatorWidth}, 1fr) minMax(
      ${halfNavigatorWidth},
      1fr
    );
  grid-template-rows: ${buttonHeight} 1fr ${buttonHeight};
`;

export const Navigator = () => {
  return (
    <Grid>
      <Menu />
      <Sections />
      <Pages />
      <SectionFooter />
      <PageFooter />
    </Grid>
  );
};
