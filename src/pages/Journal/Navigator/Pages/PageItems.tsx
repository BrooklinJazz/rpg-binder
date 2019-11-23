import React from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePinPage } from "../../../../api/hooks";
import { hover, primary1, surface1 } from "../../../../common/styles";
import { IPage } from "../../../../common/types";
import { useJournalState } from "../../../../context/journal";
import { ListItem } from "../ListItem";
import { ItemContent } from "../ItemContent";

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
  const handlePin = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    return inSession ? remove(_id) : add(_id);
  };
  return (
    <ListItem key={_id} active={page === _id} onClick={() => setPage(_id)}>
      <ReactTooltip delayShow={1000} id={_id} place="top">
        {name}
      </ReactTooltip>
      <ItemContent data-tip data-for={_id}>
        {name}
      </ItemContent>
      <div onClick={handlePin}>
        <Star isPinned={inSession} />
      </div>
    </ListItem>
  );
};

export const PageItems = ({ data }: { data: IPage[] }) => {
  return (
    <>
      {data.map(page => (
        <PageItem {...page} />
      ))}
    </>
  );
};
