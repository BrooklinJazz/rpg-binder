import React from "react";
import styled from "styled-components";

import { useSections } from "../../../../api/hooks";
import { useJournalState } from "../../../../context/journal";
import { List } from "../List";
import { SectionItems } from "../ListItems";

const Grid = styled.div`
  grid-area: sections;
  overflow-y: scroll;
`;

export const SectionList = () => {
  const { sections = [], loading } = useSections();
  const { setSection, section } = useJournalState();
  return (
    <List loading={loading}>
      <SectionItems data={sections} setter={setSection} activeItem={section} />
    </List>
  );
};

export const Sections = () => {
  return (
    <Grid>
      <SectionList />
    </Grid>
  );
};
