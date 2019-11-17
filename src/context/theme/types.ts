export interface IThemeState {
  theme: Theme;
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark"
}

export type ThemeAction = ISetTheme | IToggleTheme;

export type ThemeDispatch = (action: ThemeAction) => void;

export interface ISetTheme {
  type: "set_theme";
  payload: { theme: Theme };
}

export interface IToggleTheme {
  type: "toggle_theme";
}
