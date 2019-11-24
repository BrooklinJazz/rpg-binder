import React, { useState } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

import { ISection } from "../../../../common/types";
import { ToolTip } from "../../../../components/StyledTooltip";
import { useJournalState } from "../../../../context/journal";
import { ItemContent } from "../ItemContent";
import { ListItem } from "../ListItem";
import { useDeleteSection } from "../../../../api/hooks";
import { Spinner } from "../../../../components/Loading";
import { RightClickMenu } from "../RightClickMenu";
import { confirmAlert } from "../../../../common/helpers";
import { DELETE_SECTION_MESSAGE } from "../../../../common/constants";

const SectionItem = ({ _id, name }: ISection) => {
  const { setSection, section, clearPageAndSetSection } = useJournalState();
  const selectSection = () => clearPageAndSetSection(_id);
  const { deleteSection } = useDeleteSection();
  const [isDeleted, setDeleted] = useState(false);
  const handleDelete = () => {
    setDeleted(true);
    deleteSection(_id);
    setSection(undefined)
  };
  const confirmDelete = () =>
  confirmAlert({ onConfirm: handleDelete, message: DELETE_SECTION_MESSAGE });
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
          <ToolTip id={_id}>{name}</ToolTip>
          <ItemContent>{name}</ItemContent>
        </ListItem>
      </ContextMenuTrigger>
      <RightClickMenu
        handleDelete={confirmDelete}
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
