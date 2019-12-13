import React from "react";
import styled from "styled-components";

import { usePage } from "../../../api/hooks";
import { buttonHeight, onSurface, surface1 } from "../../../common/styles";
import { Spinner } from "../../../components/Loading";
import { useJournalState } from "../../../context/journal";
import { Description } from "./Description";
import { Name } from "./Name";

const Grid = styled.section`
  background-color: ${surface1};
  grid-area: entry;
  display: grid;
  grid-gap: 2px;
  grid-template-columns: 1fr;
  grid-template-rows: ${buttonHeight} 1fr;
  grid-template-areas:
    "name"
    "description";
  color: ${onSurface};
`;

const LoadingGrid = styled.section`
  color: ${onSurface};
  background-color: ${surface1};
  grid-area: entry;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Entry = () => {
  const { page } = useJournalState();
  const { loading } = usePage();
  if (!page || loading) {
    return (
      <LoadingGrid>
        {loading ? <Spinner /> : "Select a page to start editing"}
      </LoadingGrid>
    );
  }
  return (
    <Grid>
      <Name />
      <Description />
    </Grid>
  );
};
