import combineClasses from "combine-classes";
import React from "react";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, Props } from "@fortawesome/react-fontawesome";

import { Theme } from "../../common/theme";
import { Omit } from "../../common/types";
import style from "./Close.module.scss";

interface IProps {
  iconProps?: Omit<Props, "icon">;
  buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Close = ({ iconProps, buttonProps }: IProps) => (
  <button
    {...buttonProps}
    className={combineClasses(
      style.Close,
      buttonProps.className,
      Theme.hoverable
    )}
  >
    <FontAwesomeIcon {...iconProps} icon={faTimes} />
  </button>
);

export default Close;
