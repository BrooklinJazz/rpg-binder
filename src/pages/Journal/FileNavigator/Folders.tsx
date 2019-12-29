import React, { useMemo, useState } from "react";
import {
  Draggable,
  DragDropContext,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import styled from "styled-components";

import { useFolderData, useReorderSection } from "../../../api/hooks";
import { phoneBreakpoint } from "../../../common/styles";
import { Menu } from "../Navigator/Menu";
import { ISection } from "../../../common/types";

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
  const { sections, loading } = useFolderData();
  const { reorder, loading: aLoading } = useReorderSection();
  const localReorder = (startIndex: number, endIndex: number) => {
    const sortedSections = Array.from(
      sections.sort(byIndex).map((section, index) => ({
        ...section,
        index: section.index || index
      }))
    );
    const [removed] = sortedSections.splice(startIndex, 1);
    sortedSections.splice(endIndex, 0, removed);
    const sectionsWithNewIndex = sortedSections.map((section, index) => ({
      ...section,
      index
    }));
    setCopiedList(sectionsWithNewIndex as ISection[]);
  };
  const byIndex = (first: ISection, second: ISection) =>
    (first.index || 0) - (second.index || 0);
  const handleDragEnd = (result: DropResult) => {
    if (result.destination) {
      const startIndex = result.source.index;
      const endIndex = result.destination.index;
      localReorder(startIndex, endIndex);
      reorder({ startIndex, endIndex });
    }
  };
  const [copiedList, setCopiedList] = useState<ISection[]>([]);
  const list: ISection[] = copiedList.length > 0 ? copiedList : sections;
  return (
    <Container width={width}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list &&
                list.sort(byIndex).map((section, i) => {
                  return (
                    <Draggable
                      draggableId={section._id}
                      index={section.index || i}
                      key={section._id}
                    >
                      {dragProvided => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          {section.name}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {/* {provided.placeholder} */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};
