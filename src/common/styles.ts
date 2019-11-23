import { darken, lighten } from "polished";
import { css, FlattenSimpleInterpolation } from "styled-components";
import theme from "styled-theming";

export const phoneBreakpoint = "600px";
export const tabletBreakpoint = "900px";
export const landscapeBreakpoint = "1200px";

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

const colorRange = (
  increment: number,
  total: number,
  baseLight: string,
  baseDark: string
) =>
  [...Array(total)].map((_, i) =>
    theme("mode", {
      light: lighten(i * increment, baseLight),
      dark: lighten(i * increment, baseDark)
    })
  );

export const hover = (color: string) =>
  theme("mode", {
    // @ts-ignore
    light: lighten(0.1, color),
    // @ts-ignore
    dark: lighten(0.1, color)
  });

const darkBackground = "black";
const lightBackground = "#9a9a9a";

const lightPrimary = "#6200ee";
const darkPrimary = "#bb86fc";

const lightSecondary = "#03dac6";
const darkSecondary = "#03dac6";

const lightInfo = "#1975d2";
const darkInfo = "#90caf9";

const lightSuccess = "#43a047";
const darkSuccess = "#43a047";

const lightWarning = "#ffa004";
const darkWarning = "#ffa004";

const lightDanger = "#b00020";
const darkDanger = "#cf6679";

export const [background, surface1, surface2, surface3, surface4] = colorRange(
  0.1,
  5,
  lightBackground,
  darkBackground
);

export const [primary1, primary2, primary3] = colorRange(
  0.1,
  3,
  lightPrimary,
  darkPrimary
);

export const [secondary1, secondary2, secondary3] = colorRange(
  0.1,
  3,
  lightSecondary,
  darkSecondary
);

export const [info1, info2, info3] = colorRange(0.1, 3, lightInfo, darkInfo);
export const [success1, success2, success3] = colorRange(
  0.1,
  3,
  lightSuccess,
  darkSuccess
);

export const [warning1, warning2, warning3] = colorRange(
  0.1,
  3,
  lightWarning,
  darkWarning
);

export const [danger1, danger2, danger3] = colorRange(
  0.1,
  3,
  lightDanger,
  darkDanger
);

export const onSurface = theme("mode", {
  light: "black",
  dark: "white"
});
export const onSurfaceHover = theme("mode", {
  light: lighten(0.2, "black"),
  dark: darken(0.2, "white")
});

export const onPrimary = theme("mode", {
  light: "white",
  dark: "black"
});
export const onPrimaryHover = theme("mode", {
  light: darken(0.2, "white"),
  dark: lighten(0.2, "black")
});

export const onSecondary = theme("mode", {
  light: "black",
  dark: "black"
});

export const onDanger = onPrimary;
export const onInfo = onPrimary;
export const onWarning = onPrimary;
export const onSuccess = "white";

export const navbarHeight = "90px";
export const navbarPadding = "20px";

export const navigatorWidth = "200px";

export const inputHeight = "35px";
export const inputPadding = "5px";

export const buttonHeight = "40px";
export const buttonWidth = "100px";

export const modalSpacing = "30px";

export const menuZIndex = 50;
export const entryZIndex = 100;
export const navbarZIndex = 200;
export const modalWrapperZIndex = 300;
export const modalZIndex = 400;

// social media colors
export const facebookBlue = "#3b5998";
export const twitterBlue = "#1da1f2";
export const linkedinBlue = "#0077b5";
export const mediumGreen = "#02b875";
export const patreonOrange = "#f96854";
