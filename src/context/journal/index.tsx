import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

import { Setter } from "../../common/types";
import { useCampaignState } from "../campaign/store";

interface IJournalState {
  section?: string;
  page?: string;
  setSection: Setter<string | undefined>;
  clearPageAndSetSection: (sectionId: string) => void;
  selectPinned: (sectionId: string, pageId: string) => void;
  setPage: Setter<string | undefined>;
}

const JournalStateContext = createContext<IJournalState | undefined>(undefined);
const JournalModalContext = createContext<
  | {
      isOpen: boolean;
      open: (state: JournalModalStates) => void;
      state: JournalModalStates;
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
  const [state, setState] = useState(JournalModalStates.CREATE_SECTION);
  const open = (modalState: JournalModalStates) => {
    setIsOpen(true);
    setState(modalState);
  };
  const close = () => setIsOpen(false);
  return (
    <JournalModalContext.Provider value={{ close, open, isOpen, state }}>
      {children}
    </JournalModalContext.Provider>
  );
};

export const JournalStateProvider = ({ children }: { children: ReactNode }) => {
  const [section, setSection] = useState();
  const [page, setPage] = useState();
  const { activeCampaign } = useCampaignState();
  const clearPageAndSetSection = (sectionId: string) => {
    setSection(sectionId);
    setPage(undefined);
  };
  const selectPinned = (sectionId: string, pageId: string) => {
    setSection(sectionId);
    setPage(pageId);
  };
  useEffect(
    function clearOnCampaignChange() {
      setPage(undefined);
      setSection(undefined);
    },
    [activeCampaign]
  );

  return (
    <JournalStateContext.Provider
      value={{
        section,
        clearPageAndSetSection,
        setSection,
        page,
        setPage,
        selectPinned
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
    throw new Error(
      "useJournalModalState must be used within an JournalProvider"
    );
  }
  return context;
};
