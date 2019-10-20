import React from "react";
import { GridTemplateAreas } from "../../../../common/constants";

interface IProps {
  id: string;
}

const OrganizationEntry = ({ id }: IProps) => {
  return <div className={GridTemplateAreas.ENTRY_CONTENT}>Organization PLACEHOLDER {id}</div>;
};

export default OrganizationEntry;
