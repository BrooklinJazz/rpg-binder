import "./Markdown.scss";

import combineClasses from "combine-classes/lib";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { confirmAlert } from "../../common/helpers";
import { Setter } from "../../common/types";
import useClickoutHandler from "../../hooks/useClickoutHandler";

interface IProps {
  value: string;
  setter: Setter<string>;
  className?: string;
  save: () => void;
  revert: () => void;
}

const MarkdownPreview = ({
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
      <textarea
        onKeyUp={handleKeyboardShortCuts}
        onChange={e => setter(e.target.value)}
        value={value}
        className="MarkdownTextArea"
        ref={clickoutRef}
        autoFocus={true}
      />
    );
  }
  return (
    <div
      role="button"
      className={combineClasses("MarkdownPreview", className)}
      onClick={() => setEditing(true)}
    >
      <ReactMarkdown source={value} />
    </div>
  );
};

export default MarkdownPreview;
