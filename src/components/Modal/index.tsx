import "./Modal.scss";

import combineClasses from "combine-classes/lib";
import React, { useEffect } from "react";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  close: () => void;
}

const Modal = ({ children, className, close, ...props }: IModalProps) => {
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
        {children}
      </div>
    </div>
  );
};

export default Modal;
