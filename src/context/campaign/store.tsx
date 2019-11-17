import React, { createContext, ReactNode, useContext, useReducer } from "react";

import { LocalStorage } from "../../common/constants";
import { setInStorage, valueFromStorage } from "../../common/helpers";
import { CampaignAction, CampaignDispatch, ICampaignState } from "./types";

const campaignReducer = (state: ICampaignState, action: CampaignAction) => {
  console.log(action.type, "payload" in action && action.payload, state);
  let nextState = state;
  switch (action.type) {
    case "select_campaign":
      setInStorage(LocalStorage.ACTIVE_CAMPAIGN, action.payload.campaign);
      nextState = { ...state, activeCampaign: action.payload.campaign };
      break;
    case "open_modal":
      nextState = { ...state, modalIsOpen: true };
      break;
    case "close_modal":
      nextState = { ...state, modalIsOpen: false };
      break;
    default:
      throw new Error(`unhandled action type ${action!.type}`);
  }
  console.log(action.type, "payload" in action && action.payload, nextState);
  return nextState;
};

const CampaignStateContext = createContext<ICampaignState | undefined>(
  undefined
);

const CampaignDispatchContext = createContext<CampaignDispatch | undefined>(
  undefined
);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const initialState: ICampaignState = {
    activeCampaign: valueFromStorage(LocalStorage.ACTIVE_CAMPAIGN),
    modalIsOpen: false
  };
  const [state, dispatch] = useReducer(campaignReducer, initialState);
  return (
    <CampaignStateContext.Provider value={state}>
      <CampaignDispatchContext.Provider value={dispatch}>
        {children}
      </CampaignDispatchContext.Provider>
    </CampaignStateContext.Provider>
  );
};

export const useCampaignState = () => {
  const context = useContext(CampaignStateContext);
  if (context === undefined) {
    throw new Error("useCampaignState must be used within an CampaignProvider");
  }
  return context;
};

export const useCampaignDispatch = () => {
  const context = useContext(CampaignDispatchContext);
  if (context === undefined) {
    throw new Error("useCampaignState must be used within an CampaignProvider");
  }
  return context;
};
