import React, { useRef, useState } from "react";
import styled from "styled-components";

import { confirmAlert } from "../../../common/helpers";
import {
  onSurface,
  primary1,
  surface2,
  surface4
} from "../../../common/styles";
import { H3 } from "../../../components/StyledTypography";
import { useEntryState } from "../../../context/journal/entry";
import useClickoutHandler from "../../../hooks/useClickoutHandler";
import { PAGE_NAME_LENGTH } from "../../../common/constants";

const Grid = styled.section`
  grid-area: name;
  background-color: ${surface2};
`;

const NameInput = styled.input`
  border: solid 2px ${primary1};
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${surface4};
  color: ${onSurface};
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 1.75em;
  font-weight: 200;
`;

const NameHeader = styled(H3)`
  background-color: ${surface4};
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditName = ({ stopEditing }: { stopEditing: () => void }) => {
  const { name, save, setName, revert } = useEntryState();
  const clickoutRef = useRef(null);
  const handleSubmit = () => {
    stopEditing();
    save();
  };
  // TODO refactor key handlers that are copy-pasted.
  const handleDiscard = () =>
    confirmAlert({
      onConfirm: () => {
        revert();
        stopEditing();
      }
    });

  const aggregateKeyHandlers = (
    param: React.KeyboardEvent<any>,
    ...fns: Function[]
  ) => {
    fns.forEach(fn => fn(param));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.which === 13) {
      handleSubmit();
    }
  };

  const handleEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleDiscard();
    }
  };

  const handleKeyboardShortCuts = (e: React.KeyboardEvent<HTMLInputElement>) =>
    aggregateKeyHandlers(e, handleEnter, handleEscape);

  useClickoutHandler(clickoutRef, handleSubmit);

  return (
    <NameInput
      onKeyUp={handleKeyboardShortCuts}
      maxLength={PAGE_NAME_LENGTH}
      autoFocus={true}
      ref={clickoutRef}
      onChange={e => setName(e.target.value)}
      value={name}
    />
  );
};

export const Name = () => {
  const [editing, setEditing] = useState(false);
  const stopEditing = () => setEditing(false);
  const startEditing = () => setEditing(true);
  const { name } = useEntryState();
  return (
    <Grid>
      {editing ? (
        <EditName stopEditing={stopEditing} />
      ) : (
        <NameHeader onClick={startEditing}>{name}</NameHeader>
      )}
    </Grid>
  );
};
