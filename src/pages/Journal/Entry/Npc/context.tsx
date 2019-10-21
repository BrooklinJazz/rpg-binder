import React, { createContext, useState, ReactNode } from "react";
import { INpc, Setter } from "../../../../common/types";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { NPC } from "../../../../api/apollo";
import { useJournalMachine } from "../../../../context/navigator";

interface INpcEntryState {
  name: string;
  setName: Setter<string>;
  description: string | undefined;
  setDescription: Setter<string>;
  details: string | undefined;
  setDetails: Setter<string>;
}

const NpcEntrySetterContext = createContext<INpc | undefined>(undefined);

const NpcEntryProvider = ({ children }: { children: ReactNode }) => {
  const { context } = useJournalMachine();
  if (!context.selectedNpc) {
    return null;
  }
  const { data, loading } = useQuery<{ npc: INpc }, { id: string }>(NPC, {
    variables: { id: context.selectedNpc.id }
  });
  if (!data) {
    return null;
  }

  const save = useMutation()

  const [name, setName] = useState(data.npc.name);
  const [description, setDescription] = useState(data.npc.description);
  const [details, setDetails] = useState(data.npc.details);
  return <NpcEntrySetterContext.Provider value={{name, description, details}} >{children}</NpcEntryContext.Provider>;
};
