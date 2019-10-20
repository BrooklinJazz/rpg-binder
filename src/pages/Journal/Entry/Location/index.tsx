import React from "react";
import { GridTemplateAreas } from "../../../../common/constants";

interface IProps {
  id: string;
}

const LocationEntry = ({ id }: IProps) => {
  return <div className={GridTemplateAreas.ENTRY_CONTENT}>Location PLACEHOLDER {id}</div>;
};

export default LocationEntry;
