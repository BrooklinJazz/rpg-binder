import React, { createContext, ReactNode, useContext, useReducer } from "react";

import { LocalStorage } from "../../common/constants";
import { valueFromStorage, setInStorage } from "../../common/helpers";
import { IThemeState, ThemeAction, ThemeDispatch, ThemeOption } from "./types";

const campaignReducer = (state: IThemeState, action: ThemeAction) => {
  console.log(action.type, "payload" in action && action.payload, state);
  let nextState = state;
  switch (action.type) {
    case "set_theme":
      setInStorage(LocalStorage.THEME, action.payload.theme);
      nextState = { ...state, theme: action.payload.theme };
      break;
    default:
      throw new Error(`unhandled action type ${action!.type}`);
  }
  console.log(action.type, "payload" in action && action.payload, nextState);
  return nextState;
};

const ThemeStateContext = createContext<IThemeState | undefined>(undefined);

const ThemeDispatchContext = createContext<ThemeDispatch | undefined>(
  undefined
);

const initialState: IThemeState = {
  theme:
    (valueFromStorage(LocalStorage.THEME) as
      | ThemeOption
      | undefined) || "theme-light"
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(campaignReducer, initialState);
  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        <div className={state.theme}>{children}</div>
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

export const useThemeState = () => {
  const context = useContext(ThemeStateContext);
  if (context === undefined) {
    throw new Error("useThemeState must be used within an ThemeProvider");
  }
  return context;
};

export const useThemeDispatch = () => {
  const context = useContext(ThemeDispatchContext);
  if (context === undefined) {
    throw new Error("useThemeState must be used within an ThemeProvider");
  }
  return context;
};
