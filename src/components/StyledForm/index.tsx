import React from "react";
import styled from "styled-components";

import {
  buttonHeight,
  danger1,
  inputPadding,
  modalSpacing,
  onDanger,
  onSurface,
  surface1,
  surface4
} from "../../common/styles";
import { Spinner } from "../Loading";
import { Text } from "../StyledTypography";

const FormComponent = styled.form`
  background-color: ${surface4};
  color: ${onSurface};
`;

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit: () => void;
  loading: boolean;
  error: string | undefined;
}

const Error = styled(Text)`
  background-color: ${danger1};
  color: ${onDanger};
  display: flex;
  align-items: center;
  padding: 0 ${inputPadding};
  box-sizing: border-box;
  width: 100%;
  margin-top: ${modalSpacing};
  height: ${buttonHeight};
`;

export const Form = ({
  onSubmit,
  children,
  loading,
  error,
  ...props
}: IFormProps) => {
  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <FormComponent onSubmit={submit} {...props}>
      {error && <Error weight="bold">{error}</Error>}
      {children}
      {loading && <Spinner />}
    </FormComponent>
  );
};

export const ModalForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;
