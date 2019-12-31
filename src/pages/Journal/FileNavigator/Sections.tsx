import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { useReorderSection } from "../../../api/hooks";
import { ISection } from "../../../common/types";
import { Section } from "./Section";
import styled from "styled-components";

const byIndex = (first: ISection, second: ISection) =>
  (first.index || 0) - (second.index || 0);

const useSectionLogic = (sections: ISection[]) => {
  const { reorder } = useReorderSection();
  const [copiedList, setCopiedList] = useState<ISection[]>([]);
  const list: ISection[] = copiedList.length > 0 ? copiedList : sections;

  const localReorder = (startIndex: number, endIndex: number) => {
    const sortedSections = Array.from(
      list.sort(byIndex).map((section, index) => ({
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

  const handleDragEnd = (result: DropResult, parentSection?: string) => {
    if (result.destination) {
      const startIndex = result.source.index;
      const endIndex = result.destination.index;
      localReorder(startIndex, endIndex);
      reorder({ startIndex, endIndex, parentSection });
    }
  };
  return {
    handleDragEnd,
    list
  };
};

const Container = styled.div`
`;

export const Sections = ({
  sections,
  parentSection,
  depth
}: {
  sections: ISection[];
  parentSection?: string;
  depth: number;
}) => {
  const { list, handleDragEnd } = useSectionLogic(sections);
  return (
    <DragDropContext onDragEnd={result => handleDragEnd(result, parentSection)}>
      <Droppable droppableId={parentSection || "TopLevelSections"}>
        {droppableProvided => (
          <Container {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
            {list &&
              list
                .sort(byIndex)
                .map((section, index) => (
                  <Section
                    key={section._id}
                    section={section}
                    index={index}
                    depth={depth}
                  />
                ))}
            {droppableProvided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};
