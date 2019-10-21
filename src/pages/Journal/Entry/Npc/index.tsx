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

interface IProps {
  id: string;
}

const NpcEntry = ({ id }: IProps) => {
  return (
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
  );
};

export default NpcEntry;
