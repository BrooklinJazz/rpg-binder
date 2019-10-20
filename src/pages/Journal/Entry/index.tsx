import "./Entry.scss";

import combineClasses from "combine-classes/lib";
import React, { useState, useEffect, useLayoutEffect } from "react";

import {
  faCaretSquareDown,
  faCaretSquareUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GridTemplateAreas, phoneBreakpoint } from "../../../common/constants";
import { DefaultButton } from "../../../components/Button";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import ReferenceSidebar from "./ReferenceSidebar";
import ContentHandler from "./ContentHandler";

const Entry = () => {
  const { width } = useWindowDimensions();
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
        [open === false, "closed"]
      )}
    >
      {width <= phoneBreakpoint && MobileOpenButton()}
      <ContentHandler/>
      <ReferenceSidebar />
    </div>
  );
};

export default Entry;
