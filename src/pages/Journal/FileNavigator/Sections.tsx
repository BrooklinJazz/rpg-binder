import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DroppableProvided
} from "react-beautiful-dnd";

import { useReorderSection } from "../../../api/hooks";
import { ISection } from "../../../common/types";
import { Section } from "./Section";
import styled from "styled-components";

// const byIndex = (first: ISection, second: ISection) =>
//   (first.index || 0) - (second.index || 0);

// const useSectionLogic = (sections: ISection[]) => {
//   const { reorder } = useReorderSection();
//   const [copiedList, setCopiedList] = useState<ISection[]>([]);
//   const list: ISection[] = copiedList.length > 0 ? copiedList : sections;

//   const localReorder = (startIndex: number, endIndex: number) => {
//     const sortedSections = Array.from(
//       list.sort(byIndex).map((section, index) => ({
//         ...section,
//         index: section.index || index
//       }))
//     );
//     const [removed] = sortedSections.splice(startIndex, 1);
//     sortedSections.splice(endIndex, 0, removed);
//     const sectionsWithNewIndex = sortedSections.map((section, index) => ({
//       ...section,
//       index
//     }));
//     setCopiedList(sectionsWithNewIndex as ISection[]);
//   };

//   const handleDragEnd = (result: DropResult, parentSection?: string) => {
//     if (result.destination) {
//       const startIndex = result.source.index;
//       const endIndex = result.destination.index;
//       localReorder(startIndex, endIndex);
//       reorder({ startIndex, endIndex, parentSection });
//     }
//   };
//   return {
//     handleDragEnd,
//     list
//   };
// };

const Container = styled.div``;

// interface IFlatSection extends ISection {
//   index: number;
//   depth: number;
// }

interface IFlatSection extends ISection {
  // index: number;
  depth: number;
}

const flattenSections = (sections: ISection[]): IFlatSection[] => {
  const flattenSection = (section: ISection, depth = 0): IFlatSection[] => {
    const sectionWithDepth = { ...section, depth };
    return section.sections.length > 0
      ? [sectionWithDepth].concat(
          section.sections
            .map(subSection => flattenSection(subSection, depth + 1).flat())
            .flat()
        )
      : [sectionWithDepth];
  };
  return sections.map(flattenSection).flat();
  // sections.reduce(
  //   ({ total, index, depth }: IFlat, each) => {
  //     total = total.concat(each);
  //     index++;
  //     if (section.sections.length > 0) {
  //       result = result.concat(section.sections).flat();
  //     }
  //     total = total;
  //     return {
  //       total,
  //       index,
  //       deptch
  //     };
  //   },
  //   {
  //     total: [],
  //     index: 0,
  //     depth: 0
  //   }
  // );
  // let result = total.concat({ ...section });
};

export const Sections = ({
  sections,
  depth,
  droppableProvided
}: {
  sections: ISection[];
  parentSection?: string;
  depth: number;
  droppableProvided: DroppableProvided;
}) => {
  // const { list, handleDragEnd } = useSectionLogic(sections);
  const flatSections = flattenSections(sections);
  return (
    <Container
      {...droppableProvided.droppableProps}
      ref={droppableProvided.innerRef}
    >
      {flatSections
        // .sort(byIndex)
        .map((section: IFlatSection, index) => (
          <Section
            key={section._id}
            section={section}
            index={index}
            depth={section.depth}
          />
        ))}
      {droppableProvided.placeholder}
    </Container>
  );
};
