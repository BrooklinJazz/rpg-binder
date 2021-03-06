import React from "react";
import styled from "styled-components";

import { useFolderData } from "../../../api/hooks";
import { phoneBreakpoint, surface1 } from "../../../common/styles";
import { Sections } from "./Sections";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  right: 0;
  color: white;
  background-color: ${surface1};
  grid-area: navigator-content;
  max-width: ${(props: { width: number }) => props.width}vw;
  width: ${(props: { width: number }) => props.width}vw;
  overflow: hidden;
  @media (max-width: ${phoneBreakpoint}) {
    width: 100vw;
  }
`;

export const Folders = ({ width }: { width: number }) => {
  const { sections } = useFolderData();
  return (
    <Container width={width}>
      <DragDropContext onDragEnd={console.log}>
        <Droppable
          isCombineEnabled
          isDropDisabled
          droppableId={"TopLevelSections"}
        >
          {droppableProvided => (
            <Sections
              droppableProvided={droppableProvided}
              depth={0}
              sections={sections}
            />
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};
