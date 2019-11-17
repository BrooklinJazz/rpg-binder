import React from "react";
import styled from "styled-components";

import { onPrimary, tabletBreakpoint } from "../../../common/styles";
import { H2 } from "../../../components/Typeography";

export const Header = styled(H2)`
  grid-area: center;
  text-align: center;
  color: ${onPrimary};
  @media (max-width: ${tabletBreakpoint}) {
    display: none;
  }
`;
