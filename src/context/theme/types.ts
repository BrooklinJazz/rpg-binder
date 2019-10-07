export interface IThemeState {
  theme: ThemeOption;
}

export type ThemeOption = "theme-light" | "theme-dark";

export type ThemeAction = ISetTheme;

export type ThemeDispatch = (action: ThemeAction) => void;

export interface ISetTheme {
  type: "set_theme";
  payload: { theme: ThemeOption };
}
