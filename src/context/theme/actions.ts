import { ISetTheme } from "./types";

export const setTheme = (payload: ISetTheme["payload"]): ISetTheme => ({
  type: "set_theme",
  payload
});
