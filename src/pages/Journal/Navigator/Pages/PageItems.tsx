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

export const Pin = styled(FontAwesomeIcon).attrs(props => ({
  icon: faThumbtack
}))`
  min-width: 20px;
  margin: 0;
  color: ${(props: { checked: boolean }) =>
    props.checked ? primary1(props) : surface1(props)};
  &:hover {
    color: ${props =>
      props.checked ? hover(primary1(props)) : hover(surface1(props))};
  }
`;

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
            {name}
          </ItemContent>
          <div
            className="Gear"
            onClick={e => {
              e.stopPropagation();

              const rects = e.currentTarget.getBoundingClientRect();
              const x = rects.left;
              const y = rects.top;

              showMenu({
                position: { x, y },
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
