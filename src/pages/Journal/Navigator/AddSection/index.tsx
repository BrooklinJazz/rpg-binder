import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import combineClasses from "combine-classes/lib";
import { Theme } from "../../../../common/theme";

const AddSection = () => {
  return (
    <div
      className={combineClasses(
        "NavigatorAddSection",
        Theme.default,
        Theme.hoverable
      )}
    >
      <FontAwesomeIcon className="NavigatorPlusIcon" icon={faPlus} /> Section
    </div>
  );
};

export default AddSection;
