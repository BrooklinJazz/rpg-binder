import styled from "styled-components";

import {
  buttonHeight,
  buttonWidth,
  danger1,
  hover,
  info1,
  modalSpacing,
  onDanger,
  onInfo,
  onPrimary,
  onSecondary,
  onSuccess,
  onSurface,
  primary1,
  secondary1,
  success1,
  surface1
} from "../../common/styles";

export const Button = styled.button`
  outline: none;
  border: none;
  height: ${buttonHeight};
  width: max-content;
  min-width: ${buttonWidth};
  border-radius: 0;
  font-size: 1em;
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

export const CreateButton = styled(PrimaryButton).attrs(props => ({
  children: "Create"
}))`
  margin-top: ${modalSpacing};
  align-self: flex-end;
`;
