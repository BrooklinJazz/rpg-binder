import "./Entry.scss";

import combineClasses from "combine-classes/lib";
import React, { useEffect, useLayoutEffect, useState } from "react";

import {
  faCaretSquareDown,
  faCaretSquareUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GridTemplateAreas, phoneBreakpoint } from "../../../common/constants";
import { DefaultButton } from "../../../components/Button";
import { useJournalMachine } from "../../../context/journal";
import { useEntryState } from "../../../context/journal/entry";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import ContentHandler from "./ContentHandler";
import ReferenceSidebar from "./ReferenceSidebar";

const Entry = () => {
  const { width } = useWindowDimensions();
  const { open, setOpen } = useEntryState();

  // quick hack to debug css open styles when outside of phoneBreakpoint size
  useLayoutEffect(() => {
    if (width > phoneBreakpoint && open) {
      setOpen(false);
    }
  }, [width]);

  return (
    <div
      className={combineClasses(
        GridTemplateAreas.CONTENT,
        "Entry",
        [open, "open"],
        // using === false to avoid initial animation
        [!open, "closed"]
      )}
    >
      <ContentHandler />
      <ReferenceSidebar />
    </div>
  );
};

export default Entry;
