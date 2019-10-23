import React, { createContext, ReactNode, useContext, useState } from "react";

import { useMutation, useQuery } from "@apollo/react-hooks";

import { NPC, SAVE_NPC } from "../../../../api/apollo";
import { INpc, INpcInput, Setter } from "../../../../common/types";

interface INpcEntryState {
  name: string;
  setName: Setter<string>;
  description: string | undefined;
  setDescription: Setter<string>;
  details: string | undefined;
  setDetails: Setter<string>;
  save: (input: INpcInput) => void;
  revert: (input: INpcInput) => void;
}

export const NPCEntryContext = createContext<INpcEntryState | undefined>(
  undefined
);

export const NpcEntryProvider = ({
  children,
  id
}: {
  children: ReactNode;
  id: string;
}) => {
  const { data, loading } = useQuery<{ npc: INpc }, { id: string }>(NPC, {
    variables: { id }
  });
  if (!data) {
    return null;
  }

  const [name, setName] = useState(data.npc.name || "");
  const [description, setDescription] = useState(data.npc.description || "");
  const [details, setDetails] = useState(data.npc.details || "");

  const [saveMutation] = useMutation<{}, INpcInput>(SAVE_NPC);
  const save = () =>
    saveMutation({ variables: { name, description, details } });

  const revert = () => {
    setName(data.npc.name);
    setDescription(data.npc.description || "");
    setName(data.npc.details || "");
  };

  return (
    <NPCEntryContext.Provider
      value={{
        name,
        description,
        details,
        setName,
        setDescription,
        setDetails,
        save,
        revert
      }}
    >
      {children}
    </NPCEntryContext.Provider>
  );
};

export const useNpcEntryContext = () => {
  const context = useContext(NPCEntryContext);
  if (context === undefined) {
    throw new Error(
      "useNpcEntryContext must be used within an NpcEntryProvider"
    );
  }
  return context;
};
