import React from "react";
import { GridTemplateAreas } from "../../../../common/constants";

interface IProps {
  id: string;
}

const NpcEntry = ({ id }: IProps) => {
  
  return <div className={GridTemplateAreas.ENTRY_CONTENT}>NPC PLACEHOLDER {id}</div>;
};

export default NpcEntry;
