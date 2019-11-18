import React, { createContext, ReactNode, useContext, useState } from "react";
import { Setter } from "../../common/types";

interface IJournalState {
  section?: string;
  page?: string;
  setSection: Setter<string | undefined>;
  setPage: Setter<string | undefined>;
}

const JournalStateContext = createContext<IJournalState | undefined>(undefined);
const JournalModalContext = createContext<
  | {
      isOpen: boolean;
      open: () => void;
      close: () => void;
    }
  | undefined
>(undefined);

export enum JournalModalStates {
  CREATE_SECTION = "CREATE_SECTION",
  CREATE_PAGE = "CREATE_PAGE"
}

export const JournalModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  // NOTE i'm just providing this a default rather than dealing with an optional type
  const open = () => {
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);
  return (
    <JournalModalContext.Provider value={{ close, open, isOpen }}>
      {children}
    </JournalModalContext.Provider>
  );
};

export const JournalStateProvider = ({ children }: { children: ReactNode }) => {
  const [section, setSection] = useState();
  const [page, setPage] = useState();

  return (
    <JournalStateContext.Provider
      value={{
        section,
        setSection,
        page,
        setPage
      }}
    >
      {children}
    </JournalStateContext.Provider>
  );
};

export const useJournalState = () => {
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
