import styled from "styled-components";

import { surface5, primary1 } from "../../../common/styles";
import { ListItem } from "./ListItem";

export const ListHeader = styled(ListItem)`
  background-color: ${surface5};
  text-align: center;
  border: none;
  &:hover {
    // override bg color from ListItem
    background-color: ${surface5};
    cursor: default
  }
`;
