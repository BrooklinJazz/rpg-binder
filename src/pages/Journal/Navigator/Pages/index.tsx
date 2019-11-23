import React from "react";
import styled from "styled-components";

import { usePages } from "../../../../api/hooks";
import { useJournalState } from "../../../../context/journal";
import { FetchContainer } from "../../../../components/FetchContainer/index";
import { PageItems } from "./PageItems";

const Grid = styled.div`
  grid-area: pages;
  overflow-y: scroll;
`;

export const PageList = () => {
  const { pages = [], loading } = usePages();
  return (
    <FetchContainer loading={loading}>
      <PageItems data={pages}  />
    </FetchContainer>
  );
};

export const Pages = () => {
  return (
    <Grid>
      <PageList />
    </Grid>
  );
};
