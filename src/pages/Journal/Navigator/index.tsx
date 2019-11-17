import React from "react";
import styled from "styled-components";

import { buttonHeight, navbarHeight, surface1 } from "../../../common/styles";
import { Menu } from "./Menu";
import { PageFooter } from "./PageFooter";
import { Pages } from "./Pages";
import { SectionFooter } from "./SectionFooter";
import { Sections } from "./Sections";

export const Grid = styled.section`
  background-color: ${surface1};
  grid-area: navigator;
  display: grid;
  grid-gap: 2px;
  grid-template-areas:
    "menu menu"
    "sections pages"
    "section-footer page-footer";
  grid-template-columns: 1fr 1fr;
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
