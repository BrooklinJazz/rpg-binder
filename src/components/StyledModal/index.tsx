import React, { useEffect } from "react";
import styled from "styled-components";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  modalSpacing,
  modalWrapperZIndex,
  modalZIndex,
  primary1,
  surface1,
  surface4
} from "../../common/styles";
import { H3 } from "../StyledTypography";
import { transparentize } from "polished";

const ModalWrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${modalWrapperZIndex};
  /* background-color: ${props => transparentize(0.6, surface1(props))}; */
`;

const Content = styled.div`
  background-color: ${surface4};
  padding: ${modalSpacing};
  z-index: ${modalZIndex};
  width: 500px;
  max-width: 100%;
  box-sizing: border-box;
  height: max-content;
  border: solid 1px ${primary1};
`;

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  close: () => void;
  title: string;
}

export const Modal = ({ title, close, children }: IModalProps) => {
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
    <ModalWrapper onMouseDown={close}>
      <Content onMouseDown={e => e.stopPropagation()}>
        <H3 weight="light">{title}</H3>
        {children}
      </Content>
    </ModalWrapper>
  );
};
