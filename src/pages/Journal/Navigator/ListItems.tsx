import React from "react";
import styled from "styled-components";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePinPage } from "../../../api/hooks";
import { hover, primary1, surface1 } from "../../../common/styles";
import { IPage, ISection } from "../../../common/types";
import { useJournalState } from "../../../context/journal";
import { ListItem } from "./ListItem";

export const ItemContent = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
`;

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
      <ItemContent>{name}</ItemContent>
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

export const SectionItems = ({
  data,
  activeItem,
  setter
}: {
  data: ISection[];
  activeItem?: string;
  setter: any;
}) => {
  const renderItem = ({ _id, name }: ISection) => (
    <ListItem key={_id} active={activeItem === _id} onClick={() => setter(_id)}>
      <ItemContent>{name}</ItemContent>
    </ListItem>
  );
  return <>{data.map(renderItem)}</>;
};
