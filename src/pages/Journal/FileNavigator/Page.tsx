import React from "react";
import styled from "styled-components";

import { faStickyNote } from "@fortawesome/free-solid-svg-icons";

import { IPage } from "../../../common/types";
import { Item } from "./Item";
import { ItemIcon } from "./ItemIcon";

const PageItem = styled(Item)`
  &:hover {
    cursor: default;
  }
`;

export const Page = ({ page, depth }: { page: IPage; depth: number }) => {
  return (
    <PageItem depth={depth}>
      <ItemIcon icon={faStickyNote} />
      {page.name}
    </PageItem>
  );
};
