import React from "react";
import styled from "styled-components";

import { Campaigns } from "./Campaigns";
import { ScrollAnimation } from "./ScrollAnimation";

const Grid = styled.section`
  display: grid;
  grid-area: drawer;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(minMax(1fr, 1fr), 2);
  grid-template-areas:
    "campaign-drawer"
    ".";
`;

export const Drawer = ({ open }: { open: boolean }) => {
  return (
    <Grid>
      <ScrollAnimation open={open}>
        <Campaigns open={open} />
      </ScrollAnimation>
    </Grid>
  );
};
