import React, { createContext, ReactNode, useContext, useState } from "react";

import { useMachine } from "@xstate/react";

import { selectCampaign } from "../campaign/actions";
import { useCampaignDispatch } from "../campaign/store";
import { journalMachine } from "./statemachine";
import { IJournalContext, JournalEvents, JournalStates } from "./types";

interface IJournalState {
  context: IJournalContext;
  actions: {
    back: () => any;
    displayLocations: () => any;
    displayOrganizations: () => any;
    displayNpcs: () => any;
    selectLocation: (id: string) => any;
    selectOrganization: (id: string) => any;
    selectNpc: (id: string) => any;
    changeCampaign: (id: string) => any;
  };
  state: JournalStates;
}

const JournalStateContext = createContext<IJournalState | undefined>(undefined);
const JournalModalContext = createContext<
  | {
      isOpen: boolean;
      open: (selectedState: JournalModalStates) => void;
      close: () => void;
      state: JournalModalStates;
    }
  | undefined
>(undefined);

export enum JournalModalStates {
  CREATE_LOCATION = "CREATE_LOCATION",
  CREATE_ORGANIZATION = "CREATE_ORGANIZATION",
  CREATE_NPC = "CREATE_NPC"
}

export const JournalModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  // NOTE i'm just providing this a default rather than dealing with an optional type
  const [state, setState] = React.useState(JournalModalStates.CREATE_LOCATION);
  const open = (selectedState: JournalModalStates) => {
    setState(selectedState);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);
  return (
    <JournalModalContext.Provider value={{ close, open, isOpen, state }}>
      {children}
    </JournalModalContext.Provider>
  );
};

export const JournalStateProvider = ({ children }: { children: ReactNode }) => {
  const [current, send] = useMachine(journalMachine);
  const back = () => send(JournalEvents.BACK);

  const displayLocations = () => send(JournalEvents.DISPLAY_LOCATIONS);
  const displayOrganizations = () => send(JournalEvents.DISPLAY_ORGANIZATIONS);
  const displayNpcs = () => send(JournalEvents.DISPLAY_NPCS);

  const selectOrganization = (id: string) =>
    send(JournalEvents.SELECT_ORGANIZATION, { selectedOrganization: id });
  const selectNpc = (id: string) =>
    send(JournalEvents.SELECT_NPC, { selectedNpc: id });
  const selectLocation = (id: string) =>
    send(JournalEvents.SELECT_LOCATION, { selectedLocation: id });

  const dispatch = useCampaignDispatch();

  const changeCampaign = (id: string) => {
    dispatch(selectCampaign({ campaign: id }));
    send(JournalEvents.CHANGE_CAMPAIGN);
  };

  return (
    <JournalStateContext.Provider
      value={{
        actions: {
          displayLocations,
          displayOrganizations,
          displayNpcs,
          selectOrganization,
          selectNpc,
          selectLocation,
          back,
          changeCampaign
        },
        context: current.context as IJournalContext,
        state: current.value as JournalStates // NOTE this may not be accurate
      }}
    >
      {children}
    </JournalStateContext.Provider>
  );
};

export const useJournalMachine = () => {
  const context = useContext(JournalStateContext);
  if (context === undefined) {
    throw new Error("useJournalState must be used within an JournalProvider");
  }
  return context;
};

export const useJournalModalState = () => {
  const context = useContext(JournalModalContext);
  if (context === undefined) {
    throw new Error("useJournalState must be used within an JournalProvider");
  }
  return context;
};
