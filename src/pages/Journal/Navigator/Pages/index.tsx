import React from "react";
import styled from "styled-components";

import { usePages } from "../../../../api/hooks";
import { FadeAnimation } from "../../../../components/FadeAnimation/index";
import { useJournalState } from "../../../../context/journal";
import { ListItem } from "../ListItem";

const Grid = styled.div`
  grid-area: pages;
  overflow-y: scroll;
`;

const List = styled(FadeAnimation)``;

export const PageList = () => {
  const { pages } = usePages();
  const { setPage, page } = useJournalState();
  const renderpages = () =>
    pages &&
    pages.map(itemPage => (
      <ListItem
        active={page === itemPage._id}
        onClick={() => setPage(itemPage._id)}
        key={itemPage._id}
      >
        {itemPage.name}
      </ListItem>
    ));
  return (
    <List timeout={100} open={true}>
      {renderpages()}
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
