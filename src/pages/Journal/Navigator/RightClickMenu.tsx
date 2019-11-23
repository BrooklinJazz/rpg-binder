import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import styled from "styled-components";

import { DELETE_SECTION_MESSAGE } from "../../../common/constants";
import { confirmAlert } from "../../../common/helpers";
import {
  hover,
  menuZIndex,
  onSurface,
  primary1,
  surface3
} from "../../../common/styles";

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

export const RightClickMenu = ({
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
