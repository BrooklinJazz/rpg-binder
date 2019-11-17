import React from "react";
import styled from "styled-components";

import { surface1, navbarHeight, buttonHeight } from "../../../common/styles";
import { Header } from "./Header";
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
    "header header"
    "sections pages"
    "section-footer page-footer";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${buttonHeight} 1fr ${buttonHeight};
`;

export const Navigator = () => {
  return (
    <Grid>
      <Header />
      <Sections />
      <Pages />
      <SectionFooter />
      <PageFooter />
    </Grid>
  );
};
