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
  // TODO refactor the fuck out of this
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

// const Sections = (sections: ISection[], parentSection?: string) => (
//   provided: DraggableProvided
// ) => {
//   const { handleDragEnd } = useSectionLogic(sections);
//   const renderSection = (section: ISection) => (
//     <Draggable
//       draggableId={section._id}
//       index={section.index || sectionIndex}
//       key={section._id}
//     >
//       {sectionProvided => (
//         <div
//           ref={sectionProvided.innerRef}
//           {...sectionProvided.draggableProps}
//           {...sectionProvided.dragHandleProps}
//         >
//           > {section.name}
//         </div>
//       )}
//     </Draggable>
//   );
//   return (
//     <DragDropContext onDragEnd={result => handleDragEnd(result, section._id)}>
//       <Droppable droppableId={section._id}>
//         {childProvided => (
//           <div {...childProvided.droppableProps} ref={childProvided.innerRef}>
//             {section.sections
//               .sort(byIndex)
//               .map((subSection, subSectionIndex) => {})}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

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
      <Droppable droppableId="parentSection">
        {parentProvided => (
          <div style={{marginLeft: depth * 20}} {...parentProvided.droppableProps} ref={parentProvided.innerRef}>
            {list && list.sort(byIndex).map((section, index) => renderSection(section, index, depth))}
            {parentProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const renderSection = (section: ISection, index: number, depth: number) => {
  if (section.sections.length > 0) {
    console.log(section.sections.length, section.name, section.sections)
    
  }
  return (
    <Draggable
      draggableId={section._id}
      index={section.index || index}
      key={section._id}
    >
      {sectionProvided => (
        <div
          ref={sectionProvided.innerRef}
          {...sectionProvided.draggableProps}
          {...sectionProvided.dragHandleProps}
        >
          {section.name}
          {section.sections.length > 0 && (
            <>
            parent
            <Sections depth={depth + 1} parentSection={section._id} sections={section.sections} />
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export const Folders = ({ width }: { width: number }) => {
  const { sections, loading } = useFolderData();
  console.log({sections})
  // TODO extract Sections, extract the localReorder logic, recurse
  return (
    <Container width={width}>
      <Sections depth={0} sections={sections} />
    </Container>
  );
};
