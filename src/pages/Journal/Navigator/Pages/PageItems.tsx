import React, { useState } from "react";
import { ContextMenuTrigger } from "react-contextmenu";
import { showMenu } from "react-contextmenu/modules/actions";
import styled from "styled-components";

import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDeletePage, usePinPage } from "../../../../api/hooks";
import { hover, primary1, surface1 } from "../../../../common/styles";
import { IPage } from "../../../../common/types";
import { Spinner } from "../../../../components/Loading";
import { ToolTip } from "../../../../components/StyledTooltip";
import { useJournalState } from "../../../../context/journal";
import { ItemContent } from "../ItemContent";
import { ListItem } from "../ListItem";
import { RightClickMenu } from "../RightClickMenu";
import Gear from "../../../../components/Gear";
import Pin from "../../../../components/Pin";
import { UNTITLED_PAGE } from "../../../../common/constants";

const PageItem = ({ _id, name, inSession }: IPage) => {
  const { add, remove, loading } = usePinPage();
  const { setPage, page } = useJournalState();
  const selectPage = () => setPage(_id);

  const { deletePage } = useDeletePage();
  const [isDeleted, setDeleted] = useState(false);
  const handleDelete = () => {
    setDeleted(true);
    deletePage(_id);
    setPage(undefined);
  };

  const handlePin = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    return inSession ? remove(_id) : add(_id);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <>
      <ContextMenuTrigger id={_id}>
        <ListItem key={_id} active={page === _id} onClick={selectPage}>
          <ToolTip id={_id}>{name}</ToolTip>
          <ItemContent data-tip data-for={_id}>
            {name || UNTITLED_PAGE}
          </ItemContent>
          <div
            className="Gear"
            onClick={e => {
              e.stopPropagation();

              const { left, top } = e.currentTarget.getBoundingClientRect();

              showMenu({
                position: { x: left, y: top },
                target: e,
                id: _id
              });
            }}
          >
            <Gear />
          </div>
          <div onClick={handlePin}>
            {loading ? <Spinner /> : <Pin checked={inSession} />}
          </div>
        </ListItem>
      </ContextMenuTrigger>
      <RightClickMenu
        handleDelete={handleDelete}
        select={selectPage}
        id={_id}
      />
    </>
  );
};

export const PageItems = ({ data }: { data: IPage[] }) => {
  return (
    <>
      {data.map(page => (
        <PageItem key={page._id} {...page} />
      ))}
    </>
  );
};
