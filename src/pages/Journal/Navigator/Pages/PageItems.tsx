import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePinPage, useDeletePage } from "../../../../api/hooks";
import { hover, primary1, surface1 } from "../../../../common/styles";
import { IPage } from "../../../../common/types";
import { useJournalState } from "../../../../context/journal";
import { ListItem } from "../ListItem";
import { ItemContent } from "../ItemContent";
import { ToolTip } from "../../../../components/StyledTooltip";
import { ContextMenuTrigger } from "react-contextmenu";
import { RightClickMenu } from "../RightClickMenu";

export const Star = styled(FontAwesomeIcon).attrs(props => ({
  icon: faStar
}))`
  min-width: 20px;
  margin: 0;
  color: ${(props: { isPinned: boolean }) =>
    props.isPinned ? primary1(props) : surface1(props)};
  &:hover {
    color: ${props =>
      props.isPinned ? hover(primary1(props)) : hover(surface1(props))};
  }
`;

const PageItem = ({ _id, name, inSession }: IPage) => {
  const { add, remove } = usePinPage();
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
          <div onClick={handlePin}>
            <Star isPinned={inSession} />
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
