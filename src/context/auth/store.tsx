import jwt from "jsonwebtoken";
import React, { createContext, ReactNode, useReducer } from "react";

import { LocalStorage } from "../../common/constants";
import {
  removeFromStorage,
  setInStorage,
  valueFromStorage
} from "../../common/helpers";
import { AuthAction, AuthDispatch, IAuthState } from "./types";

const authReducer = (state: IAuthState, action: AuthAction) => {
  console.log(action.type, "payload" in action && action.payload, state);
  let nextState = state;
  switch (action.type) {
    case "auth_success":
      setInStorage(LocalStorage.TOKEN, action.payload.token);
      nextState = { ...state, token: action.payload.token };
      break;
    case "logout":
      removeFromStorage(LocalStorage.TOKEN);
      nextState = { ...state, token: undefined };
      break;
    default:
      throw new Error(`unhandled action type ${action!.type}`);
  }
  console.log(action.type, "payload" in action && action.payload, nextState);
  return nextState;
};

const AuthStateContext = createContext<IAuthState | undefined>(undefined);

const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined);

const initialState: IAuthState = {
  token: valueFromStorage(LocalStorage.TOKEN)
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};

export const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};
