import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

import { usePage, useUpdateOrCreatePage } from "../../api/hooks";
import { Setter } from "../../common/types";
import { useJournalState } from "./";

interface IPageState {
  name: string;
  setName: Setter<string>;
  description?: string;
  setDescription: Setter<string>;
  id?: string; // this should always be defined.
  relatedPages: string[];
  save: () => any;
  revert: () => any;
}

const EntryStateContext = createContext<IPageState | undefined>(undefined);

export const EntryStateProvider = ({ children }: { children: ReactNode }) => {
  const { page: id } = useJournalState();
  const { page } = usePage();
  const [name, setName] = useState(page ? page.name : "");
  const [description, setDescription] = useState(
    page ? page.description || "" : ""
  );
  const [relatedPages, setRelatedPages] = useState([] as string[]);
  const revert = () => {
    setName(page ? page.name : "");
    setDescription(page ? page.description || "" : "");
    setRelatedPages(page ? page.relatedPages : []);
  };
  useEffect(() => {
    if (page) {
      revert();
    }
  }, [page]);
  const { create } = useUpdateOrCreatePage();
  const save = () => create({ name, id, description, relatedPages });

  return (
    <EntryStateContext.Provider
      value={{
        save,
        revert,
        id,
        name,
        description,
        relatedPages,
        setName,
        setDescription
      }}
    >
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
