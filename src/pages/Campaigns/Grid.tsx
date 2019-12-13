import styled from "styled-components";

import { landscapeBreakpoint, tabletBreakpoint } from "../../common/styles";
import { Page } from "../../components/StyledPage";

export const Grid = styled(Page)`
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  grid-template-columns: 20% 60% 20%;
  grid-template-areas:
    ". . ."
    ". content ."
    ". . .";
  @media (max-width: ${landscapeBreakpoint}) {
    grid-template-columns: 1fr 6fr 1fr;
  }
  @media (max-width: ${tabletBreakpoint}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "."
      "content"
      ".";
  }
`;
