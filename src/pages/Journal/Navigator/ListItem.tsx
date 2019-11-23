import React from "react";
import styled from "styled-components";
import { DefaultButton } from "../../../components/StyledButtons";
import { surface3, surface2, hover } from "../../../common/styles";

export const ListItem = styled(DefaultButton)`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-align: left;
  padding-left: 10px;
  background-color: ${(props: { active?: boolean }) =>
    props.active ? hover(surface3(props)) : surface2(props)};
  margin-bottom: 2px;
  &:hover {
    background-color: ${props => props.active ? hover(surface3(props)) :hover(surface2(props))};
  }
`;