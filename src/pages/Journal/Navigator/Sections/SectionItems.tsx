import React from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import styled from "styled-components";

import {
  hover,
  menuZIndex,
  onSurface,
  surface3,
  primary1
} from "../../../../common/styles";
import { ISection } from "../../../../common/types";
import { ToolTip } from "../../../../components/StyledTooltip";
import { useJournalState } from "../../../../context/journal";
import { ItemContent } from "../ItemContent";
import { ListItem } from "../ListItem";

const Menu = styled(ContextMenu)`
  background-color: ${surface3};
  z-index: ${menuZIndex};
  width: 120px;
  box-sizing: border-box;
  border-right: solid 1px ${primary1};
  border-left: solid 1px ${primary1};
  border-top: solid 1px ${primary1};
`;

const Item = styled(MenuItem)`
  box-sizing: border-box;
  border-bottom: solid 1px ${primary1};
  padding: 5px 10px;
  color: ${onSurface};
  &:hover {
    background-color: ${props => hover(surface3(props))};
    cursor: pointer;
  }
`;

const RightClickSectionMenu = ({
  id,
  select
}: {
  id: string;
  select: () => void;
}) => {
  return (
    <Menu id={id}>
      <Item data={{ foo: "bar" }} onClick={select}>
        Select
      </Item>
      <Item data={{ foo: "bar" }} onClick={() => console.log("TEST")}>
        Delete
      </Item>
    </Menu>
  );
};

const SectionItem = ({ _id, name }: ISection) => {
  const { setSection, section } = useJournalState();
  const selectSection = () => setSection(_id);
  return (
    <>
      <ContextMenuTrigger id={_id}>
        <ListItem
          data-tip
          data-for={_id}
          key={_id}
          active={section === _id}
          onClick={selectSection}
        >
          <ToolTip>{name}</ToolTip>
          <ItemContent>{name}</ItemContent>
        </ListItem>
      </ContextMenuTrigger>
      <RightClickSectionMenu select={selectSection} id={_id} />
    </>
  );
};

export const SectionItems = ({ data }: { data: ISection[] }) => {
  return (
    <>
      {data.map(section => (
        <SectionItem {...section} />
      ))}
    </>
  );
};
