import "./Npc.scss";

import combineClasses from "combine-classes";
import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { NPC } from "../../../../api/apollo";
import { GridTemplateAreas } from "../../../../common/constants";
import { INpc } from "../../../../common/types";
import Load from "../../../../components/Load";
import Avatar from "./Avatar";
import { NpcEntryProvider } from "./context";
import Description from "./Description";
import NpcEntryHeading from "./Heading";
import Statblock from "./Statblock";

interface IProps {
  id: string;
}

const NpcEntry = ({ id }: IProps) => {
  const { data, loading } = useQuery<{ npc: INpc }, { id: string }>(NPC, {
    variables: { id }
  });
  if (!data || loading) {
    return <div>loading</div>;
  }
  console.log("NPC ENTRY DATA", data);
  return (
    <NpcEntryProvider npc={data.npc}>
      <NpcEntryHeading />
      <div
        className={combineClasses(GridTemplateAreas.ENTRY_CONTENT, "NpcEntry")}
      >
        <Avatar />
        <Description />
        <Statblock />
      </div>
    </NpcEntryProvider>
  );
};

export default NpcEntry;
