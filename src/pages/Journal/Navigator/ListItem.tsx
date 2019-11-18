import React from "react";
import styled from "styled-components";
import { DefaultButton } from "../../../components/StyledButtons";
import { surface2, hover } from "../../../common/styles";

export const ListItem = styled(DefaultButton)`
  width: 100%;
  white-space: nowrap;
  text-align: left;
  padding-left: 10px;
  background-color: ${surface2};
  margin-bottom: 2px;
  &:hover {
    background-color: ${props => hover(surface2(props))};
  }
`;
