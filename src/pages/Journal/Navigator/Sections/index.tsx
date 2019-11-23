import React from "react";
import styled from "styled-components";

import { useSections } from "../../../../api/hooks";
import { FetchContainer } from "../../../../components/FetchContainer/index";
import { useJournalState } from "../../../../context/journal";
import { SectionItems } from "./SectionItems";

const Grid = styled.div`
  grid-area: sections;
  overflow-y: scroll;
`;

export const SectionList = () => {
  const { sections = [], loading } = useSections();
  const { setSection, section } = useJournalState();
  return (
    <FetchContainer loading={loading}>
      <SectionItems data={sections} setter={setSection} activeItem={section} />
    </FetchContainer>
  );
};

export const Sections = () => {
  return (
    <Grid>
      <SectionList />
    </Grid>
  );
};
