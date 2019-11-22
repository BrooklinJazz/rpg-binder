import React from "react";
import styled from "styled-components";

import { usePinnedItems } from "../../../api/hooks";
import { phoneBreakpoint, surface1 } from "../../../common/styles";
import { H2, Text } from "../../../components/StyledTypography";
import { useJournalState } from "../../../context/journal";

const Sidebar = styled.section`
  background-color: ${surface1};
  grid-area: sidebar;
  @media (max-width: ${phoneBreakpoint}) {
    display: none;
  }
`;

const SessionItems = () => {
  const { pinnedItems } = usePinnedItems();
  const { selectPinned } = useJournalState();

  return (
    <>
      {pinnedItems.map(({ section, pages }) => {
        return (
          <>
            <h1>{section.name}</h1>
            {pages.map(page => (
              <Text onClick={() => selectPinned(section._id, page._id)}>
                {page.name}
              </Text>
            ))}
          </>
        );
      })}
    </>
  );
};

export const SessionSidebar = () => {
  return (
    <Sidebar>
      <SessionItems />
    </Sidebar>
  );
};
