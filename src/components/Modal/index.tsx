import React, { useEffect } from "react";
import "./Modal.scss";
import combineClasses from "combine-classes/lib";

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
    <div className="ModalWrapper">
      <div {...props} className={combineClasses("Modal", className)}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
