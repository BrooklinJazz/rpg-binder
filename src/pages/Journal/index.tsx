import React from "react";
import styled from "styled-components";

import {
  landscapeBreakpoint,
  navbarHeight,
  phoneBreakpoint,
  surface1,
  tabletBreakpoint
} from "../../common/styles";
import { Page } from "../../components/StyledPage";

const Grid = styled(Page)`
  display: grid;
  grid-template-rows: ${navbarHeight} 1fr 1fr;
  grid-template-columns: 2fr 4fr 1.5fr;
  grid-gap: 8px;
  grid-template-areas:
  "navbar navbar navbar"
  "navigator entry sidebar"
  "navigator entry sidebar";
  @media (max-width: ${landscapeBreakpoint}) {
    grid-template-columns: 2.5fr 3fr 2fr;
  }
  @media (max-width: ${tabletBreakpoint}) {
    grid-template-rows: ${navbarHeight} 3fr 2fr;
    grid-template-columns: 3fr 4fr;
    grid-template-areas:
      "navbar navbar"
      "navigator entry "
      "sidebar entry";
  }
  @media (max-width: ${phoneBreakpoint}) {
    grid-template-rows: ${navbarHeight} 1fr 1fr;
    grid-template-columns: 1fr;
    grid-gap: 0;
    grid-row-gap: 5px;
    grid-template-areas:
      "navbar"
      "navigator"
      "entry";
  }
`;

const Navigator = styled.section`
  background-color: ${surface1};
  grid-area: navigator;
`;
const Navbar = styled.section`
  background-color: ${surface1};
  grid-area: navbar;
`;
const Entry = styled.section`
  background-color: ${surface1};
  grid-area: entry;
`;
const Sidebar = styled.section`
  background-color: ${surface1};
  grid-area: sidebar;
  @media (max-width: ${phoneBreakpoint}) {
    display: none;
  }
`;

const Journal = () => {
  return (
    <Grid>
      <Navbar />
      <Navigator />
      <Entry />
      <Sidebar />
    </Grid>
  );
};

export default Journal;
