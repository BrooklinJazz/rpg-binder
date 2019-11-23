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
      <RightClickMenu
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
