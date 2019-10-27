import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from "react";

import { useMutation, useQuery } from "@apollo/react-hooks";

import { NPC, SAVE_NPC } from "../../../../api/apollo";
import {
  INpc,
  INpcInput,
  IUpdateNpcInput,
  Setter
} from "../../../../common/types";
import { NPC_DESCRIPTION_TEMPLATE, NPC_DETAILS_TEMPLATE } from "./templates";
import usePrevious from "../../../../hooks/usePrevious";
import { setInterval } from "timers";

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

export const NpcEntryContext = createContext<INpcEntryState | undefined>(
  undefined
);

export const NpcEntryProvider = ({
  children,
  npc
}: {
  children: ReactNode;
  npc: INpc;
}) => {
  const [name, setName] = useState(npc.name || "");
  const [description, setDescription] = useState(npc.description || "");
  const [avatar, setAvatar] = useState(npc.avatar);
  const [saveMutation] = useMutation<{}, IUpdateNpcInput>(SAVE_NPC);

  const previousId = usePrevious(npc._id);

  useEffect(function debugChangingNpc() {
    if (previousId && npc._id  !== previousId) {
      revert();
    }
  }, [npc._id]);

  const save = () =>
    saveMutation({ variables: { id: npc._id, name, description, avatar } });

  const revert = () => {
    setName(npc.name);
    setDescription(npc.description || "");
    setAvatar(npc.avatar);
  };

  return (
    <NpcEntryContext.Provider
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
    </NpcEntryContext.Provider>
  );
};

export const useNpcEntryContext = () => {
  const context = useContext(NpcEntryContext);
  console.log("CONTEXT", context)
  if (context === undefined) {
    throw new Error(
      "useNpcEntryContext must be used within an NpcEntryProvider"
    );
  }
  return context;
};
