import React, { ReactNode } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";

const Fade = styled.div`
  transition: 1s;
  opacity: ${({ state }: { state: string }) => (state === "entered" ? 1 : 0)};
`;

export const FadeAnimation = ({
  children,
  open
}: {
  children: ReactNode;
  open: boolean;
}) => {
  return (
    <Transition mountOnEnter in={open} timeout={0}>
      {state => <Fade state={state}>{children}</Fade>}
    </Transition>
  );
};
