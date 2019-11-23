import React from "react";
import styled from "styled-components";

import { usePages } from "../../../../api/hooks";
import { useJournalState } from "../../../../context/journal";
import { List } from "../List";
import { PageItems } from "../ListItems";

const Grid = styled.div`
  grid-area: pages;
  overflow-y: scroll;
`;

export const PageList = () => {
  const { pages = [], loading } = usePages();
  return (
    <List loading={loading}>
      <PageItems data={pages}  />
    </List>
  );
};

export const Pages = () => {
  return (
    <Grid>
      <PageList />
    </Grid>
  );
};
