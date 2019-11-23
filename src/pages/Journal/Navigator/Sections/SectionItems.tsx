import React, { useState } from "react";
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
import { useDeleteSection } from "../../../../api/hooks";
import { confirmAlert } from "../../../../common/helpers";
import { DELETE_SECTION_MESSAGE } from "../../../../common/constants";
import { Spinner } from "../../../../components/Loading";

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
  select,
  handleDelete
}: {
  id: string;
  select: () => void;
  handleDelete: () => void;
}) => {
  const confirmDelete = () =>
    confirmAlert({ onConfirm: handleDelete, message: DELETE_SECTION_MESSAGE });
  return (
    <Menu id={id}>
      <Item onClick={select}>Select</Item>
      <Item onClick={confirmDelete}>Delete</Item>
    </Menu>
  );
};

const SectionItem = ({ _id, name }: ISection) => {
  const { setSection, section } = useJournalState();
  const selectSection = () => setSection(_id);
  const { deleteSection, loading } = useDeleteSection();
  const [isDeleted, setDeleted] = useState(false);
  const handleDelete = () => {
    setDeleted(true);
    deleteSection(_id);
  };
  if (isDeleted) {
    return null;
  }
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
          <ItemContent>{loading ? <Spinner /> : name}</ItemContent>
        </ListItem>
      </ContextMenuTrigger>
      <RightClickSectionMenu
        handleDelete={handleDelete}
        select={selectSection}
        id={_id}
      />
    </>
  );
};

export const SectionItems = ({ data }: { data: ISection[] }) => {
  return (
    <>
      {data.map(section => (
        <SectionItem key={section._id} {...section} />
      ))}
    </>
  );
};
