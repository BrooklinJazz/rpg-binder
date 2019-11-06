import { darken, lighten } from "polished";
import theme from "styled-theming";
import { FlattenSimpleInterpolation, css } from "styled-components";

export const phoneBreakpoint = 600;
export const tabletBreakpoint = 900;
export const landscapeBreakpoint = 1200;

export const mobileStyles = (styles: FlattenSimpleInterpolation) => css`
  @media (max-width: ${phoneBreakpoint}) {
    ${styles}
  }
`;
export const tabletStyles = (styles: FlattenSimpleInterpolation) => css`
  @media (max-width: ${tabletBreakpoint}) {
    ${styles}
  }
`;
export const landscapeStyles = (styles: FlattenSimpleInterpolation) => css`
  @media (max-width: ${landscapeBreakpoint}) {
    ${styles}
  }
`;
// Theme
const darkBackground = "black";
const lightBackground = "white";

const colorRange = (
  increment: number,
  total: number,
  baseLight: string,
  baseDark: string
) =>
  [...Array(total)].map((_, i) =>
    theme("mode", {
      light: darken(i * increment, baseLight),
      dark: lighten(i * increment, baseDark)
    })
  );

export const [background, surface1, surface2, surface3, surface4] = colorRange(
  0.1,
  5,
  lightBackground,
  darkBackground
);

export const onSurface = theme("mode", {
  light: "black",
  dark: "white"
});
