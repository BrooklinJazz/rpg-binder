import "./Markdown.scss";

import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Setter } from "../../common/types";
import useClickoutHandler from "../../hooks/useClickoutHandler";

const input = "# This is a header\n\nAnd this is a paragraph";
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  setter: Setter<string>;
  className: string;
}

const MarkdownPreview = (props: IProps) => {
  const [editing, setEditing] = useState(false);
  const clickoutRef = useRef(null);
  const onClickout = () => setEditing(false);
  useClickoutHandler(clickoutRef, onClickout);

  if (editing) {
    return (
      <div className={props.className}>
        <textarea
          className="MarkdownTextArea"
          ref={clickoutRef}
          autoFocus={true}
        />
        ;
      </div>
    );
  }
  return (
    <div
      className={props.className}
      onClick={() => setEditing(true)}
    >
      <ReactMarkdown source={input} />;
    </div>
  );
};

export default MarkdownPreview;
