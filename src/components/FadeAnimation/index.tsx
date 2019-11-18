import React, { ReactNode, useState, useLayoutEffect } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";

const Fade = styled.div`
  transition: 500ms;
  opacity: ${({ state }: { state: string }) => (state === "entered" ? 1 : 0)};
`;

export const FadeAnimation = ({
  children,
  open,
  timeout
}: {
  children: ReactNode;
  open: boolean;
  timeout?: number;
}) => {
  // This hack solves not showing animation when initial open is true
  const [delayedOpen, setDelayedOpen] = useState(false);
  useLayoutEffect(() => {
    setDelayedOpen(open);
  }, [open]);
  return (
    <Transition mountOnEnter in={delayedOpen} timeout={timeout || 0}>
      {state => <Fade state={state}>{children}</Fade>}
    </Transition>
  );
};
