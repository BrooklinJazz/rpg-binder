import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import combineClasses from "combine-classes/lib";
import { Theme } from "../../../../common/theme";
import { useJournalMachine } from "../../../../context/journal";
import { JournalStates } from "../../../../context/journal/types";
import Fade from "../../../../components/Fade";

const AddPage = () => {
  const { state } = useJournalMachine();
  const typeToCreateFromState = () => {
    switch (state) {
      case JournalStates.displayLocations:
        return "Location";
      case JournalStates.displayNpcs:
      case JournalStates.selectedNpc:
        return "Npc";
      case JournalStates.displayOrganizations:
      case JournalStates.selectedOrganization:
        return "Organization";
      default:
        return undefined;
    }
  };
  const typeToCreate = useMemo(() => typeToCreateFromState(), [state]);
  return (
    <Fade in={Boolean(typeToCreate)}>
      <div
        className={combineClasses(
          "NavigatorAddPage",
          Theme.default,
          Theme.hoverable
        )}
      >
        <FontAwesomeIcon className="NavigatorPlusIcon" icon={faPlus} />{" "}
        {typeToCreate}
      </div>
    </Fade>
  );
};

export default AddPage;
