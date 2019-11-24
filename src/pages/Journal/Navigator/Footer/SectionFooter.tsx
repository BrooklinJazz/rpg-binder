import React from "react";
import styled from "styled-components";

import { surface2 } from "../../../../common/styles";
import {
  JournalModalStates,
  useJournalModalState
} from "../../../../context/journal";
import { Add } from "../../../../components/Add/index";

export const Grid = styled.div`
  grid-area: section-footer;
  background-color: ${surface2};
`;

const AddSection = () => {
  const { open } = useJournalModalState();
  const openSectionModal = () => open(JournalModalStates.CREATE_SECTION);
  return <Add onClick={openSectionModal} title="Section" />;
};

export const SectionFooter = () => {
  return (
    <Grid>
      <AddSection />
    </Grid>
  );
};
