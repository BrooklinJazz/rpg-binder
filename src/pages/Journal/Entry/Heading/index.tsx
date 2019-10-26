import "./EntryHeading.scss";

import React, { useRef, useState } from "react";

import {
  GridTemplateAreas,
  ENTRY_HEADING_MAX_LENGTH
} from "../../../../common/constants";
import { Setter } from "../../../../common/types";
import { H1 } from "../../../../components/Typeography";
import useClickoutHandler from "../../../../hooks/useClickoutHandler";
import combineClasses from "combine-classes/lib";
import { useEntryState } from "../../../../context/journal/entry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareDown,
  faCaretSquareUp
} from "@fortawesome/free-solid-svg-icons";
import { DefaultButton } from "../../../../components/Button";

interface IProps {
  value: string;
  setter: Setter<string>;
  save: () => void;
}

const EntryHeading = ({ value, setter, save }: IProps) => {
  const [editing, setEditing] = useState(false);
  const { open, setOpen } = useEntryState();
  const clickoutRef = useRef(null);
  const onClickout = () => {
    setEditing(false);
    save();
  };
  useClickoutHandler(clickoutRef, onClickout);
  const MobileOpenIcon = () =>
    open ? (
      <FontAwesomeIcon icon={faCaretSquareDown} />
    ) : (
      <FontAwesomeIcon icon={faCaretSquareUp} />
    );
  if (editing) {
    return (
      <input
        maxLength={ENTRY_HEADING_MAX_LENGTH}
        autoFocus={true}
        ref={clickoutRef}
        onChange={e => setter(e.target.value)}
        value={value}
        className={combineClasses(
          "EntryHeading",
          GridTemplateAreas.ENTRY_HEADING,
          "H2",
          "light"
        )}
      />
    );
  }
  return (
    <div
      className={combineClasses(
        GridTemplateAreas.ENTRY_HEADING,
        "EntryHeadingContainer"
      )}
    >
      <H1
        onClick={() => setEditing(true)}
        elementStyle="H2"
        className={combineClasses("EntryHeading", "H1", "light")}
      >
        {value}
      </H1>
      <DefaultButton onClick={() => setOpen(!open)} className="EntryOpenButton">
        <MobileOpenIcon />
      </DefaultButton>
    </div>
  );
};

export default EntryHeading;
