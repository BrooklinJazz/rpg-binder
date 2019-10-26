import React, { createContext, ReactNode, useContext, useState } from "react";

import { useMutation, useQuery } from "@apollo/react-hooks";

import { NPC, SAVE_NPC } from "../../../../api/apollo";
import {
  INpc,
  INpcInput,
  IUpdateNpcInput,
  Setter
} from "../../../../common/types";
import { NPC_DESCRIPTION_TEMPLATE, NPC_DETAILS_TEMPLATE } from "./templates";

interface INpcEntryState {
  name: string;
  setName: Setter<string>;
  description: string | undefined;
  setDescription: Setter<string>;
  avatar?: string | undefined;
  setAvatar: Setter<string | undefined>;
  save: () => void;
  revert: () => void;
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
  npc: INpc;
}) => {
  const [name, setName] = useState(npc.name || "");
  const [description, setDescription] = useState(npc.description || "");
  const [avatar, setAvatar] = useState(npc.avatar);
  const [saveMutation] = useMutation<{}, IUpdateNpcInput>(SAVE_NPC);

  const save = () =>
    saveMutation({ variables: { id, name, description, avatar } });

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
        avatar,
        setAvatar,
        setName,
        setDescription,
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
