import React, { useState } from "react";
import {
  GridTemplateAreas,
  navbarHeight,
  phoneBreakpoint
} from "../../../common/constants";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import "./Entry.scss";
import combineClasses from "combine-classes/lib";
import { DefaultButton } from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";

const Entry = () => {
  const { height, width } = useWindowDimensions();
  const [open, setOpen] = useState();
  return (
    <div
      style={{
        marginTop:
          open && width <= phoneBreakpoint ? -height / 2 + navbarHeight : 0
      }}
      className={combineClasses(GridTemplateAreas.CONTENT, "JournalEntry")}
    >
      {open ? (
        <DefaultButton onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faCaretSquareUp} />
        </DefaultButton>
      ) : (
        <DefaultButton onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faCaretSquareUp} />
        </DefaultButton>
      )}
      Entry Placeholder
    </div>
  );
};

export default Entry;
