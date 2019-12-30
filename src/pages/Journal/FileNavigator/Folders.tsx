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
  const byIndex = (first: ISection, second: ISection) =>
    (first.index || 0) - (second.index || 0);
  const handleDragEnd = (result: DropResult, parentSection?: string) => {
    if (result.destination) {
      const startIndex = result.source.index;
      const endIndex = result.destination.index;
      localReorder(startIndex, endIndex);
      reorder({ startIndex, endIndex, parentSection });
    }
  };
  return (
    <Container width={width}>
      <DragDropContext onDragEnd={result => handleDragEnd(result)}>
        <Droppable droppableId="parentSection">
          {parentProvided => (
            <div
              {...parentProvided.droppableProps}
              ref={parentProvided.innerRef}
            >
              {list &&
                list.sort(byIndex).map((section, sectionIndex) => {
                  return (
                    <>
                      <Draggable
                        draggableId={section._id}
                        index={section.index || sectionIndex}
                        key={section._id}
                      >
                        {sectionProvided => (
                          <div
                            ref={sectionProvided.innerRef}
                            {...sectionProvided.draggableProps}
                            {...sectionProvided.dragHandleProps}
                          >
                            <h1>{section.name}</h1>
                            <DragDropContext onDragEnd={result => handleDragEnd(result, section._id)}>
                              <Droppable droppableId={section._id}>
                                {childProvided => (
                                  <div
                                    {...childProvided.droppableProps}
                                    ref={childProvided.innerRef}
                                  >
                                    {section.sections.sort(byIndex).map(
                                      (subSection, subSectionIndex) => {
                                        return (
                                          <Draggable
                                            draggableId={subSection._id}
                                            index={
                                              subSection.index ||
                                              subSectionIndex
                                            }
                                            key={subSection._id}
                                          >
                                            {subSectionProvided => (
                                              <div
                                                ref={
                                                  subSectionProvided.innerRef
                                                }
                                                {...subSectionProvided.draggableProps}
                                                {...subSectionProvided.dragHandleProps}
                                              >
                                                sub: {subSection.name}
                                              </div>
                                            )}
                                          </Draggable>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext>
                          </div>
                        )}
                      </Draggable>
                    </>
                  );
                })}
              {parentProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};
