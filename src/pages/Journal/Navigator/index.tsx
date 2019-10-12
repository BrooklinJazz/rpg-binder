import React from "react";
import { GridTemplateAreas } from "../../../common/constants";
import combineClasses from "combine-classes";
import "./Navigator.scss";

const Navigator = () => {
  return <div className={combineClasses(GridTemplateAreas.SIDEBAR, "JournalNavigator")}>Navigator Placeholder</div>;
};

export default Navigator