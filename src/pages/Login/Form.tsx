import React, { useState } from "react";
import styled from "styled-components";

import { useLogin, useSignup } from "../../api/hooks";
import { capitalize, capitalizeAll } from "../../common/helpers";
import { DefaultButton, PrimaryButton } from "../../components/StyledButtons";
import { Form } from "../../components/StyledForm";
import { Input } from "../../components/StyledInput";
import { Label } from "../../components/StyledLabel";
import { H1 } from "../../components/StyledTypography";
import { modalSpacing } from "../../common/styles";

const LoginFormArea = styled(Form)`
  grid-area: login_form;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: ${modalSpacing};
  button {
    margin-left: 10px;
  }
`;

export const LoginForm = () => {
  const login = useLogin();
  const signUp = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"login" | "sign up">("login");
  const oppositeState = state === "login" ? "sign up" : "login";
  const toggleState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState(oppositeState);
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = { email, password };
    if (state === "login") {
      login(input);
    } else {
      signUp(input);
    }
  };
  return (
    <LoginFormArea onSubmit={submit}>
      <H1>{capitalizeAll(state)}</H1>
      <Label>
        Email
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Label>
      <Label>
        Password
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Label>
      <ButtonWrapper>
        <DefaultButton onClick={toggleState}>
          Switch to {oppositeState}
        </DefaultButton>
        <PrimaryButton>{capitalizeAll(state)}</PrimaryButton>
      </ButtonWrapper>
    </LoginFormArea>
  );
};
