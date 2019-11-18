import React from "react";
import styled from "styled-components";

import { onSurface, surface1 } from "../../common/styles";
import Loading from "../Loading";

const FormComponent = styled.form`
  background-color: ${surface1};
  color: ${onSurface};
`;

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit: () => void;
  loading: boolean;
}

export const Form = ({ onSubmit, children, loading, ...props }: IFormProps) => {
  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <FormComponent onSubmit={submit} {...props}>
      {children}
      {loading && <Loading />}
    </FormComponent>
  );
};

export const ModalForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;
