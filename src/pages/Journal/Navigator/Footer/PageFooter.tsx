import React from "react";
import styled from "styled-components";


import { surface2 } from "../../../../common/styles";
import {
  JournalModalStates,
  useJournalModalState,
  useJournalState
} from "../../../../context/journal";
import { Add } from "./Add";

export const Grid = styled.div`
  grid-area: page-footer;
  background-color: ${surface2};
`;

const AddPage = () => {
  const { open } = useJournalModalState();
  const openPageModal = () => open(JournalModalStates.CREATE_PAGE);
  return <Add onClick={openPageModal} title="Page" />;
};

export const PageFooter = () => {
  const { section } = useJournalState();
  if (!section) {
    return null;
  }
  return (
    <Grid>
      <AddPage />
    </Grid>
  );
};
