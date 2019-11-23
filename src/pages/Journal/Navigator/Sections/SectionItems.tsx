import React from "react";
import { ISection } from "../../../../common/types";
import { ListItem } from "../ListItem";
import ReactTooltip from "react-tooltip";
import { ItemContent } from "../ItemContent";

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
    <ListItem
      data-tip
      data-for={_id}
      key={_id}
      active={activeItem === _id}
      onClick={() => setter(_id)}
    >
      <ReactTooltip delayShow={1000} id={_id} place="top">
        {name}
      </ReactTooltip>
      <ItemContent>{name}</ItemContent>
    </ListItem>
  );
  return <>{data.map(renderItem)}</>;
};
