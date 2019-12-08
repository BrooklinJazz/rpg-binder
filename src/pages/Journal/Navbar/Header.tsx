import styled from "styled-components";

import { onPrimary, tabletBreakpoint } from "../../../common/styles";
import { H1 } from "../../../components/StyledTypography";

export const Header = styled(H1)`
  grid-area: center;
  text-align: center;
  color: ${onPrimary};
  @media (max-width: ${tabletBreakpoint}) {
    display: none;
  }
`;
