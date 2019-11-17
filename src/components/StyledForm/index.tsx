import React from "react";
import styled from "styled-components";

import { onSurface, surface1 } from "../../common/styles";

const FormComponent = styled.form`
  background-color: ${surface1};
  color: ${onSurface};
`;

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit: () => void;
}

export const Form = ({ onSubmit, ...props }: IFormProps) => {
  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return <FormComponent onSubmit={submit} {...props} />;
};
