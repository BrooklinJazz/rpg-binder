import { ISetTheme, IToggleTheme } from "./types";

export const setTheme = (payload: ISetTheme["payload"]): ISetTheme => ({
  type: "set_theme",
  payload
});

export const toggleTheme = (): IToggleTheme => ({
  type: "toggle_theme",
});
