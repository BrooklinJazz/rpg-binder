import combineClasses from "combine-classes/lib";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { confirmAlert } from "../../common/helpers";
import { onSurface, primary1, surface2 } from "../../common/styles";
import { Setter } from "../../common/types";
import useClickoutHandler from "../../hooks/useClickoutHandler";

interface IProps {
  value: string;
  setter: Setter<string>;
  className?: string;
  save: () => void;
  revert: () => void;
}

const TextArea = styled.textarea`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: scroll;
  padding: 8px;
  resize: none;
  margin: 0;
  outline: none;
  background-color: ${surface2};
  border: solid 2px ${primary1};
  color: ${onSurface};
`;

const Preview = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: scroll;
  padding: 8px;
  background-color: ${surface2};
  color: ${onSurface};
`;

export const MarkdownEditor = ({
  value,
  setter,
  className,
  revert,
  save
}: IProps) => {
  const [editing, setEditing] = useState(false);
  const clickoutRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = () => {
    save();
    setEditing(false);
  };

  const handleDiscard = () =>
    confirmAlert({
      onConfirm: () => {
        revert();
        setEditing(false);
      }
    });

  useClickoutHandler(clickoutRef, handleSubmit);

  const aggregateKeyHandlers = (
    param: React.KeyboardEvent<any>,
    ...fns: Function[]
  ) => {
    fns.forEach(fn => fn(param));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.which === 13) {
      handleSubmit();
    }
  };

  const handleEscape = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      handleDiscard();
    }
  };

  const handleKeyboardShortCuts = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => aggregateKeyHandlers(e, handleEnter, handleEscape);

  if (editing) {
    return (
      <TextArea
        onKeyUp={handleKeyboardShortCuts}
        onChange={e => setter(e.target.value)}
        value={value}
        ref={clickoutRef}
        autoFocus={true}
      />
    );
  }
  return (
    <Preview
      role="button"
      onClick={() => setEditing(true)}
    >
      <ReactMarkdown source={value} />
    </Preview>
  );
};

export default MarkdownEditor;
