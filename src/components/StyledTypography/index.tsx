import React from "react";
import styled, { css } from "styled-components";
import { landscapeBreakpoint, tabletBreakpoint } from "../../common/styles";

type Weight = "bold" | "medium" | "normal" | "light";

const sizeFromWeight = (weight?: Weight) => {
  switch (weight) {
    case "bold":
      return 700;
    case "medium":
      return 500;
    case "normal":
      return 400;
    case "light":
      return 300;
    default:
      return 400;
  }
};

const baseMixin = css`
  margin: 0;
`;

export const H1 = styled.h1`
  ${baseMixin}
  font-size: 3em;
  font-weight: ${(props: { weight?: Weight }) => sizeFromWeight(props.weight)};
  @media (max-width: ${landscapeBreakpoint}) {
    font-size: 2.5em;
  }
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 2em;
  }
`;

export const H2 = styled.h2`
  ${baseMixin}
  font-size: 2.25em;
  @media (max-width: ${landscapeBreakpoint}) {
    font-size: 2em;
  }
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 1.625em;
  }
`;

export const H3 = styled.h3`
  ${baseMixin}
  font-size: 2.25em;
  @media (max-width: ${landscapeBreakpoint}) {
    font-size: 2em;
  }
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 1.625em;
  }
`;
