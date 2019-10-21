import combineClasses from "combine-classes/lib";
import React from "react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  modalStateFromTypeToCreate,
  typeToCreateFromState
} from "../../../../common/helpers";
import { Theme } from "../../../../common/theme";
import Fade from "../../../../components/Fade";
import {
  useJournalMachine,
  useJournalModalState
} from "../../../../context/navigator";

const AddPage = () => {
  const { state } = useJournalMachine();
  const { open } = useJournalModalState();
  const typeToCreate = typeToCreateFromState(state);
  const selectedState = modalStateFromTypeToCreate(typeToCreate);
  return (
    <Fade in={Boolean(typeToCreate)}>
      <div
        onClick={() => selectedState && open(selectedState)}
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
