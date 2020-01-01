import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import {
  faChevronDown,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { primary1, surface2, surface1 } from "../../../common/styles";
import { ISection, IPage } from "../../../common/types";
import { Icon } from "../../../components/StyledIcon";
import { Sections } from "./Sections";
import { Page } from "./Page";
import { ItemIcon } from "./ItemIcon";
import { Item } from "./Item";

const Container = styled.div``;

interface IProps {
  section: ISection;
  index: number;
  depth: number;
}

export const Section = ({ section, index, depth }: IProps) => {
  const [open, setOpen] = useState(false);
  const hasSubSections = section.sections.length > 0;
  return (
    <Draggable draggableId={section._id} index={index}>
      {draggableProvided => (
        <Container
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
        >
          <Item
            depth={depth}
            onClick={() => setOpen(!open)}
            {...draggableProvided.dragHandleProps}
          >
            <ItemIcon icon={open ? faChevronDown : faChevronRight} />
            {section.name}
          </Item>
        </Container>
      )}
    </Draggable>
  );
};
// export const Section = ({ section, index, depth }: IProps) => {
//   const [open, setOpen] = useState(false);
//   const hasSubSections = section.sections.length > 0;
//   const renderSection = (aSection: ISection) => (
//     <>
//       <Draggable draggableId={aSection._id} index={aSection.index || index}>
//         {draggableProvided => (
//           <Container
//             ref={draggableProvided.innerRef}
//             {...draggableProvided.draggableProps}
//           >
//             <Item
//               depth={depth}
//               onClick={() => setOpen(!open)}
//               {...draggableProvided.dragHandleProps}
//             >
//               <ItemIcon icon={open ? faChevronDown : faChevronRight} />
//               {section.name}
//             </Item>
//           </Container>
//         )}
//       </Draggable>
//       {hasSubSections && open && (
//         <Sections
//           depth={depth + 1}
//           parentSection={section._id}
//           sections={section.sections}
//         />
//       )}
//       {open &&
//         section.pages.map(page => (
//           <Page key={page._id} page={page} depth={depth + 1} />
//         ))}
//     </>
//   );
//   return <>{}</>;
// };
