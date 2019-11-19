import React from "react";
import { ListItem } from "./ListItem";

interface IListItem {
  _id: string;
  name: string;
}

export const ListItems = ({
  data,
  activeItem,
  setter
}: {
  data: IListItem[];
  activeItem?: string;
  setter: any;
}) => {
  const renderItem = ({ _id, name }: IListItem) => (
    <ListItem key={_id} active={activeItem === _id} onClick={() => setter(_id)}>
      {name}
    </ListItem>
  );
  return <>{data.map(renderItem)}</>;
};
