import React from "react";
import styled from "styled-components";

import {
  buttonHeight,
  buttonWidth,
  info1,
  onDanger,
  onInfo,
  onPrimary,
  onSecondary,
  onSuccess,
  onSurface,
  primary1,
  surface1,
  secondary1,
  success1,
  danger1,
  hover
} from "../../common/styles";

export const Button = styled.button`
  outline: none;
  border: none;
  height: ${buttonHeight};
  width: max-content;
  min-width: ${buttonWidth};
  border-radius: 0;
  &:hover {
    cursor: pointer;
  }
`;

export const DefaultButton = styled(Button)`
  color: ${onSurface};
  background-color: ${surface1};
  &:hover {
    background-color: ${props => hover(surface1(props))};
  }
`;

export const PrimaryButton = styled(Button)`
  color: ${onPrimary};
  background-color: ${primary1};
  &:hover {
    background-color: ${props => hover(primary1(props))};
  }
`;

export const InfoButton = styled(Button)`
  color: ${onInfo};
  background-color: ${info1};
  &:hover {
    background-color: ${props => hover(info1(props))};
  }
`;

export const SecondaryButton = styled(Button)`
  color: ${onSecondary};
  background-color: ${secondary1};
  &:hover {
    background-color: ${props => hover(secondary1(props))};
  }
`;

export const SuccessButton = styled(Button)`
  color: ${onSuccess};
  background-color: ${success1};
  &:hover {
    background-color: ${props => hover(success1(props))};
  }
`;

export const DangerButton = styled(Button)`
  color: ${onDanger};
  background-color: ${danger1};
  &:hover {
    background-color: ${props => hover(danger1(props))};
  }
`;
