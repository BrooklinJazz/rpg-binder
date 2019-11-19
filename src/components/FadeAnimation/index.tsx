import React, { ReactNode, useLayoutEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { TransitionProps } from "react-transition-group/Transition";
import styled from "styled-components";

const Fade = styled.div`
  transition: 500ms;
  opacity: ${({ state }: { state: string }) => (state === "entered" ? 1 : 0)};
`;

interface IProps extends Omit<TransitionProps, "timeout"> {
  timeout?: number;
  open: boolean;
  children: ReactNode;
}

export const FadeAnimation = ({
  children,
  open,
  timeout = 0,
  ...props
}: IProps) => {
  // This hack solves not showing animation when initial open is true
  const [delayedOpen, setDelayedOpen] = useState(false);
  useLayoutEffect(() => {
    setTimeout(() => {
      setDelayedOpen(open);
    }, 100);
  }, [open]);
  return (
    <Transition {...props} mountOnEnter in={delayedOpen} timeout={timeout}>
      {state => <Fade state={state}>{children}</Fade>}
    </Transition>
  );
};
