import React from "react";
import styled from "styled-components";
import { surface1, phoneBreakpoint } from "../../../common/styles";

export const Sidebar = styled.section`
  background-color: ${surface1};
  grid-area: sidebar;
  @media (max-width: ${phoneBreakpoint}) {
    display: none;
  }
`;
