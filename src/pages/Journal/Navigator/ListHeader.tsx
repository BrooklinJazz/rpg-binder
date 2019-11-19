import React from "react";
import styled from "styled-components";

import { surface3, surface4 } from "../../../common/styles";
import { ListItem } from "./ListItem";

export const ListHeader = styled(ListItem)`
  background-color: ${surface3};
  text-align: center;
  &:hover {
    cursor: default
  }
`;
