import React, { useState } from "react";
import {
  GridTemplateAreas,
  phoneBreakpoint
} from "../../../common/constants";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import "./Entry.scss";
import combineClasses from "combine-classes/lib";
import { DefaultButton } from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareUp,
  faCaretSquareDown
} from "@fortawesome/free-solid-svg-icons";

const Entry = () => {
  const { height, width } = useWindowDimensions();
  const [open, setOpen] = useState();
  const MobileOpenButton = () =>
    open ? (
      <DefaultButton onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faCaretSquareDown} />
      </DefaultButton>
    ) : (
      <DefaultButton onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faCaretSquareUp} />
      </DefaultButton>
    );
  return (
    <div
      className={combineClasses(
        GridTemplateAreas.CONTENT,
        "JournalEntry",
        [open, "open"],
        // using === false to avoid initial animation
        [open === false, "closed"]
      )}
    >
      {width <= phoneBreakpoint && MobileOpenButton()}
    </div>
  );
};

export default Entry;
