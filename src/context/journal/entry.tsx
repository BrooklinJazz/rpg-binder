import React, { createContext, ReactNode, useState, useContext } from "react";
import { Setter } from "../../common/types";

interface IEntryState {
  open: boolean;
  setOpen: Setter<boolean>;
}

const EntryStateContext = createContext<IEntryState | undefined>(undefined);

export const EntryStateProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <EntryStateContext.Provider value={{ open, setOpen }}>
      {children}
    </EntryStateContext.Provider>
  );
};

export const useEntryState = () => {
  const context = useContext(EntryStateContext);
  if (context === undefined) {
    throw new Error("EntryState must be used within an EntryStateProvider");
  }
  return context;
};