import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { confirmAlert } from "../../common/helpers";
import {
  landscapeBreakpoint,
  onSurface,
  primary1,
  surface2,
  tabletBreakpoint
} from "../../common/styles";
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
  * {
    font-family: "Roboto", sans-serif;
    font-weight: 300;
  }
  h1 {
    font-size: 2em;
    @media (max-width: ${landscapeBreakpoint}) {
      font-size: 1.8em;
    }
    @media (max-width: ${tabletBreakpoint}) {
      font-size: 1.5em;
    }
  }

  h2 {
    @media (max-width: ${landscapeBreakpoint}) {
      font-size: 1.4em;
    }
    @media (max-width: ${tabletBreakpoint}) {
      font-size: 1.3em;
    }
  }

  h3 {
    font-size: 1.3em;
    @media (max-width: ${landscapeBreakpoint}) {
      font-size: 1.2;
    }
    @media (max-width: ${tabletBreakpoint}) {
      font-size: 1.1em;
    }
  }

  p {
    font-size: 1em;
  }
`;

export const MarkdownEditor = ({ value, setter, revert, save }: IProps) => {
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
      className="MarkdownEditorPreview"
      onClick={() => setEditing(true)}
    >
      <ReactMarkdown source={value} />
    </Preview>
  );
};

export default MarkdownEditor;
