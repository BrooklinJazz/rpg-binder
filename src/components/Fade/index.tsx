import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { Omit } from "../../common/types";
import "./Fade.scss";

interface IProps
  extends Omit<CSSTransitionProps, "classNames" | "unmountOnExit" | "timeout"> {
  in: boolean;
}

const Fade = ({ children, ...props }: IProps) => (
  <CSSTransition {...props} classNames="Fade" unmountOnExit timeout={500}>
    {children}
  </CSSTransition>
);

export default Fade;
