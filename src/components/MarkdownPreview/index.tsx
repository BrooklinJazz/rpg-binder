import "./Markdown.scss";

import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Setter } from "../../common/types";
import useClickoutHandler from "../../hooks/useClickoutHandler";

const input = "# This is a header\n\nAnd this is a paragraph";
interface IProps {
  value: string;
  setter: Setter<string>;
  className?: string;
}

const MarkdownPreview = (props: IProps) => {
  const [editing, setEditing] = useState(false);
  const clickoutRef = useRef(null);
  const onClickout = () => setEditing(false);
  useClickoutHandler(clickoutRef, onClickout);

  if (editing) {
    return (
      <textarea
        className="MarkdownTextArea"
        ref={clickoutRef}
        autoFocus={true}
      />
    );
  }
  return (
    <div className={props.className} onClick={() => setEditing(true)}>
      <ReactMarkdown source={input} />;
    </div>
  );
};

export default MarkdownPreview;
