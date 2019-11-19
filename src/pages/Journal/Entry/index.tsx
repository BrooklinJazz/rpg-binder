import React from "react";
import styled from "styled-components";

import { buttonHeight, surface1, onSurface } from "../../../common/styles";
import { Description } from "./Description";
import { Images } from "./Images";
import { Name } from "./Name";
import { useJournalState } from "../../../context/journal";
import { usePage } from "../../../api/hooks";
import { Spinner } from "../../../components/Loading";
import { FadeAnimation } from "../../../components/FadeAnimation";
const Grid = styled.section`
  background-color: ${surface1};
  grid-area: entry;
  display: grid;
  grid-gap: 2px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${buttonHeight} 1fr;
  grid-template-areas:
    "name name"
    "description images";
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
    return <LoadingGrid>{loading ? <Spinner /> : "Select a page to start editing"}</LoadingGrid>;
  }
  return (
    <Grid>
      <Name />
      <Description />
      <Images />
    </Grid>
  );
};
