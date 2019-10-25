import "./Markdown.scss";

import combineClasses from "combine-classes/lib";
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Setter } from "../../common/types";
import useClickoutHandler from "../../hooks/useClickoutHandler";

interface IProps {
  value: string;
  setter: Setter<string>;
  className?: string;
}

const MarkdownPreview = ({ value, setter, className }: IProps) => {
  const [editing, setEditing] = useState(false);
  const clickoutRef = useRef(null);
  const onClickout = () => setEditing(false);
  useClickoutHandler(clickoutRef, onClickout);

  if (editing) {
    return (
      <textarea
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
