import React from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import { useFolderData } from "../../../api/hooks";
import { phoneBreakpoint } from "../../../common/styles";
import { Menu } from "../Navigator/Menu";

const Container = styled.div`
  right: 0;
  color: white;
  grid-area: navigator-content;
  width: ${(props: { width: number }) => props.width}vw;
  @media (max-width: ${phoneBreakpoint}) {
    width: 100vw;
  }
`;

export const Folders = ({ width }: { width: number }) => {
  const { sections } = useFolderData();
  return (
    <Container width={width}>
      <DragDropContext onDragEnd={console.log}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections &&
                sections.map((section, i) => {
                  return (
                    <Draggable draggableId={section._id} index={i} key={i}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Drag {section.name}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};
