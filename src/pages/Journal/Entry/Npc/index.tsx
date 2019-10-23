import "./Npc.scss";

import combineClasses from "combine-classes";
import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { NPC } from "../../../../api/apollo";
import { GridTemplateAreas } from "../../../../common/constants";
import { INpc } from "../../../../common/types";
import Load from "../../../../components/Load";
import Avatar from "./Avatar";
import Description from "./Description";
import Details from "./Details";
import Statblock from "./Statblock";
import { NpcEntryProvider } from "./context";

interface IProps {
  id: string;
}

const NpcEntry = ({ id }: IProps) => {
  return (
    <NpcEntryProvider id={id}>
      <div
        className={combineClasses(GridTemplateAreas.ENTRY_CONTENT, "NpcEntry")}
      >
        {/* <Load valueExists={!loading}> */}
        <Avatar />
        <Description />
        <Details />
        <Statblock />
        {/* </Load> */}
      </div>
    </NpcEntryProvider>
  );
};

export default NpcEntry;
