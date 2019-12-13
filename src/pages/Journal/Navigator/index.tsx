import React from "react";
import styled from "styled-components";

import { buttonHeight, navigatorWidth, surface1 } from "../../../common/styles";
import { JournalModal } from "../Modal";
import { PageFooter } from "./Footer/PageFooter";
import { SectionFooter } from "./Footer/SectionFooter";
import { Menu } from "./Menu/index";
import { PageHeader } from "./Pages/Header";
import { Pages } from "./Pages/index";
import { SectionHeader } from "./Sections/Header";
import { Sections } from "./Sections/index";

const halfNavigatorWidth = `${parseInt(navigatorWidth, 10) / 2}px`;

export const Grid = styled.section`
  background-color: ${surface1};
  grid-area: navigator;
  overflow: hidden;
  display: grid;
  grid-gap: 2px;
  /* NOTE drawer is inside menu component */
  grid-template-areas:
    "drawer menu menu"
    "drawer section-header page-header"
    "drawer sections pages"
    "drawer section-footer page-footer";
  grid-template-columns: max-content minMax(${halfNavigatorWidth}, 1fr) minMax(
      ${halfNavigatorWidth},
      1fr
    );
  grid-template-rows: ${buttonHeight} ${buttonHeight} 1fr ${buttonHeight};
`;

export const Navigator = () => {
  return (
    <>
      <JournalModal />
      <Grid>
        <Menu />
        <SectionHeader />
        <Sections />
        <PageHeader />
        <Pages />
        <SectionFooter />
        <PageFooter />
      </Grid>
    </>
  );
};
