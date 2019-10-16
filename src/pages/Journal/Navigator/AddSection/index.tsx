import combineClasses from "combine-classes/lib";
import React from "react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Theme } from "../../../../common/theme";
import {
  JournalModalStates,
  useJournalModalState
} from "../../../../context/journal";

const AddSection = () => {
  const { open } = useJournalModalState();
  return (
    <div
      onClick={() => open(JournalModalStates.CREATE_SECTION)}
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
