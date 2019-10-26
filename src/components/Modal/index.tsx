import "./Modal.scss";

import combineClasses from "combine-classes/lib";
import React, { useEffect } from "react";
import Close from "../Close";
import { H1 } from "../Typeography";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  close: () => void;
}

const Modal = ({
  children,
  className,
  close,
  title,
  ...props
}: IModalProps) => {
  useEffect(() => {
    document.addEventListener("keyup", event => {
      const key = event.key || event.keyCode;
      const isEscape = ["Escape", "Esc", 27].some(
        escapeCode => escapeCode === key
      );
      if (isEscape) {
        close();
      }
    });
    return document.removeEventListener("keyup", close);
  });
  return (
    <div onClick={() => close()} className="ModalWrapper">
      <div
        onClick={e => e.stopPropagation()}
        {...props}
        className={combineClasses("Modal", className)}
      >
        <div className="ModalTitleWrapper">
          <H1 fontWeight="light" elementStyle="H3">
            {title}
          </H1>
          <Close buttonProps={{ onClick: close, className: "ModalClose" }} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
