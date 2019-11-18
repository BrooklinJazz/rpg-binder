import React from "react";
import styled from "styled-components";

import { useSections } from "../../../../api/hooks";
import { FadeAnimation } from "../../../../components/FadeAnimation/index";
import { useJournalState } from "../../../../context/journal";
import { ListItem } from "../ListItem";

const Grid = styled.div`
  grid-area: sections;
`;

const List = styled(FadeAnimation)``;

export const SectionList = () => {
  const { sections } = useSections();
  const { setSection, section } = useJournalState();
  const renderSections = () =>
    sections &&
    sections.map(itemSection => (
      <ListItem
        active={section === itemSection._id}
        onClick={() => setSection(itemSection._id)}
        key={itemSection._id}
      >
        {itemSection.name}
      </ListItem>
    ));
  return (
    <List timeout={100} open={true}>
      {renderSections()}
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
