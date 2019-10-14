import React, { createContext, useContext, ReactNode } from "react";
import { useMachine } from "@xstate/react";
import { journalMachine } from "../../Test";
import { JournalStates, JournalEvents, IJournalContext } from "./types";

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
  };
  state: JournalStates;
}

const JournalStateContext = createContext<IJournalState | undefined>(undefined);

export const JournalProvider = ({ children }: { children: ReactNode }) => {
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
          back
        },
        context: current.context,
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
