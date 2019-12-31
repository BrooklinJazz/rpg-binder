import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import {
  faChevronDown,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { primary1, surface2, surface1 } from "../../../common/styles";
import { ISection } from "../../../common/types";
import { Icon } from "../../../components/StyledIcon";
import { Sections } from "./Sections";

const Container = styled.div``;
const SectionItem = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-align: left;
//   border-bottom: solid 2px ${surface1};
  padding: 5px 0;
  padding-left: ${({ depth }: { depth: number }) => (depth + 1) * 7}px;
  display: flex;
//   background-color: ${surface2};
  &:hover {
    cursor: pointer;
  }
`;

const Chevron = styled(FontAwesomeIcon)`
  color: ${primary1};
  margin-right: 5px;
`;

interface IProps {
  section: ISection;
  index: number;
  depth: number;
}
export const Section = ({ section, index, depth }: IProps) => {
  const [open, setOpen] = useState(false);
  const hasSubSections = section.sections.length > 0;
  return (
    <Draggable draggableId={section._id} index={section.index || index}>
      {sectionProvided => (
        <Container
          ref={sectionProvided.innerRef}
          {...sectionProvided.draggableProps}
        >
          <SectionItem
            depth={depth}
            onClick={() => setOpen(!open)}
            {...sectionProvided.dragHandleProps}
          >
            <Chevron icon={open ? faChevronDown : faChevronRight} />
            {section.name}
          </SectionItem>
          {hasSubSections && open && (
            <Sections
              depth={depth + 1}
              parentSection={section._id}
              sections={section.sections}
            />
          )}
        </Container>
      )}
    </Draggable>
  );
};
