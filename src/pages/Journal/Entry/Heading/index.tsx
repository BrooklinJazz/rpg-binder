import "./EntryHeading.scss";

import React, { useRef, useState } from "react";

import { GridTemplateAreas } from "../../../../common/constants";
import { Setter } from "../../../../common/types";
import { H1 } from "../../../../components/Typeography";
import useClickoutHandler from "../../../../hooks/useClickoutHandler";
import combineClasses from "combine-classes/lib";

interface IProps {
  value: string;
  setter: Setter<string>;
  save: () => void;
}

const EntryHeading = ({ value, setter, save }: IProps) => {
  const [editing, setEditing] = useState(false);
  const clickoutRef = useRef(null);
  const onClickout = () => {
    setEditing(false);
    save();
  };
  useClickoutHandler(clickoutRef, onClickout);
  if (editing) {
    return (
      <input
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
    <H1
      onClick={() => setEditing(true)}
      elementStyle="H2"
      className={combineClasses(
        "EntryHeading",
        GridTemplateAreas.ENTRY_HEADING,
        "H1",
        "light"
      )}
    >
      {value}
    </H1>
  );
};

export default EntryHeading;
