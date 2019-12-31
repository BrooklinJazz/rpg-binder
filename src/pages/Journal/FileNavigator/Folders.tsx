import React, { useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import styled from "styled-components";

import { useFolderData, useReorderSection } from "../../../api/hooks";
import { phoneBreakpoint } from "../../../common/styles";
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

const Sections = ({
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
        {parentProvided => (
          <div {...parentProvided.droppableProps} ref={parentProvided.innerRef}>
            {list &&
              list
                .sort(byIndex)
                .map((section, index) => renderSection(section, index, depth))}
            {parentProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Section = styled.div`
  padding: 10px 0;
  padding-left: ${({ depth }: { depth: number }) => depth * 10}px;
  border-top: solid 1px black;
  border-bottom: solid 1px black;
  // height: 20px;
  // width: 100%;
  // margin: 10px;
`;

const renderSection = (section: ISection, index: number, depth: number) => {
  return (
    <Draggable
      draggableId={section._id}
      index={section.index || index}
      key={section._id}
    >
      {sectionProvided => (
        <Section
          depth={depth}
          ref={sectionProvided.innerRef}
          {...sectionProvided.draggableProps}
        >
          <div {...sectionProvided.dragHandleProps}>Drag Handle</div>
          {section.name}
          {section.sections.length > 0 && (
            <Sections
              depth={depth + 1}
              parentSection={section._id}
              sections={section.sections}
            />
          )}
        </Section>
      )}
    </Draggable>
  );
};

export const Folders = ({ width }: { width: number }) => {
  const { sections } = useFolderData();
  return (
    <Container width={width}>
      <Sections depth={0} sections={sections} />
    </Container>
  );
};
