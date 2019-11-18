import React, { ReactNode } from "react";
import { navigatorWidth } from "../../../../../common/styles";
import styled from "styled-components";
import { Transition } from "react-transition-group";

const Scroll = styled.div`
  transition: 0.3s;
  height: max-content;
  width: ${({ state }: { state: string }) => {
    switch (state) {
      case "entering":
        return 0;
      case "entered":
        return navigatorWidth;
      case "exiting":
        return navigatorWidth;
      case "exited":
        return 0;
    }
  }};
  overflow: hidden;
`;

export const ScrollAnimation = ({
  open,
  children
}: {
  open: boolean;
  children: ReactNode;
}) => {
  return (
    <Transition in={open} timeout={0}>
      {state => <Scroll state={state}>{children}</Scroll>}
    </Transition>
  );
};
