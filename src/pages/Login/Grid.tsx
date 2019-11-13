import React from "react";
import styled, { css } from "styled-components";

import {
  background,
  landscapeStyles,
  mobileStyles,
  tabletStyles
} from "../../common/styles";
import { Page } from "../../components/StyledPage";

export const Grid = styled(Page)`
  background-color: ${background};
  display: grid;
  grid-template-rows: 1fr max-content 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    ". . ."
    ". login_form ."
    ". . .";

  ${landscapeStyles(
    css`
      grid-template-rows: 1fr max-content 1fr;
      grid-template-columns: 1fr 3fr 1fr;
      grid-template-areas:
        ". . ."
        ". login_form ."
        ". . .";
    `
  )}

  ${tabletStyles(
    css`
      grid-template-rows: 1fr max-content 1fr;
      grid-template-columns: 1fr 5fr 1fr;
      grid-template-areas:
        ". . ."
        ". login_form ."
        ". . .";
    `
  )}

  ${mobileStyles(
    css`
      grid-template-rows: 1fr max-content 1fr;
      grid-template-columns: 1fr;
      grid-template-areas:
        "."
        "login_form"
        ".";
    `
  )}
`;
