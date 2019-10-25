import React, { createContext, ReactNode, useContext, useState } from "react";

import { useMutation, useQuery } from "@apollo/react-hooks";

import { NPC, SAVE_NPC } from "../../../../api/apollo";
import { INpc, INpcInput, Setter } from "../../../../common/types";
import { NPC_DESCRIPTION_TEMPLATE, NPC_DETAILS_TEMPLATE } from "./templates";

interface INpcEntryState {
  name: string;
  setName: Setter<string>;
  description: string | undefined;
  setDescription: Setter<string>;
  details: string | undefined;
  setDetails: Setter<string>;
  avatar?: File | undefined;
  setAvatar: Setter<File | undefined>;
  save: (input: INpcInput) => void;
  revert: (input: INpcInput) => void;
}

export const NPCEntryContext = createContext<INpcEntryState | undefined>(
  undefined
);

export const NpcEntryProvider = ({
  children,
  id,
  npc
}: {
  children: ReactNode;
  id: string;
  npc: INpc
}) => {

  const [name, setName] = useState(npc.name || "");
  const [description, setDescription] = useState(npc.description || "");
  const [details, setDetails] = useState(npc.details || NPC_DETAILS_TEMPLATE);
  const [avatar, setAvatar] = useState(npc.avatar);
  const [saveMutation] = useMutation<{}, INpcInput>(SAVE_NPC);
  const save = () =>
    saveMutation({ variables: { name, description, details } });

  const revert = () => {
    setName(npc.name);
    setDescription(npc.description || "");
    setName(npc.details || "");
  };

  return (
    <NPCEntryContext.Provider
      value={{
        name,
        description,
        details,
        avatar,
        setAvatar,
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
