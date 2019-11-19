import React from "react";
import styled from "styled-components";

import { usePages } from "../../../../api/hooks";
import { FadeAnimation } from "../../../../components/FadeAnimation/index";
import { useJournalState } from "../../../../context/journal";
import { List } from "../List";
import { ListItems } from "../ListItems";

const Grid = styled.div`
  grid-area: pages;
  overflow-y: scroll;
`;

export const PageList = () => {
  const { pages = [], loading } = usePages();
  const { setPage, page } = useJournalState();
  return (
    <List loading={loading}>
      <ListItems data={pages} setter={setPage} activeItem={page} />
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
